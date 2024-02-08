// Find index of prem icon
async function getIcon() {
  if (!settings.config.accountIsPrem) {
    return 0;
  }
  document.querySelector("#my-account-button").click();
  await wait(500);
  document.querySelector("#my-account > div.center > div > button").click();
  await wait(500);
  const parentElement = document.getElementById("badge-select");
  const className = "selected";
  const index = findIndexOfSelectedElement(parentElement, className);
  return index;
}

// Change name and refresh page to show changes
function changeName(username) {
  new Promise(async (resolve, reject) => {
    let obj = settings.config.accounts.find(
      (item) => item.username === username
    );
    if (obj === undefined) {
      return "Name not found";
    }
    localStorage.setItem("username", obj.username);
    localStorage.setItem("playerSkin", obj.skin);
    if ("accountIsPrem" in settings.config && settings.config.accountIsPrem) {
      document.querySelector("#my-account-button").click();
      await wait(1250);
      document.querySelector("#badge-select").childNodes[obj.symbol].click();
      await wait(100);
    }
    location.reload();
    resolve();
  });
}

let altNameDropDown = new dropDown(
  "username",
  "accounts",
  "Name",
  "Save name",
  "Remove name",
  (me) => {
    changeName(document.querySelector(`#${me.id}Select`).value);
  },
  false,
  (me) => {
    new Promise(async (resolve, reject) => {
      let obj = {};
      if (settings.config.accountIsPrem) {
        let symbol = await getIcon();
        obj = {
          username: document.querySelector("#username").value,
          skin: localStorage.getItem("playerSkin"),
          symbol: symbol,
        };
      } else {
        obj = {
          username: document.querySelector("#username").value,
          skin: localStorage.getItem("playerSkin"),
        };
      }
      settings.config.accounts.push(obj);
      me.loadItems();
      settings.save();
    });
  }
);

altNameDropDown.load(document.querySelector("#homepage-loaded"));
altNameDropDown.loadItems();
document.querySelector("#accounts").style.display = "none";

let symbol = "♦";
setTimeout(() => {
  altNameDropDown.select(
    document.querySelector("#username").value.replace(symbol, "")
  );
  document.querySelector("#username").value = document
    .querySelector("#username")
    .value.replace(symbol, "");

  document.querySelector("#play-button").addEventListener("click", (e) => {
    if (settings.config.nameIcon) {
      document.querySelector("#username").value = `${symbol}${
        document.querySelector("#username").value
      }`;
      document.querySelector("#username").setAttribute("disabled", "");
    }
  });
}, 200);
