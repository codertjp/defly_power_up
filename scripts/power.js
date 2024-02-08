// If not in settings.config find if the account is premium
function accountIsPrem() {
  if (!("accountIsPrem" in settings.config)) {
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
      resolve();
      // Tell background.js to update the icon
      send(
        "accountIsPrem" + (settings.config.accountIsPrem ? ",true" : ",false")
      );
    });
  }
  // Tell background.js to update the icon
  send("accountIsPrem" + (settings.config.accountIsPrem ? ",true" : ",false"));
}
// Turn on
function on() {
  if (settings.config.thx) {
    let welcome = new popup("welcome", false);
    welcome.load(
      `
          <h1>Thanks for downloading Defly.io chrome extension!</h1>
          <br />
          <br />
          <br />
          <h2>We placed our settings in the settings tab (panel on the right)</h2>
          <br />
          <br />
          <h2>These settings include the following:</h2>
          <br />
          <h3>Hide/Show name changer (this allow you to quickly change you name icon and skin)</h3>
          <h3>Auto upgrader (upgrades your copter for you so you don't have to bother with clicking the + buttons)</h3>
          <h3>Displays the game's played</h3>
          <h3>Advanced:</h3>
          <h3>Change CSS on the page (like changing the color, size, or position of an element on the page) *</h3>
          <h3>Export/Import config settings</h3>
          <br />
          <h3>Icon:</h3>
          <h4>Click 1 time on the copter symbol in chrome to open defly.io</h4>
          <h4>2 times on the copter symbol to toggle disable</h4>
          <h4>3 times on the copter symbol to reset</h4>
          <br /><br />
          <h4>*You Must have premium for this</h4>
          `,
      document.body
    );
    settings.config.thx = false;
    settings.save();
  }
  accountIsPrem();
  addonHTMLadd();
  document.getElementById("alt2Span").style.display = "";
  document.querySelector("#choose-superpower > div").innerText =
  settings.config.spText;
  //   alts
  document.querySelector("#accounts").style.display = document.getElementById(
    "alt"
  ).checked
    ? "block"
    : "none";

  // --Custom CSS--
  let customCSS = document.createElement("style");
  customCSS.id = "customCSS";
  customCSS.innerHTML += settings.config.css;
  document.body.appendChild(customCSS);

  //   settings
  document.querySelector("#deflySettings").style.display = "";
}
// Turn off
function off() {
    document.querySelector("#choose-superpower > div").innerText = 'Select your superpower';
  document.getElementById("alt2Span").style.display = "none";
  const elementsToRemove = document.querySelectorAll(".customBinding");
  elementsToRemove.forEach((element) => {
    element.parentNode.removeChild(element);
  });
  //   settings
  document.querySelector("#deflySettings").style.display = "none";
  //   alts
  document.querySelector("#accounts").style.display = "none";
  // css
  document.querySelector("#customCSS").remove();
}
