import { useEffect, useState } from "react"
import { auth } from "../src/firebase/firebase_config"
import { useTranslation } from "react-i18next"

export default function Profilo({ onClose }) {
    const [user, setUser] = useState(null)
    const { t } = useTranslation()

    useEffect(() => {
        setUser(auth.currentUser)
    }, [])

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
                <h2 className="text-2xl font-bold mb-4 text-green-800">{t("Profilo")}</h2>
                {user ? (
                    <div className="space-y-2">
                        <div>
                            <span className="font-semibold text-gray-700">{t("Nome")}:</span>{" "}
                            <span className="text-gray-900">{user.displayName || t("Non impostato")}</span>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-700">{t("Email")}:</span>{" "}
                            <span className="text-gray-900">{user.email}</span>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-700">{t("Email verificata")}:</span>{" "}
                            <span className="text-gray-900">{user.emailVerified ? t("Sì") : t("No")}</span>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-700">UID:</span>{" "}
                            <span className="text-gray-500 text-xs">{user.uid}</span>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-700">{t("Nessun utente loggato.")}</p>
                )}
            </div>
        </div>
    )
}