<script>
    import { onMount } from 'svelte';

    let page;
    let currentTimeout = null;
    onMount(() => {
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');

        // Charger les images des créatures
        const fishImage = new Image();
        fishImage.src = './retroSea/fish.png'; // Poisson personnalisé
        const coralImage = new Image();
        coralImage.src = './retroSea/coral.png'; // Corail personnalisé
        const joueurImage = new Image();
        joueurImage.src = './retroSea/joueur.png';
        const deepFishImage = new Image();
        deepFishImage.src = './retroSea/deepFish.png';


        const popSound = new Audio('./retroSea/pop.mp3');
        const bubbleSound = new Audio('./retroSea/bubbles.mp3');
        bubbleSound.loop = true;
        bubbleSound.play();

        // Taille du monde global
        const worldWidth = 2000;
        const worldHeight = 2000;

        // Variables pour le joueur et les créatures
        const player = { x: canvas.width / 2, y: canvas.height / 2, width: 64, height: 64 }; // Position de départ du joueur
        const speed = 15; // Vitesse du joueur
        const fishList = [];
        const coralList = [];
        const deepFishList = []; // Liste pour les poissons de profondeur
        const bubbleList = []; // Liste des bulles
        const numFish = 40; // Nombre de poissons
        const numCorals = 40; // Nombre de coraux
        const numBubbles = 40; // Nombre de bulles
        const numDeepFish = 20; // Nombre de poissons de profondeur
        const deepLayerThreshold = 1500; // La couche Y à partir de laquelle les nouveaux poissons apparaissent

        // Position de la "caméra" (pour afficher une portion du monde sur le canvas)
        let camera = { x: 0, y: 0 };

        // Direction du joueur (pour savoir s'il va à gauche ou à droite)
        let playerDirection = 'right'; // Initialement à droite

        // Fonction pour initialiser les poissons
        function initializeFish() {
            for (let i = 0; i < numFish; i++) {
                fishList.push({
                    x: Math.random() * worldWidth, // Position aléatoire dans le monde global
                    y: Math.random() * worldHeight,
                    width: 64,
                    height: 64
                });
            }
        }

        // Fonction pour initialiser les coraux
        function initializeCorals() {
            for (let i = 0; i < numCorals; i++) {
                coralList.push({
                    x: Math.random() * worldWidth, // Position aléatoire dans le monde global
                    y: Math.random() * worldHeight,
                    width: 64,
                    height: 64
                });
            }
        }

        function initializeDeepFish() {
            for (let i = 0; i < numDeepFish; i++) {
                deepFishList.push({
                    x: Math.random() * worldWidth, // Position aléatoire en largeur
                    y: deepLayerThreshold + Math.random() * (worldHeight - deepLayerThreshold), // Position Y basse
                    width: 64,
                    height: 64
                });
            }
        }


        // Fonction pour initialiser les bulles
        function initializeBubbles() {
            for (let i = 0; i < numBubbles; i++) {
                bubbleList.push({
                    x: Math.random() * canvas.width, // Position aléatoire de la bulle
                    y: Math.random() * canvas.height + canvas.height, // Position au-dessus de l'écran
                    radius: Math.random() * 5 + 2, // Taille de la bulle
                    speed: Math.random() * 2 + 1, // Vitesse de montée de la bulle
                    opacity: Math.random() * 0.3 + 0.3 // Opacité de la bulle
                });
            }
        }

        // Fonction pour dessiner les poissons
        function drawFish(fish) {
            const screenX = fish.x - camera.x; // Position relative à la caméra
            const screenY = fish.y - camera.y;
            ctx.drawImage(fishImage, screenX, screenY, fish.width, fish.height); // Dessiner chaque poisson
        }

        function drawDeepFish(fish) {
            const screenX = fish.x - camera.x; // Position relative à la caméra
            const screenY = fish.y - camera.y;
            ctx.drawImage(deepFishImage, screenX, screenY, fish.width, fish.height); // Dessiner le poisson de profondeur
        }

        // Fonction pour dessiner le joueur avec un emoji sous-marin
        function drawPlayer() {
            const screenX = player.x - camera.x; // Position relative à la caméra
            const screenY = player.y - camera.y;

            // Inverser l'image du poisson lorsque le joueur va à gauche
            if (playerDirection === 'left') {
                ctx.save();
                ctx.scale(-1, 1);
                ctx.drawImage(joueurImage, -screenX, screenY, player.width, player.height); // Dessiner l'image retournée
                ctx.restore();
            } else {
                // Dessiner le poisson normalement (quand il va à droite)
                ctx.drawImage(joueurImage, screenX - player.width, screenY, player.width, player.height);
            }
        }

        // Fonction pour dessiner les coraux
        function drawCoral(coral) {
            const screenX = coral.x - camera.x; // Position relative à la caméra
            const screenY = coral.y - camera.y;
            ctx.drawImage(coralImage, screenX, screenY, coral.width, coral.height); // Dessiner chaque corail
        }

        // Fonction pour dessiner les bulles
        function drawBubbles() {
            bubbleList.forEach(bubble => {
                // Ajouter un léger décalage horizontal en fonction de la direction du joueur
                if (playerDirection === 'left') {
                    bubble.x += 3; // Déplacement des bulles vers la droite
                } else if (playerDirection === 'right') {
                    bubble.x -= 3; // Déplacement des bulles vers la gauche
                }

                // Les bulles ne sont pas influencées par la caméra pour le moment
                const screenX = bubble.x;
                const screenY = bubble.y;

                ctx.beginPath();
                ctx.arc(screenX, screenY, bubble.radius, 0, Math.PI * 2); // Dessiner la bulle
                ctx.fillStyle = `rgba(255, 255, 255, ${bubble.opacity})`;
                ctx.fill();
                ctx.closePath();

                // Faire monter la bulle
                bubble.y -= bubble.speed;

                // Réinitialiser les bulles qui sortent du cadre
                if (bubble.y + bubble.radius < 0) {
                    bubble.y = canvas.height + bubble.radius; // Réinitialiser la position verticale
                }

                // Réinitialiser les bulles qui sortent horizontalement du cadre
                if (bubble.x + bubble.radius < 0) {
                    bubble.x = canvas.width + bubble.radius;
                } else if (bubble.x - bubble.radius > canvas.width) {
                    bubble.x = -bubble.radius;
                }
            });
        }

        // Fonction pour déplacer le joueur
        function movePlayer(direction) {
            switch (direction) {
                case 'up': player.y -= speed; break;
                case 'down': player.y += speed; break;
                case 'left': player.x -= speed; playerDirection = 'left'; break; // Aller à gauche et afficher correctement le poisson
                case 'right': player.x += speed; playerDirection = 'right'; break; // Aller à droite et afficher correctement le poisson
            }

            // Empêcher de sortir du monde
            if (player.x < 0) player.x = 0;
            if (player.x > worldWidth - player.width) player.x = worldWidth - player.width;
            if (player.y < 0) player.y = 0;
            if (player.y > worldHeight - player.height) player.y = worldHeight - player.height;

            // Déplacer la caméra pour suivre le joueur
            camera.x = player.x - canvas.width / 2;
            camera.y = player.y - canvas.height / 2;

            // Limiter la caméra pour qu'elle ne sorte pas du monde
            if (camera.x < 0) camera.x = 0;
            if (camera.x > worldWidth - canvas.width) camera.x = worldWidth - canvas.width;
            if (camera.y < 0) camera.y = 0;
            if (camera.y > worldHeight - canvas.height) camera.y = worldHeight - canvas.height;
        }

        // Fonction pour dessiner tous les éléments sur le canvas
        function draw() {
            // Calculer l'intensité de la couleur de fond en fonction de la position du joueur
            const intensity = Math.min(Math.max((player.y / worldHeight), 0), 1); // Position du joueur entre 0 et 1

            // Calculer la couleur de fond en fonction de l'intensité (de bleu clair à bleu foncé)
            const r = 0; // Pas de rouge dans la couleur de fond
            const g = Math.floor(255 * (1 - intensity));  // Plus le joueur descend, plus le vert diminue
            const b = Math.floor(255 * (1 - intensity));  // Plus le joueur descend, plus le bleu fonce

            // Appliquer la couleur de fond de type océan
            ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
            ctx.fillRect(0, 0, canvas.width, canvas.height); // Dessiner le fond avec la couleur calculée

            // Dessiner les bulles en arrière-plan
            drawBubbles();

            // Dessiner tous les poissons
            fishList.forEach(drawFish);

            // Dessiner tous les coraux
            coralList.forEach(drawCoral);

            // Dessiner les poissons de profondeur uniquement si le joueur est en dessous de la couche
            if (player.y+400 >= deepLayerThreshold) {
                deepFishList.forEach(drawDeepFish);
            }

            // Dessiner le joueur
            drawPlayer();
        }
        const anecdotes = [
            "Les poissons peuvent dormir tout en nageant ! 🐟💤",
            "Un poisson a une mémoire de 3 secondes. Mais ils sont super mignons ! 🐠",
            "Les poissons sont des experts en camouflage ! 👀",
            "Les coraux sont des animaux et non des plantes ! 🌊🐚",
            "Un seul corail peut vivre pendant des centaines d'années ! 🧡",
            "Les coraux forment des récifs qui sont les plus grands organismes vivants sur Terre ! 🌍",
            "Les poissons-clowns vivent en symbiose avec les anémones de mer ! 🧡🐠",
            "Un poisson peut changer de sexe, comme certains poissons-lunes ! 🌚",
            "Les poissons dorment les yeux ouverts ! 👁️💤",
            "Les dauphins sont des poissons, mais ils sont aussi des mammifères marins ! 🐬🌊",
            "Les requins sont les plus anciens prédateurs de la Terre, datant de plus de 400 millions d'années ! 🦈",
            "Les pieuvres ont trois cœurs et du sang bleu ! 🐙💙",
            "Les tortues marines peuvent vivre jusqu'à 150 ans ! 🐢",
            "Les coraux peuvent se reproduire en clonant leurs propres cellules ! 🌊🧡",
            "Les requins ont une excellente vue, même dans l'obscurité ! 👀🦈",
            "Les poissons peuvent communiquer entre eux grâce à des sons, des couleurs et des mouvements ! 🐠📡",
            "Certains poissons peuvent voler sur de courtes distances au-dessus de l'eau ! 🐟✈️",
            "Les poissons-lions sont connus pour leurs épines venimeuses et leur belle apparence ! 🦁🐠",
            "Les poissons-chirurgiens ont des épines dorsales très acérées ! 🔪🐠",
            "Les dauphins utilisent des outils, comme des éponges, pour protéger leur nez ! 🐬🧽",
            "Les requins-baleines sont les plus grands poissons du monde ! 🦈🌍",
            "Les coraux construisent des récifs qui offrent des habitats à des milliers d'espèces marines ! 🌊🐚",
            "Les poissons peuvent voir dans toutes les directions en même temps grâce à leurs yeux à 360 degrés ! 👁️🐠",
            "Certains poissons se déplacent en formant des bancs pour se protéger des prédateurs ! 🐟👯‍♂️",
            "Les anguilles électriques peuvent produire des décharges électriques pour chasser ou se défendre ! ⚡🐍",
            "Le poisson-lune peut atteindre un poids de plus de 2 000 kg ! 🐟⚖️",
            "Les poissons perches peuvent avoir des dents aussi pointues que des rasoirs ! 🐟🦷",
            "Les poissons pêlaires vivent dans les plus profonds océans du monde ! 🌊🌑",
            "Les dauphins sont capables de se reconnaître dans un miroir, un signe d'intelligence ! 🐬🪞",
            "Les poissons-globes, quand ils sont menacés, peuvent se gonfler pour paraître plus gros ! 🐡🎈",
            "Les raies manta sont des créatures incroyablement intelligentes et gracieuses ! 🦋🐟",
            "Les poissons rouges sont connus pour être les animaux de compagnie les plus populaires dans le monde ! 🐟🏡",
            "Le poisson-archer peut tirer de l'eau pour attraper des insectes ! 🏹🐟",
            "Les étoiles de mer ont des bras qui peuvent se régénérer si elles sont coupées ! 🌟🐚",
            "Les poissons-lions sont venus d'Asie et sont maintenant présents dans l'Atlantique ! 🦁🌍",
            "Les dauphins utilisent des sons pour localiser leur nourriture grâce à l'écholocation ! 🐬🔊",
            "Le plus grand récif de corail du monde est la Grande Barrière de Corail en Australie ! 🐠🏝️",
            "Les poissons-marins peuvent boire de l'eau salée et excréter l'excès de sel ! 🐟💧",
            "Les crabes de cocotier sont les plus grands crabes terrestres, pouvant grimper aux arbres ! 🦀🌴",
            "Les poissons-clowns protègent leur maison en appelant les anémones de mer à l'aide ! 🐠🐚",
            "Les méduse peuvent se régénérer complètement après avoir été blessées ! 🧡🐙",
            "Les poissons de récif coralliens peuvent se cacher dans les coraux pour se protéger des prédateurs ! 🐠🪸",
            "Les dauphins dorment un œil ouvert pour rester vigilants ! 🐬👁️💤",
            "Les anguilles ne sont pas des serpents, bien qu'elles y ressemblent ! 🐍🐠",
            "Les poissons peuvent changer de couleur pour se camoufler dans leur environnement ! 🐟🎨",
            "Les poissons perroquets sont connus pour mordre les coraux pour se nourrir de leur calcium ! 🦜🐠",
            "Les hippocampes mâles portent les œufs dans une poche ventrale jusqu'à leur éclosion ! 🐴🐠",
            "Le poisson-scorpion est l'un des poissons les plus venimeux au monde ! 🦂🐠",
            "Les poissons-chats ont des barbillons très sensibles pour détecter leur nourriture dans l'eau ! 🐱🐟",
            "Les poissons d'eau douce peuvent vivre des années sans se nourrir ! 🐠💪",
            "Les raies peuvent se cacher dans le sable en utilisant leurs corps pour se camoufler ! 🦋🐟",
            "Les thons sont des nageurs rapides, atteignant des vitesses allant jusqu'à 75 km/h ! 🐟💨",
            "Les méduses sont présentes depuis 500 millions d'années et n'ont presque pas évolué ! 🐙🕰️"
        ];

        const names = [
            "Alice", "Bob", "Charlie", "David", "Eve", "Fay", "Grace", "Hannah", "Isaac", "Jack", "Aziz", "Bob"
        ];

        // Fonction pour choisir un prénom et une anecdote aléatoires
        function getRandomNameAndAnecdote() {
            const name = names[Math.floor(Math.random() * names.length)];
            const anecdote = anecdotes[Math.floor(Math.random() * anecdotes.length)];
            return { name, anecdote };
        }

        function openEmptyWindow(x, y) {
            const infoWindow = document.getElementById('infoWindow');
            const { name, anecdote } = getRandomNameAndAnecdote();

            // Mettre à jour le contenu de la fenêtre
            infoWindow.textContent = `${name}\n${anecdote}`;
            infoWindow.innerHTML = `${name}: <br>${anecdote}`;  // Afficher un message générique ou une autre info

            // Récupérer la largeur et la hauteur de la fenêtre
            const windowWidth = infoWindow.offsetWidth;
            const windowHeight = infoWindow.offsetHeight;

            // Calculer la position pour centrer la fenêtre sur le curseur
            let posX = x - windowWidth / 2;  // Centrer horizontalement
            let posY = y - windowHeight / 2; // Centrer verticalement

            // Ajuster la position X pour éviter que la fenêtre dépasse à gauche
            if (posX < 0) {
                posX = 0; // Si elle est trop à gauche, la positionner à 0
            }

            // Ajuster la position X pour éviter que la fenêtre dépasse à droite
            if (posX + windowWidth > window.innerWidth) {
                posX = window.innerWidth - windowWidth; // Si elle dépasse à droite, la positionner pour qu'elle ne dépasse pas
            }

            // Ajuster la position Y pour éviter que la fenêtre dépasse en haut
            if (posY < 0) {
                posY = 0; // Si elle est trop haute, la positionner en haut de l'écran
            }

            // Ajuster la position Y pour éviter que la fenêtre dépasse en bas
            if (posY + windowHeight > window.innerHeight) {
                posY = window.innerHeight - windowHeight; // Si elle dépasse en bas, la positionner pour qu'elle ne dépasse pas
            }

            // Appliquer la nouvelle position à la fenêtre
            infoWindow.style.left = `${posX + 100}px`;
            infoWindow.style.top = `${posY + 100}px`;
            infoWindow.style.display = 'block';  // Rendre la fenêtre visible

            // Si une fenêtre est déjà ouverte, annuler le précédent setTimeout
            if (currentTimeout) {
                clearTimeout(currentTimeout);
            }

            // Fermer la fenêtre après 5 secondes
            currentTimeout = setTimeout(() => {
                infoWindow.style.display = 'none'; // Masquer la fenêtre après 5 secondes
            }, 5000);

            // Jouer le son
            popSound.play();
        }

        // Gestionnaire de clics sur le canvas
        canvas.addEventListener('click', function(event) {
            const mouseX = event.offsetX + camera.x;
            const mouseY = event.offsetY + camera.y;

            // Vérification si un poisson est cliqué
            fishList.forEach(fish => {
                if (mouseX >= fish.x && mouseX <= fish.x + fish.width &&
                    mouseY >= fish.y && mouseY <= fish.y + fish.height) {
                    openEmptyWindow(mouseX - camera.x, mouseY - camera.y);  // Ouvrir la fenêtre vide au clic sur un poisson
                }
            });

            // Vérification si un corail est cliqué
            coralList.forEach(coral => {
                if (mouseX >= coral.x && mouseX <= coral.x + coral.width &&
                    mouseY >= coral.y && mouseY <= coral.y + coral.height) {
                    openEmptyWindow(mouseX - camera.x, mouseY - camera.y);  // Ouvrir la fenêtre vide au clic sur un corail
                }
            });

            deepFishList.forEach(deepFish => {
                if (mouseX >= deepFish.x && mouseX <= deepFish.x + deepFish.width &&
                    mouseY >= deepFish.y && mouseY <= deepFish.y + deepFish.height) {
                    openEmptyWindow(mouseX - camera.x, mouseY - camera.y);  // Ouvrir la fenêtre vide au clic sur un poisson
                }
            })
        });
        // Gestionnaire pour changer le curseur au survol
        canvas.addEventListener('mousemove', function(event) {
            const mouseX = event.offsetX + camera.x;
            const mouseY = event.offsetY + camera.y;

            let cursorOverElement = false;

            // Vérification si la souris survole un poisson
            fishList.forEach(fish => {
                if (mouseX >= fish.x && mouseX <= fish.x + fish.width &&
                    mouseY >= fish.y && mouseY <= fish.y + fish.height) {
                    cursorOverElement = true;
                }
            });

            // Vérification si la souris survole un corail
            coralList.forEach(coral => {
                if (mouseX >= coral.x && mouseX <= coral.x + coral.width &&
                    mouseY >= coral.y && mouseY <= coral.y + coral.height) {
                    cursorOverElement = true;
                }
            });

            deepFishList.forEach(deepFish => {
                if (mouseX >= deepFish.x && mouseX <= deepFish.x + deepFish.width &&
                    mouseY >= deepFish.y && mouseY <= deepFish.y + deepFish.height) {
                    cursorOverElement = true;
                }
            })

            // Modifier le curseur
            if (cursorOverElement) {
                canvas.style.cursor = 'zoom-in'; // Curseur en forme de loupe
            } else {
                canvas.style.cursor = 'default'; // Curseur par défaut
            }
        });

        // Initialisation
        initializeFish();
        initializeCorals();
        initializeDeepFish();
        initializeBubbles();

        // Écoute des événements clavier
        window.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
                event.preventDefault();
            }
            switch (event.key) {
                case 'ArrowUp': movePlayer('up'); break;
                case 'ArrowDown': movePlayer('down'); break;
                case 'ArrowLeft': movePlayer('left'); break;
                case 'ArrowRight': movePlayer('right'); break;
            }
        });

        // Animation
        function animate() {
            draw();  // Dessiner tout
            requestAnimationFrame(animate);  // Continuer l'animation
        }
        animate(); // Démarrer l'animation
    });
