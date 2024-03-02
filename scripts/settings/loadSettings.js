let deflySettings = document.createElement("div");
deflySettings.style.width = "100%";
deflySettings.id = "deflySettings";
deflySettings.style.display = "none";
deflySettings.innerHTML = `
    <br />
    <br />
    <br />
    <div style="width: 100%; text-align: center;"><h2>Defly Helper</h2></div>
    <br />
    <a href="https://discord.gg/9yqe4pUc9V"><button type="button" class="button" lang="en">Join our discord to give feedback!</button></a>
    <br />
    <br />
    <div class="name">Mini Map Zoom</div>
    <input id="MiniMapZoom" type="range" min="100" max="500" />
    <br />
    <br />
    <div>
    <input type="checkbox" id="alt" name="alt" ${
      settings.config.addAlts ? "checked" : ""
    }>
    <label for="alt">Show alt name changer</label>
    <br />
    <input type="checkbox" id="discord" name="discord" ${
      settings.config.addDiscord ? "checked" : ""
    }>
    <label for="discord">Show Open Discord Button</label>
    <br />
    <input type="checkbox" id="nameIcon" name="nameIcon" ${
      settings.config.nameIcon ? "checked" : ""
    }>
    <label for="nameIcon">Name Icon (Please leave on!)</label>
    <br />
    <input type="checkbox" id="linkList" name="linkList" ${
      settings.config.linkList ? "checked" : ""
    }>
    <label for="linkList">Show Links on homepage </label>
    <br />
    <button id="checkForPrem" type="button" class="button" lang="en">Verify Premium</button>
    </div>
    <br />
    <br />
    <div class="name">Add a keybind:</div>
    <select id="addKeybindDropdown">
    </select>
    <br />
    <button id="addKeybindDButton" type="button" class="button" lang="en">Add key bind</button>
    <br />
    <button id="removeKeybindDButton" type="button" class="button" style="margin-bottom: 1px;background-color: red; box-shadow: 0 2px 10px rgba(0,0,0,.2), 0 4px 0 red;" lang="en">Remove key bind</button>
    <br />
    <br />
    <br />
    <div class="name">Auto Upgrader:</div>
    <br />
    <br />
    <div id="preset"></div>
    <br />
    <div id='share' class="name">Share presets with friends...</div>
    <br />
    <br />
    <div class="name">Make a preset:</div>
    <br />
    <button id="openLvlConfig" type="button" class="button" lang="en">Open config...</button>
    <br />
    <br />
    <input id="upgradesName" style="width: 100%;" placeholder="Enter a name for this preset then click save or start leveling and don't save"/>
    <br />
    <input id="upgradesJSON" style="width: 100%;" placeholder="Open Config or copy/paste JSON into this text box"/>
    <br />
    <br />
    <div class="name">Custom Superpower Text:</div>
    <input id="spText" style="width: 100%;" placeholder="Enter a superpower header text"/>
    <br />
    <br />
    <button id="openHTMLaddons" type="button" class="button" lang="en">Open HTML addons</button>
    <br />
    <br />
    <button id="openBatterySettings" type="button" class="button" lang="en">Open Battery Settings</button>
    <br />
    <br />
    <div class="name">Game's played: ${localStorage.getItem(
      "gamesPlayed"
    )}</div>
    <br />
    <br />
    <div id="customSkins">
        <svg style="width: 15px; height: 15px;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
        <div class="name">Warning this requires a lot of space. Skin files can be very large!</div>
        <input id="skinName" style="width: 100%;" placeholder="Enter a name for your skin..."/>
        <br />
        <br />
    </div>
    <button id="deflyMonsterImport" type="button" class="button" lang="en">Defly Monster Skin Import</button>
    <br />
    <br /
    <br />
    <svg style="width: 15px; height: 15px;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
    <div class="name">Warning this is advanced and might break the extension...</div>
    <button id="openAdvancedSettings" type="button" class="button" lang="en">Open advanced settings...</button>
    `;
// Load settings to page
document.querySelector("#settings-popup").appendChild(deflySettings);

document.querySelector("#spText").value = settings.config.spText;
document.querySelector("#spText").onchange = () => {
  log(`Superpower text to: ${document.querySelector("#spText").value}`);
  settings.config.spText = document.querySelector("#spText").value;
  document.querySelector("#choose-superpower > div").innerText =
    settings.config.spText;
  settings.save();
};
document.querySelector("#choose-superpower > div").innerText =
  settings.config.spText;

