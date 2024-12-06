<script>
    import GameScene from "$lib/captcha-game/model/GameScene";

    let canvasElement;
    let scoreElement;
    let game;

    function initializeGame() {
        if (!game) {
            game = new GameScene(canvasElement, scoreElement);
            game.initialize();
        }
    }

    function handleStop() {
        if (game) {
            game.stop();
            game = undefined;
        }
    }

</script>

<div class="global">
    <section class="captcha-content">
        <h1>Captcha</h1>
        <p class="captcha-score" bind:this={scoreElement}>Score: ?</p>
        <canvas class="captcha-canvas" bind:this={canvasElement}></canvas>
        <button on:click={initializeGame}>Launch game</button>
        <button on:click={handleStop}>Stop game</button>
    </section>
</div>

<style>
    .global {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100svh;
        width: 100svw;
    }

    .global .captcha-content {
        border-radius: 3em;
        background-color: gray;
        text-align: center;
        height: 75%;
        width: 75%;
    }

    .captcha-canvas {
        width: calc(100% - 2em);
        height: calc(80% - 1em);
        margin: 1em;
        border-radius: 2em;
        background-color: white;
    }
</style>