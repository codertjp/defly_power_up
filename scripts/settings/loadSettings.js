function loadExtendedSettings() {
  if (document.getElementById("deflySettings") !== null) {
    document.getElementById("deflySettings").remove();
  }
  if (document.getElementById("advancedSettings") !== null) {
    document.getElementById("advancedSettings").remove();
  }
  let deflySettings = document.createElement("div");
  deflySettings.style.width = "100%";
  deflySettings.id = "deflySettings";
  deflySettings.innerHTML = `
<div ${packages.settings ? "" : 'style="display: none;"'}>
    <br />
    <br />
    <br />
    <div style="width: 100%; text-align: center;"><h2>Defly Helper</h2></div>
    <!--<a href="https://discord.gg/9yqe4pUc9V"><button type="button" class="button" lang="en">Join our discord to give feedback!</button></a>-->
    <a href="https://discord.gg/9yqe4pUc9V" target="_blank"> <img style="border-radius: 87px; transform: translate(25%, 0%);" src="https://discordapp.com/api/guilds/1193933883624919091/widget.png?style=banner2"></a>
    <div ${packages.settings_mimi_map_zoom ? "" : 'style="display: none;"'}>
        <br />
        <br />
        <div class="name">Mini Map Zoom</div>
        <input id="MiniMapZoom" type="range" min="100" max="500" />
    </div>
    <div ${packages.settings_checkboxes ? "" : 'style="display: none;"'}>
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
    </div>
    <div ${packages.settings_verify_prem ? "" : 'style="display: none;"'}>
        <br />
        <button id="checkForPrem" type="button" class="button" lang="en">Verify Premium</button>
    </div>
    </div>
    <div ${packages.settings_keybinds ? "" : 'style="display: none;"'}>
        <br />
        <br />
        <div class="name">Add a keybind:</div>
        <select id="addKeybindDropdown">
        </select>
        <br />
        <button id="addKeybindDButton" type="button" class="button" lang="en">Add key bind</button>
        <br />
        <button id="removeKeybindButton" type="button" class="button" style="margin-bottom: 1px;background-color: red; box-shadow: 0 2px 10px rgba(0,0,0,.2), 0 4px 0 red;" lang="en">Remove key bind</button>
    </div>
    <div ${packages.settings_autoUpgrade ? "" : 'style="display: none;"'}>
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
        <button id="levelNumbers" type="button" class="button" lang="en">Get levels in number form</button>
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
    </div>
    <div ${packages.settings_superpower_text ? "" : 'style="display: none;"'}>
        <br />
        <br />
        <div class="name">Custom Superpower Text:</div>
        <input id="spText" style="width: 100%;" placeholder="Enter a superpower header text"/>
    </div>
    <div ${packages.settings_html_addons ? "" : 'style="display: none;"'}>
        <br />
        <br />
        <button id="openHTMLaddons" type="button" class="button" lang="en">Open HTML addons</button>
    </div>
    <div ${packages.settings_battery ? "" : 'style="display: none;"'}>
        <br />
        <br />
        <button id="openBatterySettings" type="button" class="button" lang="en">Open Battery Settings</button>
    </div>
    <br />
    <br />
    <div class="name">Game's played: ${localStorage.getItem(
      "gamesPlayed"
    )}</div>
    <div id="customSkins" ${
      packages.settings_custom_skins ? "" : 'style="display: none;"'
    }>
        <br />
        <br />
        <svg style="width: 15px; height: 15px;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
        <div class="name">Warning this requires a lot of space. Skin files can be very large!</div>
        <input id="skinName" style="width: 100%;" placeholder="Enter a name for your skin..."/>
        <br />
        <br />
    </div>
    <button id="deflyMonsterImport" type="button" class="button" lang="en">Defly Monster Skin Import</button>
    <div ${packages.settings_advanced ? "" : 'style="display: none;"'}>
    <br />
    <br /
    <br />
        <svg style="width: 15px; height: 15px;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
        <div class="name">Warning this is advanced!</div>
        <button id="openAdvancedSettings" type="button" class="button" lang="en">Open advanced settings...</button>
    </div>
</div>`;

  // Load settings to page
  document.querySelector("#settings-popup").appendChild(deflySettings);
  if (packages.settings_superpower_text) {
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
  }
  document.querySelector("#share").onclick = () => {
    log(`Share Open`);
    send(`share:${encrypt(JSON.stringify(settings.config.levelPresets))}`);
  };

  if (document.getElementById("alt2Span") !== null) {
    document.getElementById("alt2Span").remove();
  }

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
    document.querySelector("#menu").style.display = document.getElementById(
      "linkList"
    ).checked
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
            ? (document.querySelector("#upgradesJSON").value =
                obj.upgradingOrder)
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

  document.getElementById("levelNumbers").onclick = () => {
    let count = countItems(
      JSON.parse(document.getElementById("upgradesJSON").value || "[]"),
      {
        "Player speed": 0,
        "Bullet speed": 0,
        "Bullet range": 0,
        "Reload speed": 0,
        "Build range": 0,
        "Tower shield": 0,
        "Tower health": 0,
      }
    );
    alert(
      `${count["Player speed"]}${count["Bullet speed"]}${count["Bullet range"]}${count["Reload speed"]}${count["Build range"]}${count["Tower shield"]}${count["Tower health"]}`
    );
  };

  //   if (document.getElementById("advancedSettings") !== null) {
  //     console.log(document.getElementById("advancedSettings").parentElement);
  //     document.getElementById("advancedSettings").parentElement.remove();
  //   }

  // Make a popup for advanced settings
  let permissions = checkPermissions(false);
  let advancedSettings = new popup("advancedSettings");
  advancedSettings.load(
    `
        <div ${packages.settings_css ? "" : 'style="display: none;"'}>
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
        </div>

        <div ${packages.settings_license_key ? "" : 'style="display: none;"'}>
            <div class="name">License key</div>
            <br />
            <textarea ${
              settings.config.licenseKey &&
              settings.config.licenseKey.length !== 0
                ? "disabled"
                : ""
            } style="width: 600px;" id="UUIDinput" placeholder="${
      settings.config.licenseKey && settings.config.licenseKey.length !== 0
        ? "You have already entered a license key"
        : "UUID License key"
    }"></textarea>
            <br />
            <br />
            <button id="saveUUID" style="margin: auto;" type="button" class="button" lang="en">Save License (note: this will reload page)</button>
            <br />
            <br />
            <button id="clearUUID" style="margin: auto;" type="button" class="button" lang="en">Clear License (note: this will reload page)</button>
            <br />
            <br />
            <br />
        </div>

        <div class="name">Settings:</div>
        <br /><br />
        <div ${packages.settings_config_port ? "" : 'style="display: none;"'}>
            <div class="name">Import Config:</div>
            <br />
            <div id="importSettings"></div>
            <br />
        </div>
        <div ${packages.settings_theme_port ? "" : 'style="display: none;"'}>
            <div class="name">Import Theme:</div>
            <br />
            <div id="importTheme"></div>
            <br /><br />
        </div>
        <div class="name">Export:</div>
        <br/>
        <br/>
        <div ${packages.settings_config_port ? "" : 'style="display: none;"'}>
            <button id="exportSettings" style="margin: auto;" type="button" class="button" lang="en">Download config file</button>
            <br/><br />
        </div>
        <div ${packages.settings_logs_port ? "" : 'style="display: none;"'}>
            <button id="exportLogs" style="margin: auto;" type="button" class="button" lang="en">Download developer logs</button>
            <br/><br />
        </div>
        <div ${packages.settings_json_parser ? "" : 'style="display: none;"'}>
            <button id="openJSON" style="margin: auto;" type="button" class="button" lang="en">Open JSON Processor</button>
        </div>
    `,
    document.body
  );

  // Make input for import
  if (packages.settings_config_port) {
    let settingsFile = new files.uploader(
      "settingsFile",
      (text) => {
        try {
          JSON.parse(text);
        } catch (e) {
          pageError("Really? That's not even a config file...", "popup");
          return;
        }
        localStorage.setItem("config", text);
        location.reload();
      },
      ".txt"
    );
    settingsFile.load(document.getElementById("importSettings"));
  }
  if (packages.settings_theme_port) {
    // Make input for import
    let settingsTheme = new files.uploader(
      "settingsTheme",
      (text) => {
        let json = {},
          newKeys = "",
          unboundKeys = "";
        try {
          json = JSON.parse(text);
        } catch (e) {
          pageError("Really? That's not even a theme file...", "popup");
          return;
        }
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
            `Warning: Merging this theme file with your current config file will merge the following keys: ${newKeys} NOTE: Most keys will be combined not replaced.`
          )
        ) {
          // json = mergeObjects(json, settings.config);
          for (let key in settings.config) {
            if (key in json) {
              if (typeof settings.config[key] === "object") {
                if (settings.config[key].constructor == Object) {
                  json[key] = mergeObjects(json[key], settings.config[key]);
                } else if (settings.config[key].constructor == Array) {
                  json[key].push(...settings.config[key]);
                }
              } else if (key === "css") {
                json[key] = json[key] || ""; // Initialize json[key] as an empty string if it's not already
                json[key] += settings.config[key]; // Concatenate strings
              } else {
                json[key] = settings.config[key];
              }
            } else {
              json[key] = settings.config[key];
            }
          }
          settings.save(json);
          // location.reload();
        }
      },
      ".theme"
    );
    settingsTheme.load(document.getElementById("importTheme"));
  }

  if (packages.settings_config_port) {
    // Click events for advanced settings
    document.getElementById("exportSettings").onclick = () => {
      alert(
        `This file is not encrypted so if you share this your name font could be copied! Including all other things saved in the extension.`
      );
      log(`Exporting Settings`);
      files.downloader(JSON.stringify(settings.config), "CONFIG", "txt");
    };
  }
  if (packages.settings_logs_port) {
    document.getElementById("exportLogs").onclick = () => {
      alert(
        `This file is encrypted. This file allows devs to read the actions you did leading up to the error.`
      );
      log(`Exporting Logs`);
      files.downloader(localStorage.getItem("logs"), "DEV_LOGS", "txt");
    };
  }

  document.getElementById("openJSON").onclick = () => {
    send("JSON");
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
    log(
      `Adding Keybind: ${document.getElementById("addKeybindDropdown").value}`
    );
    settings.config.keyBinds[
      document.getElementById("addKeybindDropdown").value
    ] = {
      action: document.getElementById("addKeybindDropdown").value,
      keys: ["", ""],
    };
    loadKeyBinds();
  };

  document.getElementById("removeKeybindButton").onclick = () => {
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
        "accountIsPrem," + (settings.config.accountIsPrem ? "true" : "false")
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

  if (packages.settings_css) {
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
  }

  if (packages.settings_license_key) {
    document.getElementById("saveUUID").onclick = () => {
      log(`Trying license key`);
      testURL(
        urls.API.user(document.getElementById("UUIDinput").value),
        async (response) => {
          let e = await response.json();
          if (response.status === 200) {
            settings.config.licenseKey =
              document.getElementById("UUIDinput").value;
            settings.save();
            alert(`Your account is now connected! Welcome back ${e.data.name}`);
            location.reload();
          } else if (response.status === 404) {
            alert(
              "License Key Failed! This license key is incorrect or doesn't exist anymore."
            );
          }
        });
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
  }
}

loadExtendedSettings();
perms.sub(() => {
  loadExtendedSettings();
});

perms.sub(() => {
  document.getElementById(altNameDropDown.id).style.display = packages.altName
    ? ""
    : "none";
  document.getElementById("alt2").style.display = packages.altName
    ? ""
    : "none";
});

perms.sub(() => {
  if (!packages.menuList) {
    if (document.getElementById("hidingMenuList") !== null) {
      document.getElementById("hidingMenuList").remove();
    }
    let hidingMenuList = document.createElement("style");
    hidingMenuList.id = "hidingMenuList";
    hidingMenuList.innerHTML += `
              #menu {
                display: none !important;
              }
              `;
    document.body.appendChild(hidingMenuList);
  } else {
    if (document.getElementById("hidingMenuList") !== null) {
      document.getElementById("hidingMenuList").remove();
    }
  }
});

perms.sub(() => {
  reloadAltDropDown();
  if (!packages.openDiscord) {
    if (document.getElementById("hidingOpenDiscord") !== null) {
      document.getElementById("hidingOpenDiscord").remove();
    }
    let hidingOpenDiscord = document.createElement("style");
    hidingOpenDiscord.id = "hidingOpenDiscord";
    hidingOpenDiscord.innerHTML += `
        #discordChatType {
            display: none !important;
        }
    `;
    document.body.appendChild(hidingOpenDiscord);
  } else {
    if (document.getElementById("hidingOpenDiscord") !== null) {
      document.getElementById("hidingOpenDiscord").remove();
    }
  }
});

function reloadAltDropDown() {
  altNameDropDown.select(document.querySelector("#username").value);
}
