// Make list for all level types
const map = [
  "Player speed",
  "Bullet speed",
  "Bullet range",
  "Reload speed",
  "Build range",
  "Tower shield",
  "Tower health",
];

// UI for Auto upgrader
// CSS
let UpgradingBlockCSS = document.createElement("div");
UpgradingBlockCSS.innerHTML += `<style>
    #availPoints {
      font-size: 0.875rem;
      line-height: 1.25rem;
      text-align: right;
      color: #ffffff;
      width: 256px;
    }
    .row {
      position: relative;
      width: fit-content;
    }
    .labelContainer {
      display: flex;
      position: absolute;
      flex-direction: row;
      width: 100%;
      text-align: center;
      color: #ffffff;
    }
    .rowContainer {
      display: grid;
      margin: 0.25rem;
      grid-template-columns: repeat(9, minmax(0, 1fr));
      border-radius: 0.5rem;
      background-color: #000000;
      width: 248px;
    }
    .plusContainer {
      margin: auto;
      position: relative;
      width: fit-content;
      height: fit-content;
    }
    .undoContainer {
      display: flex;
      justify-content: center;
      border-radius: 0.5rem;
      color: #ffffff;
      background-color: #1d4ed8;
      cursor: pointer;
      width: 256px;
      height: 32px;
    }
    .cellBlue {
      background-color: #1e40af;
    }
    .cellOrange {
      background-color: #ed8936;;
    }
    .cell {
      margin: 0.25rem;
      border-radius: 0.125rem;
      width: 24px;
      height: 16px;
    }
    .customUpgradeBlock {
      font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
      width: fit-content;
      margin: auto;
    }
    #share:hover {
      border-bottom: 1px solid #ffffff;
    }
    ${settings.config.addDiscord ? '#chat-block{ margin-top: 10px; }' : ''}
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    #settings-popup {
        z-index: 101;
    }
    </style>`;
document.body.appendChild(UpgradingBlockCSS);

// Init for upgrading order
let upgradingOrder = [];

// Update upgradingOrder and change next cube color to orange
function upgrade(event) {
  // Find what button fired this event
  let elm = event.srcElement;
  // Find the name of this upgrade ex: 'Player Speed'
  let type =
    elm.parentElement.parentElement.parentElement.parentElement.childNodes[0]
      .childNodes[0].innerText;
  // If the type is "Tower shield" upgrade to 6 not 8 and stop if it's maxed out
  if (
    elm.parentElement.parentElement.parentElement.childNodes[
      type === "Tower shield" ? 5 : 7
    ].classList.contains("cellOrange")
  ) {
    return;
  }
  // Make sure that the user has not exceeded 32 levels if so stop
  let points =
    elm.parentElement.parentElement.parentElement.parentElement.parentElement
      .childNodes[0].childNodes[1];
  if (parseInt(points.innerHTML) === 0) {
    return;
  }
  // Remove 1 point
  points.innerHTML = parseInt(points.innerHTML) - 1;
  // Save the next step
  upgradingOrder.push(type);
  // Loop until the cube is not orange and update it
  let i = 0;
  while (i <= 7) {
    let con =
      elm.parentElement.parentElement.parentElement.childNodes[
        i
      ].classList.contains("cellOrange");
    if (!con) {
      elm.parentElement.parentElement.parentElement.childNodes[
        i
      ].classList.remove("cellBlue");
      elm.parentElement.parentElement.parentElement.childNodes[i].classList.add(
        "cellOrange"
      );
      return;
    }
    i++;
  }
  elm.parentElement.parentElement.parentElement.childNodes[0].classList.remove(
    "cellBlue"
  );
  elm.parentElement.parentElement.parentElement.childNodes[0].classList.add(
    "cellOrange"
  );
}
// Remove one  upgradingOrder and change next cube color to orange
function undo(event) {
  // Find what button fired this event
  let elm = event.srcElement;
  // verify, there is an upgrade to undo
  if (upgradingOrder.length === 0) {
    return;
  }
  // Get the points and check if it's 32 then stop
  let points = elm.parentElement.parentElement.childNodes[0].childNodes[1];
  if (parseInt(points.innerText) === 32) {
    return;
  }
  // Add back a point
  points.innerHTML = parseInt(points.innerHTML) + 1;
  // Find the last upgrading type
  let lastLvl = upgradingOrder[upgradingOrder.length - 1];
  // remove the last upgrading step
  upgradingOrder.pop();
  // find the index of the last point
  let index = map.indexOf(lastLvl) + 1;
  let i = 7;
  // loop backwards until the cube is orange and make it blue
  while (i >= 0) {
    let con =
      elm.parentElement.parentElement.childNodes[
        index
      ].childNodes[1].childNodes[i].classList.contains("cellOrange");
    if (con) {
      elm.parentElement.parentElement.childNodes[
        index
      ].childNodes[1].childNodes[i].classList.remove("cellOrange");
      elm.parentElement.parentElement.childNodes[
        index
      ].childNodes[1].childNodes[i].classList.add("cellBlue");
      return;
    }
    i--;
  }
}

