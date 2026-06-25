const pressStartButton = document.getElementById("press-start-button");
const pressStartScreen = document.getElementById("press-start-screen");
const landingPage = document.getElementById("landing-page");
const teamPortfolio = document.getElementById("team-portfolio");
const josephPortfolio = document.getElementById("joseph-portfolio");
const sherwinPortfolio = document.getElementById("sherwin-portfolio");
const xanthPortfolio = document.getElementById("xanth-portfolio");

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

/* DYNAMIC PAGES LOGIC */
