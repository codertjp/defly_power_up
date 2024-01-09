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
