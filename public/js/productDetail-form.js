$("#product-detail-form")
    .validator()
    .on("submit", function (event) {
        if (event.isDefaultPrevented()) {
            // handle the invalid form...
            formError();
            submitMSG(false, "Did you fill in the form properly?");
        } else {
            // everything looks good!
            event.preventDefault();
            submitForm();
        }
    });

function Loading() {}
function submitForm() {
    // Initiate Variables With Form Content
    var name = $("#name").val();
    var price = $("#price").val();
    var imgSrc = $("#imgSrc")[0].files[0];
    var type = $("[name='type']:checked").val();
    var more = $("[name='more']:checked").val();
    var description = $("#description").val();
    var formula = $("#formula").val();
    var formdata = new FormData();
    formdata.append("name", name);
    formdata.append("price", price);
    formdata.append("imgSrc", imgSrc);
    formdata.append("type", type);
    formdata.append("more", more);
    formdata.append("description", description);
    formdata.append("formula", formula);
    console.log(formdata);
    var dialog = $("#dialog")[0];
    dialog.innerHTML = `<div class="modal fade" id="loadMe" tabindex="-1" role="dialog" aria-labelledby="loadMeLabel">
  <div class="modal-dialog modal-sm" role="document">
    <div class="modal-content">
      <div class="modal-body text-center">
        <div class="loader"></div>
        <div clas="loader-txt">
          <p>Updating Product</p>
        </div>
      </div>
    </div>
  </div>
</div>`;
    $("#loadMe").modal({
        backdrop: "static", //remove ability to close modal with click
        keyboard: false, //remove option to close with keyboard
        show: true, //Display loader!
    });

    //Submit form
    fetch("", {
        method: "POST",
        body: formdata,
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.log == "success") {
                var dialog = $("#dialog")[0];
                dialog.innerHTML = `<div class="modal fade" id="myModal" role="dialog">
        <div class="modal-dialog">

          <!-- Modal content-->
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
              <p>Update success</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>

        </div>
      </div>`;
            }
        })
        .then(() => $("#myModal").modal("show"));
}

function formSuccess() {
    $("#product-detail-form")[0].reset();
    submitMSG(true, "Message Submitted!");
}

function formError() {
    $("#product-detail-form")
        .removeClass()
        .addClass("shake animated")
        .one(
            "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
            function () {
                $(this).removeClass();
            }
        );
}

function submitMSG(valid, msg) {
    if (valid) {
        var msgClasses = "h3 text-center tada animated text-success";
    } else {
        var msgClasses = "h3 text-center text-danger";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
}
