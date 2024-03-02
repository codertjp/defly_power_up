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

// License key
let Licenses =
  "WyI0Y2Q4NDg5Ny1jYWQxLTQzYjctOTg1OS1iNDQ3ZDBmMmIyYTciLCJiMDhkMWJmNS1jNmRlLTQyYjAtOGI1My1kN2EwNDJmNDVmZDMiLCI3Y2IxOTkwNi05MzAxLTQ2MjYtOWYwZS02Y2U2ZDI4Y2U1NzMiLCI3M2MyMTcwYS0zN2I4LTRjNGYtOTIzNy02YzliMzFkMzQzNzMiXQ==";
function hasLicense(key = settings.config.licenseKey) {
  if (key !== "" && JSON.parse(decrypt(Licenses)).includes(key)) {
    log(`Unlocked using License Key`);
    return true;
  } else if (key !== "") {
    log(`Tried unlocking using License Key, But failed`);
    alert("License Key Failed! This license key doesn't exist anymore.");
  }
  return false;
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
  let temp = document.createElement("div");
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
`.applyTo('HITBOX');
