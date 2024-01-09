  // Popup
  class popup {
    constructor(id, defaultHide = true) {
      this.id = id;
      this.defaultHide = defaultHide;
    }
    make(HTML) {
      return `
            <div id="${
              this.id
            }" class="settings-popup animated fadeInDown" style="
            z-index: 999;
            display: ${this.defaultHide ? "none" : "block"};
            left: 0px;
            position: fixed;
            top: 0;
            width: 100%;
            height: 100%;
            text-align: center;
            max-height: 100%;
            left: initial;
            ">
                ${HTML}
                <br />
                <br />
                <br />
                <button onclick="this.parentElement.style.display = 'none';" type="button" class="button close" style="position: static; font-size: 15px;">Close</button>
                <br />
                <br />
                <br />
            </div>
            `;
    }
    load(HTML, to) {
      let popup = document.createElement("div");
      popup.innerHTML = this.make(HTML);
      to.appendChild(popup);
    }
    hide() {
      document.getElementById(this.id).style.display = "none";
    }
    show() {
      document.getElementById(this.id).style.display = "block";
    }
  }
