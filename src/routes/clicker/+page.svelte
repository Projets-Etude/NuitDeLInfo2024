<script>

    import { onMount } from 'svelte';


    let nageurLeft = 0;
    let nageurTop = 0;

    let time = 5;

    let clickerContainer;
    let nageur;

    let buyContainer;
    let notBuyContainer;

    let score = 0;

    const upgrades = new Map();
    upgrades.set("double", {upgradeLevel: 0, upgradePrice: 30})



    function increment(){
        moveNageur();
        time= 5;
        score += Math.pow(2, upgrades.get("double").upgradeLevel);
    }

    function buyUpgrade(upgradeName) {
        console.log(upgradeName);
        let up = upgrades.get(upgradeName);
        if(score > up.upgradePrice){
            score -= up.upgradePrice;
            up.upgradeLevel++;
            priceCalculator(upgradeName);
            buyContainer.style.display = "block";
            setTimeout(() => {
                buyContainer.style.display = "none";
            }, 5000)
        }else {

            notBuyContainer.style.display = "block";
            setTimeout(() => {
                notBuyContainer.style.display = "none";
            }, 5000)
        }

    }


    function priceCalculator(upgradeNumber) {
        let up = upgrades.get(upgradeNumber);

        up.upgradePrice = Math.pow(2, up.upgradeLevel)*(up.upgradePrice);
    }


    function randomMovement(link) {
        link.style.transform = `rotate(${(Math.random() - 0.2) * 6}deg) translate(${(Math.random() - 0.2) * 2}px, ${(Math.random() - 0.2) * 2}px)`;
    }

    onMount(() => {
        document.querySelectorAll('button.nageur').forEach(link => {
            setInterval(() => randomMovement(link), 300);
        });
    });

    setInterval(() => {
        time--;
        if(time == 0) {
            score = 0;
            time=5;
        }
    }, 1000)

    function moveNageur() {

        nageurTop = Math.abs(Math.random() * (clickerContainer.offsetHeight/2) +  (clickerContainer.offsetHeight/2) - nageur.offsetHeight);
        console.log(nageurTop);
        nageurLeft =Math.abs((Math.random() * clickerContainer.offsetWidth) - nageur.offsetWidth);


    }

</script>

<div>

    <h1>Clicker - Score {score} - Temps restants avant reset {time}</h1>

        {#each upgrades.keys() as upgrade}
            <button type="button" class="{upgrade}" on:click={() => buyUpgrade(upgrade)}>
                {upgrade}
            </button>
        {/each}
</div>


    <div class="clicker-main">
        <div bind:this={clickerContainer} class="clicker-img">
            <button bind:this={nageur} style="left: {nageurLeft}px; top: {nageurTop}px;" type="button" class="nageur" on:click={increment}>
            </button>

            <div bind:this={notBuyContainer} class="buy-upgrade-cancel">
                <p>Vous n'avez pas assez de coins</p>
            </div>
            <div bind:this={buyContainer} class="buy-upgrade-success">
                <p>Vous avez acheté l'upgrade</p>
            </div>

        </div>
    </div>



<style>

div.clicker-main{
    margin-top: 2vw;
    display: flex;
    align-items: center;
    justify-content: center;
}

div.Ameliorations-buttons{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    text-align: center;
    width: 100%;
}

div.Ameliorations-buttons>button{
    padding: 0.5rem;
    border: none;
    border-radius: 0.2rem;
    background-color: #2f4858;
    color: white;
}

div.clicker-img {
    width: 75vw;
    height: 35vw;
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

button.nageur:hover {
    scale: 1.3;
}

div.buy-upgrade-cancel {
    display: none;
}

div.buy-upgrade-success {
    display: none;
}


</style>

