const gamemodes = ["FFA", "TEAM", "DEFUSE", "E-FFA", "1V1"];
let stats = {};
let info = document.createElement("div");
info.id="info";
info.innerHTML = `
<style>
#info {
    display: none;
}

#rightInfo {
    margin-top: 280px;
    color: blueviolet;
    z-index: 10;
    position: absolute;
    right: 0;
    text-align: right;
}
#leftInfo {
    margin-top: 100px;
    color: blueviolet;
    z-index: 100;
    position: absolute;
    left: 0;
}
.text {
    color: grey;
}
.bool {
    color: #bf00b9;
}
.number {
    color: #de9800;
}
}
</style>

<div id="rightInfo" style="pointer-events: none;">
<h4><span id="levelsInfo" class="number"></span> :Levels</h4>
<h4><span id="playersInfo" class="number"></span> :Players</h4>
<h4><span id="nearPlayersInfo" class="number"></span> :Near by</h4>
<h4><span id="isAutoLevelingInfo" class="bool"></span> :Auto Leveling</h4>
<h4><span id="xInfo" class="number"></span>, <span id="yInfo" class="number"></span> :Pos</h4>
</div>

<div id="leftInfo" style="pointer-events: none;">
<h4>Gamemode: <span id="gamemodeInfo" class="text"></span></h4>
<h4>Server: <span id="serverInfo" class="text"></span></h4>
<h4>URL: <span id="urlInfo" class="text"></span></h4>
<h4>Username: <span id="usernameInfo" class="text"></span></h4>
<h4>Skin ID: <span id="skinInfo" class="number"></span></h4>
<h4>Account is prem: <span class="bool">${
  settings.config.accountIsPrem ? "True" : "False"
}</span></h4>
<h4>Signed in: <span id="signedInInfo" class="bool"></span></h4>
<h4 style="
width: 255px;
display: block;
">AppVersion: <span id="appVersionInfo" class="text"></span></h4>
</div>
`;
document.body.appendChild(info);

new Promise(async (resolve, reject) => {
  while (true) {
    stats = {
      gamemode:
        gamemodes[
          findIndexOfSelectedElement(
            document.querySelector("#homepage-loaded > div.game-modes"),
            "selected"
          )
        ],
      username: document.querySelector("#username").value,
      skin: localStorage.playerSkin,
      signedIn:
        getComputedStyle(document.querySelector("#connected-block")).display !==
        "none"
          ? "True"
          : "False",
      levels: document.querySelector("#level-value").innerText,
      players:
        document.querySelector("#player-count").innerText === ""
          ? "0"
          : document.querySelector("#player-count").innerText,
      nearPlayers:
        stats.gamemode === "E-FFA"
          ? document.querySelector("#minimap-team-positions").childNodes.length
          : "0",
      serverName: document.querySelector("#server").value.replace("1", ""),
      url: location.href,
      appVersion: navigator.appVersion,
      y:
      Math.round(((parseFloat(document.querySelector("#minimap-position").style.top.replace(/([0-9]+\.[0-9]{1})[0-9]+%/g, "$1")) -100) * - 1) * 10)/10,
      x: Math.round(parseFloat(document.querySelector("#minimap-position").style.left.replace(/([0-9]+\.[0-9]{1})[0-9]+%/g, "$1"))*10)/10,
    };

    stats.x = isNaN(stats.x) ? "0" : stats.x === "0%" ? "0" : stats.x;
    stats.y = isNaN(stats.y) ? "0" : stats.y === "0%" ? "0" : stats.y;

    // left
    document.getElementById("gamemodeInfo").innerText = stats.gamemode;
    document.getElementById("serverInfo").innerText = stats.serverName;
    document.getElementById("urlInfo").innerText = stats.url;
    document.getElementById("usernameInfo").innerText = stats.username;
    document.getElementById("skinInfo").innerText = stats.skin;
    document.getElementById("signedInInfo").innerText = stats.signedIn;
    document.getElementById("appVersionInfo").innerText = stats.appVersion;

    // right
    document.getElementById("levelsInfo").innerText = stats.levels;
    document.getElementById("playersInfo").innerText = stats.players;
    document.getElementById("nearPlayersInfo").innerText = stats.nearPlayers;
    if (!(typeof upgrading === 'undefined')) {
    document.getElementById("isAutoLevelingInfo").innerText = upgrading && upgradingOrder.length !== 0 ? 'True' : 'False';
    }
    document.getElementById("isAutoLevelingInfo").innerText = 'False';
    document.getElementById("xInfo").innerText = stats.x;
    document.getElementById("yInfo").innerText = stats.y;

    await wait(200);
  }
});
