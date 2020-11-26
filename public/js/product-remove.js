$("[name='remove-icon']").on("click", function (event) {
    event.preventDefault();
    const icon = event.target;
    console.log(icon.id);
    const product = icon.parentElement.parentElement.parentElement;
    const name = product.getElementsByClassName("name")[0].innerHTML;
    var dialog = $("#dialog")[0];
    dialog.innerHTML = `<div class="modal fade" id="myModal" role="dialog">
        <div class="modal-dialog">

          <!-- Modal content-->
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
              <p>Are you sure want to delete ${name}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-success" id="yes" data-dismiss="modal">Yes</button>
              <button type="button" class="btn btn-danger" id="no" data-dismiss="modal">No</button>
            </div>
          </div>

        </div>
      </div>`;
    $("#myModal").modal("show");
    $("#yes").on("click", () => {
        product.remove();
        fetch("/product/remove/" + icon.id, {
            method: "POST",
        }).then(() => window.location.reload());
    });
});
