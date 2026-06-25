const pressStartButton = document.getElementById("press-start-button");
const pressStartScreen = document.getElementById("press-start-screen");
const landingPage = document.getElementById("landing-page");

pressStartScreen.hidden = false;
landingPage.hidden = true;

pressStartButton.addEventListener("click", () => {
  pressStartScreen.hidden = true;
  landingPage.hidden = false;
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !pressStartScreen.hidden) {
    pressStartButton.click();
  }
});
