export default async function handler(req, res) {
    // Récupère l'identité de celui qui demande le lien
    const userAgent = req.headers['user-agent'] || '';
    
    // 1. TON LIEN GITHUB RAW (celui que tu viens de récupérer)
    const scriptUrl = "https://raw.githubusercontent.com/kingv823/assets/main/script.lua";
    
    // 2. TON LIEN DE VIDÉO DISCORD (celui que tu m'as donné)
    const videoUrl = "https://cdn.discordapp.com/attachments/1469866758684020759/1487808525076795644/ssstik.io_mouss.69.1_1774791576239.mp4?ex=69ca7d2a&is=69c92baa&hm=1973888711e318815e7d8918d78bc639688adf0bda5a50d64eda614a1f9921f1&";

    // VÉRIFICATION : Est-ce que c'est Roblox ?
    // On vérifie si "Roblox" ou "rblx" est dans l'User-Agent
    if (userAgent.toLowerCase().includes('roblox')) {
        try {
            // C'est Roblox ! On va chercher le script sur GitHub et on le renvoie
            const response = await fetch(scriptUrl);
            const data = await response.text();
            
            res.setHeader('Content-Type', 'text/plain');
            return res.status(200).send(data);
        } catch (error) {
            return res.status(500).send("-- Erreur lors du chargement du script.");
        }
    } else {
        // C'EST UN HUMAIN ! On lui affiche la vidéo en plein écran
        res.setHeader('Content-Type', 'text/html');
        return res.status(200).send(`
            <!DOCTYPE html>
            <html lang="fr">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Access Denied</title>
                <style>
                    body { 
                        margin: 0; 
                        padding: 0;
                        background: black; 
                        display: flex; 
                        justify-content: center; 
                        align-items: center; 
                        height: 100vh; 
                        overflow: hidden; 
                    }
                    video { 
                        width: 100%; 
                        height: 100%; 
                        object-fit: contain; 
                    }
                </style>
            </head>
            <body>
                <video autoplay loop controls playsinline>
                    <source src="${videoUrl}" type="video/mp4">
                    Ton navigateur ne supporte pas la lecture de cette vidéo.
                </video>
            </body>
            </html>
        `);
    }
}
