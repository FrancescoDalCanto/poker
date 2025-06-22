import i18n from "i18next"
import { initReactI18next } from "react-i18next"

const resources = {
    it: {
        translation: {
            "Benvenuto al tavolo da Poker!": "Benvenuto al tavolo da Poker!",
            "Hai effettuato l’accesso con successo.": "Hai effettuato l’accesso con successo.",
            "Profilo": "Profilo",
            "Impostazioni": "Impostazioni",
            "Logout": "Logout",
            "Lingua": "Lingua",
            "Notifiche": "Notifiche",
            "Cambia password": "Cambia password",
            "Email": "Email",
            "Nome": "Nome",
            "Conferma Logout": "Conferma Logout",
            "Sei sicuro di voler uscire?": "Sei sicuro di voler uscire?",
            // ...aggiungi altri testi qui...
        }
    },
    en: {
        translation: {
            "Benvenuto al tavolo da Poker!": "Welcome to the Poker table!",
            "Hai effettuato l’accesso con successo.": "You have successfully logged in.",
            "Profilo": "Profile",
            "Impostazioni": "Settings",
            "Logout": "Logout",
            "Lingua": "Language",
            "Notifiche": "Notifications",
            "Cambia password": "Change password",
            "Email": "Email",
            "Nome": "Name",
            "Conferma Logout": "Confirm Logout",
            "Sei sicuro di voler uscire?": "Are you sure you want to log out?",
            // ...add more texts here...
        }
    }
}

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "it", // lingua di default
        fallbackLng: "it",
        interpolation: { escapeValue: false }
    })

export default i18n