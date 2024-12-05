<script>
    import Blur from "./Blur.svelte";

    let nav;
    let isClosed = true;

    export function toggleNavigation() {
        isClosed = !isClosed;
        if(!nav) return;
        const transition = nav.style.transition;
        nav.style.transition = 'all ease-in-out .2s';
        
        nav.style.transform = isClosed ?
            'rotate(-160deg) scale(0)' :
            'rotate(0deg) scale(1)';
        setTimeout(() => nav.style.transition = transition, 200);
    }


</script>

<nav class="content" bind:this={nav}>
    <div class="menu"></div>
    <div class="circle-menu">
      <div class="center">
        <span><i class="fa-solid fa-ship"></i></span>
      </div>
      <ul>
        <li><a href="#"><i class="fa-solid fa-ship"></i></a></li>
        <li><a href="#"></a></li>
        <li><a href="#"></a></li>
        <li><a href="#"></a></li>
        <li><a href="#"></a></li>
        <li><a href="#"></a></li>
      </ul>
    </div>
</nav>
{#if !isClosed}
    <Blur />
{/if}

<style>
nav{
    position: fixed;
    top: calc(50svh - 200px);
    left: calc(50vw - 200px);
    transform: rotate(160deg) scale(0);
    z-index: 100;
}
.circle-menu {
    position: relative;
    width: 400px;
    height: 400px;
    margin: 0px auto;
}

.circle-menu span {
    position: absolute;
    top: 30px;
    left: 24px;
    color: #fff;
}

.circle-menu ul {
    position: absolute;
    width: 300px;
    height: 300px;
    margin: 50px;
    padding: 0;
    list-style: none;
    border-radius: 50%;
    overflow: hidden;
}

.circle-menu .center{
    position: absolute;
    width: 75px;
    height: 75px;
    top: 162px;
    left: 162px;
    z-index: 1;
    border-radius: 50%;
    background-color: #003C5A;
    background-image:
      linear-gradient(0deg, transparent 50%,
        #004669 51%,
        #004669 52%,
        transparent 53%, transparent 97%,
        #004669 98%,
        #004669 99%,
        transparent 100%, transparent),
      linear-gradient(45deg, transparent 24%,
        #004669 25%,
        #004669 26%,
        transparent 27%, transparent 74%,
        #004669 75%,
        #004669 76%,
        transparent 77%, transparent),
      linear-gradient(-45deg, transparent 24%,
        #004669 25%,
        #004669 26%,
        transparent 27%, transparent 74%,
        #004669 75%,
        #004669 76%,
        transparent 77%, transparent);
    background-size: 35px 35px;
    background-position: 23px 13px;
    display: flex;
    justify-content: center;
}

.circle-menu .center span{
    margin-top: -5px;
    font-size: 25px;
}

.circle-menu li {
    position: absolute;
    top: -10px;
    left: -10px; 
    width: 160px;
    height: 160px;
    transform-origin: 100% 100%;
    overflow: hidden;
}

.circle-menu li:nth-child(1) {
    transform: rotate(0deg) skew(30deg);
}

.circle-menu li:nth-child(2) {
     transform: rotate(60deg) skew(30deg);
}

.circle-menu li:nth-child(3) {
     transform: rotate(120deg) skew(30deg);
}

.circle-menu li:nth-child(4) {
     transform: rotate(180deg) skew(30deg);
}

.circle-menu li:nth-child(5) {
     transform: rotate(240deg) skew(30deg);
}

.circle-menu li:nth-child(6) {
     transform: rotate(300deg) skew(30deg);
}

.circle-menu li a{
    display: block;
    width: 160px;
    height: 160px;
    margin-top: 40px;
    margin-left: 40px;
    background: rgba(100, 100, 100, 0.3) url('https://htmlacademy.ru/assets/icons/monitor-4x.png') no-repeat 50% 40%;
    transform: skew(-30deg) rotate(-60deg);
    transition: background-color 0.5s;
}

.circle-menu li:nth-child(even) a {
    background-color: rgba(100, 100, 100, 0.8);
}

.circle-menu li a:hover {
    background-color: rgba(100, 100, 100, 0);
}

.circle-menu li:nth-child(2) a {
    background-image: url('https://htmlacademy.ru/assets/icons/aperture-4x.png');
}
.circle-menu li:nth-child(3) a {
    background-image: url('https://htmlacademy.ru/assets/icons/audio-4x.png');
}
.circle-menu li:nth-child(4) a {
    background-image: url('https://htmlacademy.ru/assets/icons/battery-empty-4x.png');
}
.circle-menu li:nth-child(5) a {
    background-image: url('https://htmlacademy.ru/assets/icons/bluetooth-4x.png');
}
.circle-menu li:nth-child(6) a {
    background-image: url('https://htmlacademy.ru/assets/icons/browser-4x.png');
}
</style>