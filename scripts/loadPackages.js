let user = { name: "", coins: 0, permissions: [] };
let disabledPackagesGlobal = [];
let allowedPackagesUser = [];

const currentUserCache = new Cache("user", "object");
const bannedCache = new Cache("banned", "string");

const defaultPackages = {
  altName: false,
  chatMute: false,
  eliteSkinHighlight: false,
  menuList: false,
  screen1v1: false,
  screenChat: false,
  settings_advanced: true,
  settings_autoUpgrade: true,
  settings_battery: true,
  settings_checkboxes: false,
  settings_config_port: true,
  settings_css: false,
  settings_custom_skins: false,
  settings_html_addons: false,
  settings_json_parser: false,
  settings_keybinds: true,
  settings_license_key: true,
  settings_logs_port: true,
  settings_mimi_map_zoom: false,
  settings_superpower_text: false,
  settings_theme_port: false,
  settings_verify_prem: true,
  settings: true,
  openDiscord: true,
};

let packages = defaultPackages;

const perms = {
  events: [],
  sub: (f) => {
    perms.events.push(f);
  },
};

function permsChange(force = false) {
  if (!force && !("disable" in settings.config && settings.config.disable)) {
    try {
      resetPerms();
    } catch (e) {
      null;
    }
  }
  perms.events.forEach((f) => {
    f();
  });
}

if (
  settings.config.licenseKey &&
  settings.config.licenseKey.length !== 0 &&
  bannedCache.get() !== "true"
) {
  function resetPerms() {
    Object.keys(packages).forEach(
      (v) => (packages[v] = allowedPackagesUser[0] === "<all>")
    );
    if (allowedPackagesUser[0] !== "<all>") {
      allowedPackagesUser.forEach((e) => {
        packages[e] = true;
      });
    }

    disabledPackagesGlobal.forEach((e) => {
      packages[e] = false;
    });
  }
  resetPerms();

  function getUserPerms() {
    urls.API.fetchData.User(settings.config.licenseKey, (userData) => {
      urls.API.fetchData.Bans((e) => {
        let inputUserName = document.querySelector("#username").value,
          banned = [false, []];
        e.data.forEach((item) => {
          let name = item.name,
            userName = inputUserName;
          if (item.ignoreCase) {
            name = name.toLowerCase();
            userName = userName.toLowerCase();
          }
          if (item.ignoreFont) {
            name = name.strip();
            userName = userName.strip();
          }
          if (name === userName) {
            banned = [true, item];
            Object.keys(packages).forEach((v) => (packages[v] = false));
            permsChange(true);
            return;
          }
        });
        if (!banned[0]) {
          user = userData.data;
          allowedPackagesUser = user.permissions;
          permsChange();
          currentUserCache.save(user);
        } else {
          if (banned[1].type === "warn") {
            pageError(
              `The name you have enter is being warned. (This message will continue to show up until a admin removes it)`,
              "popup"
            );
            user = userData.data;
            allowedPackagesUser = user.permissions;
            permsChange();
            currentUserCache.save(user);
            return;
          }
          allowedPackagesUser = [];
          if (banned[1].type === "no_load") {
            currentUserCache.save({
              name: "BANNED_USER",
              coins: 0,
              permissions: [],
              role: "disabled",
            });
          } else if (banned[1].type === "perm_ban") {
            bannedCache.save("true");
          }
          permsChange();
        }
      });
    });
  }

  getUserPerms();
}

if (currentUserCache.get().permissions !== null) {
  if (bannedCache.get() === "true") {
    Object.keys(packages).forEach((v) => (packages[v] = false));
  } else {
    allowedPackagesUser = currentUserCache.get().permissions;
  }
  permsChange(bannedCache.get() === "true");
}
