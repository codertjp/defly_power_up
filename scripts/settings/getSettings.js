let updateHTML = `
<h1>Welcome to: </h1>
<h2>{{version}}</h2>
<h3>We hope you enjoy this update</h3>
<h4>Release notes:</h4>
<li>Added a link list on the right side of the screen, having links related to defly shown directly on the homepage!</li>
<li>Added color hex codes once your mouse hovers over a color in the skins menu. (This was supposed to be in 1.2.3, but was fixed to show on every browser.)</li>
<li>Added color highlights on the Elite skin tab as well as text that shows what team won each elite skin.</li>
<li>Added a new battery page for computers that support battery usage.</li>
<li>Fixed a bug that drained battery usage on the infoScreen.</li>
<li>Added a minimap zoom slider! You can change the size via the settings.</li>
<li>Added a subscript character to the beginning of users' names at the beginning of the description. This displays like a clan tag, and is automatically enabled. You can disable it if wanted.</li>
<li>Added the ability to inject HTML anywhere on the page!</li>
<li>Added theme importing! Use your own custom theme or use someone else's to customize the page in ways never seen before!</li>
<li>Added support for configuration files! Saving the data for the extension to a file is now possible and importing configuration is now possible using this.</li>
<li>Added the ability to mute players! While in chat, mute them by clicking on their name. There will be a future update making it easier to unmute players after muting them.</li>
<li>Added advanced censorship with names and text chat.</li>
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
