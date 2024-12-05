<header>
    <div class="container">
        <img src="logo.png" alt="Logo">
        <!-- svelte-ignore a11y_consider_explicit_label -->
        <button class="nav"><i class="fa-solid fa-ship"></i></button>
        <img class="transparent" src="logo.png" alt="Logo">
    </div>
</header>

<style>
    header{
        background-color: #336699;
        width: 100%;
        height: 70px;
        display: flex;
        justify-content: center;
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
</style>