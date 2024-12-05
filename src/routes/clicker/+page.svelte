<script>

    import { onMount } from 'svelte';

    let score = 0;

    function increment(){
        score++;
    }

    function randomMovement(link) {
        link.style.transform = `rotate(${(Math.random() - 0.2) * 6}deg) translate(${(Math.random() - 0.2) * 2}px, ${(Math.random() - 0.2) * 2}px)`;
    }

    onMount(() => {
        document.querySelectorAll('button.nageur').forEach(link => {
            setInterval(() => randomMovement(link), 300);
        });
    });

</script>

<h1>Clicker - Score {score}</h1>

<div class="clicker-main">
    <div class="clicker-img">
        <button type="button" class="nageur" on:click={increment}>
        </button>
    </div>
</div>

<style>

div.clicker-main{
    display: flex;
    align-items: center;
}

div.clicker-img {
    width: 80vw;
    height: 40vw;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 100%;
    background-image: url("$lib/clicker/ocean.avif");
}

button.nageur {
    width: 20%;
    height: 20%;
    background-image: url("$lib/clicker/nageur.png");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100%;
    background-color: rgba(255, 255, 255, 0);
    border: 0;
    transition: 0.2s;
}


</style>

