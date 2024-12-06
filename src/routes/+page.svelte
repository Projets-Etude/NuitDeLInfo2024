<script>
    let theme = "Et si l’Océan était un corps humain ?";
    let tagline = "Découvrez les parallèles fascinants entre le corps humain et les océans.";
    let stats = [
        { label: "Oxygène produit", value: "50%", description: "L’océan fournit plus de la moitié de l’oxygène que nous respirons." },
        { label: "Carbone absorbé", value: "25%", description: "L’océan absorbe une grande partie des émissions mondiales de CO₂." },
        { label: "Surface couverte", value: "70%", description: "L’océan couvre 70% de la surface de la Terre." }
    ];
</script>

<style>
    :root {
        --primary-blue: #0077b6;
        --secondary-blue: #00b4d8;
        --light-blue: #caf0f8;
        --white: #ffffff;
        --gray: #f1f1f1;
    }

    body {
        margin: 0;
        font-family: 'Arial', sans-serif;
        background: linear-gradient(to bottom, var(--light-blue), var(--primary-blue));
        color: var(--white);
    }

    main {
        max-width: 1200px;
        margin: 0 auto;
        padding: 1rem;
    }

    /* HERO SECTION */
    .hero {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 3rem;
        background: linear-gradient(145deg, var(--primary-blue), var(--secondary-blue));
        color: var(--white);
        border-radius: 15px;
        overflow: hidden;
        position: relative;
    }

    .hero::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        z-index: 0;
    }

    .hero h1,
    .hero h2 {
        z-index: 1;
        margin: 0.5rem;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        animation: fadeInDown 1.5s ease-out;
    }

    .hero p {
        z-index: 1;
        margin: 1rem 0;
        animation: fadeIn 2s ease-out;
    }

    .hero .cta a {
        display: inline-block;
        padding: 1rem 2rem;
        background: rgba(255, 255, 255, 0.2);
        color: var(--white);
        border: 2px solid var(--light-blue);
        border-radius: 25px;
        text-decoration: none;
        font-weight: bold;
        transition: all 0.3s ease;
        backdrop-filter: blur(5px);
        z-index: 1;
    }

    .hero .cta a:hover {
        background: rgba(255, 255, 255, 0.4);
        transform: scale(1.05);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    }

    /* FEATURES SECTION */
    .features, .stats, .solutions {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        padding: 2rem;
    }

    .feature, .stat {
        background: rgb(51, 102, 153);
        padding: 1.5rem;
        border-radius: 15px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        text-align: center;
        position: relative;
        transition: transform 0.3s, box-shadow 0.3s;
        backdrop-filter: blur(8px);
    }

    .feature:hover, .stat:hover {
        transform: translateY(-10px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    }

    .feature h3, .stat h3 {
        color: var(--light-blue);
        font-size: 1.5rem;
        margin: 1rem 0;
    }

    .feature p, .stat p {
        font-size: 1rem;
        color: var(--white);
    }

    /* ANIMATED BACKGROUND FOR FEATURES */
    .feature::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, rgba(0, 0, 0, 0.1), rgba(255, 255, 255, 0.05));
        opacity: 0;
        transition: opacity 0.3s;
        z-index: -1;
    }

    .feature:hover::after {
        opacity: 1;
    }

    /* CALL TO ACTION */
    .cta {
        text-align: center;
        padding: 2rem 0;
    }

    .cta a {
        display: inline-block;
        padding: 1rem 2.5rem;
        background: var(--secondary-blue);
        color: var(--white);
        border-radius: 25px;
        font-size: 1.2rem;
        font-weight: bold;
        text-decoration: none;
        transition: all 0.3s;
    }

    .cta a:hover {
        background: var(--light-blue);
        color: var(--primary-blue);
        transform: scale(1.1);
    }

    /* ANIMATIONS */
    @keyframes fadeInDown {
        from {
            opacity: 0;
            transform: translateY(-50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

</style>

<main>
    <!-- Section Hero -->
    <section class="hero">
        <h1>La Nuit de l’Info 2024</h1>
        <h2>{theme}</h2>
        <p>{tagline}</p>
        <div class="cta">
            <a href="#explore">Explorer les parallèles</a>
        </div>
    </section>

    <!-- Section About -->
    <section class="about">
        <h2>À propos de Race for Water</h2>
        <p>
            La Fondation Race for Water est dédiée à la préservation des océans depuis 2010.
            À travers ses Odyssées mondiales et son nouveau catamaran zéro émission, elle agit
            pour sensibiliser, partager et agir contre la pollution plastique et le changement climatique.
        </p>
        <p>
            En 2024, la Fondation lance une nouvelle mission axée sur les parallèles entre les océans et le changement climatique.
        </p>
    </section>

    <!-- Section Stats -->
    <section class="stats">
        <h2>Pourquoi protéger les océans</h2>
        {#each stats as { label, value, description }}
            <div class="stat">
                <h3>{label}</h3>
                <p><strong>{value}</strong></p>
                <p>{description}</p>
            </div>
        {/each}
    </section>

    <!-- Section Features -->
    <section class="features" id="explore">
        <h2>Les Parallèles entre le corps humain et l’Océan</h2>
        <div class="feature">
            <h3>Le Cœur</h3>
            <p>Les courants marins fonctionnent comme le système circulatoire.</p>
        </div>
        <div class="feature">
            <h3>Les Poumons</h3>
            <p>L’océan agit comme des poumons pour la planète grâce à la photosynthèse.</p>
        </div>
        <div class="feature">
            <h3>Les Nutriments</h3>
            <p>Plancton et récifs coralliens jouent des rôles vitaux similaires aux nutriments dans le corps.</p>
        </div>
        <div class="feature">
            <h3>La Peau</h3>
            <p>La surface de l’océan, comme la peau, régule les échanges et protège les couches profondes.</p>
        </div>
    </section>

    <!-- Section Solutions -->
    <section class="solutions">
        <h2>Nos Solutions</h2>
        <p>
            Grâce à des technologies innovantes comme le MODX 70 et des programmes éducatifs,
            la Fondation Race for Water vise à décarboner le transport maritime et à promouvoir des actions locales
            pour empêcher les plastiques d'atteindre les cours d'eau.
        </p>
        <div class="cta">
            <a href="https://www.raceforwater.org/en">En savoir plus</a>
        </div>
    </section>

</main>
