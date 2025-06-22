import { useState, useEffect } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../src/firebase/firebase_config'
import getFirebaseErrorMessage from '../src/firebase/firebase_error'
import { useNavigate } from "react-router-dom";


//TODO: da rimuovere il tempo dei 15 secondi per reindirizzare, deve essere diretto

export default function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                navigate("/home_utente")
            }, 15000) // 15000 ms = 15 secondi
            return () => clearTimeout(timer)
        }
    }, [success, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            await updateProfile(userCredential.user, { displayName: name })
            setSuccess(true)
        } catch (err) {
            setError(getFirebaseErrorMessage(err.code))
        }
    }

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold text-green-800 mb-4">Registrati</h2>
            {success ? (
                <div className="flex flex-col items-center">
                    <span className="text-green-700 font-semibold mb-2">Registrazione completata!</span>
                    <span className="text-4xl animate-bounce">🎉</span>
                    <span className="mt-2 text-sm text-gray-500">Verrai reindirizzato tra 15 secondi...</span>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
                    <input
                        type="text"
                        placeholder="Nome"
                        className="px-4 py-2 rounded border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="px-4 py-2 rounded border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
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
                        Registrati
                    </button>
                </form>
            )}
        </div>
    )
}