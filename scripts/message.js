// Setup message sending to background.js
function send(message) {
  chrome.runtime.sendMessage(message, (response) => {});
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  //   Find a run code depending on sent message
  if (request.message === "power") {
    if (settings.config.disable === true) {
      on();
      settings.config.disable = false;
      settings.save();
      send("on");
    } else if (
      settings.config.disable === false ||
      settings.config.disable === undefined
    ) {
      off();
      settings.config.disable = true;
      settings.save();
      send("off");
    }
  } else if (request.message === "reset") {
    if (
      confirm(
        "Are you sure you want to reset all settings (note: this is only for this chrome extension not for defly.io. Also know this requires a page refresh.)"
      )
    ) {
      localStorage.removeItem("config");
      location.reload();
    }
  }
  // Acknowledge message
  sendResponse("ok");
});
