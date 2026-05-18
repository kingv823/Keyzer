export default async function handler(req, res) {
    // On récupère l'identité (User-Agent)
    const userAgent = req.headers['user-agent'] || '';
    
    // 1. TON LIEN GITHUB RAW (Modifié plus bas pour briser le cache)
    const scriptUrl = "https://raw.githubusercontent.com/kingv823/assets/main/script.lua";
    
    // 2. TON LIEN DE VIDÉO DISCORD
    const videoUrl = "https://cdn.discordapp.com/attachments/1469866758684020759/1487808525076795644/ssstik.io_mouss.69.1_1774791576239.mp4?ex=69ca7d2a&is=69c92baa&hm=1973888711e318815e7d8918d78bc639688adf0bda5a50d64eda614a1f9921f1&";

    // VÉRIFICATION : Est-ce que c'est Roblox ou un exécuteur ?
    if (userAgent.toLowerCase().includes('roblox') || userAgent.toLowerCase().includes('rblx')) {
        try {
            // FIX ANTI-CACHE : On ajoute un timestamp unique (?v=...) pour forcer GitHub à donner la version fraîche
            const bypassUrl = scriptUrl + "?v=" + Date.now();
            
            // On désactive aussi explicitement le cache dans les headers du fetch
            const response = await fetch(bypassUrl, {
                headers: {
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                    'Pragma': 'no-cache',
                    'Expires': '0'
                }
            });
            const data = await response.text();
            
            // On dit à l'exécuteur Roblox de ne SURTOUT PAS garder ce script en cache
            res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
            res.setHeader('Pragma', 'no-cache');
            res.setHeader('Expires', '0');
            
            res.setHeader('Content-Type', 'text/plain');
            return res.status(200).send(data);
        } catch (error) {
            return res.status(500).send("-- Erreur de chargement du script.");
        }
    } else {
        // C'EST UN HUMAIN ! On lui affiche la vidéo en plein écran "Propre"
        res.setHeader('Content-Type', 'text/html');
        return res.status(200).send(`
            <!DOCTYPE html>
            <html lang="fr">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Access Denied</title>
                <style>
                    * { margin: 0; padding: 0; box-sizing: border-box; }
                    body { 
                        background: #000; 
                        height: 100vh; 
                        width: 100vw; 
                        display: flex; 
                        justify-content: center; 
                        align-items: center; 
                        overflow: hidden;
                        cursor: pointer;
                    }
                    video { 
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        min-width: 100%;
                        min-height: 100%;
                        width: auto;
                        height: auto;
                        transform: translate(-50%, -50%);
                        object-fit: cover;
                    }
                    .overlay {
                        position: absolute;
                        color: rgba(255,255,255,0.2);
                        font-family: sans-serif;
                        font-size: 12px;
                        bottom: 10px;
                        pointer-events: none;
                    }
                </style>
            </head>
            <body onclick="enableSound()">
                <video id="troll" autoplay loop muted playsinline>
                    <source src="${videoUrl}" type="video/mp4">
                </video>

                <div class="overlay">Click anywhere to unmute</div>

                <script>
                    const video = document.getElementById('troll');
                    
                    function enableSound() {
                        if (video.muted) {
                            video.muted = false;
                            console.log("Sound enabled!");
                        }
                    }

                    document.addEventListener('DOMContentLoaded', () => {
                        video.play().catch(e => console.log("Autoplay blocked, waiting for click"));
                    });
                </script>
            </body>
            </html>
        `);
    }
}
