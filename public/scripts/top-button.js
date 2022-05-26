// For Back to top button js

$("document").ready(() => {
  // Set how much scroll away from top
  const showOnPx = 100;
  const topButton = document.querySelector(".back-to-top");

  // grab body element
  const scrollContainer = function () {
    return document.documentElement || document.body;
  };

  //Add event listener when scroll
  //Logic if scroll from top more than 100 px it will show
  document.addEventListener("scroll", () => {
    if (scrollContainer().scrollTop > showOnPx) {
      topButton.classList.remove("hidden");
    } else {
      // Else it will hide
      topButton.classList.add("hidden");
    }
  });

  // create function for move the page back to top
  const goToTop = function () {
    document.body.scrollIntoView({ behavior: "smooth" });
  };

  // Add event listener for click,
  // and call the function move back to the top
  topButton.addEventListener("click", goToTop);
});
