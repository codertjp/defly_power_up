new Feature(
  "Beta",
  //Up:
  (feature) => {
    if (manifest.version_name) {
      document.querySelector(
        "#homepage-content > div.middle-box > div > div.logo > img"
      ).src = `${urls.API.base.replace("/api", "")}/image/defly_preveiw.png`;
      `
            <div id="versionDpup" style="
                color: white;
                position: absolute;
                bottom: 70px;
                right: 10px;
            ">
                <img src="https://codertjp.com/image/coin.png" style="
                    height: 20px;
                    width: 20px;
                    vertical-align: middle;
                ">
                - ${manifest.version_name}
            </div>
            `.applyTo("versionDpupCon");
    }
  },
  // Down
  (feature) => {
    if (
      document.querySelector(
        "#homepage-content > div.middle-box > div > div.logo > img"
      ).src === `${urls.API.base.replace("/api", "")}/image/defly_preveiw.png`
    ) {
      document.querySelector(
        "#homepage-content > div.middle-box > div > div.logo > img"
      ).src = "https://defly.io/img/logo2.png";
    }
    document.getElementById("versionDpupCon") !== null
      ? document.getElementById("versionDpupCon").remove()
      : null;
  },
  //Auto Enable:
  false,
  // Is Permission:
  false
);
