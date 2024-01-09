// Drop Down
class dropDown {
  constructor(
    key,
    id,
    label,
    saveName,
    removeName,
    onchange = () => {},
    haveEmptyTemp = true,
    saveCallback = (me) => {
      settings.config[me.id].push({ name: "2" });
      me.loadItems();
      settings.save();
    },
    removeCallback = (me) => {
      settings.config[me.id] = settings.config[me.id].filter(
        (obj) => obj[me.key] !== document.querySelector(`#${me.id}Select`).value
      );
      me.loadItems();
      settings.save();
    }
  ) {
    this.key = key;
    this.id = id;
    this.label = label;
    this.saveName = saveName;
    this.removeName = removeName;
    this.saveCallback = saveCallback;
    this.removeCallback = removeCallback;
    this.onchange = onchange;
    this.haveEmptyTemp = haveEmptyTemp;
  }
  make() {
    return `
            <div id="${this.id}">
                <div class="server">
                    <span class="label">${this.label}</span>
                    <span class="field">
                    <select id="${this.id}Select" style="padding: 4px 8px;">
                        </select>
                    </span>
                </div>
                <div id="${this.id}Buttons">
                    <button id="${this.id}Save" type="button" class="button" lang="en" style="margin-bottom: 1px;background-color: green; box-shadow: 0 2px 10px rgba(0,0,0,.2), 0 4px 0 green;">
                        ${this.saveName}
                    </button>
                    <br />
                    <button id="${this.id}Remove" type="button" class="button" lang="en" style="margin-bottom: 1px;background-color: red; box-shadow: 0 2px 10px rgba(0,0,0,.2), 0 4px 0 red;">
                        ${this.removeName}
                    </button>
                <div>
            </div>
            `;
  }
  load(to) {
    let dropDown = document.createElement("div");
    dropDown.innerHTML = this.make();
    to.appendChild(dropDown);
    let remove = document.querySelector(`#${this.id}Remove`);
    remove.onclick = () => {
      this.removeCallback(this);
    };
    let save = document.querySelector(`#${this.id}Save`);
    save.onclick = () => {
      this.saveCallback(this);
    };
    document.querySelector(`#${this.id}Select`).onchange = () => {
      this.onchange(this);
    };
  }
  loadItems() {
    let select = document.querySelector(`#${this.id}Select`);
    select.innerHTML = "";
    let elm = document.createElement("option");
    elm.innerText = `Select a ${this.label}`;
    if (this.haveEmptyTemp) {
      select.appendChild(elm);
    }
    for (let i = 0; i < settings.config[this.id].length; i++) {
      let item = settings.config[this.id][i];
      elm = document.createElement("option");
      elm.innerText = item[this.key];
      select.appendChild(elm);
    }
  }
  select(name) {
    document.querySelector(`#${this.id}Select`).value = name;
  }
}
