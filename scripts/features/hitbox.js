let initPRimg = initPR.get();
PRfactor = initPRimg / window.devicePixelRatio;
function loadHitboxes() {
  initPRimg = initPR.get();
  PRfactor = initPRimg / window.devicePixelRatio;
  `
<div id="hitboxLine" style="background-image: url(https://codertjp.com/image/hitBoxLine.png); filter: invert(1); background-size: cover; width: ${
    100 * PRfactor
  }px; height: ${
    100 * PRfactor
  }px; position: absolute; z-index: 10000; top: 50%; left: 50%; transform: translate(-50%, -50%); touch-action: none; pointer-events: none;"></div>
<div id="hitboxBullet" style="background-image: url(https://codertjp.com/image/hitBox.png); background-size: cover; width: ${
    36 * PRfactor
  }px; height: ${
    36 * PRfactor
  }px; position: absolute; z-index: 10000; top: 50%; left: 50%; transform: translate(-50%, -50%); touch-action: none; pointer-events: none;"></div>
<div id="hitboxWall" style="filter: invert(1); background-image: url(https://codertjp.com/image/hitBox.png); background-size: cover; width: ${
    20 * PRfactor
  }px; height: ${
    20 * PRfactor
  }px; position: absolute; z-index: 10000; top: 50%; left: 50%; transform: translate(-50%, -50%); touch-action: none; pointer-events: none;"></div>
`.applyTo("HITBOX");
  sizeImmutable(document.querySelector("#hitboxBullet"));
  sizeImmutable(document.querySelector("#hitboxWall"));

  let lineHitElm = document.querySelector("#hitboxLine");
  sizeImmutable(lineHitElm);

  document.addEventListener("mousemove", function (event) {
    var mouseX = event.clientX;
    var mouseY = event.clientY;

    var rect = lineHitElm.getBoundingClientRect();
    var elmX = rect.left + rect.width / 2;
    var elmY = rect.top + rect.height / 2;

    var angle = Math.atan2(mouseY - elmY, mouseX - elmX);
    angle = angle * (180 / Math.PI);
    angle -= -90; // Adjust rotation to point towards cursor

    lineHitElm.style.transform =
      "translate(-50%, -50%) rotate(" + angle + "deg)";
  });
  document.getElementById("HITBOX").style.display = "none";
}

if (localStorage.getItem("initPR") !== null) {
  loadHitboxes();
}

new Feature(
  "hitBox",
  //Up:
  () => {
    document.getElementById("HITBOX").style.display = "";
  },
  // Down
  () => {
    document.getElementById("HITBOX").style.display = "none";
  },
  //Auto On:
  false,
);


gameEvents.died.subscribe(()=>{
    document.getElementById("HITBOX").style.display = "none";
});
