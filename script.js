const pressStartButton = document.getElementById("press-start-button");
let currentView = "pressStart";
const documentationButton = document.getElementById("documentation-button")
const teamPortfolioButton =  document.getElementById("team-portfolio-button")
const josephPortfolioButton = document.getElementById("joseph-banner")
const sherwinPortfolioButton = document.getElementById("sherwin-banner")
const xanthPortfolioButton = document.getElementById("xanth-banner")


const views = {
  pressStartButton: document.getElementById("press-start-screen"),
  characterSelect: document.getElementById("character-select"),
  documentationButton: document.getElementById("documentation"),
  teamPortfolioButton: document.getElementById("team-portfolio"),
  josephPortfolioButton: document.getElementById("joseph-portfolio"),
  sherwinPortfolioButton: document.getElementById("sherwin-portfolio"),
  xanthPortfolioButton: document.getElementById("xanth-portfolio"),
};

const buttonViewsMapper = {
  documentationButton: document.getElementById("documentation-button"),
  teamPortfolioButton: document.getElementById("team-portfolio-button"),
  josephPortfolioButton: document.getElementById("joseph-banner"),
  sherwinPortfolioButton: document.getElementById("sherwin-banner"),
  xanthPortfolioButton: document.getElementById("xanth-banner"),
};


function renderView(currentView) {
  Object.entries(views).forEach(([name, element]) => {
    element.hidden = name !== currentView;
  });
}

/* PAGE SWITCHER */

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && currentView === "pressStart") {
    pressStartButton.click();
  }
});

element.addEventListener("click", () => {
  renderView(currentView);
});

function pageNavigator(element, currentView) {
  Object.entries(views).forEach(([name, element]) => {
    element.hidden = name !== currentView;
    
  element.addEventListener("click", () => {
    renderView(currentView);
  });
}

pageNavigator(pressStartButton, "characterSelect");
pageNavigator(documentationButton, "documentation");
pageNavigator(teamPortfolioButton, "teamPortfolio");
pageNavigator(josephPortfolioButton, "josephPortfolio");
pageNavigator(sherwinPortfolioButton, "sherwinPortfolio");
pageNavigator(xanthPortfolioButton, "xanthPortfolio");
