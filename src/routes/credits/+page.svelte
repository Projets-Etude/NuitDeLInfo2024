<script>
    import Card from "$lib/credits/Card.svelte";
    import { onDestroy, onMount } from "svelte";
    import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, BarController } from 'chart.js';

    Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, BarController);

    let darkMode = false;
    let chart;
    let contributors = [];
    const owner = "BaptisteCls";
    const repo = "HDFC";
    const token = "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";

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

    async function fetchCommits() {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits?since=2024-12-05T16:00:00Z&until=2024-12-06T09:00:00Z`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.ok) {
            const commits = await response.json();
            const hourlyCommits = new Array(24).fill(0);

            commits.forEach(commit => {
                const commitDate = new Date(commit.commit.author.date);
                const hour = commitDate.getUTCHours();
                hourlyCommits[hour] += 1;
            });

            renderChart(hourlyCommits);
        } else {
            console.error("Failed to fetch commits:", response.status);
        }
    }

    function renderChart(hourlyCommits) {
        const ctx = document.getElementById("commits-chart").getContext("2d");

        if (chart) {
            chart.destroy();
        }

        const labels = [
            '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00',
            '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00',
            '08:00', '09:00'
        ];

        const adjustedCommits = hourlyCommits.slice(16).concat(hourlyCommits.slice(0, 10));

        chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Commits par heure',
                    data: adjustedCommits,
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
                        },
                        ticks: {
                            stepSize: 1
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
        fetchCommits();
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

    h2 {
        color: white;
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