document.querySelector("#share").onclick = () => {
  log(`Share Open`);
  send(`share:${encrypt(JSON.stringify(settings.config.levelPresets))}`);
};

function toggleAlt() {
  settings.config.addAlts = document.getElementById("alt").checked;
  document.querySelector("#accounts").style.display = document.getElementById(
    "alt"
  ).checked
    ? "block"
    : "none";
  settings.save();
}

document.getElementById("linkList").onchange = () => {
  settings.config.linkList = document.getElementById("linkList").checked;
  document.querySelector("#menu").style.display = document.getElementById("linkList")
    .checked
    ? "block"
    : "none";
  settings.save();
};

document.getElementById("alt").onchange = () => {
  document.getElementById("alt2").checked =
    document.getElementById("alt").checked;
  toggleAlt();
};

let altNameCheckBox = document.createElement("span");
altNameCheckBox.innerHTML = `<input title="Hide/Show Alt Name Changer" type="checkbox" id="alt2" ${
  settings.config.addAlts ? "checked" : ""
}>`;
document.querySelector("#server-block").appendChild(altNameCheckBox);
altNameCheckBox.id = "alt2Span";
altNameCheckBox.style.display = "none";
document.getElementById("alt2").onchange = () => {
  document.getElementById("alt").checked =
    document.getElementById("alt2").checked;
  toggleAlt();
};

document.getElementById("discord").onchange = () => {
  log(`Open Discord`);
  try {
    settings.config.addDiscord = document.getElementById("discord").checked;
    document.querySelector("#discordChatType").style.display =
      document.getElementById("discord").checked ? "block" : "none";
    document.querySelector("#chat-block").style.marginTop =
      document.getElementById("discord").checked ? "10px" : "0";
    settings.save();
  } catch (e) {
    null;
  }
};

document.getElementById("MiniMapZoom").onchange = () => {
  log(`Mini map zoom to: ${settings.config.MiniMapZoom}%`);
  settings.config.MiniMapZoom = document.getElementById("MiniMapZoom").value;
  settings.save();
  document.querySelector(
    "#minimap"
  ).style.zoom = `${settings.config.MiniMapZoom}%`;
};
document.getElementById("MiniMapZoom").value = settings.config.MiniMapZoom;
document.querySelector(
  "#minimap"
).style.zoom = `${settings.config.MiniMapZoom}%`;

document.getElementById("nameIcon").onchange = () => {
  if (
    document.getElementById("nameIcon").checked ||
    confirm(
      "DISCLAIMER: We highly recommend you leave this setting enabled. This setting adds a custom symbol before your nickname so you can be recognized in-game as a user of the extension. If you want to disable the setting, press OK."
    )
  ) {
    settings.config.nameIcon = document.getElementById("nameIcon").checked;
    settings.save();
  } else {
    document.getElementById("nameIcon").checked = true;
  }
  log(`Name icon set to: ${document.getElementById("nameIcon").checked}`);
};

document.getElementById("openBatterySettings").onclick = () => {
  batteryPopup.show();
};

let skin = new files.uploader("skinInp");
skin.load(document.getElementById("customSkins"));

let skins = new dropDown(
  "name",
  "skins",
  "Skin",
  "Save skin",
  "Remove skin",
  (me) => {
    let changed = false;
    settings.config.skins.filter((obj) => {
      if (obj.name === document.querySelector(`#${me.id}Select`).value) {
        changed = true;
        localStorage.setItem(
          "skinEditorImages",
          JSON.stringify(obj.JSON.images)
        );
        localStorage.setItem(
          "skinEditorSkinModel",
          JSON.stringify(obj.JSON.spec)
        );
        settings.config.activeSkinName = obj.name;
        settings.save();
      }
      return true;
    });
    if (!changed) {
      settings.config.activeSkinName = "";
      settings.save();
      location.replace("/");
    } else {
      location.replace("/?skin-editor");
    }
  },
  true,
  (me) => {
    settings.config.skins.push({
      name: document.getElementById("skinName").value,
      JSON: JSON.parse(skin.text),
    });
    document.getElementById("skinName").value = "";
    me.loadItems();
    settings.save();
  },
  (me) => {
    settings.config[me.id] = settings.config[me.id].filter(
      (obj) => obj[me.key] !== document.querySelector(`#${me.id}Select`).value
    );
    me.loadItems();
    settings.config.activeSkinName = "";
    settings.save();
    location.replace("/");
  }
);
skins.load(document.querySelector("#customSkins"));
skins.loadItems();
settings.config.activeSkinName !== "" &&
  skins.select(settings.config.activeSkinName);

