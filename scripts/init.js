console.extension("Starting...");

versions = {};

manifest = chrome.runtime.getManifest();
versions.extension = manifest.version;
if (manifest.version_name) {
  versions.extensionVerName = manifest.version_name;
}

let inCLI = false;

Function.prototype.await = (...i) => {
  new Promise(async (n, t) => this(...i));
};

const urls = {
  API: {
    base: "https://codertjp.com/api",
    user: (uuid) => urls.API.base + `/extension/${uuid}`,
    fetchData: {
      User: (uuid, callback) => {
        fetch(urls.API.user(uuid))
          .then((e) => e.json())
          .then(callback);
      },
      Coins: (uuid, callback) => {
        urls.API.fetchData.User(uuid, (e) => {
          callback(e.data.coins);
        });
      },
      Bans: (callback) => {
        fetch(urls.API.base + `/bans/`)
          .then((e) => e.json())
          .then(callback);
      },
    },
    postAction: (uuid, action, callback) => {
      fetch(`${urls.API.base}/extension/${uuid}/${action}`, {
        method: "POST",
        mode: "cors",
      })
        .then((e) => e.json())
        .then(callback);
    },
    Coins: (uuid, callback) => {
      urls.API.fetchData.User(uuid, (e) => {
        callback(e.data.coins);
      });
    },
    Bans: (callback) => {
      fetch(urls.API.base + `/bans/`)
        .then((e) => e.json())
        .then(callback);
    },
  },
};

class Cache {
  constructor(id, type = "string") {
    this.id = id;
    this.type = type;
  }

  save(data) {
    if (this.type === "object") {
      localStorage.setItem(this.id, JSON.stringify(data));
    } else {
      localStorage.setItem(this.id, `${data}`);
    }
  }

  get() {
    const item = localStorage.getItem(this.id);
    if (this.type === "string") {
      return item || "";
    }
    if (this.type === "number") {
      return parseInt(item) || 0;
    }
    if (this.type === "float") {
      return parseFloat(item) || 0.0;
    }
    if (this.type === "object") {
      return JSON.parse(item) || {};
    }
  }
}

let ratioCallbackStack = [],
  remove = null,
  oldPR = window.devicePixelRatio,
  initPR = new Cache("initPR", "number");

const updatePixelRatio = () => {
  if (remove != null) {
    remove();
  }
  const mqString = `(resolution: ${window.devicePixelRatio}dppx)`;
  const media = matchMedia(mqString);
  media.addEventListener("change", () => {
    updatePixelRatio();
  });
  remove = () => {
    media.removeEventListener("change", updatePixelRatio);
  };
  ratioCallbackStack.forEach((c) => {
    c(oldPR / window.devicePixelRatio);
  });
  oldPR = window.devicePixelRatio;
};
updatePixelRatio();

function calibratePR() {
//   if (`${window.devicePixelRatio}`.length === 1) {
    initPR.save(window.devicePixelRatio);
    return true;
//   }
//   return false;
}

function sizeImmutable(elm) {
  ratioCallbackStack.push((pr) => {
    elm.style.width = parseFloat(elm.style.width.replace("px", "")) * pr + "px";
    elm.style.height =
      parseFloat(elm.style.height.replace("px", "")) * pr + "px";
  });
}

function getValueByPath(pathString, obj) {
  // Split the path string into an array of keys
  const keys = pathString.split(".");

  // Initialize a reference to the current object
  let currentObj = obj;

  // Loop through each key in the path
  for (const key of keys) {
    // Check if the current key exists in the object
    if (currentObj.hasOwnProperty(key)) {
      // Update the current object to the value of the current key
      currentObj = currentObj[key];
    } else {
      // If the key doesn't exist, return undefined
      return undefined;
    }
  }

  // Return the value found at the end of the path
  return currentObj;
}

Function.prototype.await = function (...args) {
  return new Promise((resolve, reject) => {
    this(...args)
      .then(() => resolve())
      .catch((error) => reject(error));
  });
};

function str(inp = undefined) {
  switch (typeof inp) {
    case "number":
      return inp.toString() || "";
    case "boolean":
      return inp.toString();
    case "string":
      return inp;
    case "object":
      const json = inp;
      return JSON.stringify(json);
    default:
      return "UNABLE TO CHANGE TO STRING";
  }
}

class CommandPrefix {
  constructor(prefix, types = {}, onFail = () => {}) {
    this.prefix = prefix;
    this.types = types;
    this.onFail = onFail;
    this.commands = [];
  }
  execute(string, executeCode = true) {
    const cmdGroup = string.split(" ");
    const base = cmdGroup.shift();
    const prams = [...cmdGroup];
    let command = "";
    for (const cmd of this.commands) {
      if (base === cmd.base) {
        command = cmd;
      }
    }
    if (command === "") {
      return false;
    }
    if (cmdGroup.length === 0) {
      command.callBack([]);
      return true;
    }
    let i = 0;
    if (command.prams.length > 0) {
      for (const item of command.prams) {
        if (!this.types[item](prams[0])) {
          this.onFail(item, prams[0]);
          return false;
        }
        prams.shift();
        i++;
      }
    }
    if (!executeCode) return true;
    command.callBack(cmdGroup);
    return true;
  }
  addCommand(base, prams, callBack) {
    this.commands.push({ base: base, prams: prams, callBack: callBack });
  }
}

function getProperty(path, object) {
  // Remove surrounding brackets if present
  path = path.replace(/^\[|\]$/g, "");
  // Split path by brackets and quotes
  const keys = path
    .split(/(?:\]\[|\[|\])+?/)
    .map((key) => key.replace(/['"]/g, ""));
  let current = object;
  for (const key of keys) {
    if (current[key] === undefined) return undefined;
    current = current[key];
  }
  return current;
}

function testURL(url, callback = () => {}, onError = () => {}) {
  (async (url, callback, onError) => {
    try {
      const response = await fetch(url);
      callback.await(response);
    } catch (err) {
      onError(err);
    }
  }).await(url, callback, onError);
}

async function wait(ms) {
  await new Promise((resolve, reject) =>
    setTimeout(() => {
      resolve();
    }, ms)
  );
}

function selectGamemode(mode) {
  document
    .querySelector("#homepage-loaded > div.game-modes")
    .children[mode].click();
}

function selectSuperPower(index) {
  document
    .querySelector("#choose-superpower > table > tbody > tr:nth-child(2)")
    .children[index].children[0].click();
}

function changeShowState(elm) {
  if (elm.style.opacity === "0.5") {
    elm.style.opacity = "";
    elm.style.display = "none";
  } else if (elm.style.display === "none") {
    elm.style.display = "block";
  } else {
    elm.style.opacity = "0.5";
  }
}

// Locate child element with class name
function findIndexOfSelectedElement(parentElement, className) {
  const children = parentElement.children;

  for (let i = 0; i < children.length; i++) {
    if (children[i].classList.contains(className)) {
      return i; // Return the index of the element with the specified class
    }
  }

  return -1; // Return -1 if no element with the class is found
}

String.prototype.applyTo = function (ID = "", element = document.body) {
  const temp = document.createElement("div");
  if (ID !== "") {
    temp.id = ID;
  }
  temp.innerHTML = this;
  element.appendChild(temp);
};



function countItems(arr, itemCount = {}) {
  arr.forEach((item) => {
    if (itemCount[item]) {
      itemCount[item]++;
    } else {
      itemCount[item] = 1;
    }
  });

  return itemCount;
}
