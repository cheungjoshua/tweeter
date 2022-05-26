// Logic for char count function

$(document).ready(function () {
  // Call function when input active
  $("textarea").on("input", function () {
    // get text total from text field
    let msg = $("textarea").val();

    // show the 140 - number to counter element in html
    $("output.counter").text(140 - msg.length);

    // Logic for warning
    if (140 - msg.length < 0) {
      $("output.counter").addClass("red");
      $(".textToolong").fadeIn("slow");
    } else {
      $("output.counter").removeClass("red");
      $(".textToolong").fadeOut(300);
    }
    if (msg.length === 0) {
      $(".textEmpty").fadeIn("slow");
    }
    if (msg.length !== 0) {
      $(".textEmpty").fadeOut(300);
    }
  });
});
