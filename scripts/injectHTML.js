let styleRules = document.createElement("div");
styleRules.innerHTML = `
<style>
:root {
}
</style>
`;
document.body.appendChild(styleRules);
let root = document.querySelector(":root");
function setCSS(key, value) {
  root.style.setProperty(key, value);
}

let varActions = {
  reload: (name) => {
    if (!(name in settings.config.vars)) {
      settings.config.vars[name] = { value: "", elms: [] };
    }
    setCSS(`--${name}`, settings.config.vars[name].value);
    settings.config.vars[name].elms.forEach((elm) => {
      let value = settings.config.vars[name].value;
      if (elm.getAttribute("data-var-list") !== null) {
        let list = elm.getAttribute("data-var-list").split(",");
        value = list[value];
        setCSS(`--${name}`, value);
      }
      if (elm.tagName === "INPUT" || elm.tagName === "TEXTAREA") {
        elm.value = value;
      } else {
        elm.innerText = value;
      }
    });
  },
  setVar: (name, value, elm) => {
    if (!(name in settings.config.vars)) {
      settings.config.vars[name] = { value: "", elms: [] };
    }
    if (name in settings.config.vars) {
      settings.config.vars[name].value = value;
      setCSS(`--${name}`, value);
      settings.save();
    } else {
      settings.config.vars[name] = {
        value: value,
        elms: [],
      };
      settings.save();
    }
    varActions.reload(name);
  },
  change: (name, value, elm) => {
    if (!(name in settings.config.vars)) {
      settings.config.vars[name] = { value: 0, elms: [] };
    }
    if (
      settings.config.vars[name].value === "" ||
      settings.config.vars[name].value === null
    ) {
      settings.config.vars[name].value = 0;
    }
    let incr = parseInt(settings.config.vars[name].value) + value,
      min = parseInt(elm.getAttribute("data-var-min")),
      max = parseInt(elm.getAttribute("data-var-max"));
    if (name in settings.config.vars) {
      if (incr > max) {
        settings.config.vars[name].value = min;
      } else if (incr < min) {
        settings.config.vars[name].value = max;
      } else {
        settings.config.vars[name].value = incr;
      }
      setCSS(`--${name}`, value);
      settings.save();
    } else {
      settings.config.vars[name] = {
        value: 0,
        elms: [],
      };
      settings.save();
    }
    varActions.reload(name);
  },
};

for (const item in settings.config.vars) {
  settings.config.vars[item].elms = [];
}

let openHTMLaddons = new popup("HTMLaddons");
openHTMLaddons.load(
  `
<h1>HTML Addons</h1>
<div>
<h2>Make a new HTML insert:</h2>
    <div style="
    width: 500px;
    text-align: center;
    margin: auto;
    background-color: darkcyan;
    border-radius: 20px;
    padding: 20px;
    ">
        <form>
            <label for="selector">Name:</label><br>
            <input id="insertName" type="text" placeholder="This can be anything..."><br>
            <label for="selector">Element Selector:</label><br>
            <input id="insertSelector" type="text" placeholder="ID"><br>
            <label for="insertHTML">HTML:</label><br>
            <textarea id="insertHTML" type="text" placeholder="HTML"></textarea><br>
            <br><br><input id="insertSave" style="
            width: 200px;
            border-radius: 20px;
            border-style: double;
            " type="submit" value="Save">
        </form>
    </div>
    <br>
    <h2>Or edit a existing one:</h2>
    <br>
    <div id="existingInsert">
    </div>
</div>
`,
  document.body
);

function removeTemps() {
  document.querySelector("#existingInsert").innerHTML = "";
}

function addTemps() {
  i = 0;
  while (i < settings.config.htmlAddons.length) {
    document.getElementById("existingInsert").innerHTML += `
    <div id="${i}" class="addonHTMLtemp" style="
    width: 500px;
    text-align: center;
    margin: auto;
    background-color: #6016d9;
    border-radius: 20px;
    padding: 20px;
    ">
        <form>
            <label>Name:</label><br>
            <input type="text" placeholder="This can be anything..."><br>
            <label>Element Selector:</label><br>
            <input type="text" placeholder="ID"><br>
            <label>HTML:</label><br>
            <textarea type="text" placeholder="HTML"></textarea><br>
            <br><br><input class="insertSaveEdit" style="
            width: 200px;
            border-radius: 20px;
            border-style: double;
            " type="submit" value="Save edit">
            <br><input class="insertRemove" style="
            width: 200px;
            border-radius: 20px;
            border-style: double;
            " type="submit" value="Remove">
        </form>
    </div>
    <br><br>
    `;
    i++;
  }
  addHTMLlisteners();
}

document.getElementById("openHTMLaddons").onclick = () => {
  permissions = checkPermissions();
  if (permissions.premium === false) {
    return;
  }
  if (permissions.signedIn === false) {
    return;
  }
  openHTMLaddons.show();
};

document.getElementById("insertSave").onclick = (e) => {
  permissions = checkPermissions();
  if (permissions.premium === false) {
    return;
  }
  if (permissions.signedIn === false) {
    return;
  }
  e.preventDefault();
  settings.config.htmlAddons.push({
    name: document.getElementById("insertName").value,
    selector: document.getElementById("insertSelector").value,
    html: document.getElementById("insertHTML").value,
  });
  settings.save();
  addonHTMLremove();
  addonHTMLadd();
  removeTemps();
  addTemps();
};

