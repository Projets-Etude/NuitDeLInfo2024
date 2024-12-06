<script>
    import Salut from "$lib/exemple/Salut.svelte";

    const title = "exemple";
    let i = 0;

    function incr() {
        i++;
    }
</script>

<h1>Page {title}</h1>
<button on:click={incr}>{i} clicks</button>
<Salut/>

<style>
    h1{
        color: aqua;
    }
</style>