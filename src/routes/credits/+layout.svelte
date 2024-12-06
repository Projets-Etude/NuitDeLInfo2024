<script>
    import {onMount} from "svelte";

    // Initialisation au chargement de la page
    onMount(() => {
        const darkMode = sessionStorage.getItem('darkMode') === 'true';
        updateMode(darkMode);
    });

    // Bascule entre le mode clair et sombre
    function switchMode() {
        const darkMode = sessionStorage.getItem('darkMode') === 'true';
        sessionStorage.setItem('darkMode', !darkMode); // Inverse l'état actuel
        updateMode(!darkMode);
    }

    // Met à jour l'apparence en fonction du mode
    function updateMode(isDark) {
        const sky = document.getElementById('sky');
        if (isDark) {
            sky.classList.add('dark');
        } else {
            sky.classList.remove('dark');
        }
    }

    onMount(() => {
        if(sessionStorage.getItem('darkMode') === 'true'){
            updateMode(sessionStorage.getItem('darkMode'));
        }
    });
</script>

<div id="sky">
    <button class="toggle-button" on:click={switchMode}>
        <span></span>
    </button>

    <div>
        <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
             viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
            <defs>
                <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
            </defs>
            <g class="parallax">
                <use xlink:href="#gentle-wave" x="48" y="-1" fill="#336699" />
                <use xlink:href="#gentle-wave" x="48" y="2" fill="#86BBD8" />
                <use xlink:href="#gentle-wave" x="48" y="7" fill="#2F4858" />
            </g>
        </svg>
    </div>
</div>

<div class="container">
    <slot/>
</div>

<style>
    :global(body) {
        height: 500vh;
        width: 1440px;
        background:  linear-gradient(180deg, #2F4858 10%, #0A1013 68%);
        margin: 0;
        padding: 0;
    }

    #sky{
        width: 100vw;
        position: relative;
        background-color: #daf7dc;
        height: 20vw;
    }

    #sky.dark {
        background-color: #333333;
    }

    .toggle-button:hover {
        cursor: pointer;
        background-color: #ff8800;
        box-shadow: 6px 6px rgb(255, 153, 0);
    }

    .toggle-button{
        position: absolute;
        height: 20vw;
        width: 20vw;
        top: -12vw;
        left: -10vw;
        background-color: #ffd900;
        border-radius: 50%;
        border: none;
        display: inline-block;
        transition-duration: 0.4s;
    }

    .waves {
        bottom: 0;
        position: absolute;
        width: 100%;
        height:10vw;
        margin-bottom:-7px;
    }

    .container {
        padding: 20px;
        width: 80vw;
        height: 80vh;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
    }

    .parallax > use {
        animation: move-forever 25s cubic-bezier(.55,.5,.45,.5)     infinite;
    }
    .parallax > use:nth-child(1) {
        animation-delay: -30s;
        animation-duration: 50s;
    }
    .parallax > use:nth-child(2) {
        animation-delay: -10s;
        animation-duration: 30s;
    }
    .parallax > use:nth-child(3) {
        animation-duration: 20s;
    }
    @keyframes move-forever {
        0% {
            transform: translate3d(-90px,0,0);
        }
        100% {
            transform: translate3d(85px,0,0);
        }
    }
    @media (max-width: 768px) {
        .container {
            display: flex;
            flex-direction: column;
        }
    }
</style>