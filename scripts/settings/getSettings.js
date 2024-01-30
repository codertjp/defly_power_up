function mergeObjects(obj1, obj2) {
  for (let key in obj2) {
    if (!(key in obj1)) {
      obj1[key] = obj2[key];
    }
  }
  return obj1;
}

const configTemp = {
  licenseKey: '',
  upgrades: {},
  thx: true,
  css: "",
  addAlts: true,
  addDiscord: true,
  activeSkinName: "",
  skins: [],
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
  },
  load() {
    if (!(localStorage.getItem("config") === null)) {
      this.config = JSON.parse(localStorage.getItem("config"));
    }
    this.config = mergeObjects(this.config, configTemp);
  },
};
settings.load();

if (
  (settings.config.version && settings.config.version === 2) ||
  settings.config.keyBinds.length === 0
) {
  settings.config.version = 2;
} else {
  settings.config.keyBinds = {};
  settings.config.version = 2;
}
settings.save();
