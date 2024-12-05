<script>
    import Header from "$lib/base/Header.svelte";
    import Naviagation from "$lib/base/Naviagation.svelte";

    let navigation;
    function toggleNavigation() {navigation?.toggleNavigation() }
</script>

<Header on:navigation-button-clicked={toggleNavigation} />
<Naviagation bind:this={navigation} />
<slot/>