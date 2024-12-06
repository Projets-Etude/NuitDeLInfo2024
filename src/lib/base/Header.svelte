<script>
    import { createEventDispatcher  } from 'svelte';
    const eventDispatcher = createEventDispatcher();

    let navIcon;
    let rotate = 0;

    function toggleNavigation() {
        navIcon.classList.toggle('fa-ship');
        navIcon.classList.toggle('fa-xmark');
        rotate = rotate ? 0 : 90;
        navIcon.style.transform = `rotate(${rotate}deg)`;
        eventDispatcher('navigation-button-clicked');
    }
</script>

<header>
    <div class="container">
        <img src="logo.png" alt="Logo">
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <button on:click={toggleNavigation} class="nav"><i bind:this={navIcon} class="fa-solid fa-ship"></i></button>
        <img class="transparent" src="logo.png" alt="Logo">
    </div>
</header>

<style>
    header{
        background-color: #336699;
        width: 100vw;
        height: 70px;
        display: flex;
        justify-content: center;
        z-index: 100;
    }
    .container{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100%;
        width: 95%;
    }
    img{
        height: 80%;
    }
    .transparent{
        opacity: 0;
    }
    .nav{
        font-size: 35px;
        color: white;
        background: none;
        border: none;
        cursor: pointer;
        transition: all ease-in-out .2s;
    }
    .nav:hover{
        transform: translateY(-3px);
        filter: drop-shadow(0px 0px 5px #92b194);
    }
    .nav i{
        transition: all ease-in-out .1s;
    }
</style>