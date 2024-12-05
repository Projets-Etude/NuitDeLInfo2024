<!--<script>
    import {onMount} from "svelte";

    let wave;
    onMount( () => {
        let height = 0;
        for (const child of wave.children) {
            height += parseInt(child.getAttribute("height"));
            child.style.top = `-${height}px`;
        }
    })
</script>-->

<div id="sky">
    <!--Waves Container-->
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
    <!--Waves end-->
</div>

<div>
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
    .waves {
        bottom: 0;
        position: absolute;
        width: 100%;
        height:10vw;
        margin-bottom:-7px; /*Fix for safari gap*/
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
</style>