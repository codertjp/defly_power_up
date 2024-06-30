new Feature(
  "noSignInCheckbox",
  //Up:
  (feature) => {
      setTimeout(() => {
        if (settings.config.noSignInCheckbox) {
            if (!document.querySelector("#privacy-policy-checkbox").checked) {
              document.querySelector("#privacy-policy-checkbox").click();
            }
            document.querySelector(
              "#login-popup > table > tbody > tr:nth-child(3) > td"
            ).style.display = "none";
          }
    }, 750);
  },
  // Down:
  (feature) => {
    if (document.querySelector("#privacy-policy-checkbox").checked) {
      document.querySelector("#privacy-policy-checkbox").click();
    }
    document.querySelector(
      "#login-popup > table > tbody > tr:nth-child(3) > td"
    ).style.display = "block";
  }
);
