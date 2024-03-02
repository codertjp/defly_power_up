const chatHistory = document.querySelector("#chat-history-full");
const newChat = document.querySelector("#chat-history");
document.getElementById("chat-input").onpaste = (e) => {
  return e;
};
// Add new menu button for lower quality
const qualityButton = document.createElement("button");
qualityButton.id = "button-quality-very-low";
qualityButton.type = "button";
qualityButton.classList.add("button", "unselected", "selected");
qualityButton.textContent = "Very Low";
qualityButton.onclick = "defly.setQuality(0.4);";
document.querySelector(".quality").appendChild(qualityButton);

let sessionalMutedPeeps = [];

// Adding new menu button to enable muted players
const chatDiv = document.querySelector(".chat");
const enableMutedPlayersInput = document.createElement("input");
enableMutedPlayersInput.type = "checkbox";
enableMutedPlayersInput.id = "settings-disable-block-players";
enableMutedPlayersInput.name = "settings-disable-block-players";
enableMutedPlayersInput.checked = settings.config.muteActive;
enableMutedPlayersInput.addEventListener("change", function () {
  settings.config.muteActive = this.checked;
  settings.save();
  chatChanged();
});

const enableMutedPlayersLabel = document.createElement("label");
enableMutedPlayersLabel.htmlFor = "settings-disable-block-players";
enableMutedPlayersLabel.textContent = "Enable player mute";

// Adding new super chat block
const chatBlock = document.createElement("input");
chatBlock.type = "checkbox";
chatBlock.id = "chatBlock";
chatBlock.name = "chatBlock";
chatBlock.checked = settings.config.chatBlocking;
chatBlock.addEventListener("change", function () {
  settings.config.chatBlocking = this.checked;
  settings.save();
  chatChanged();
});
const chatBlockLabel = document.createElement("label");
chatBlockLabel.htmlFor = "chatBlock";
chatBlockLabel.textContent = "Use improved chat screening";

// Adding new 1v1 screening
const screen1v1 = document.createElement("input");
screen1v1.type = "checkbox";
screen1v1.id = "screen1v1";
screen1v1.name = "screen1v1";
screen1v1.checked = settings.config.screen1v1;
screen1v1.addEventListener("change", function () {
  settings.config.screen1v1 = this.checked;
  settings.save();
  chatChanged();
});
const screen1v1Label = document.createElement("label");
screen1v1Label.htmlFor = "screen1v1";
screen1v1Label.textContent = "Use improved 1v1 screening";

chatDiv.appendChild(
  document.createElement("div").appendChild(enableMutedPlayersInput)
);

chatDiv.appendChild(
  document.createElement("div").appendChild(enableMutedPlayersLabel)
);
chatDiv.appendChild(document.createElement("br"));

chatDiv.appendChild(document.createElement("div").appendChild(chatBlock));

chatDiv.appendChild(document.createElement("div").appendChild(chatBlockLabel));

chatDiv.appendChild(document.createElement("br"));

chatDiv.appendChild(document.createElement("div").appendChild(screen1v1));

chatDiv.appendChild(document.createElement("div").appendChild(screen1v1Label));

const config = { attributes: false, childList: true, subtree: true };
const chatHistoryObserver = new MutationObserver(chatChanged);
chatHistoryObserver.observe(chatHistory, config);
const newChatObserver = new MutationObserver(chatChanged);
newChatObserver.observe(newChat, config);

function chatChanged(unusedLol) {
  let allNewMessages = newChat.querySelectorAll("div");
  let allOldMessages = chatHistory.querySelectorAll("div");
  let allMessages = Array.from(allNewMessages).concat(
    Array.from(allOldMessages)
  );
  allMessages.forEach((message) => {
    console.log(message);
    if (message.classList.contains("info")) return;
    let messageContent = message.querySelectorAll("span");
    if (
      messageContent.length != 2 ||
      !messageContent?.[0].classList.contains("name")
    )
      return;
    if (
      settings.config.mutedPeeps.includes(
        messageContent[0].innerText.replace(": ", "")
      ) &&
      settings.config.muteActive
    ) {
      message.style.display = "none";
    } else {
      if (!messageContent[1].classList.contains("checked")) {
        let test = testForNSFW(messageContent[1].innerText.strip());
        console.log(
          messageContent[1].innerText,
          messageContent[1].innerText.strip()
        );
        if (test[2]) {
          messageContent[1].innerText = test[0];
          messageContent[1].classList.add("checked");
        }
      }
      messageContent[0].addEventListener("click", function () {
        addPlayerAsMuted(messageContent[0].innerText.replace(": ", ""));
      });
      messageContent[0].title = "Click mute player";
      messageContent[0].style =
        "cursor: pointer;pointer-events: all;display:inline";
    }
  });
}

function addPlayerAsMuted(name) {
  log(`Muted: ${name}`);
  pageError(`Muted: ${name}`, "popup");
  if (!settings.config.mutedPeeps.includes(name)) {
    settings.config.mutedPeeps.push(name);
    chatChanged();
    mutedListChanged();
  }
}

function mutedListChanged() {
  settings.save();
}
