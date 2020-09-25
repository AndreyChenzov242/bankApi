var animation = bodymovin.loadAnimation({
  container: document.getElementById("laptop"), // Required
  path: "./js/laptop.json", // Required
  renderer: "svg/canvas/html", // Required
  loop: true, // Optional
  autoplay: true, // Optional
});
