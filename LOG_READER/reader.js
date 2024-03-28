function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
delay(1000).then(() => {
  function to(str) {
    return str.charCodeAt(0);
  }

  function from(num) {
    return String.fromCharCode(num);
  }

  function uncryptWithKey(string, key) {
    let output = "",
      i = 0;
    string.split("").forEach((letter) => {
      output += from(to(letter) - to(key[i]));
      i++;
      if (i === key.length) {
        i = 0;
      }
    });
    return output;
  }

  // FILES:
  const files = {
    // download
    downloader(data, filename, type) {
      var file = new Blob([data], { type: type });
      if (window.navigator.msSaveOrOpenBlob)
        // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
      else {
        // Others
        var a = document.createElement("a"),
          url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }, 0);
      }
    },
    // upload
    uploader: class {
      constructor(id, onchange = () => {}) {
        this.id = id;
        this.onchange = onchange;
        this.text = "";
      }
      load(to) {
        let inp = document.createElement("div");
        inp.innerHTML = `<input type="file" id="${this.id}" />`;
        to.appendChild(inp);
        inp.addEventListener("change", (event) => {
          let file = event.target.files[0];
          let reader = new FileReader();
          reader.onload = () => {
            this.text = reader.result;
            this.onchange(this.text);
          };
          reader.onerror = () => {
            pageError("Error loading file", "popup");
          };
          try {
            reader.readAsText(file, "utf-8");
          } catch {
            pageError("Error reading file", "popup");
          }
        });
      }
    },
  };

  let items = [];
  let logFile = new files.uploader("logFile", (text) => {
    document.getElementById("logs").innerHTML = "";
    items = text.split("\n");

    // Create UL list
    const ulElement = document.createElement("ul");
    items.forEach((item) => {
      if (item.length === 0) return;
      item = uncryptWithKey(item, "DEVLOGS");
      const liElement = document.createElement("li"),
        data = item.split(">");
      let color = "darkcyan";
      if (data[2] === "Loaded") {
        color = "darkorange";
      } else if (data[2].includes("Click Event: ")) {
        color = "dimgray";
      } else if (data[2].includes("porting")) {
        color = "chocolate";
      }
      liElement.title = data[1];
      liElement.innerHTML = `Date: ${data[0]}: <b style="background-color: ${color}">${data[2]}</b>`;
      ulElement.appendChild(liElement);
    });

    // Append the UL list to the #import div
    document.getElementById("logs").appendChild(ulElement);
  });
  logFile.load(document.getElementById("import"));

  // Function to get the device's default theme
  function getDefaultTheme() {
    return window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark-theme"
      : "light-theme";
  }

  // Set the initial theme based on the device's default
  document.body.className = getDefaultTheme();
});
