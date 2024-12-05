<div class="background">
    <slot/>
</div>

<style>
    :global(body) { margin: 0; padding: 0; }
    .background {
        background: rgb(134,187,216);
        background: linear-gradient(180deg, rgba(134,187,216,1) 0%, rgba(93,145,185,1) 35%, rgba(51,102,153,1) 100%);
        min-height: 100vh;
        display: flex;
        flex-direction: column;
    }
</style>