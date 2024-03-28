try {
  document.querySelector("#server-button").onclick = () => {
    let oldPortInput = document.getElementById("portInput");
    oldPortInput !== null
      ? oldPortInput.parentNode.removeChild(oldPortInput)
      : null;
    if ("disable" in settings.config && settings.config.disable) {
      return;
    }
    let port = document.createElement("li");
    port.id = "portInput";
    port.innerHTML = `<div style="text-align: center;"><input id="port" placeholder="Port" /><br/><button id="enterPort">Open port</button></div>`;
    document.querySelector("#server-menu").appendChild(port);
    document.querySelector("#enterPort").onclick = () => {
      log(`Loading Port: ${document.querySelector("#port").value}`);
      location.replace(
        `#${findIndexOfSelectedElement(
          document.querySelector("#homepage-loaded > div.game-modes"),
          "selected"
        )}-${document.querySelector("#port").value}`
      );
      location.reload();
    };
  };
} catch {
  null;
}
