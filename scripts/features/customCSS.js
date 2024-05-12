new Feature(
  "settings_css",
  //Up:
  (feature) => {
    let customCSS = document.createElement("style");
    customCSS.id = "customCSS";
    customCSS.innerHTML += settings.config.css;
    document.body.appendChild(customCSS);
  },
  // Down
  (feature) => {
    if (document.getElementById("customCSS") !== null) {
      document.getElementById("customCSS").remove();
    }
  }
);