// Make 56 blue cubes and return HTML element containing 7 rows with 8 cubes each
function render() {
  let rows = [];

  // Create 7 rows
  var rowIndex = 0;
  while (rowIndex < 7) {
    rows.push(document.createElement("div"));
    rows[rowIndex].classList.add("rowContainer");
    rowIndex++;
  }

  //TODO: make 46 and 47 be grayed out
  // Create 56 blue cubes
  var i = 1;
  while (i <= 56) {
    let row = Math.trunc((i - 1) / 8);
    rows[row].innerHTML += `<div class="cell cellBlue"></div>`;
    i++;
  }
  // Add + buttons
  for (let i = 0; i < rows.length; i++) {
    rows[i].innerHTML += `
            <div class="plusContainer">
            <div class="plus custom" style="display: block">
      <img style="height: 16px;" src="img/plus-4-64.png" />
    </div></div>`;
  }

  let mergedElement,
    temp = document.createElement("div");
  points = document.createElement("div");

  // Create remaining points text
  points.id = "availPoints";
  points.style.position = "relative";
  points.innerHTML = `Avail. upgrade points: <span style="font-weight: 700;">32</span>`;
  temp.appendChild(points);

  // add labels to all rows
  for (let i = 0; i < rows.length; i++) {
    const element = rows[i];
    mergedElement = document.createElement("div");
    mergedElement.classList.add("row");
    mergedElement.innerHTML += `<div class="labelContainer"><h2 style="flex-grow: 1; font-size: 20px; margin: 0px; font-weight: 50;">${map[i]}</h2><div style="width: 24px; height: 24px;"></div></div>`;
    mergedElement.appendChild(element);
    temp.appendChild(mergedElement);
  }

  // Add undo button
  const undo = document.createElement("div");
  undo.innerHTML = `
        <div class="undoContainer" style="
        position: relative;
    ">
            <div style="display: grid;">
                <h2 style="padding-right: 0.5rem; margin: 0px; align-self: center; justify-self: center;">Undo</h2>
            </div>
            <div style="display: grid;">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width: 1.5rem; height: 1.5rem; align-self: center; justify-self: center;">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                </svg>
            </div>
        </div>
        `;
  temp.appendChild(undo);

  temp.classList.add("customUpgradeBlock");
  return temp;
}

// Create a new popup
let autoPopup = new popup("autoUpgradePopup");
autoPopup.load(
  `
        <h2>Click on the + buttons in the order you</h2>
        <h2>would like them to auto upgrade in-game</h2>
        <div id="autoPopup"></div>
        <button type="button" class="saveUpgrade button close" style="position: static; font-size: 15px;">Save JSON to settings</button>
    `,
  document.body
);

// Put the 56 cubes in the popup template
document.getElementById("autoPopup").appendChild(render());

// add event listener for click to save the upgrades to the "upgradesJSON" input box
let saveUpgrade = document.querySelectorAll(".saveUpgrade");
for (var i = 0; i < saveUpgrade.length; i++) {
  saveUpgrade[i].addEventListener("click", () => {
    document.getElementById("upgradesJSON").value =
      JSON.stringify(upgradingOrder);
  });
}

// event listeners for + buttons
let elements = document.querySelectorAll(".plus.custom");
for (var i = 0; i < elements.length; i++) {
  elements[i].addEventListener("click", upgrade);
}

// event listener for undo button
let undoElements = document.querySelectorAll(".undoContainer");
for (var i = 0; i < undoElements.length; i++) {
  undoElements[i].addEventListener("click", undo);
}

// Click on + button from index
function level(index) {
  document
    .querySelector("#upgrade-block > div.main-block")
    .childNodes[(index + 1) * 2 - 1].childNodes[3].click();
}

// Auto upgrader
let upgrading = true;
async function upgrader() {
  while (upgrading) {
    await wait(200);
    if (
      getComputedStyle(document.querySelector("#respawn")).display === "block"
    ) {
      upgrading = false;
    }
    let lvls = document.querySelector("#upgrade-points").innerHTML;
    if (Number(lvls) > 0) {
      if (upgradingOrder.length <= 0) {
        upgrading = false;
        return;
      }
      let index = map.indexOf(upgradingOrder[0]);
      upgradingOrder.shift();
      // defly.upgrade(upgrade.lvl); had to find a replacement because chrome extension can not get the page variable > window
      level(index);
    }
  }
}
