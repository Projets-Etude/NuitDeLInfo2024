<script>
    import Header from "$lib/base/Header.svelte";
    import Naviagation from "$lib/base/Naviagation.svelte";
    import Footer from "$lib/base/Footer.svelte";

    let navigation;
    function toggleNavigation() {navigation?.toggleNavigation() }
</script>

<Header on:navigation-button-clicked={toggleNavigation} />
<Naviagation bind:this={navigation} />
<div class="slot"><slot/></div>
<Footer />


<style>
    .slot{
        min-height: calc(100vh - 180px);
    }
</style>