// leveling presets
// auto leveling presets UI
let levelPresets = new dropDown(
  "name",
  "levelPresets",
  "Preset",
  "Save preset",
  "Remove preset",
  (me) => {
    settings.config.levelPresets = settings.config.levelPresets.filter(
      (obj) => {
        obj.name === document.querySelector(`#${me.id}Select`).value
          ? (document.querySelector("#upgradesJSON").value = obj.upgradingOrder)
          : null;
        return true;
      }
    );
  },
  true,
  (me) => {
    settings.config.levelPresets.push({
      name: document.getElementById("upgradesName").value,
      upgradingOrder: document.getElementById("upgradesJSON").value,
    });
    document.getElementById("upgradesName").value = "";
    me.loadItems();
    settings.save();
  }
);
levelPresets.load(document.querySelector("#preset"));
levelPresets.loadItems();

// Open levels popup
document.getElementById("openLvlConfig").onclick = () => {
  autoPopup.show();
};

// Make a popup for advanced settings
let permissions = checkPermissions(false);
let advancedSettings = new popup("advancedSettings");
advancedSettings.load(
  `
        <div class="name">CSS customizer</div>
        <br />
        <textarea ${
          !(permissions.premium || hasLicense()) ? "disabled" : ""
        } style="width: 600px;" id="cssInput" placeholder="${
    !(permissions.premium || hasLicense())
      ? "Premium feature"
      : "CSS in here, then click save CSS"
  }">${settings.config.css}</textarea>
        <br /><br />
        <button id="saveCSS" style="margin: auto;" type="button" class="button" lang="en">Save CSS (note: this will reload page)</button>
        <br /><br /><br /><br />
        <div class="name">License key</div>
        <br />
        <textarea style="width: 600px;" id="UUIDinput" placeholder="UUID License key"></textarea>
          <br /><br />
          <button id="saveUUID" style="margin: auto;" type="button" class="button" lang="en">Save License (note: this will reload page)</button>
          <br /><br />
          <button id="clearUUID" style="margin: auto;" type="button" class="button" lang="en">Clear License (note: this will reload page)</button>
        <br /><br /><br />
        <div class="name">Settings:</div>
        <br /><br />
        <div class="name">Import Config:</div>
        <br />
        <div id="importSettings"></div>
        <br />
        <div class="name">Import Theme:</div>
        <br />
        <div id="importTheme"></div>
        <br /><br />
        <div class="name">Export:</div>
        <br/>
        <button id="exportSettings" style="margin: auto;" type="button" class="button" lang="en">Download config file</button>
        <br/><br />
        <button id="exportLogs" style="margin: auto;" type="button" class="button" lang="en">Download developer logs</button>
    `,
  document.body
);

// Make input for import
let settingsFile = new files.uploader("settingsFile", (text) => {
  localStorage.setItem("config", text);
  location.reload();
});
settingsFile.load(document.getElementById("importSettings"));

// Make input for import
let settingsTheme = new files.uploader("settingsTheme", (text) => {
  console.log(text);
  console.log(JSON.parse(text));
  let json = JSON.parse(text),
    newKeys = "",
    unboundKeys = "";
  for (const [key, value] of Object.entries(json)) {
    if (settings.config[key] !== undefined) {
      newKeys += `${key}, `;
    } else {
      unboundKeys += `${key}`;
    }
  }
  if (unboundKeys.length !== 0) {
    console.warn(
      `WARNING: keys: "${unboundKeys}" were not bound. They will be added to the config file but will not do anything.`
    );
  }
  if (
    confirm(
      `Warning: Merging this theme file with your current config file will replace the following keys: ${newKeys} NOTE: Some keys will be combined not replaced.`
    )
  ) {
    // json = mergeObjects(json, settings.config);
    for (let key in settings.config) {
      console.log(key);
      if (key in json) {
        if (typeof settings.config[key] === "object") {
          if (settings.config[key].constructor == Object) {
            console.log("OBJECT MERGE");
            json[key] = mergeObjects(json[key], settings.config[key]);
          } else if (settings.config[key].constructor == Array) {
            console.log(settings.config[key], json[key]);
            console.log("LIST MERGE");
            json[key].push(...settings.config[key]);
          }
        } else if (key === "css") {
          console.log("STRING MERGE");
          json[key] = json[key] || ""; // Initialize json[key] as an empty string if it's not already
          json[key] += settings.config[key]; // Concatenate strings
        } else {
          console.log("REPLACE");
          json[key] = settings.config[key];
        }
      } else {
        console.log("KEEP");
        json[key] = settings.config[key];
      }
      console.log("");
      console.log("");
    }
    settings.save(json);
    // location.reload();
  }
});
settingsTheme.load(document.getElementById("importTheme"));

