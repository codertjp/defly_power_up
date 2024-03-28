//TODO: Also maybe have endless keybinds that can be tie to an action? This needs a good simple UI.
//TODO: When the main keybinds from defly are in setup mode don't fire custom keybind event.

// ---SETUP---
let activeElm = null,
  keyBindActions = {};
document.addEventListener("keyup", (event) => {
  if (!packages.settings_keybinds) return;
  if (
    !("code" in event) ||
    getComputedStyle(
      document.querySelector("#chat-block > div.chat-input-block")
    ).display !== "none"
  ) {
    return;
  }
  let type = event.code.replace("Key", "");
  // Save new key bind
  if (activeElm !== null) {
    activeElm.innerHTML = `<div>${type === "Escape" ? "&nbsp;" : type}</div>`;
    settings.config.keyBinds[activeElm.parentElement.id].keys[
      activeElm.classList.contains("first") ? 0 : 1
    ] = type === "Escape" ? "" : type;
    settings.save();
    activeElm = null;
  }
  // Run code based on key
  else {
    for (let key in settings.config.keyBinds) {
      let keySet = settings.config.keyBinds[key].keys;
      if (keySet[0] === type || keySet[1] === type) {
        log(`Keybind: key: ${type} to  action: ${key}`);
        try {
          keyBindActions[key]();
        } catch {
          pageError("Key bind failed or not found");
        }
      }
    }
  }
});

class keyBind {
  constructor(id, displayName, callback) {
    this.id = id;
    this.displayName = displayName;
    keyBindActions[this.id] = callback;
    if (!(this.id in settings.config.keyBinds)) {
      settings.config.keyBinds[this.id].keys = ["", ""];
      settings.save();
    }
  }
  make() {
    return `
            <div class="name">${this.displayName}</div>
            <div class="value first">
                <div>
                    ${
                      settings.config.keyBinds[this.id].keys[0] === ""
                        ? "&nbsp;"
                        : settings.config.keyBinds[this.id].keys[0]
                    }
                </div>
            </div>
            <div class="value second">
                <div>
                    ${
                      settings.config.keyBinds[this.id].keys[1] === ""
                        ? "&nbsp;"
                        : settings.config.keyBinds[this.id].keys[1]
                    }
                </div>
            </div>`;
  }
  load() {
    this.customKeyBind = document.createElement("div");
    this.customKeyBind.id = this.id;
    this.customKeyBind.classList.add("binding", "customBinding");
    this.customKeyBind.innerHTML = this.make();
    document
      .querySelector("#settings-bindings")
      .appendChild(this.customKeyBind);
    this.firstBind = document.getElementById(this.id).childNodes[3];
    this.secondBind = document.getElementById(this.id).childNodes[5];
    this.firstBind.onclick = (e) => {
      if (activeElm !== null) {
        activeElm.innerHTML = "<div>&nbsp;</div>";
      }
      activeElm = this.firstBind;
      this.firstBind.innerHTML = '<div class="waiting">Press a key</div>';
    };
    this.secondBind.onclick = (e) => {
      if (activeElm !== null) {
        activeElm.innerHTML = "<div>&nbsp;</div>";
      }
      activeElm = this.secondBind;
      this.secondBind.innerHTML = '<div class="waiting">Press a key</div>';
    };
  }
}

function loadKeyBindsToSettings() {
  if (!packages.settings_keybinds) return;
  var elementsToRemove = document.querySelectorAll(".customBinding");
  elementsToRemove.forEach(function (element) {
    element.remove();
  });
  let index = 0,
    keys = [];
  for (let key in settings.config.keyBinds) {
    let value = settings.config.keyBinds[key];
    keys[index] = new keyBind(key, value.action, () => {
      actions[value.action]();
    });
    keys[index].load();
    index++;
  }
}

perms.sub(() => {
  loadKeyBindsToSettings();
});
