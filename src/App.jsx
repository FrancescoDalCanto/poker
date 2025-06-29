import './language/i18n'
import { useState } from 'react'
import { useTranslation } from "react-i18next"
import Login from './login'
import Register from './register'
import githublogo from "../public/icons8-github-240.png"

function App() {
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-700 via-green-900 to-black flex flex-col">
      <header className="py-8 bg-green-800 shadow-lg">
        <h1 className="text-4xl font-bold text-center text-yellow-300 drop-shadow-lg tracking-widest">
          Pok3r
        </h1>
      </header>
      <main className="flex flex-1 items-center justify-center">
        <div className="bg-white/10 rounded-xl shadow-2xl p-8 max-w-lg w-full flex flex-col items-center">
          <p className="text-lg text-white mb-4">
            {t("Benvenuto al tavolo da Poker!")}
          </p>
          <button
            className="bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold py-2 px-6 rounded-full shadow-lg transition mb-2"
            onClick={() => setShowLogin(true)}
          >
            {t("Login")}
          </button>
          <span className="text-white">
            {t("oppure")}{' '}
            <button
              className="underline text-yellow-300 hover:text-yellow-400 font-semibold"
              onClick={() => setShowRegister(true)}
              type="button"
            >
              {t("Registrati")}
            </button>
          </span>
        </div>
        {/* Login Modal */}
        {showLogin && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 shadow-2xl relative max-w-sm w-full">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
                onClick={() => setShowLogin(false)}
                aria-label="Chiudi"
              >
                &times;
              </button>
              <Login />
            </div>
          </div>
        )}
        {/* Register Modal */}
        {showRegister && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 shadow-2xl relative max-w-sm w-full">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
                onClick={() => setShowRegister(false)}
                aria-label="Chiudi"
              >
                &times;
              </button>
              <Register />
            </div>
          </div>
        )}
      </main>
      <footer className="py-4 bg-green-900 text-center text-green-200 text-xs">
        © {new Date().getFullYear()} Poker App. {t("Tutti i diritti riservati.")} (ad averne)
      </footer>

      {/* Footer GitHub link */}
      <div className="fixed bottom-4 left-4 w-12 aspect-square max-w-xs sm:max-w-sm md:max-w-md text-gray-400 text-sm hover:text-white transition-colors duration-300 z-50">
        <a
          href="https://github.com/FrancescoDalCanto/meow-focus"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-full"
        >
          <img src={githublogo} className="w-full h-full opacity-25 hover:opacity-55 transition-all duration-200" />
        </a>
      </div>
    </div>
  )
}

export default App
