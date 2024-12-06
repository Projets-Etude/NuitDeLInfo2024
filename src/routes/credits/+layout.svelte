<script>
    import { onMount } from "svelte";

    let darkMode = false;
    let dots = [];


    onMount(() => {
        darkMode = sessionStorage.getItem("darkMode") === "true";
        generateDots();
    });


    function switchMode() {
        darkMode = !darkMode;
        sessionStorage.setItem("darkMode", darkMode);
        generateDots();
    }


    function generateDots() {
        dots = [];
        const numberOfDots = 100;
        for (let i = 0; i < numberOfDots; i++) {
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const size = Math.random() * 2 + 2;
            dots.push({ x, y, size });
        }
    }
</script>

<div id="sky" class:dark={darkMode}>
    {#if darkMode}
    <div class="dots">
        {#each dots as dot (dot.x)}
            <div
                    class="dot"
                    style="top: {dot.y}%; left: {dot.x}%; width: {dot.size}px; height: {dot.size}px;"
            ></div>
        {/each}
    </div>
    {/if}

    <button class:dark={darkMode} aria-label="Switch mode" on:click={switchMode}>
        <span class="buttonMode"></span>
    </button>

    <div>
        <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
             viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
            <defs>
                <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
            </defs>
            <g class="parallax" class:dark={darkMode}>
                <use xlink:href="#gentle-wave" x="48" y="-1" />
                <use xlink:href="#gentle-wave" x="48" y="2" />
                <use xlink:href="#gentle-wave" x="48" y="7" />
            </g>
        </svg>
    </div>
</div>

<div class="container">
    <h1>Chef d'équipe</h1>
    <h3>Hugo Desmons</h3><br>

    <h1>Section accueil</h1>
    <h3>Hugo Desmons</h3><br>

    <h1>Jeu retroSea</h1>
    <h3>Thomas Guislin</h3><br>

    <h1>Jeu clicker</h1>
    <h3>Hugo Debuyser</h3>
    <h3>Matias Mennecart</h3><br>

    <h1>Page crédits</h1>
    <h3>Dylan Lecocq</h3>
    <h3>Camille Okubo</h3><br>

    <h1>Footer et header</h1>
    <h3>Baptiste Collesson</h3><br>

    <h1>Captcha</h1>
    <h3>Antoine Pourtchie</h3>

    <slot />
</div>

<style>
    :global(body) {
        height: 500vh;
        margin: 0;
        padding: 0;
    }

    #sky {
        width: 100vw;
        position: relative;
        background-color: #daf7dc;
        height: 20vw;
        transition: background-color 0.5s ease-in-out;
        z-index: 5;
    }
    #sky.dark {
        background: #333333;
    }

    .dots {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100%;
        pointer-events: none;
        z-index: 0;
    }

    .dot {
        position: absolute;
        background-color: white;
        border-radius: 50%;
        opacity: 0.6;
        animation: move-dots 10s infinite linear;
        transition: transform 0.3s ease;
    }

    @keyframes move-dots {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.2);
        }
        100% {
            transform: scale(1);
        }
    }

    button {
        position: absolute;
        height: 20vw;
        width: 20vw;
        top: -12vw;
        left: -10vw;
        background-color: #ffd900;
        border-radius: 50%;
        border: none;
        display: inline-block;
        transition-duration: 1s;
        transition-timing-function: ease-in-out;
        z-index: 1;
    }

    button:hover {
        cursor: pointer;
        background-color: #ff8800;
        box-shadow: 6px 6px rgb(255, 153, 0);
    }

    #sky.dark button {
        position: absolute;
        height: 20vw;
        width: 20vw;
        top: -12vw;
        left: 90vw;
        background-color: white;
        border-radius: 50%;
        border: none;
        display: inline-block;
        transition-duration: 1s;
        transition-timing-function: ease-in-out;
    }

    #sky.dark button:hover {
        cursor: pointer;
        background-color: lightgrey;
        box-shadow: -6px 6px darkgrey;
    }

    .waves {
        bottom: 0;
        position: absolute;
        width: 100%;
        height: 10vw;
    }

    .container {
        padding: 20px;
        width: 80vw;
        height: 80vh;
        position: absolute;
        top: 40vw;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        color: white;
        z-index: 6;
    }

    .parallax > use {
        animation: move-forever 25s cubic-bezier(.55, .5, .45, .5) infinite;
    }

    .parallax > use:nth-child(1) {
        animation-delay: -30s;
        animation-duration: 50s;
        transition-duration: 0.4s;
        fill:#2F4858;
    }

    .parallax > use:nth-child(2) {
        animation-delay: -10s;
        animation-duration: 30s;
        transition-duration: 0.4s;
        fill:#336699;
    }

    .parallax > use:nth-child(3) {
        animation-duration: 20s;
        transition-duration: 0.4s;
        fill:#86BBD8;
    }

    .parallax.dark > use:nth-child(1){
        fill:#336699;
    }

    .parallax.dark > use:nth-child(2){
        fill:#86BBD8;
    }

    .parallax.dark > use:nth-child(3){
        fill:#2F4858;
    }

    @keyframes move-forever {
        0% {
            transform: translate3d(-90px, 0, 0);
        }
        100% {
            transform: translate3d(85px, 0, 0);
        }
    }

    @media (max-width: 768px) {
        .container {
            display: flex;
            flex-direction: column;
        }
    }
</style>