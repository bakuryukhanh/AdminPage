$("#login-form")
    .validator()
    .on("submit", function (event) {
        if (event.isDefaultPrevented()) {
            // handle the invalid form...
            formError();
            submitMSG(false, "Did you fill in the form properly?");
        } else {
            event.preventDefault();
            submitForm();
        }
    });

function submitForm() {
    // Initiate Variables With Form Content
    var username = $("#username").val();
    var password = $("#password").val();
    const user = { username, password };
    console.log(user);

    fetch("/login", {
        method: "POST",
        body: JSON.stringify(user),
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
                window.location.href = res.dest;
            }
        })
        .then(() => $("#myModal").modal("show"));
}

function formSuccess() {
    $("#staff-form")[0].reset();
    submitMSG(true, "Message Submitted!");
}

function formError() {
    $("#staff-form")
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
