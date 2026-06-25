const pressStartButton = document.getElementById("press-start-button");
const pressStartScreen = document.getElementById("press-start-screen");
const landingPage = document.getElementById("landing-page");

landingPage.classList.add("hidden");

pressStartButton.addEventListener("click", () => {
  pressStartScreen.classList.add("hidden");
  landingPage.classList.remove("hidden");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !pressStartScreen.classList.contains("hidden")) {
    pressStartButton.click();
  }
});
