const showOnPx = 100;
const topButton = document.querySelector(".back-to-top");

const scrollContainer = function () {
  return document.documentElement || document.body;
};

document.addEventListener("scroll", () => {
  if (scrollContainer().scrollTop > showOnPx) {
    topButton.classList.remove("hidden");
  } else {
    topButton.classList.add("hidden");
  }
});

const goToTop = function () {
  document.body.scrollIntoView({ behavior: "smooth" });
};

topButton.addEventListener("click", goToTop);
