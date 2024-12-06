<script>

    import { onMount } from 'svelte';
    import {goto} from '$app/navigation';

    let startPopUP;

    let nageurLeft = 250;
    let nageurTop = 250;

    let time = 5;

    let clickerContainer;
    let nageur;

    let buyContainer;
    let notBuyContainer;

    let score = 0;

    let scorePerSeconds = 0;

    let inversed = false;


    const upgrades = new Map();
    upgrades.set("double", {upgradeLevel: 0, upgradePrice: 0})
    upgrades.set("Auto 1", {upgradeLevel: 0, upgradePrice: 0, incrementValue: 1})
    upgrades.set("Auto 2", {upgradeLevel: 0, upgradePrice: 0, incrementValue: 5})
    upgrades.set("Auto 3", {upgradeLevel: 0, upgradePrice: 0, incrementValue: 10})




    function increment(){
        moveNageur();
        time= 5;
        if(inversed) {
            score -= Math.pow(2, upgrades.get("double").upgradeLevel);
        }else {
            score += Math.pow(2, upgrades.get("double").upgradeLevel);
        }

        // 1 chance sur 100 d'inverser pendant 20 secondes:

        if((Math.random() * 100) < 1) {
            inversed = true;
            setTimeout(() => {
                inversed = false;
            }, 20000);
        }

    }

    function buyUpgrade(upgradeName) {
        console.log(upgradeName);
        let up = upgrades.get(upgradeName);
        if(score > up.upgradePrice){
            score -= up.upgradePrice;
            up.upgradeLevel++;
            priceCalculator(upgradeName);
            buyContainer.style.display = "flex";
            setTimeout(() => {
                buyContainer.style.display = "none";
            }, 5000)
        }else {

            notBuyContainer.style.display = "flex";
            setTimeout(() => {
                notBuyContainer.style.display = "none";
            }, 5000)
        }

    }

    function automatic() {
        let total = 0
        upgrades.keys().forEach(key => {
            if(key.includes("Auto")) {
                total += upgrades.get(key).upgradeLevel*upgrades.get(key).incrementValue;
            }

        });
        scorePerSeconds = total;
        score +=total;
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
        automatic();
    }, 1000)

    function moveNageur() {

        nageurTop = Math.abs(Math.random() * (clickerContainer.offsetHeight/2) +  (clickerContainer.offsetHeight/2) - nageur.offsetHeight);
        console.log(nageurTop);
        nageurLeft =Math.abs((Math.random() * clickerContainer.offsetWidth) - nageur.offsetWidth);


    }


    function closePopUP() {
        startPopUP.style.display="none";
    }

    function redirectHome() {
        goto("/")
    }

</script>



<div class="Clicker">


    <div class="stats">
        <a> {score} <img src="./clicker/points.png"> </a>
        <a> Mode inversé : {inversed}</a>
        <a> {scorePerSeconds} <img src="./clicker/points.png">/ seconde </a>
    </div>
    <h1>Temps restants avant reset {time}</h1>


    <nav class="nav-area">
        <ul class="menu">
            <li><a on:mouseover={redirectHome} href="#">Accueil</a></li>
            <li><a href="#">À propos</a>
                <ul>
                    <li><a href="#">Paramètres</a></li>
                    <li><a href="#">Contact</a></li>
                    <li><a href="#">Améliorations</a>
                </ul>
            </li>
            <li><a href="#">Services</a>
                <ul>
                    <li><a href="#">Paramètres</a></li>
                    <li><a href="#">Contact</a></li>
                    <li><a href="#">Améliorations</a>
                        <ul>
                            <li><a href="#">Upgrade</a></li>
                            <li><a href="#">Mise à jour</a></li>
                            <li><a href="#">Progression</a></li>
                            <li><a href="#">Bonification</a>
                                <ul>
                                    {#each upgrades.keys() as upgrade}
                                        <li><a href="#">{upgrade}</a>
                                            <ul>
                                                <li><a href="#">Appliquer</a></li>
                                                <li><a href="#">Valider</a></li>
                                                <li><a href="#">Confirmer</a></li>
                                                <li><a href="#" on:click={() => buyUpgrade(upgrade)}>Confirmer</a></li>
                                            </ul>
                                        </li>
                                    {/each}
                                </ul>
                            </li>
                            <li><a href="#">Correction</a></li>
                        </ul>
                    </li>
                    <li><a href="#">Service Five</a></li>
                </ul>
            </li>
            <li><a href="#">Clicker</a>
                <ul>
                    <li><a href="#">Paramètres</a></li>
                    <li><a href="#">Contact</a></li>
                    <li><a href="#">Améliorations</a>
                </ul>
            </li>
        </ul>
    </nav>

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



    <div bind:this={startPopUP} class="pop-up">
        <h1>Présentation du jeu</h1>
        <p>
            Clicker en Dark Pattern
            Objectif : rendre le clicker le plus injouable possible, tout en restant jouable <br>
            - Prix des upgrades non connu <br>
            - Aucune description sur le fonctionnement des upgrades <br>
            - L'endroit ou cliquer qui se déplace en permanence <br>
            - Un mode inversé qui décremente le score plutot que de l'incrementer <br>
            - Les améliorations cachés dans des sous-menus interminable
            - Un reset du score apres 5 secondes d'inactivités <br>
            - Et quelques autres détails... <br>

        </p>
        <button on:click={closePopUP}>close</button>
    </div>

</div>

<style>

div.Clicker{
    background-color: #86bbd8;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
}

div.clicker-main{
    margin-top: 2vw;
    display: flex;
    align-items: center;
    justify-content: center;
}

div.clicker-img {
    width: 75vw;
    height: 30vw;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 100%;
    background-image: url("$lib/clicker/ocean.avif");
    border: 0.3rem solid #336699;
    border-radius: 0.5rem;
    margin-bottom: 5rem;
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

a{
    font-size: 12px;
    text-transform: uppercase;
}
.nav-area{
    background: #262626;
}
.nav-area:after{
    content: '';
    clear: both;
    display: block;
}
.nav-area ul{
    list-style: none;
    margin: 0;
}
.menu {
    width: 500px;
    margin: 0 auto !important;
}
.nav-area > ul > li{
    float: left;
    position: relative;
}
.nav-area ul li a {
    text-decoration: none;
    color: #fff;
    padding: 15px 20px;
    display: block;
    font-weight: 500;
    letter-spacing: 1px;
}
.nav-area ul li:hover a{
    background: #34495e;
}

.nav-area ul ul {
    position: absolute;
    padding: 0;
    min-width: 160px;
    display: none;
    top: 100%;
    left: 0;
    box-shadow: 0 3px 15px rgba(0,0,0,0.5);
}
.nav-area ul li:hover > ul{
    display: block;
}
.nav-area ul ul li:hover a{
    background: #262626;
}
.nav-area ul ul li{
    position: relative;
}
.nav-area ul ul ul{
    top: 0;
    left: 100%;
}
.nav-area ul ul ul li:hover a{
    background: #34495e;
}

div.pop-up {
    position: absolute;
    text-align: center;
    width: 50%;
    height: 40%;
    background-color: #DAF7DC;

}

div.pop-up button {
    background-color: #2F4858;
    color: white;
    border-radius: 30px;
}
div.stats a {
    display: flex;
    justify-content: left;
    align-items: center;
    color: white;
    font-family: 'Inter';
}

div.stats a img {
    width: 10%;
    height: auto;
}

</style>

