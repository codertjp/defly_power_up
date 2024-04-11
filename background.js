let stat = "";
async function icon() {
  if ((await chrome.storage.local.get(["disabled"]))["disabled"]) {
    chrome.action.setIcon({ path: "images/disabled_icon.png" });
    return;
  }
  if ((await chrome.storage.local.get(["icon"]))["icon"] === "prem") {
    chrome.action.setIcon({ path: "images/prem_icon.png" });
  } else if (
    (await chrome.storage.local.get(["icon"]))["icon"] === "standard"
  ) {
    chrome.action.setIcon({ path: "images/icon.png" });
  }
}
icon();

function updateIcon(type) {
  chrome.storage.local.set({ icon: type });
  new Promise(async (resolve, reject) => {
    await icon();
    resolve();
  });
}

// out
function send(message) {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    let activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { message: message });
  });
}
updateIcon("prem");

// in
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message, sender, sendResponse);
  if (message === "accountIsPrem,true") {
    updateIcon("prem");
  } else if (message === "accountIsPrem,false") {
    updateIcon("standard");
  } else if (message === "on") {
    chrome.storage.local.set({ disabled: false });
    icon();
    chrome.action.setBadgeText({ text: "" });
  } else if (message === "off") {
    chrome.storage.local.set({ disabled: true });
    icon();
    chrome.action.setBadgeText({ text: "OFF" });
  } else if (message.includes("share")) {
    chrome.tabs.create({
      url: chrome.runtime.getURL(
        `share/share.html?i=${message.replace(/share:(.+)/g, "$1")}`
      ),
    });
  } else if (message === "JSON") {
    chrome.tabs.create({
      url: chrome.runtime.getURL("JSON/processor.html"),
    });
  } else if (message === "auto,true") {
    chrome.action.setBadgeText({ text: "AUTO" });
  } else if (message === "auto,false") {
    chrome.action.setBadgeText({ text: "" });
  }
  sendResponse("ok");
});

let clicks = 0,
  tabId = 0;
function countDown() {
  new Promise((resolve, reject) =>
    setTimeout(() => {
      if (clicks === 1) {
        chrome.tabs.create({
          url: chrome.runtime.getURL("openDefly/defly.html"),
        });
      } else if (clicks === 2) {
        send("power");
      } else if (clicks === 3) {
        send("reset");
      } else if (clicks === 4) {
        chrome.tabs.create({
          url: chrome.runtime.getURL("betaInvites/betaInvites.html"),
        });
      } else if (clicks === 5) {
        chrome.tabs.create({
          url: chrome.runtime.getURL("LOG_READER/reader.html"),
        });
      }
      clicks = 0;
      resolve();
    }, 750)
  );
}

// chrome.action.onClicked.addListener((tab) => {
//   tabId = tab.id;
//   clicks++;
//   if (clicks === 1) {
//     countDown();
//   }
// });
