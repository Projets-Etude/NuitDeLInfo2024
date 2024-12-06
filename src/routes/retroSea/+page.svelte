<script>
    import {onMount} from 'svelte';
    let page;
    onMount(() => {
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');

// Charger les images des créatures
        const fishImage = new Image();
        fishImage.src = './src/routes/retroSea/fish.jpg'; // Poisson pixelisé
        const coralImage = new Image();
        coralImage.src = './src/routes/retroSea/coral.jpg'; // Corail pixelisé

// Liste d'anecdotes
        const anecdotes = [
            'Les poissons clowns vivent en symbiose avec les anémones.',
            'Les coraux sont des animaux, pas des plantes !',
            'Certains poissons utilisent des outils, comme les humains.',
            'Les récifs coralliens abritent 25% de la vie marine.',
            'Les requins existent depuis plus de 400 millions d’années.',
            'Les baleines chantent pour communiquer sur des centaines de kilomètres.',
            'Certains poissons changent de sexe pour s’adapter à leur environnement.',
            'Les coraux protègent les côtes des vagues et des tempêtes.',
            'La méduse immortelle peut rajeunir indéfiniment.',
            'Les dauphins sont aussi intelligents qu’un enfant de 3 ans.'
        ];

// Générer plusieurs éléments aléatoires
        const elements = [];
        for (let i = 0; i < 20; i++) {
            const type = Math.random() > 0.5 ? 'fish' : 'coral'; // Aléatoire entre poisson et corail
            const x = Math.random() * 2000; // Largeur virtuelle de l’océan
            const y = Math.random() * 1500; // Hauteur virtuelle de l’océan
            const message = anecdotes[Math.floor(Math.random() * anecdotes.length)]; // Anecdote aléatoire
            elements.push({ x, y, type, message });
        }

// Variables pour le défilement
        let offsetX = 0;
        let offsetY = 0;

// Dessiner un élément
        function drawElement(element) {
            const img = element.type === 'fish' ? fishImage : coralImage;
            ctx.drawImage(img, element.x - offsetX, element.y - offsetY, 64, 64); // Ajuster selon le décalage
        }

// Dessiner tous les éléments sur le canvas
        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Nettoyer le canvas
            elements.forEach(drawElement); // Dessiner chaque élément
        }

// Gérer les déplacements avec les flèches
        window.addEventListener('keydown', (e) => {
            const speed = 20; // Vitesse du déplacement
            switch (e.key) {
                case 'ArrowUp':
                    offsetY -= speed;
                    break;
                case 'ArrowDown':
                    offsetY += speed;
                    break;
                case 'ArrowLeft':
                    offsetX -= speed;
                    break;
                case 'ArrowRight':
                    offsetX += speed;
                    break;
            }
            draw(); // Redessiner après chaque mouvement
        });

// Gérer les clics sur le canvas
        canvas.addEventListener('click', (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left + offsetX; // Prendre en compte le décalage
            const y = e.clientY - rect.top + offsetY;

            elements.forEach((el) => {
                if (x >= el.x && x <= el.x + 64 && y >= el.y && y <= el.y + 64) {
                    alert(el.message); // Afficher l'anecdote
                }
            });
        });

// Vérifiez que toutes les images sont chargées avant de démarrer
        Promise.all([
            new Promise((resolve) => (fishImage.onload = resolve)),
            new Promise((resolve) => (coralImage.onload = resolve))
        ]).then(() => {
            draw(); // Dessiner une fois les images prêtes
            console.log("Images chargées, jeu démarré avec plein de créatures !");
        });
    })
</script>

<main bind:this={page}>
    <canvas id="gameCanvas" width="800" height="600"></canvas>
    <div class="instructions">
        <h2>Instructions :</h2>
        <p>📜 Cliquez sur les créatures marines pour découvrir leurs liens avec les humains.</p>
        <p>💡 Utilisez les flèches pour naviguer dans l'océan !</p>
    </div>
</main>


<style>

    @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');


    main{
        background-image: url("https://i.pinimg.com/736x/43/e6/03/43e60317c7de579238530ad14b3777b9.jpg");
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
    }


    h1 {
        font-size: 2rem;
        color: #39CCCC;
        text-shadow: 2px 2px #001f3f;
    }

    .instructions {
        text-align: center;
        margin-top: 20px;
    }

    canvas {
        display: block;
        margin: 0 auto;
        background: linear-gradient(to bottom, #0074D9, #001f3f);
        border: 4px solid #39CCCC;
        image-rendering: pixelated;
    }



</style>