const pressStartScreen = document.getElementById("press-start-screen");
const characterSelectScreen = document.getElementById(
  "character-select-screen",
);

// viewss array
const views = {
  PRESS_START: pressStartScreen,
  CHARACTER_SELECT: characterSelectScreen,
};

const View = {
  PRESS_START: "PRESS_START",
  CHARACTER_SELECT: "CHARACTER_SELECT",
  JOSEPH: "./joseph.html",
  SHERWIN: "./sherwin.html",
  XANTH: "./xanth.html",
};

const INITIAL_VIEW = View.PRESS_START;
let currentView = INITIAL_VIEW;

//nav buttons dict
const navButtons = [
  { button: "#press-start-button", page: View.CHARACTER_SELECT },
  { button: "#joseph-banner-button", page: View.JOSEPH },
  { button: "#sherwin-banner-button", page: View.SHERWIN },
  { button: "#xanth-banner-button", page: View.XANTH },
];

//func for setting view
function setView(viewName) {
  if (viewName.endsWith(".html")) {
    window.location.href = viewName;

  } else if (!(viewName in views)) {
    console.warn(`Unknown view: ${viewName}`);
    return;

  }
  currentView = viewName;

  Object.entries(views).forEach(([name, element]) => {
    if (!element) return;
    element.hidden = name !== viewName;
  });
}


//if nav buttons r pressed
navButtons.forEach(({ button, page }) => {
  const buttonElement = document.querySelector(button);

  if (!buttonElement) return; // akigan ta sini kun si sir paul pero its correct naman

  buttonElement.addEventListener("click", () => {
    setView(page);
  });
});

//enter is pressed
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && currentView === View.PRESS_START) {
    const pressStartButton = document.querySelector("#press-start-button");
    if (pressStartButton) pressStartButton.click();
  }
});

setView(currentView);
