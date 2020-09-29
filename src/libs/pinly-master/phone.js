$(document).on("input", ".pinly-points", function () {
  if (this.value.length > 1) {
    this.value = this.value.charAt(1);
  }

  if (!(this.value.length < 1)) {
    if (parseInt(this.id, 10) + 1 < 212) {
      let inputs = document.getElementById(parseInt(this.id, 10) + 1);
      inputs.focus();
    }
  }
});
$(".pinly-points").keydown(function (event) {
  if (event.which == 8 || event.which == 46) {
    this.value = "";
  }
  if (event.which == 37) {
    if (parseInt(this.id, 10) > 200) {
      let input = document.getElementById(parseInt(this.id, 10) - 1);
      input.focus();
    }
  }

  if (event.which == 39) {
    if (parseInt(this.id, 10) + 1 < 212) {
      let input = document.getElementById(parseInt(this.id, 10) + 1);
      input.focus();
    }
  }
});

$(".pinly-points").bind("paste", function (e) {
  var pastedData = e.originalEvent.clipboardData.getData("text");
  for (let index = 203; index < 212; index++) {
    document.getElementById(index).value = parseInt(pastedData, 10)
      .toString()
      .charAt(index - 203);
  }

  if (pastedData.length < 12) {
    let input = document.getElementById(
      203 + parseInt(pastedData, 10).toString().length - 1
    );
    input.focus();
  } else document.getElementById(211).focus();
});
