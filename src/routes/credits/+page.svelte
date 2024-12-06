<script>
    import Card from "$lib/credits/Card.svelte";
    import { onDestroy, onMount } from "svelte";
    import { Octokit } from "@octokit/core";
    import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, BarController } from 'chart.js';

    Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, BarController);

    let darkMode = false;
    let chart;
    let contributors = [];
    let punchCardData = [];
    const owner = "BaptisteCls";
    const repo = "HDFC";
    const token = "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";

    const octokit = new Octokit({ auth: token });

    async function fetchContributors() {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contributors`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        if (response.ok) {
            contributors = await response.json();
        } else {
            console.error("Failed to fetch contributors:", response.status);
        }
    }

    async function fetchCommitPunchCard() {
        try {
            const response = await octokit.request('GET /repos/{owner}/{repo}/stats/punch_card', {
                owner,
                repo,
                headers: { 'X-GitHub-Api-Version': '2022-11-28' }
            });

            punchCardData = response.data;
            renderChart();
        } catch (error) {
            console.error("Error fetching punch card:", error);
        }
    }

    function renderChart() {
        const ctx = document.getElementById("commits-chart").getContext("2d");
        const hourlyCommits = new Array(24).fill(0);
        punchCardData.forEach(([day, hour, commits]) => {
            hourlyCommits[hour] += commits;
        });
        chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
                datasets: [{
                    label: 'Commits par heure',
                    data: hourlyCommits,
                    backgroundColor: darkMode ? 'rgba(240, 240, 240, 0.6)' : 'rgba(51, 102, 153, 0.6)',
                    borderColor: darkMode ? 'rgba(240, 240, 240, 1)' : 'rgba(51, 102, 153, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Heure',
                            color: darkMode ? 'white' : 'black'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Nombre de commits',
                            color: darkMode ? 'white' : 'black'
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: darkMode ? 'white' : 'black'
                        }
                    }
                }
            }
        });
    }

    onMount(() => {
        fetchContributors();
        fetchCommitPunchCard();
    });

    onDestroy(() => {
        if (chart) {
            chart.destroy();
        }
    });
</script>

<div class="contributors-container" class:dark-mode={darkMode}>
    {#each contributors as contributor}
        <Card
                name={contributor.login}
                avatar={contributor.avatar_url}
                contributions={contributor.contributions}
        />
    {/each}
</div>

<div class="chart-container" class:dark-mode={darkMode}>
    <h2>Historique des commits</h2>
    <canvas id="commits-chart" width="400" height="200"></canvas>
</div>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
        color: #333;
        transition: background-color 0.3s, color 0.3s;
    }

    .contributors-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        padding: 20px;
    }

    .chart-container {
        text-align: center;
        margin: auto;
        width: 50vw;
        min-width: 200px;
    }

    canvas {
        background-color: #fff;
        border-radius: 10px;
    }
</style>