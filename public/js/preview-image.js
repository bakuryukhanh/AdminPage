var input = document.getElementById("imgSrc");
input.addEventListener("change", function () {
    readURL(this);
});
function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $("#image-preview").attr("src", e.target.result);
            $("#image-preview")[0].classList.remove("hidden");
        };

        reader.readAsDataURL(input.files[0]);
    }
}
