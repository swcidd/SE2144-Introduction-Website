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
let viewSwitchTimeoutId = null;
let characterSelectIntroTimeoutId = null;

const PRESS_START_TO_CHARACTER_SELECT_DELAY_MS = 700;
const CHARACTER_SELECT_TO_PORTFOLIO_DELAY_MS = 1500;
const CHARACTER_SELECT_INTRO_DURATION_MS = 1100;

const characterButtons = Array.from(document.querySelectorAll(".members"));
const pressStartButton = document.querySelector("#press-start-button");

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

  if (viewName === View.CHARACTER_SELECT) {
    if (characterSelectIntroTimeoutId !== null) {
      clearTimeout(characterSelectIntroTimeoutId);
    }

    window.requestAnimationFrame(() => {
      characterSelectScreen.classList.remove("is-entering");
      void characterSelectScreen.offsetWidth;
      characterSelectScreen.classList.add("is-entering");

      characterSelectIntroTimeoutId = window.setTimeout(() => {
        characterSelectScreen.classList.remove("is-entering");
        characterSelectIntroTimeoutId = null;
      }, CHARACTER_SELECT_INTRO_DURATION_MS);
    });
  }
}

//if nav buttons r pressed
navButtons.forEach(({ button, page }) => {
  const buttonElement = document.querySelector(button);

  if (!buttonElement) return; // akigan ta sini kun si sir paul pero its correct naman

  buttonElement.addEventListener("click", () => {
    if (button === "#press-start-button" && pressStartButton) {
      pressStartButton.classList.remove("is-flashing");
      void pressStartButton.offsetWidth;
      pressStartButton.classList.add("is-flashing");

      window.setTimeout(() => {
        pressStartButton.classList.remove("is-flashing");
      }, PRESS_START_TO_CHARACTER_SELECT_DELAY_MS);
    }

    const memberButton = buttonElement.querySelector(".members");

    if (memberButton) {
      setCharacterSelection(memberButton);
    }

    if (viewSwitchTimeoutId !== null) {
      clearTimeout(viewSwitchTimeoutId);
    }

    viewSwitchTimeoutId = window.setTimeout(() => {
      setView(page);
      viewSwitchTimeoutId = null;
    }, getViewSwitchDelay(page));
  });
});

function setCharacterSelection(activeButton) {
  characterButtons.forEach((button) => {
    const portrait = button.querySelector("img");
    const isActive = button === activeButton;

    button.classList.toggle("selected", isActive);

    if (!portrait) return;

    portrait.src = isActive
      ? button.dataset.selectedSrc
      : button.dataset.unselectedSrc;
  });
}

function getViewSwitchDelay(nextView) {
  return nextView === View.CHARACTER_SELECT
    ? PRESS_START_TO_CHARACTER_SELECT_DELAY_MS
    : CHARACTER_SELECT_TO_PORTFOLIO_DELAY_MS;
}

//enter is pressed
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && currentView === View.PRESS_START) {
    const pressStartButton = document.querySelector("#press-start-button");
    if (pressStartButton) pressStartButton.click();
  }
});

setView(currentView);
