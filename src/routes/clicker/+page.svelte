<script>

    import { onMount } from 'svelte';


    let nageurLeft = 0;
    let nageurTop = 0;

    let clickerContainer;

    let score = 0;


    const upgrade = [
            {upgradeName: "double", upgradeLevel: 0, upgradePrice: 0},
        ]



    function increment(){
        moveNageur();
        score += Math.pow(2, upgrade[0].upgradeLevel);
    }

    function buyUpgrade(upgradeNumber) {

        let up = upgrade[upgradeNumber];
        if(score > up.upgradePrice){
            score -= up.upgradePrice;
            up.upgradeLevel++;
            priceCalculator(upgradeNumber);
        }

    }


    function priceCalculator(upgradeNumber) {
        //TODO calcul des prix du prochain niveau
    }


    function randomMovement(link) {
        link.style.transform = `rotate(${(Math.random() - 0.2) * 6}deg) translate(${(Math.random() - 0.2) * 2}px, ${(Math.random() - 0.2) * 2}px)`;
    }

    onMount(() => {
        document.querySelectorAll('button.nageur').forEach(link => {
            setInterval(() => randomMovement(link), 300);
        });
    });



    function moveNageur() {
        nageurTop = Math.random() * (clickerContainer.offsetTop/2.5) +  (clickerContainer.offsetTop/2.5);
        nageurLeft = Math.random() * 90;
    }

</script>

<h1>Clicker - Score {score}</h1>

<div class="clicker-main">
    <div bind:this={clickerContainer} class="clicker-img">
        <button style="left: {nageurLeft}%; top: {nageurTop}%;" type="button" class="nageur" on:click={increment}>
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
    position: relative;
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

