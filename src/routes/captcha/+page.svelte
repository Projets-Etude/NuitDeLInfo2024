<script>
    import GameScene from "$lib/captcha-game/model/GameScene";

    let canvasElement;
    let scoreElement;
    let gameContentElement;
    let successElement;
    let failedElement;

    let game;

    function initializeGame() {
        if (game) {
            game.stop();
            game = undefined;
        }
        game = new GameScene(canvasElement, scoreElement, gameContentElement, successElement, failedElement);
    }

</script>

<div class="global">
    <section class="captcha-content">
        <h1>Captcha</h1>
        <div class="game" bind:this={gameContentElement}>
            <p class="captcha-score" bind:this={scoreElement}>Score: ?</p>
            <canvas class="captcha-canvas" bind:this={canvasElement}></canvas>
            <button on:click={initializeGame}>Launch game</button>
        </div>
        
        <div id="captcha-success" class="hidden" bind:this={successElement}>Vous avez réussi le captcha !</div>
        <button on:click={initializeGame} id="captcha-failure" class="hidden" bind:this={failedElement}>Échec du captcha, réessayez.</button>
    </section>
</div>

<style>
    .global {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background: linear-gradient(to bottom, #006994, #00a8cc);
        color: #ffffff;
        overflow: hidden;
        padding: 20px;
    }

    .captcha-content {
        width: 100%;
        max-width: 80%; /* Limite la taille max de .captcha-content */
        padding: 40px; /* Augmenter les marges internes */
        background: rgba(255, 255, 255, 0.1);
        border-radius: 15px;
        box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(10px);
        text-align: center;
        box-sizing: border-box;
    }

    .captcha-content h1 {
        font-size: 2.5rem;
        margin-bottom: 20px;
        color: #ffffff;
        text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
    }

    .captcha-score {
        font-size: 1.5rem;
        margin-bottom: 30px;
        color: #cce7ff;
    }

    .captcha-canvas {
        display: block;
        margin: 20px auto;
        width: 100%; /* 80% de la largeur de .captcha-content */
        height: 100%; /* 60% de la hauteur de .captcha-content */
        border: 3px solid #ffffff;
        border-radius: 10px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        background: rgba(255, 255, 255, 0.2);
        max-width: 100%; /* Assure que le canvas ne dépasse pas la largeur de son conteneur */
        max-height: 100%; /* Assure que le canvas ne dépasse pas la hauteur de son conteneur */
    }

    button {
        background: #00a8cc;
        color: #ffffff;
        border: none;
        padding: 15px 30px;
        font-size: 1.2rem;
        font-weight: bold;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.3s ease;
        margin: 15px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    }

    button:hover {
        background: #006994;
        box-shadow: 0 6px 10px rgba(0, 0, 0, 0.3);
        transform: scale(1.05);
    }

    button:active {
        background: #004d66;
        transform: scale(1);
    }

    #captcha-success, #captcha-failure {
        margin-top: 20px;
        font-size: 1.2rem;
        font-weight: bold;
        padding: 10px;
        border-radius: 10px;
    }

    #captcha-success {
        background: rgba(0, 255, 150, 0.2);
        color: #00ff99;
        border: 2px solid #00ff99;
        text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
    }

    #captcha-failure {
        background: rgba(255, 0, 0, 0.2);
        color: #ff6666;
        border: 2px solid #ff6666;
        text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
    }

    .hidden {
        display: none;
    }
</style>