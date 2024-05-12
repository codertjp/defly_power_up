versions.CLI = '1.0.0';

battery = {
  charging: false,
  chargingTime: Infinity,
  dischargingTime: Infinity,
  level: 0,
  onchargingchange: null,
  onchargingtimechange: null,
  ondischargingtimechange: null,
  onlevelchange: null,
};

old = false;

function getBattery() {
  navigator.getBattery().then((e) => {
    battery = e;
    old = e.charging;
  });
}

setInterval(() => {
  document.getElementById("batteryLevel").innerText = battery.level * 100;
  if (settings.config.batteryChangeOnPower) {
    settings.config.batteryOptimize = !battery.charging;
    settings.save();
    document.getElementById("batteryOptimize").checked = !battery.charging;
  }
  if (old !== battery.charging && settings.config.batteryChangeNotification) {
    log(`Power on ${!settings.config.batteryOptimize ? "Wall" : "battery"}`);
    pageError(
      `Power mode: ${!settings.config.batteryOptimize ? "Wall" : "battery"}.`,
      "popup"
    );
  }
  old = battery.charging;
}, 5000);
getBattery();

let batteryPopup = new popup("Battery");
batteryPopup.load(
  `
    <h1>Battery</h1>
    <h2>Level: <span id="batteryLevel" class="number">${
      battery.level * 100
    }</span>%</h2>
    <div>
    <br />
    <input type="checkbox" id="batteryOptimize" name="batteryOptimize" ${
      settings.config.batteryOptimize ? "checked" : ""
    }>
    <label id="batteryOptimizeLabel" for="batteryOptimize">Optimize battery</label>
    <br />
    <input type="checkbox" id="batteryChangeOnPower" name="batteryChangeOnPower" ${
      settings.config.batteryChangeOnPower ? "checked" : ""
    }>
    <label for="batteryChangeOnPower">Change Optimize Battery On Power Change</label>
    <br />
    <input type="checkbox" id="batteryChangeNotification" name="batteryChangeNotification" ${
      settings.config.batteryChangeNotification ? "checked" : ""
    }>
      <label for="batteryChangeNotification">Give a Notification When Power Mode Changes</label>
    </div>
`,
  document.body
);

if (settings.config.batteryChangeOnPower) {
  document.getElementById("batteryOptimize").setAttribute("disabled", "");
  document.getElementById("batteryOptimizeLabel").innerText =
    "Optimize battery (This Is In Automatic)";
}
document.getElementById("batteryOptimize").onchange = () => {
  settings.config.batteryOptimize =
    document.getElementById("batteryOptimize").checked;
  settings.save();
};
document.getElementById("batteryChangeOnPower").onchange = () => {
  settings.config.batteryChangeOnPower = document.getElementById(
    "batteryChangeOnPower"
  ).checked;
  settings.save();
  if (settings.config.batteryChangeOnPower) {
    document.getElementById("batteryOptimize").setAttribute("disabled", "");
    document.getElementById("batteryOptimizeLabel").innerText =
      "Optimize battery (This Is In Automatic)";
  } else {
    document.getElementById("batteryOptimize").removeAttribute("disabled");
    document.getElementById("batteryOptimizeLabel").innerText =
      "Optimize battery";
  }
};
document.getElementById("batteryChangeNotification").onchange = () => {
  settings.config.batteryChangeNotification = document.getElementById(
    "batteryChangeNotification"
  ).checked;
  settings.save();
};
