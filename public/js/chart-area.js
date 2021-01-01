// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily =
    '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = "#292b2c";
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", loadChartArea);
} else {
    loadChartArea();
}
async function loadChartArea() {
    var dates = await fetch("/api/statistics/days", {
        method: "GET",
    }).then((res) => res.json());
    dates = Object.entries(dates);
    var Labels = dates.map((month) => {
        return month[1].label;
    });
    var Values = dates.map((month) => {
        return month[1].total;
    });
    updateChartArea(Labels, Values);
}
async function loadChartBar() {
    var months = await fetch("/api/statistics/months", {
        method: "GET",
    }).then((res) => res.json());
    months = Object.entries(months);
    var Labels = months.map((month) => {
        return month[1].label;
    });
    var Values = months.map((month) => {
        return month[1].total;
    });
    console.log(Labels, Values);
    updateChartBar(Labels, Values);
}
function updateChartArea(Labels, Values) {
    var ctx = document.getElementById("myAreaChart");
    var myLineChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: Labels,
            datasets: [
                {
                    label: "Income",
                    lineTension: 0.3,
                    backgroundColor: "rgba(2,117,216,0.2)",
                    borderColor: "rgba(2,117,216,1)",
                    pointRadius: 5,
                    pointBackgroundColor: "rgba(2,117,216,1)",
                    pointBorderColor: "rgba(255,255,255,0.8)",
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "rgba(2,117,216,1)",
                    pointHitRadius: 50,
                    pointBorderWidth: 2,
                    data: Values,
                },
            ],
        },
        options: {
            scales: {
                xAxes: [
                    {
                        time: {
                            unit: "date",
                        },
                        gridLines: {
                            display: false,
                        },
                        ticks: {
                            maxTicksLimit: 30,
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
                            color: "rgba(0, 0, 0, .125)",
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
