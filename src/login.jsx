import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../src/firebase/firebase_config'
import getFirebaseErrorMessage from '../src/firebase/firebase_error'
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate("/home_utente")
        } catch (err) {
            setError(getFirebaseErrorMessage(err.code))
        }
    }

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold text-green-800 mb-4">Login</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
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
                    Accedi
                </button>
            </form>
        </div>
    )
}