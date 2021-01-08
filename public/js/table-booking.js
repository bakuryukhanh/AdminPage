var table = $("table")[0];
var confirmedBtnList = $(".confirm");
var deletedBtnList = $(".delete");

for (let i = 0; i < confirmedBtnList.length; i++) {
    confirmedBtnList[i].addEventListener("click", confirmClick);
}
for (let i = 0; i < deletedBtnList.length; i++) {
    deletedBtnList[i].addEventListener("click", deleteClick);
}
function confirmClick(event) {
    const btn = event.target;
    const id = btn.getAttribute("ofid");
    fetch("/api/table-booking/" + id, {
        method: "PUT",
    });
    btn.parentElement.parentElement.remove();
}
function deleteClick(event) {
    const btn = event.target;
    const id = btn.getAttribute("ofid");
    fetch("/api/table-booking/" + id, {
        method: "DELETE",
    });
}
