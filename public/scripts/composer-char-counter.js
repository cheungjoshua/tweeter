$(document).ready(function () {
  $("textarea").on("input", function () {
    let msg = $("textarea").val();
    $("output.counter").text(140 - msg.length);
    if (140 - msg.length < 0) {
      $("output.counter").addClass("red");
      $(".textToolong").fadeIn("slow");
    }
  });
});
