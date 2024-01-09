let deflySettings = document.createElement("div");
deflySettings.style.width = "100%";
deflySettings.id = "deflySettings";
deflySettings.style.display = "none";
deflySettings.innerHTML = `
    <br />
    <br />
    <br />
    <div style="width: 100%; text-align: center;"><h2>Defly Helper</h2></div>
    <div>
    <input type="checkbox" id="alt" name="alt" ${
      settings.config.addAlts ? "checked" : ""
    }>
    <label for="alt">Show alt name changer</label>
    <br />
    <input type="checkbox" id="prem" name="prem" ${
      "accountIsPrem" in settings.config
        ? settings.config.accountIsPrem
          ? "checked"
          : ""
        : ""
    }>
    <label for="prem">Is account premium (Note: do not change unless this is wrong)</label>
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
    <br />
    <br />
    <br />
    <svg style="width: 15px; height: 15px;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
    <div class="name">Warning this is advanced and might break the extension...</div>
    <button id="openAdvancedSettings" type="button" class="button" lang="en">Open advanced settings...</button>
    `;
// Load settings to page
document.querySelector("#settings-popup").appendChild(deflySettings);

document.querySelector("#share").onclick = () => {
  send(`share:${encrypt(JSON.stringify(settings.config.levelPresets))}`);
};

document.getElementById("alt").onchange = () => {
  settings.config.addAlts = document.getElementById("alt").checked;
  document.querySelector("#accounts").style.display = document.getElementById(
    "alt"
  ).checked
    ? "block"
    : "none";
  settings.save();
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

// On/Off for account is prem
document.getElementById("prem").onchange = () => {
  settings.config.accountIsPrem = document.getElementById("prem").checked;
  settings.save();
  send("accountIsPrem" + (settings.config.accountIsPrem ? ",true" : ",false"));
};

// Open levels popup
document.getElementById("openLvlConfig").onclick = () => {
  autoPopup.show();
};

// Make a popup for advanced settings
let advancedSettings = new popup("advancedSettings");
advancedSettings.load(
  `
        <div class="name">CSS customizer</div>
        <br />
        <textarea style="width: 600px;" id="cssInput" placeholder="CSS in here, then click save CSS">${settings.config.css}</textarea>
        <br /><br />
        <button style="margin: auto;" type="button" class="button" onclick="let json = JSON.parse(localStorage.getItem('config')); json.css = document.getElementById('cssInput').value; localStorage.setItem('config', JSON.stringify(json)); location.reload();" lang="en">Save CSS (note: this will reload page)</button>
        <br /><br /><br />
        <div class="name">Settings:</div>
        <br /><br />
        <div class="name">Import:</div>
        <br />
        <div id="importSettings"></div>
        <br /><br />
        <div class="name">Export:</div>
        <br/>
        <button id="exportSettings" style="margin: auto;" type="button" class="button" lang="en">Download config file</button>
    `,
  document.body
);

// Make input for import
let settingsFile = new files.uploader("settingsFile", (text) => {
  localStorage.setItem("config", text);
  location.reload();
});
settingsFile.load(document.getElementById("importSettings"));

// Click events for advanced settings
document.getElementById("exportSettings").onclick = () => {
  files.downloader(JSON.stringify(settings.config), "CONFIG", "txt");
};

document.getElementById("openAdvancedSettings").onclick = () => {
  advancedSettings.show();
};

document.getElementById("addKeybindDropdown").innerHTML +=
  '<option disabled>Chose an option</option>';
for (let key in actions) {
  document.getElementById("addKeybindDropdown").innerHTML +=
    '<option value="' + key + '">' + key + "</option>";
}
document.getElementById("addKeybindDropdown").value = "Chose an option";
document.getElementById("addKeybindDButton").onclick = () => {
  settings.config.keyBinds[
    document.getElementById("addKeybindDropdown").value
  ] = {
    action: document.getElementById("addKeybindDropdown").value,
    keys: ["", ""],
  };
  loadKeyBinds();
};

document.getElementById("removeKeybindDButton").onclick = () => {
  delete settings.config.keyBinds[
    document.getElementById("addKeybindDropdown").value
  ];
  settings.save();
  loadKeyBinds();
};