</script>

<section class="section_instructions">
    <div class="instructions">
        <h2>Instructions :</h2>
        <p>📜 Cliquez sur les créatures marines pour découvrir leurs liens avec les humains.</p>
        <p>💡 Utilisez les flèches pour naviguer dans l'océan !</p>
    </div>
</section>

<main bind:this={page}>
    <canvas id="gameCanvas" width="800" height="600"></canvas>
    <div id="infoWindow" style="position: absolute; padding: 10px; background-color: rgba(255, 255, 255, 0.8); display: none;">
        Fenêtre vide ouverte !
    </div>
</main>



<style>

    @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');





    main{
        background-image: url("https://i.pinimg.com/736x/43/e6/03/43e60317c7de579238530ad14b3777b9.jpg");
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        font-family: 'Press Start 2P', system-ui;
    }



    .instructions {
        text-align: center;
        margin-top: 20px;
        font-family: 'Press Start 2P', system-ui;
        color: white;
    }
    .section_instructions{
        padding: 10px;
    }

    canvas {
        display: flex;
        margin: 0 auto;
        padding: 0 0 0 0;
        background: linear-gradient(to bottom, #0074D9, #001f3f);
        border: 4px solid #39CCCC;
        image-rendering: pixelated;
    }

    .section_instructions{
        background-color: #001f3f;
    }



</style>