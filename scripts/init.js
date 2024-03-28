Function.prototype.await = (...i) => {
  new Promise(async (n, t) => this(...i));
};

const urls = {
  API: {
    base: "https://codertjp.com.test/api",
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

Function.prototype.await = function (...args) {
  return new Promise((resolve, reject) => {
    this(...args)
      .then(() => resolve())
      .catch((error) => reject(error));
  });
};

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
      return item;
    } else if (this.type === "number") {
      return parseInt(item);
    } else if (this.type === "float") {
      return parseFloat(item);
    } else if (this.type === "object") {
      return JSON.parse(item);
    }
  }
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

// `<div style="position: absolute; z-index: 10000; top: 50%; left: 50%; transform: translate(-50%, -50%);">
// <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
//   <circle cx="32" cy="32" r="30" fill="none" stroke="red" stroke-width="4" />
// </svg>
// </div>
// `.applyTo();

`<div style="position: absolute; z-index: 10000; top: 50%; left: 50%; transform: translate(-50%, -50%); touch-action: none; pointer-events: none; display: none;">
<img style="touch-action: none;" src="https://cdn.discordapp.com/attachments/1205581665519280269/1205643892851212318/hitBox.png?ex=65d91e5f&is=65c6a95f&hm=9f86adc34cba8284723e2e80c9691a0e3e97d264a97fc8a3279dc2150890776e&"/>
</div>
`.applyTo("HITBOX");

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
