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

    // Dimensioni per il tavolo
    const tableWidth = 700
    const tableHeight = 400
    const chairRadiusX = 300
    const chairRadiusY = 170
    const dealerRadiusX = 0
    const dealerRadiusY = - (tableHeight / 2) - 40 // sopra il tavolo

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



            {/* Tavolo da poker ovale */}
            <div className="relative flex items-center justify-center" style={{ width: tableWidth, height: tableHeight }}>
                {/* Ovale verde */}
                <div
                    className="absolute"
                    style={{
                        width: tableWidth,
                        height: tableHeight,
                        background: "radial-gradient(ellipse at center, #15803d 80%, #166534 100%)",
                        borderRadius: "50%",
                        border: "10px solid #bfa76a",
                        boxShadow: "0 0 60px #000a"
                    }}
                />
                {/* Sedie intorno */}
                {Array.from({ length: 8 }).map((_, i) => {
                    const angle = (i / 8) * 2 * Math.PI
                    const rX = chairRadiusX * Math.cos(angle)
                    const rY = chairRadiusY * Math.sin(angle)
                    return (
                        <div
                            key={i}
                            className="absolute flex items-center justify-center"
                            style={{
                                left: tableWidth / 2 + rX - 28,
                                top: tableHeight / 2 + rY - 28,
                                width: 56,
                                height: 56,
                                borderRadius: "50%",
                                background: "#444",
                                border: "3px solid #bfa76a",
                                boxShadow: "0 2px 8px #0007"
                            }}
                        >
                            <span role="img" aria-label="Sedia" className="text-3xl">🪑</span>
                        </div>
                    )
                })}
                {/* Dealer */}
                <div
                    className="absolute flex items-center justify-center"
                    style={{
                        left: tableWidth / 2 + dealerRadiusX - 32,
                        top: tableHeight / 2 + dealerRadiusY - 32,
                        width: 64,
                        height: 64,
                        borderRadius: "50%",
                        background: "#fffbe6",
                        border: "3px solid #bfa76a",
                        boxShadow: "0 2px 8px #0007",
                        zIndex: 20
                    }}
                >
                    <span role="img" aria-label="Dealer" className="text-3xl">🃏</span>
                </div>
                {/* Testo centrato */}
                <div className="relative flex flex-col items-center justify-center z-10" style={{
                    width: tableWidth,
                    height: tableHeight
                }}>
                    <h2 className="text-3xl font-bold text-yellow-300 mb-2 text-center">{t("Benvenuto al tavolo da Poker!")}</h2>
                    <p className="text-white text-lg text-center">{t("Hai effettuato l’accesso con successo.")}</p>
                </div>
            </div>

            {/* Popup */}
            {showProfilo && <Profilo onClose={() => setShowProfilo(false)} />}
            {showImpostazioni && <ImpostazioniPopup onClose={() => setShowImpostazioni(false)} />}
            {showLogout && <LogoutPopup onClose={() => setShowLogout(false)} />}
        </div >
    )
}