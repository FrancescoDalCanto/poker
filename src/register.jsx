import { useState, useEffect } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../src/firebase/firebase_config'
import getFirebaseErrorMessage from '../src/firebase/firebase_error'
import { useNavigate } from "react-router-dom";
import { VerificaMail } from "./verifica_mail"
import { useTranslation } from "react-i18next"

export default function Register() {
    const navigate = useNavigate();
    const { t } = useTranslation()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
            const check = await VerificaMail(email)
            if (check.valid) {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password)
                await updateProfile(userCredential.user, { displayName: name })
                setSuccess(true)
                navigate("/home_utente")
            } else {
                setError(t("Email non valida, temporanea o inesistente."))
                return
            }
        } catch (err) {
            setError(getFirebaseErrorMessage(err.code))
        }
    }

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold text-green-800 mb-4">{t("Registrati")}</h2>
            {success ? (
                <div className="flex flex-col items-center">
                    <span className="text-green-700 font-semibold mb-2">{t("Registrazione completata!")}</span>
                    <span className="text-4xl animate-bounce">🎉</span>
                    <span className="mt-2 text-sm text-gray-500">{t("Verrai reindirizzato tra 15 secondi...")}</span>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
                    <input
                        type="text"
                        placeholder={t("Nome")}
                        className="px-4 py-2 rounded border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder={t("Email")}
                        className="px-4 py-2 rounded border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder={t("Password")}
                        className="px-4 py-2 rounded border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    {error && (
                        <div className="text-red-600 text-sm text-center">{error}</div>
                    )}
                    <button
                        type="submit"
                        className="bg-green-700 hover:bg-green-800 text-yellow-200 font-bold py-2 rounded transition"
                    >
                        {t("Registrati")}
                    </button>
                </form>
            )}
        </div>
    )
}