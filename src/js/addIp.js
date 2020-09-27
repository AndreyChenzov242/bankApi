$(".add-ip").click(function () {
  $(".ip-wrapper").append(
    "<input type='text' class='statement__input ip' placeholder='IPv4 або IPv6'/>"
  );
});

$(document).on("input", "#ip-input", function () {
  //   console.log($(this).val());

  //   console.log($(this).val().split(" "));

  let split = $(this).val().replace(/,/g, " ");
  console.log(split);

  split = split.replace("  ", " ");

  split = split.split(" ");

  split = split.filter((ip) => ip != "");

  //   console.log(split);

  if (split.length > 1) {
    document.getElementById("ip-input").value = split[0];

    for (let index = 1; index < split.length; index++) {
      $(".ip-wrapper").append(
        "<input type='text' class='statement__input' placeholder='IPv4 або IPv6'  value=" +
          split[index] +
          " />"
      );
    }
  }
});