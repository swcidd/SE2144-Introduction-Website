const startButton = document.getElementById("startButton");
const overlay = document.getElementById("fade-overlay");
const members = document.querySelector(".members");

startButton.addEventListener("click", () => {
  overlay.classList.add("active");

  setTimeout(() => {
    members.classList.add("active");
  }, 1000);
});