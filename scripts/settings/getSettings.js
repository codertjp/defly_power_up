let updateHTML = `
<h1>Welcome to: </h1>
<h2>{{version}}</h2>
<h3>This update brings API!</h3>
<h4>Release notes:</h4>
`;

function mergeObjects(obj1, obj2) {
  for (let key in obj2) {
    if (!(key in obj1)) {
      obj1[key] = obj2[key];
    }
  }
  return obj1;
}

let configTemp = {
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
  save(settings = this.config) {
    localStorage.setItem("config", JSON.stringify(settings));
    this.config = settings;
  },
  load() {
    if (!(localStorage.getItem("config") === null)) {
      this.config = JSON.parse(localStorage.getItem("config"));
    }
    this.config = mergeObjects(this.config, configTemp);
  },
};
settings.load();
settings.save();

let manifest = chrome.runtime.getManifest();
let prams = {
  version: manifest.version,
};

updateHTML = updateHTML.replaceAll(/{{(.+)}}/gi, function (word, key) {
  return prams[key];
});

settings.save();
