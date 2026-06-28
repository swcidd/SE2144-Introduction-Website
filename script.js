const pressStartScreen = document.getElementById("press-start-screen");
const characterSelectScreen = document.getElementById(
  "character-select-screen",
);
const josephPortfolio = document.getElementById("joseph-portfolio");
const sherwinPortfolio = document.getElementById("sherwin-portfolio");
const xanthPortfolio = document.getElementById("xanth-portfolio");

const views = {
  PRESS_START: pressStartScreen,
  CHARACTER_SELECT: characterSelectScreen,
  JOSEPH: josephPortfolio,
  SHERWIN: sherwinPortfolio,
  XANTH: xanthPortfolio,
};

const View = {
  PRESS_START: "PRESS_START",
  CHARACTER_SELECT: "CHARACTER_SELECT",
  JOSEPH: "JOSEPH",
  SHERWIN: "SHERWIN",
  XANTH: "XANTH",
};

const INITIAL_VIEW = View.PRESS_START;
let currentView = INITIAL_VIEW;

const navButtons = [
  { button: "#press-start-button", page: View.CHARACTER_SELECT },
  { button: "#joseph-banner-button", page: View.JOSEPH },
  { button: "#sherwin-banner-button", page: View.SHERWIN },
  { button: "#xanth-banner-button", page: View.XANTH },
];

function setView(viewName) {
  if (!(viewName in views)) {
    console.warn(`Unknown view: ${viewName}`);
    return;
  }
  currentView = viewName;

  Object.entries(views).forEach(([name, element]) => {
    if (!element) return;
    element.hidden = name !== viewName;
  });
}

navButtons.forEach(({ button, page }) => {
  const buttonElement = document.querySelector(button);

  if (!buttonElement) return;

  buttonElement.addEventListener("click", () => {
    setView(page);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && currentView === View.PRESS_START) {
    const pressStartButton = document.querySelector("#press-start-button");
    if (pressStartButton) pressStartButton.click();
  }
});

setView(currentView);
