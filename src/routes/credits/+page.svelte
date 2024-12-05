<script>
    import Credit from "$lib/credits/Credit.svelte";
    import { onMount } from "svelte";

    let contributors = [];

    const owner = "BaptisteCls";
    const repo = "HDFC";


    async function fetchContributors() {
        const token = "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";

        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contributors`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        if (response.ok) {
            contributors = await response.json();
        } else {
            console.error("Failed to fetch contributors:", response.status);
        }
    }

    onMount(() => {
        fetchContributors();
    });
</script>

<div class="contributors-container">
    {#each contributors as contributor}
        <Credit
                name={contributor.login}
                avatar={contributor.avatar_url}
                contributions={contributor.contributions}
        />
    {/each}
</div>

<style>
    .contributors-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        padding: 20px;
    }
</style>