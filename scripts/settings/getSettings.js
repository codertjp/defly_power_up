let updateHTML = `
<h2>Welcome to: {{version}} of the extension!</h2>
<h3>Release notes:</h3>
<li>Bug fixes!</li>
<br />
`;

function mergeObjects(obj1, obj2) {
  for (let key in obj2) {
    if (!(key in obj1)) {
      obj1[key] = obj2[key];
    }
  }
  return obj1;
}

const settingProtos = [];

const configTemp = {
  new: "",
  linkList: true,
  screen1v1: true,
  chatBlocking: true,
  rules: [
    // {
    //   name: "Play FFA",
    //   trigger: "play",
    //   condition: "type-IS-0",
    //   actionMode: "log",
    //   action: "Hello World",
    // },
  ],
  noSignInCheckbox: false,
  version: 0,
  mutedPeeps: [],
  muteActive: true,
  MiniMapZoom: 100,
  nameIcon: true,
  batteryOptimize: true,
  batteryChangeOnPower: true,
  batteryChangeNotification: true,
  vars: {},
  htmlAddons: [],
  spText: "Select your superpower",
  licenseKey: "",
  upgrades: {},
  skinTabs: [
    {
      name: "Custom",
      skins: [],
    },
  ],
  thx: true,
  css: "",
  addAlts: true,
  nameInsert: true,
  addDiscord: true,
  activeSkinName: "",
  skins: [],
  batterySave: true,
  accounts: [
    {
      username: "Player",
      skin: 0,
      symbol: 0,
    },
  ],
  levelPresets: [
    {
      name: "Shooter",
      upgradingOrder: [
        '["Player speed","Player speed","Player speed","Reload speed","Reload speed","Reload speed","Reload speed","Reload speed","Reload speed","Reload speed","Reload speed","Bullet speed","Bullet speed","Bullet speed","Bullet speed","Bullet speed","Bullet speed","Bullet speed","Bullet speed","Player speed","Player speed","Player speed","Player speed","Player speed","Bullet range","Bullet range","Bullet range","Bullet range","Bullet range","Bullet range","Bullet range","Bullet range"]',
      ],
    },
    {
      name: "Builder",
      upgradingOrder: [
        '["Player speed","Player speed","Player speed","Tower health","Tower health","Tower health","Tower health","Tower health","Tower health","Tower health","Tower health","Build range","Build range","Build range","Build range","Build range","Tower shield","Tower shield","Tower shield","Tower shield","Build range","Build range","Build range","Tower shield","Tower shield","Player speed","Player speed","Player speed","Player speed","Player speed"]',
      ],
    },
  ],
  keyBinds: {},
};

// Setup/get config
settings = {
  config:
    localStorage.getItem("config") === null
      ? { version: 2 }
      : JSON.parse(localStorage.getItem("config")),
  get options() {
    return this.config[value];
  },
  data: {},
  save(settings = this.config) {
    localStorage.setItem("config", JSON.stringify(settings));
    this.config = settings;
  },
  load() {
    if (!(localStorage.getItem("config") === null)) {
      this.config = JSON.parse(localStorage.getItem("config"));
    }
    this.config = mergeObjects(this.config, configTemp);
    for (const setting in settingProtos) {
      setting.addSetter();
    }
  },
};
settings.load();
settings.save();

let prams = {
  version: manifest.version,
};
//TODO: make this link to codertjp.com
updateHTML = updateHTML.replaceAll(/{{(.+)}}/gi, function (word, key) {
  return prams[key];
});

class Setting {
  constructor(id, defaultValue = "", autoSet = true) {
    this.id = id;
    this.autoSet = autoSet;
    this.defaultValue = defaultValue;
    if (!(id in settings.config)) {
      console.log("set");
      settings.config[this.id] = this.defaultValue;
      settings.data[this.id] = settings.config[this.id];
      settings.save();
    }
    if (autoSet) {
      this.addSetter();
    } else {
      this.addSetter = () => {};
    }
    settingProtos[this.id] = this;
  }
  addSetter() {
    const id = this.id;
    // return;
    Object.defineProperty(settings.data, id, {
      set(newValue) {
        console.extension("you changed", id, "to", newValue);
        settings.config[id] = newValue;
        settings.save();
        return newValue;
      },
      get() {
        return settings.config[test.id];
      },
    });
  }
}


//Example:
/*
new Setting("test");

// Set:
settings.data.test = "smth else";

//Get:
settings.data.test;

*/
