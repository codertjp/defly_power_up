const actions = {
  closeServer: () => {
    document.querySelector("#preferred-server-block > span.close").click();
  },
  gameMode1V1: () => {
    selectGamemode(4);
  },
  gameModeDEFUSE: () => {
    selectGamemode(2);
  },
  gameModeEFFA: () => {
    selectGamemode(3);
  },
  gameModeFFA: () => {
    selectGamemode(0);
  },
  gameModeTEAM: () => {
    selectGamemode(1);
  },
  helperRemoveName: () => {
    document.querySelector("#accountsRemove").click();
  },
  helperSaveName: () => {
    document.querySelector("#accountsSave").click();
  },
  infoScreen: () => {
    getComputedStyle(document.querySelector("#info")).display === "block"
      ? (document.querySelector("#info").style.display = "none")
      : (document.querySelector("#info").style.display = "block");
  },
  logOut: () => {
    document.querySelector("#connected-block > a").click();
  },
  openChangeSkin: () => {
    document.querySelector("#skin-button").click();
  },
  openMyAccount: () => {
    document.querySelector("#my-account-button").click();
  },
  openTuto: () => {
    document
      .querySelector(
        "#homepage-content > div.left-box > div > div:nth-child(5) > div:nth-child(9) > a"
      )
      .click();
  },
  playButtonClick: () => {
    document.querySelector("#play-button").click();
  },
  settingPanelClose: () => {
    document.querySelector("#settings-popup").style.display = "";
  },
  settingPanelOpen: () => {
    document.querySelector("#settings-popup").style.display = "block";
  },
  settingPanelToggle: () => {
    document.querySelector("#settings-popup").style.display === "block"
      ? (document.querySelector("#settings-popup").style.display = "")
      : (document.querySelector("#settings-popup").style.display = "block");
  },
  settingsLoad: () => {
    settings.load();
  },
  settingsSave: () => {
    settings.save();
  },
  SPclone: () => {
    selectSuperPower(2);
  },
  SPdualFire: () => {
    selectSuperPower(0);
  },
  SPflashbang: () => {
    selectSuperPower(4);
  },
  SPshield: () => {
    selectSuperPower(3);
  },
  SPspeedBoost: () => {
    selectSuperPower(1);
  },
  SPteleport: () => {
    selectSuperPower(5);
  },
  stopAutoLeveling: () => {
    upgrading = false;
  },
  startAutoLeveling: () => {
    new Promise(async (resolve, reject) => {
      try {
        upgradingOrder = JSON.parse(
          document.getElementById("upgradesJSON").value
        );
      } catch {
        pageError(
          "Failed to load 'upgrades' from text box. Check if the JSON is entered is correct.",
          "popup"
        );
      }
      upgrading = true;
      await upgrader();
      resolve();
    });
  },
  toggleFullScreen: () => {
    document.fullscreenElement
      ? document.exitFullscreen()
      : document.querySelector("body").requestFullscreen();
  },
  discordChatToggle: () => {
    try {
    document.getElementById("discordChatPanel").style.display === "none"
      ? (document.getElementById("discordChatPanel").style.display = "block")
      : (document.getElementById("discordChatPanel").style.display = "none");
    } catch (e) {
        null;
    }
  },
};
