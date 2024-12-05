<script>
    export let name;
    export let avatar;
    export let contributions;
</script>

<div class="card">
    <img class="avatar" src={avatar} alt="{name}'s Avatar" />
    <h3>{name}</h3>
    <p>Contributions: {contributions}</p>
</div>

<style>
    .card {
        background-color: white;
        border-radius: 10px;
        padding: 20px;
        margin: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        width: 200px;
        text-align: center;
        transition: transform 0.3s ease;
    }

    .card:hover {
        transform: scale(1.05);
    }

    .avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        object-fit: cover;
        margin-bottom: 15px;
    }

    h3 {
        margin: 0;
        font-size: 1.2rem;
    }

    p {
        color: #555;
    }
</style>