$(".add-ip").click(function () {
  if (document.getElementById("main-input").value.length > 7) {
    $(".ip-wrapper").prepend(
      "<div class='input-wrapper input-wrapper--ip'> <input type='text' class='statement__input ' placeholder='IPv4 або IPv6' /> <div class='close'> <div class='line'></div> <div class='line'></div> </div> </div>"
    );
    $(".close").click(function () {
      this.parentNode.remove();
    });
  }
});

$(document).on("input", "#main-input", function () {
  let split = $(this).val().replace(/,/g, " ");

  split = split.replace("  ", " ");

  split = split.split(" ");

  split = split.filter((ip) => ip != "");

  if (split.length > 1) {
    document.getElementById("main-input").value = split[0];

    for (let index = 1; index < split.length; index++) {
      $(".ip-wrapper").prepend(
        "<div class='input-wrapper input-wrapper--ip'> <input type='text' class='statement__input ' placeholder='IPv4 або IPv6'  value=" +
          split[index] +
          " /> <div class='close'> <div class='line'></div> <div class='line'></div> </div> </div>"
      );

      $(".close").click(function () {
        this.parentNode.remove();
      });
    }

    document.querySelectorAll(".input-wrapper")[0].childNodes[1].focus();
  }
});

$(".main-close").click(function () {
  let inputArr = document.querySelectorAll(".input-wrapper");

  if (inputArr.length > 1) {
    const tmp = inputArr[inputArr.length - 2].childNodes[1].value;
    document.getElementById("main-input").value = tmp;

    document.querySelectorAll(".input-wrapper")[inputArr.length - 2].remove();
  } else {
    document.getElementById("main-input").value = "";
  }
});
