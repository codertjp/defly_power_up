setTimeout(async () => {
  function send(message) {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      let activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, { message: message });
    });
  }

  document.getElementById("power").onclick = () => {
    send("powerPopup");
    setTimeout(async () => {
      await setPowerColor();
    }, 250);
  };

  document.getElementById("openDefly").onclick = () => {
    window.open(chrome.runtime.getURL("./openDefly/defly.html"));
  };

  document.getElementById("getBetaInvite").onclick = () => {
    window.open(chrome.runtime.getURL("./betaInvites/betaInvites.html"));
  };

  document.getElementById("devLogs").onclick = () => {
    window.open(chrome.runtime.getURL("./LOG_READER/reader.html"));
  };

  async function setPowerColor() {
    let disabled = (await chrome.storage.local.get(["disabled"]))["disabled"];
    document.getElementById("power").style.stroke = disabled
      ? "#323333"
      : "#f6ff00";
  }

  await setPowerColor();
}, 500);
