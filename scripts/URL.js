const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

// Importing leveling preset
if (params.save !== null) {
  let newJSON = JSON.parse(decrypt(params.save)),
    con = confirm(`Allow '${newJSON.name}' preset to be imported?`);
  if (con) {
    settings.config.levelPresets.push(newJSON);
    settings.save();
  }
  location.replace("https://defly.io/");
}

// Connecting though https://codertjp.com
if (params.connect !== null) {
    log(`Trying license key`);
    testURL(
      urls.API.user(params.connect),
      async (response) => {
        let e = await response.json();
        if (response.status === 200) {
          settings.config.licenseKey =
            params.connect;
          settings.save();
          alert(`Your account is now connected! Welcome back ${e.data.name}`);
          location.replace('/');
        } else if (response.status === 404) {
          alert(
            "License Key Failed! This license key is incorrect or doesn't exist anymore."
          );
        }
      }
    );
}

// Auto load skin
if (
  // url has the ?skin-editor
  params["skin-editor"] !== null &&
  // skin temp not empty
  localStorage.skinEditorSkinModel !==
    '{"base":"","notint":"","rotors":[],"size":1}' &&
  // skinEditorSkinModel is in localStorage
  localStorage.skinEditorSkinModel !== undefined &&
  // extension enabled
  !settings.config.disable &&
  // settings skin dropdown has a value
  settings.config.activeSkinName !== ""
) {
  log(`Auto Loading Skin`);
  // then click "Try skin button"
  document.querySelector("#skin-editor").style.display = "none";
  pageError("Loading custom skin");
  setTimeout(() => {
    document
      .querySelector(
        "#skin-editor > div.box > div.action-buttons > div:nth-child(5)"
      )
      .click();
    setTimeout(() => {
      document.getElementById("loading-screen").remove();
    }, 500);
  }, 5000);
}
