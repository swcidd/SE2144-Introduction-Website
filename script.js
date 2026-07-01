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

const TRANSPARENT_PIXEL =
  "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
const PRESS_START_AUDIO_SRC = "src/assets/audio/GAME_SE_23.mp3";
const BANNER_CLICK_AUDIO_SRC = "src/assets/audio/GAME_SE_08.mp3";
const CHARACTER_SELECT_AUDIO_SRC =
  "src/assets/audio/Street Fighter X Tekken Main Menu OST_compressed.mp3";

const characterButtons = Array.from(document.querySelectorAll(".members"));
const pressStartButton = document.querySelector("#press-start-button");

let characterSelectAudio = null;

function playOneShotSound(src) {
  const sound = new Audio(src);
  sound.preload = "none";

  const playPromise = sound.play();

  if (playPromise?.catch) {
    playPromise.catch(() => {});
  }
}

function playPressStartAudio() {
  playOneShotSound(PRESS_START_AUDIO_SRC);
}

function playBannerClickAudio() {
  playOneShotSound(BANNER_CLICK_AUDIO_SRC);
}

function getCharacterSelectAudio() {
  if (!characterSelectAudio) {
    characterSelectAudio = new Audio(CHARACTER_SELECT_AUDIO_SRC);
    characterSelectAudio.loop = true;
    characterSelectAudio.preload = "none";
  }

  return characterSelectAudio;
}

function playCharacterSelectAudio() {
  const audio = getCharacterSelectAudio();
  audio.currentTime = 0;

  const playPromise = audio.play();

  if (playPromise?.catch) {
    playPromise.catch(() => {});
  }
}

function stopCharacterSelectAudio() {
  if (!characterSelectAudio) return;

  characterSelectAudio.pause();
  characterSelectAudio.currentTime = 0;
}

function initializeCharacterPortraits() {
  characterButtons.forEach((button) => {
    const portrait = button.querySelector("img");

    if (!portrait || portrait.dataset.loaded === "true") return;

    portrait.src = button.dataset.unselectedSrc || TRANSPARENT_PIXEL;
    portrait.decoding = "async";
    portrait.dataset.loaded = "true";
  });
}

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
    stopCharacterSelectAudio();
    window.location.href = viewName;
    return;
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
    initializeCharacterPortraits();
    playCharacterSelectAudio();

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

  if (!buttonElement) return; // akigan ta sini kun si sir paul pero its correct nazman

  buttonElement.addEventListener("click", () => {
    if (button === "#press-start-button" && pressStartButton) {
      playPressStartAudio();
      pressStartButton.classList.remove("is-flashing");
      void pressStartButton.offsetWidth;
      pressStartButton.classList.add("is-flashing");

      window.setTimeout(() => {
        pressStartButton.classList.remove("is-flashing");
      }, PRESS_START_TO_CHARACTER_SELECT_DELAY_MS);
    }

    const memberButton = buttonElement.querySelector(".members"); //why

    if (memberButton) {
      playBannerClickAudio();
      //setCharacterSelection(memberButton);
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

//setting character selected
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

//hover shows selected art, hover-out reverts to unselected art
function initializeCharacterHoverEffects() {
  characterButtons.forEach((button) => {
    const portrait = button.querySelector("img");

    if (!portrait) return;

    button.addEventListener("mouseenter", () => {
      if (button.dataset.selectedSrc) {
        portrait.src = button.dataset.selectedSrc;
      }
    });

    button.addEventListener("mouseleave", () => {
      portrait.src = button.dataset.unselectedSrc || TRANSPARENT_PIXEL;
    });
  });
}

//delayyy
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

function openTab(event, Name) {
  const tabcontent = document.getElementsByClassName("tabContent");
  const tablinks = document.getElementsByClassName("tablinks");

  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active");
  }

  const currentTab = document.getElementById(Name);
  currentTab.style.display = "block";

  currentTab.style.animation = "none";
  currentTab.offsetHeight; // Force reflow
  currentTab.style.animation = "tabSlide 0.25s ease-out";

  event.currentTarget.classList.add("active");
}
const firstTabButton = document.querySelector(".tablinks");

if (firstTabButton) {
  firstTabButton.click();
}
