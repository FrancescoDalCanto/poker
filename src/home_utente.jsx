import { useState, useRef, useEffect } from "react"
import { useTranslation } from "react-i18next"
import Profilo from "./profilo"
import ImpostazioniPopup from "./impostazioni"
import LogoutPopup from "./logout"

export default function HomeUtente() {
    const [open, setOpen] = useState(false)
    const [showProfilo, setShowProfilo] = useState(false)
    const [showImpostazioni, setShowImpostazioni] = useState(false)
    const [showLogout, setShowLogout] = useState(false)
    const circleRef = useRef(null)
    const { t } = useTranslation()

    useEffect(() => {
        function handleClickOutside(event) {
            if (circleRef.current && !circleRef.current.contains(event.target)) {
                setOpen(false)
            }
        }
        if (open) {
            document.addEventListener("mousedown", handleClickOutside)
        }
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [open])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-700 via-green-900 to-black relative">
            {/* Cerchio cliccabile in alto a sinistra */}
            <div className="absolute top-6 left-6 z-50">
                <div
                    ref={circleRef}
                    className="w-20 h-20 bg-sky-500/10 rounded-full flex items-center justify-center cursor-pointer relative shadow-lg"
                    onClick={() => setOpen((v) => !v)}
                >
                    <span className="text-sky-700 font-bold">👤</span>
                    {/* Menu a tendina */}
                    {open && (
                        <div
                            className="absolute left-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
                        >
                            <button
                                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                onClick={() => { setShowProfilo(true); setOpen(false); }}
                            >
                                {t("Profilo")}
                            </button>
                            <button
                                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                onClick={() => { setShowImpostazioni(true); setOpen(false); }}
                            >
                                {t("Impostazioni")}
                            </button>
                            <button
                                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                                onClick={() => { setShowLogout(true); setOpen(false); }}
                            >
                                {t("Logout")}
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <h2 className="text-3xl font-bold text-yellow-300 mb-4">{t("Benvenuto al tavolo da Poker!")}</h2>
            <p className="text-white text-lg">{t("Hai effettuato l’accesso con successo.")}</p>
            {showProfilo && <Profilo onClose={() => setShowProfilo(false)} />}
            {showImpostazioni && <ImpostazioniPopup onClose={() => setShowImpostazioni(false)} />}
            {showLogout && <LogoutPopup onClose={() => setShowLogout(false)} />}
        </div>
    )
}