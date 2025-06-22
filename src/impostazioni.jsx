import { useState } from "react"
import { useTranslation } from "react-i18next"

export default function Impostazioni({ onClose }) {
    const [language, setLanguage] = useState("it")
    const [showChangePwd, setShowChangePwd] = useState(false)
    const [email, setEmail] = useState("")
    const [otpSent, setOtpSent] = useState(false)
    const [otp, setOtp] = useState("")
    const [enteredOtp, setEnteredOtp] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [changePwdMsg, setChangePwdMsg] = useState("")
    const { t, i18n } = useTranslation()

    const handleSendOtp = () => {
        if (!email) {
            setChangePwdMsg(t("Inserisci la tua email."))
            return
        }
        const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString()
        setOtp(generatedOtp)
        setOtpSent(true)
        setChangePwdMsg(t("OTP inviato a") + ` ${email} (demo: ${generatedOtp})`)
        // Qui dovresti inviare la mail con l'OTP
    }

    const handleChangePassword = () => {
        if (enteredOtp !== otp) {
            setChangePwdMsg(t("OTP non valido."))
            return
        }
        if (newPassword.length < 6) {
            setChangePwdMsg(t("La nuova password deve avere almeno 6 caratteri."))
            return
        }
        setChangePwdMsg(t("Password cambiata con successo! (demo)"))
        setShowChangePwd(false)
        setEmail("")
        setOtp("")
        setEnteredOtp("")
        setNewPassword("")
        setOtpSent(false)
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
                <h2 className="text-2xl font-bold mb-4 text-green-800">{t("Impostazioni")}</h2>
                <div className="space-y-4">
                    {/* Lingua */}
                    <div className="flex items-center justify-between">
                        <span className="text-gray-700">{t("Lingua")}</span>
                        <select
                            value={language}
                            onChange={e => {
                                setLanguage(e.target.value)
                                i18n.changeLanguage(e.target.value)
                            }}
                            className="border rounded px-2 py-1"
                        >
                            <option value="it">Italiano</option>
                            <option value="en">English</option>
                        </select>
                    </div>

                    {/* Cambio password */}
                    <div>
                        <button
                            className="text-green-700 hover:underline font-semibold"
                            onClick={() => setShowChangePwd(v => !v)}
                        >
                            {t("Cambia password")}
                        </button>
                        {showChangePwd && (
                            <div className="mt-4 space-y-2">
                                <input
                                    type="email"
                                    placeholder={t("La tua email")}
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="w-full border rounded px-2 py-1"
                                />
                                {!otpSent ? (
                                    <button
                                        className="bg-green-700 hover:bg-green-800 text-white font-bold py-1 px-3 rounded"
                                        onClick={handleSendOtp}
                                        type="button"
                                    >
                                        {t("Invia OTP")}
                                    </button>
                                ) : (
                                    <>
                                        <input
                                            type="text"
                                            placeholder={t("Inserisci OTP")}
                                            value={enteredOtp}
                                            onChange={e => setEnteredOtp(e.target.value)}
                                            className="w-full border rounded px-2 py-1"
                                        />
                                        <input
                                            type="password"
                                            placeholder={t("Nuova password")}
                                            value={newPassword}
                                            onChange={e => setNewPassword(e.target.value)}
                                            className="w-full border rounded px-2 py-1"
                                        />
                                        <button
                                            className="bg-green-700 hover:bg-green-800 text-white font-bold py-1 px-3 rounded"
                                            onClick={handleChangePassword}
                                            type="button"
                                        >
                                            {t("Cambia password")}
                                        </button>
                                    </>
                                )}
                                {changePwdMsg && (
                                    <div className="text-sm text-center text-red-600 mt-2">{changePwdMsg}</div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}