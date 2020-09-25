$("body").mousemove(function (event) {
  $(".cursor-block").css({
    top: event.clientY - 75,
    left: event.clientX - 75,
  });
});
