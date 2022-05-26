// For toggle the new tweet text field section

$("document").ready(() => {
  $(".compose-toggle").click(function () {
    $(".new-tweet").fadeToggle("slow");
  });
});
