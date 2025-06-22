import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { signOut } from "firebase/auth"
import { auth } from "../src/firebase/firebase_config"
import { useTranslation } from "react-i18next"

export default function LogoutPopup({ onClose }) {
    const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false)
    const navigate = useNavigate()
    const { t } = useTranslation()

    const handleLogout = async () => {
        try {
            await signOut(auth)
            navigate("/")
        } catch (error) {
            alert(t("Errore durante il logout. Riprova più tardi."))
            console.error("Errore logout:", error)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full relative">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
                    onClick={onClose}
                    aria-label={t("Chiudi")}
                >
                    &times;
                </button>
                <h2 className="text-2xl font-bold mb-4 text-red-700">{t("Logout")}</h2>
                <p className="text-gray-700 mb-4">{t("Sei sicuro di voler uscire?")}</p>
                <button
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-auto block"
                    onClick={handleLogout}
                >
                    {t("Conferma Logout")}
                </button>
            </div>
        </div>
    )
}