// Click events for advanced settings
document.getElementById("exportSettings").onclick = () => {
  alert(
    `This file is not encrypted(will be in 1.2.5) so if you share this your name font could be copied! Including all other things saved in the extension.`
  );
  log(`Exporting Settings`);
  files.downloader(JSON.stringify(settings.config), "CONFIG", "txt");
};

document.getElementById("exportLogs").onclick = () => {
  alert(
    `This file is encrypted. This file allows devs to read the actions you did leading up to the error.`
  );
  log(`Exporting Logs`);
  files.downloader(localStorage.getItem("logs"), "DEV_LOGS", "txt");
};

document.getElementById("openAdvancedSettings").onclick = () => {
  advancedSettings.show();
};

document.getElementById("addKeybindDropdown").innerHTML +=
  "<option disabled>Chose an option</option>";
for (let key in actions) {
  document.getElementById("addKeybindDropdown").innerHTML +=
    '<option value="' + key + '">' + key + "</option>";
}
document.getElementById("addKeybindDropdown").value = "Chose an option";
document.getElementById("addKeybindDButton").onclick = () => {
  log(`Adding Keybind: ${document.getElementById("addKeybindDropdown").value}`);
  settings.config.keyBinds[
    document.getElementById("addKeybindDropdown").value
  ] = {
    action: document.getElementById("addKeybindDropdown").value,
    keys: ["", ""],
  };
  loadKeyBinds();
};

document.getElementById("removeKeybindDButton").onclick = () => {
  log(
    `Removing Keybind: ${document.getElementById("addKeybindDropdown").value}`
  );
  delete settings.config.keyBinds[
    document.getElementById("addKeybindDropdown").value
  ];
  settings.save();
  loadKeyBinds();
};

document.getElementById("checkForPrem").onclick = () => {
  log(`Checking for premium`);
  let Licensed = hasLicense();
  if (!Licensed) {
    permissions = checkPermissions("signedIn");
    if (permissions.signedIn === false) {
      return;
    }
  } else {
    alert("You don't have premium. But you have a License.");
    return;
  }
  pageError("Checking If You Have Premium. Reloading Page Once Done.");
  new Promise(async (resolve, reject) => {
    // Open account settings
    await wait(1000);
    document.querySelector("#my-account-button").click();
    // Look if it's premium
    await wait(1000);
    settings.config.accountIsPrem =
      document.querySelector("#account-standard").style.display === "none";
    await wait(1000);
    // Close account settings
    document.querySelector("#my-account > div.center > div > button").click();
    // Save to settings
    settings.save();
    send(
      "accountIsPrem" + (settings.config.accountIsPrem ? ",true" : ",false")
    );
    alert(
      `You ${
        settings.config.accountIsPrem
          ? "have premium! You may now freely use all the features this extension has!"
          : "don't have premium. You have limited use of this extension."
      } `
    );
    location.reload();
    resolve();
  });
};

document.getElementById("saveCSS").onclick = () => {
  log(`Saved CSS`);
  permissions = checkPermissions();
  if (permissions.premium === false) {
    return;
  }
  if (permissions.signedIn === false) {
    return;
  }
  let json = JSON.parse(localStorage.getItem("config"));
  json.css = document.getElementById("cssInput").value;
  localStorage.setItem("config", JSON.stringify(json));
  location.reload();
};

document.getElementById("saveUUID").onclick = () => {
  log(`Trying license key`);
  if (hasLicense(document.getElementById("UUIDinput").value)) {
    settings.config.licenseKey = document.getElementById("UUIDinput").value;
    settings.save();
    alert(
      "License Key Entered! You may now freely use all the features this extension has!"
    );
    location.reload();
  } else {
    alert(
      "License Key Failed! This license key is incorrect or does'nt exist anymore."
    );
    settings.config.licenseKey = "";
  }
};

document.getElementById("clearUUID").onclick = () => {
  log(`Cleared license key`);
  if (
    confirm(
      "You can not undo this, are you sure you would like to clear your license key?"
    )
  ) {
    settings.config.licenseKey = "";
    settings.save();
    location.reload();
  }
};
