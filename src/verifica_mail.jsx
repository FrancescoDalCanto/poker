export async function VerificaMail(email) {
    // Recupera la chiave API per Mailboxlayer dalle variabili ambiente
    const accessKey = import.meta.env.VITE_Mailboxlayer;

    // Costruisce l'URL per la richiesta API per verificare l'email
    // - Include la chiave API e l'email codificata come parametro della query string
    const url = `https://apilayer.net/api/check?access_key=${accessKey}&email=${encodeURIComponent(email)}`;

    try {
        // Esegue una richiesta HTTP GET all'endpoint API
        const res = await fetch(url);

        // Converte la risposta in formato JSON
        const data = await res.json();

        // Se la risposta API segnala un errore → restituisce esito non valido
        if (data.success === false) {
            return { valid: false, reason: "API error" };
        }

        // Controlla se:
        // - Il formato dell'email NON è valido
        // - L'email è usa e getta (disposable)
        // - Il controllo SMTP fallisce (smtp_check === false)
        // In uno di questi casi → restituisce esito non valido
        if (!data.format_valid || data.disposable || data.smtp_check === false) {
            return { valid: false, reason: "invalid_email" };
        }

        // Se tutte le verifiche passano → restituisce esito valido
        return { valid: true };
    } catch (err) {
        // In caso di errore di rete o altri problemi → restituisce esito non valido per "network_error"
        return { valid: false, reason: "network_error" };
    }
}