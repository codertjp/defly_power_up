let isPrem = false;
// out
function send(message) {
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    var activeTab = tabs[0];
    console.log("clicked");
    chrome.tabs.sendMessage(activeTab.id, { message: message });
  });
}

// in
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === "accountIsPrem,true") {
    chrome.action.setIcon({ path: "images/prem_icon.png" });
    isPrem = true;
  } else if (message === "accountIsPrem,false") {
    chrome.action.setIcon({ path: "images/icon.png" });
    isPrem = false;
  } else if (message === "on") {
    if (isPrem) {
      chrome.action.setIcon({ path: "images/prem_icon.png" });
    } else {
      chrome.action.setIcon({ path: "images/icon.png" });
    }
  } else if (message === "off") {
    chrome.action.setIcon({ path: "images/disabled_icon.png" });
  } else if (message.includes("share")) {
    chrome.tabs.create({
      url: chrome.runtime.getURL(
        `share/share.html?i=${message.replace(/share:(.+)/g, "$1")}`
      ),
    });
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
      }
      clicks = 0;
      resolve();
    }, 750)
  );
}

chrome.action.onClicked.addListener((tab) => {
  tabId = tab.id;
  clicks++;
  if (clicks === 1) {
    countDown();
  }
});
