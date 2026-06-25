const pressStartButton = document.getElementById("press-start-button");
let currentView = "pressStart";

const views = {
  pressStart: document.getElementById("press-start-screen"),
  landing: document.getElementById("landing-page"),
  documentation: document.getElementById("documentation"),
  teamPortfolio: document.getElementById("team-portfolio"),
  josehPortfolio: document.getElementById("joseh-portfolio"),
  sherwinPortfolio: document.getElementById("sherwin-portfolio"),
  xanthPortfolio: document.getElementById("xanth-portfolio"),
};

function renderView() {
  Object.entries(views).forEach(([name, element]) => {
    element.hidden = name !== currentView;
  });
}

pressStartButton.addEventListener("click", () => {
  currentView = "landing";
  renderView();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && currentView === "pressStart") {
    pressStartButton.click();
  }
});

teamPortfolioButton.addEventListener("click", () => {
  currentView = "teamPortfolio";
  renderView();
});
