if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", loadDrinkStatistic);
} else {
    loadDrinkStatistic();
}
async function loadDrinkStatistic() {
    await loadChartPie();
}
function updateReport(bestSaleName, bestSaleValue, TotalSaleValue) {
    const bestSale = document.getElementById("best-sale");

    const totalSale = document.getElementById("total-sale");
    bestSale.innerHTML = `${bestSaleName} (${bestSaleValue} sold)`;
    totalSale.innerHTML = `${TotalSaleValue} drinks`;
}
async function loadChartPie(labels, value) {
    var statistic = await fetch("/api/statistics/drinks", {
        method: "GET",
    }).then((res) => res.json());
    var arrayStatistic = [];
    for (let i = 0; i < statistic.productArray.length; i++) {
        arrayStatistic.push({
            name: statistic.productArray[i],
            sale: statistic.saleArray[i],
        });
    }
    if (statistic.productArray.length > 8) {
        var top7Array = arrayStatistic
            .sort((a, b) => b.sale - a.sale)
            .slice(0, 7);
        console.log(top7Array);
        var totalSale = arrayStatistic.reduce(function (a, b) {
            return { name: "", sale: a.sale + b.sale };
        }).sale;
        var top7Sale = top7Array.reduce(function (a, b) {
            return { name: "", sale: a.sale + b.sale };
        }).sale;
        top7Array.push({ name: "other", sale: totalSale - top7Sale });
        console.log(top7Array);

        statistic.productArray = [];
        statistic.saleArray = [];
        top7Array.forEach((tuple) => {
            statistic.productArray.push(tuple.name);
            statistic.saleArray.push(tuple.sale);
        });
        updateReport(
            statistic.productArray[0],
            statistic.saleArray[0],
            totalSale
        );
    } else {
        arrayStatistic = arrayStatistic.sort((a, b) => b.sale - a.sale);
        statistic.productArray = [];
        statistic.saleArray = [];
        arrayStatistic.forEach((tuple) => {
            statistic.productArray.push(tuple.name);
            statistic.saleArray.push(tuple.sale);
        });
    }
    updateChartPie(statistic.productArray, statistic.saleArray);
}
function updateChartPie(Labels, Values) {
    var colors = [
        "#003f5c",
        "#2f4b7c",
        "#665191",
        "#a05195",
        "#d45087",
        "#f95d6a",
        "#ff7c43",
        "#ffa600",
    ];
    var ctx = document.getElementById("myChartPie");
    var myPieChart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: Labels,
            datasets: [
                {
                    data: Values,
                    backgroundColor: colors,
                },
            ],
        },
        options: {
            legend: {
                position: "right",
            },
        },
    });
}
