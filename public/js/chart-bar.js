if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", loadChartBar);
} else {
    loadChartBar();
}

function updateChartBar(Labels, Values) {
    var ctx = document.getElementById("myBarChart");
    var myLineChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: Labels,
            datasets: [
                {
                    label: "Revenue",
                    backgroundColor: "rgba(2,117,216,1)",
                    borderColor: "rgba(2,117,216,1)",
                    data: Values,
                },
            ],
        },
        options: {
            scales: {
                xAxes: [
                    {
                        time: {
                            unit: "month",
                        },
                        gridLines: {
                            display: false,
                        },
                        ticks: {
                            maxTicksLimit: 12,
                        },
                    },
                ],
                yAxes: [
                    {
                        ticks: {
                            min: 0,
                            max: Math.max(...Values) * 1.25,
                            maxTicksLimit: 5,
                        },
                        gridLines: {
                            display: true,
                        },
                    },
                ],
            },
            legend: {
                display: false,
            },
        },
    });
}
