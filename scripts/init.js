document.title = "Defly.IO";

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
let Licenses = 'WyI0Y2Q4NDg5Ny1jYWQxLTQzYjctOTg1OS1iNDQ3ZDBmMmIyYTciLCJiMDhkMWJmNS1jNmRlLTQyYjAtOGI1My1kN2EwNDJmNDVmZDMiLCI3Y2IxOTkwNi05MzAxLTQ2MjYtOWYwZS02Y2U2ZDI4Y2U1NzMiLCI3M2MyMTcwYS0zN2I4LTRjNGYtOTIzNy02YzliMzFkMzQzNzMiXQ==';
//4cd84897-cad1-43b7-9859-b447d0f2b2a7
function hasLicense(key = settings.config.licenseKey){
    if (key !== '' && JSON.parse(decrypt(Licenses)).includes(key)){
        return true;
    } else if (key !== '') {
        alert('License Key Failed! This license key doesn\'t exist anymore.');
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
