document.addEventListener("DOMContentLoaded", function () {
    if (!weatherData || !weatherData.list) {
        console.error("No weather data available!");
        return;
    }

    const labels = [];
    const temps = [];

    for (let i = 0; i < weatherData.list.length; i += 8) {
        const entry = weatherData.list[i];
        labels.push(new Date(entry.dt * 1000).toLocaleDateString());
        temps.push(entry.main.temp);
    }

    const ctx = document.getElementById("weatherChart").getContext("2d");
    new Chart(ctx, {
        type: "line",
        data: {
            labels,
            datasets: [{
                label: "Temperature (°C)",
                data: temps,
                borderColor: "orange",
                backgroundColor: "rgba(255, 165, 0, 0.2)",
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
});

