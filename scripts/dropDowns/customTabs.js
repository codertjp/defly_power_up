let skinTabs = new dropDown(
  "name",
  "skinTabs",
  "Name",
  "Save tab",
  "Remove tab",
  (me) => {
    null;
  },
  false,
  (me) => {
    new Promise(async (resolve, reject) => {
      let obj = {};
      obj = {
        name: document.querySelector('#skinTabSave').value,
        skins: [],
      };
      settings.config.skinTabs.push(obj);
      me.loadItems();
      settings.save();
    });
  }
);
