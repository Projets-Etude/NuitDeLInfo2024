<script>

    let score = 0;

    function increment(){
        score++;
    }

</script>

<h1>Clicker - Score {score}</h1>

<div class="clicker-main">
    <div class="clicker-img">
        <div class="nageur" on:click={increment}>

        </div>
    </div>
</div>

<style>

div.clicker-main{
    display: flex;
    align-items: center;
}

div.clicker-img {
    width: 530px;
    height: 600px;
    background-image: url("$lib/clicker/ocean.avif");
}

div.nageur {
    width: 1327px;
    height: 391px;
    background-image: url("$lib/clicker/nageur.png");
}


</style>

