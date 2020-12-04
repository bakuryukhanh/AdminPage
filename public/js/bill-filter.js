var table = document.getElementsByTagName("table")[0];
const all = document.getElementById("all-filter");
const order = document.getElementById("order-filter");
const shipping = document.getElementById("shipping-filter");
const shipped = document.getElementById("shipped-filter");
all.addEventListener("click", () => filter("All"));
order.addEventListener("click", () => filter("ordering"));
shipping.addEventListener("click", () => filter("shipping"));
shipped.addEventListener("click", () => filter("shipped"));

function filter(value) {
    var cell = table.getElementsByTagName("tr");
    console.log("run");
    for (let i = 0; i < cell.length; i++) {
        var td = cell[i].getElementsByTagName("td")[3];
        if (!td) continue;
        if (value == "All") {
            cell[i].style.display = "";
        } else {
            state = td.textContent || td.innerText;
            if (state == value) {
                cell[i].style.display = "";
            } else {
                cell[i].style.display = "none";
            }
        }
    }
}
