var paginate = document.getElementsByClassName("page-link");
for (let i = 0; i < paginate.length; i++) {
    paginate[i].addEventListener("click", updateQueryString);
}
function updateQueryString(event) {
    var page = event.target.value;
    var uri = document.location;

    var string = updateUrlParameter(uri.href, "page", page);
    var parts = string.split("?");
    window.location.href = "?" + parts[1];
}
function updateUrlParameter(uri, key, value) {
    var i = uri.indexOf("#");
    var hash = i === -1 ? "" : uri.substr(i);
    uri = i === -1 ? uri : uri.substr(0, i);

    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf("?") !== -1 ? "&" : "?";
    if (uri.match(re)) {
        uri = uri.replace(re, "$1" + key + "=" + value + "$2");
    } else {
        uri = uri + separator + key + "=" + value;
    }
    return uri + hash;
}
var searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", Search);
function Search(event) {
    event.preventDefault();
    var searchValue = document.getElementById("search-value").value;
    var uri = document.location;

    var string = updateUrlParameter(uri.href, "keyword", searchValue);
    var parts = string.split("?");
    window.location.href = "?" + parts[1];
}
