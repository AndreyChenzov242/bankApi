$(document).on("input", ".pinly-point", function () {
  if (this.value.length > 1) {
    this.value = this.value.charAt(0);
  }

  if (!(this.value.length < 1)) {
    if (parseInt(this.id, 10) + 1 < 110) {
      let input = document.getElementById(parseInt(this.id, 10) + 1);
      input.focus();
    } else {
      $("#main-input").focus();
    }
  }
});

$(".pinly-point").keydown(function (event) {
  if (event.which == 8 || event.which == 46) {
  }
  this.value = "";

  if (event.which == 37) {
    if (parseInt(this.id, 10) > 100) {
      let input = document.getElementById(parseInt(this.id, 10) - 1);
      input.focus();
    }
  }

  if (event.which == 39) {
    if (parseInt(this.id, 10) + 1 < 110) {
      let input = document.getElementById(parseInt(this.id, 10) + 1);
      input.focus();
    }
  }
});

// $(".pinly-point").bind("paste", function (e) {
//   // access the clipboard using the api
//   var pastedData = e.originalEvent.clipboardData.getData("number");
//   alert(pastedData);
//   this.value = "0";
// });
$(".pinly-point").bind("paste", function (e) {
  var pastedData = e.originalEvent.clipboardData.getData("text");

  console.log(pastedData);
  for (let index = 100; index < 110; index++) {
    document.getElementById(index).value = parseInt(pastedData, 10)
      .toString()
      .charAt(index - 100);
  }

  if (pastedData.length < 12) {
    let input = document.getElementById(
      100 + parseInt(pastedData, 10).toString().length - 1
    );
    input.focus();
  } else document.getElementById(109).focus();
});
