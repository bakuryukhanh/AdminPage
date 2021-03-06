$("#discount-detail-form")
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

function submitForm() {
    // Initiate Variables With Form Content
    var name = $("#name").val();
    var value = $("#value").val();
    var code = $("#code").val();
    var startDate = $("#startDate").val();
    var endDate = $("#endDate").val();

    var discount = {
        name,
        value,
        code,
        startDate,
        endDate,
    };
    console.log(discount);
    // //Submit form
    fetch("", {
        method: "POST",
        body: JSON.stringify(discount),
        headers: {
            "content-type": "application/json",
        },
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
            } else {
                var dialog = $("#dialog")[0];
                dialog.innerHTML = `<div class="modal fade" id="myModal" role="dialog">
        <div class="modal-dialog">

          <!-- Modal content-->
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
              <p>${Object.keys(res.keyPattern)} is not valid</p>
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
    $("#staff-detail-form")[0].reset();
    submitMSG(true, "Message Submitted!");
}

function formError() {
    $("#staff-detail-form")
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
