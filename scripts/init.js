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