function addonHTMLadd() {
  i = 0;
  let temp;
  while (i < settings.config.htmlAddons.length) {
    temp = document.createElement("div");
    temp.innerHTML = settings.config.htmlAddons[i].html;
    document
      .querySelector(settings.config.htmlAddons[i].selector)
      .appendChild(temp);
    temp.id = settings.config.htmlAddons[i].name;
    temp.classList.add("addonHTML");
    i++;
  }
  document.querySelectorAll("*").forEach((element) => {
    try {
      if (element.getAttribute("data-var-def") !== null) {
        element
          .getAttribute("data-var-def")
          .split(",")
          .forEach((item) => {
            settings.config.vars[item] = {
              value: element.getAttribute("data-var-value"),
              elms: [],
            };
            varActions.reload(item);
          });
        settings.save();
      }
      if (element.getAttribute("data-action") !== null) {
        element.addEventListener("click", (e) => {
          actions[e.srcElement.getAttribute("data-action")]();
        });
      }
      if (element.getAttribute("data-var-action") !== null) {
        element.addEventListener("click", (e) => {
          element
            .getAttribute("data-var-name")
            .split(",")
            .forEach((item) => {
              varActions[e.srcElement.getAttribute("data-var-action")](
                item,
                parseInt(element.getAttribute("data-var-value")),
                e.srcElement
              );
            });
        });
      }
      if (element.getAttribute("data-var-set") !== null) {
        if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
          if (element.getAttribute("data-var-set") in settings.config.vars) {
            if (element.getAttribute("data-save") === "") {
              element.value =
                settings.config.vars[
                  element.getAttribute("data-var-set")
                ].value;
            } else {
              settings.config.vars[element.getAttribute("data-var-set")].value =
                element.value;
            }
            setCSS(`--${element.getAttribute("data-var-set")}`, element.value);
            settings.save();
          } else {
            settings.config.vars[element.getAttribute("data-var-set")] = {
              value: element.value,
              elms: [],
            };
            settings.save();
          }
        } else {
          if (element.getAttribute("data-var-set") in settings.config.vars) {
            if (element.getAttribute("data-save") === "") {
              element.innerText =
                settings.config.vars[e.getAttribute("data-var-set")].value;
            } else {
              settings.config.vars[e.getAttribute("data-var-set")].value =
                element.innerText;
            }
            setCSS(
              `--${element.getAttribute("data-var-set")}`,
              element.innerText
            );
            settings.save();
          } else {
            settings.config.vars[element.getAttribute("data-var-set")] = {
              value: element.innerText,
              elms: [],
            };
            settings.save();
          }
        }
        let loadText = (e) => {
          settings.config.vars[
            e.srcElement.getAttribute("data-var-set")
          ].value = e.srcElement.value;
          settings.save();
          setCSS(
            `--${e.srcElement.getAttribute("data-var-set")}`,
            settings.config.vars[e.srcElement.getAttribute("data-var-set")]
              .value
          );
          varActions.reload(e.srcElement.getAttribute("data-var-set"));
        };
        element.onchange = loadText;
        element.onclick = loadText;
      }
      if (element.getAttribute("data-var-get") !== null) {
        if (!(element.getAttribute("data-var-get") in settings.config.vars)) {
          settings.config.vars[element.getAttribute("data-var-get")] = {
            value: "",
            elms: [],
          };
        }
        settings.config.vars[element.getAttribute("data-var-get")].elms.push(
          element
        );
        settings.save();
        varActions.reload(element.getAttribute("data-var-get"));
      }
    } catch (e) {
      null;
    }
  });
}

addTemps();

function addonHTMLremove() {
  document.querySelectorAll(".addonHTML").forEach((e) => {
    e.remove();
  });
}

function addHTMLlisteners() {
  document.querySelectorAll(".insertSaveEdit").forEach((elm) => {
    elm.onclick = (e) => {
      permissions = checkPermissions();
      if (permissions.premium === false) {
        return;
      }
      if (permissions.signedIn === false) {
        return;
      }
      e.preventDefault();
      let index = e.srcElement.parentElement.parentElement.id,
        name = e.srcElement.parentElement.childNodes[4].value,
        selector = e.srcElement.parentElement.childNodes[10].value,
        html = e.srcElement.parentElement.childNodes[16].value;
      settings.config.htmlAddons[index] = {
        name: name,
        selector: selector,
        html: html,
      };
      settings.save();
      addonHTMLremove();
      addonHTMLadd();
      addHTMLlisteners();
    };
    let index = elm.parentElement.parentElement.id;
    elm.parentElement.childNodes[4].value =
      settings.config.htmlAddons[index].name;
    elm.parentElement.childNodes[10].value =
      settings.config.htmlAddons[index].selector;
    elm.parentElement.childNodes[16].value =
      settings.config.htmlAddons[index].html;
  });

  document.querySelectorAll(".insertRemove").forEach((elm) => {
    elm.onclick = (e) => {
      e.preventDefault();
      let index = e.srcElement.parentElement.parentElement.id;
      settings.config.htmlAddons.splice(index, 1);
      settings.save();
      addonHTMLremove();
      addonHTMLadd();
      removeTemps();
      addTemps();
      addHTMLlisteners();
    };
  });
}
