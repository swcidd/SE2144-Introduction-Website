// Get elements
const pressStartButton = document.getElementById("press-start-button");
const pressStartScreen = document.getElementById("press-start-screen");
const landingPage = document.getElementById("landing-page");

landingPage.classList.add("hidden");

// On press-start click, transition to landing
pressStartButton.addEventListener("click", () => {
  pressStartScreen.classList.add("hidden");
  landingPage.classList.remove("hidden");
});

// Allow Enter key too
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !pressStartScreen.classList.contains("hidden")) {
    pressStartButton.click();
  }
});
