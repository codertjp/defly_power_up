// Setup message sending to background.js
function send(message) {
  chrome.runtime.sendMessage(message, (response) => {});
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  //   Find a run code depending on sent message
  if (request.message === "power") {
    if (settings.config.disable === true) {
      settings.config.disable = false;
      settings.save();
      send("on");
      packages = defaultPackages;
      permsChange();
      on();
    } else if (
      settings.config.disable === false ||
      settings.config.disable === undefined
    ) {
      settings.config.disable = true;
      settings.save();
      send("off");
      off();
    }
  } else if (request.message === "reset") {
    if (
      confirm(
        "Are you sure you want to reset all settings for this Chrome extension? Please be aware this will not impact defly.io settings and will necessitate a page refresh."
      )
    ) {
      settings.save({});
      location.reload();
    }
  } else if (request.message === "powerPopup") {
    send(settings.config.disable ? "on" : "off");
    off();
    settings.config.disable = !settings.config.disable;
    settings.save();
    if (settings.config.disable) {
      Object.keys(packages).forEach((v) => (packages[v] = false));
      permsChange(true, true);
    } else {
      permsChange();
    }
  }
  // Acknowledge message
  sendResponse("ok");
});
