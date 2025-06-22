const handleFirebaseError = (codeOrError) => {
    const errorMessages = {
        'auth/invalid-email': "Email non valida. Controlla il formato.",
        'auth/user-disabled': "Account disabilitato. Contatta il supporto.",
        'auth/user-not-found': "Nessun account associato a questa email.",
        'auth/wrong-password': "Password errata. Riprova.",
        'auth/email-already-in-use': "Email già in uso da un altro account.",
        'auth/weak-password': "Password troppo debole. Deve contenere almeno 6 caratteri.",
        'auth/missing-password': "Inserisci una password.",
        'auth/missing-email': "Inserisci una email.",
        'auth/invalid-credential': "Credenziali non valide o scadute.",
        'auth/invalid-verification-code': "Codice di verifica non valido.",
        'auth/invalid-verification-id': "ID di verifica non valido.",
        'auth/popup-closed-by-user': "Hai chiuso la finestra di accesso.",
        'auth/cancelled-popup-request': "Un'altra finestra di accesso è già in corso.",
        'auth/popup-blocked': "Popup bloccato dal browser.",
        'auth/operation-not-allowed': "Tipo di autenticazione non abilitato per questo progetto.",
        'auth/account-exists-with-different-credential': "Esiste già un account con lo stesso indirizzo email ma con credenziali diverse.",
        'auth/credential-already-in-use': "Le credenziali sono già in uso da un altro utente.",
        'auth/timeout': "Timeout della richiesta. Riprova.",
        'auth/internal-error': "Errore interno. Riprova più tardi.",
        'auth/network-request-failed': "Errore di rete. Controlla la connessione.",
        'auth/too-many-requests': "Troppi tentativi falliti. Riprova più tardi.",
        'auth/requires-recent-login': "Per questa operazione è necessario un accesso recente. Effettua di nuovo il login.",
        'auth/unverified-email': "Email non verificata. Controlla la tua casella di posta.",
    };

    // Permetti sia error che code come parametro
    const code = typeof codeOrError === 'string' ? codeOrError : codeOrError.code;
    return errorMessages[code] || `Errore imprevisto: ${codeOrError.message || code}`;
};

export default handleFirebaseError;