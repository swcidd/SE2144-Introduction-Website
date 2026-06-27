const pressStartButton = document.getElementById("press-start-button");
let currentView = "pressStart";

const views = {
  pressStart: document.getElementById("press-start-screen"),
  characterSelect: document.getElementById("character-select"),
  documentation: document.getElementById("documentation"),
  teamPortfolio: document.getElementById("team-portfolio"),
  josephPortfolio: document.getElementById("joseph-portfolio"),
  sherwinPortfolio: document.getElementById("sherwin-portfolio"),
  xanthPortfolio: document.getElementById("xanth-portfolio"),
};

function renderView(currentView) {
  Object.entries(views).forEach(([name, element]) => {
    element.hidden = name !== currentView;
  });
}

/* PAGE SWITCHER */
pressStartButton.addEventListener("click", () => {
  renderView("characterSelect");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && currentView === "pressStart") {
    pressStartButton.click();
  }
});

documentationButton.addEventListener("click", () => {
  renderView("documentation");
});

teamPortfolioButton.addEventListener("click", () => {
  renderView("teamPortfolio");
});

josephPortfolioButton.addEventListener("click", () => {
  renderView("josephPortfolio");
});
sherwinPortfolioButton.addEventListener("click", () => {
  renderView("sherwinPortfolio");
});
xanthPortfolioButton.addEventListener("click", () => {
  renderView("xanthPortfolio");
});
