const operations = {
  IS(item1, item2) {
    return item1 == item2;
  },
  LESS_THAN(item1, item2) {
    return item1 < item2;
  },
  GREATER_THAN(item1, item2) {
    return item1 > item2;
  },
  CONSOLE(item1, item2) {
    console.log(`CONSOLE: ITEM 1: ${item1}, ITEM 2: ${item2}`);
    return "LOGGED";
  },
};

function getValue(string, prams, returnFalseIfNotFound = true) {
  const regxTypes =
    /(NUMBER|STRING|BOOL|PRAM|WINDOW|WINDOW_FUNCTION)\(([A-z0-9\.]+)\)/;
  while (string.match(regxTypes) !== null) {
    const regx = string.match(regxTypes);
    if (regx === null) {
      string = string.replace(regxTypes, false);
    }
    if (regx[1] === "NUMBER") {
      string = string.replace(regxTypes, parseFloat(regx[2]));
    }
    if (regx[1] === "STRING") {
      string = string.replace(regxTypes, `${regx[2]}`);
    }
    if (regx[1] === "BOOL") {
      string = string.replace(regxTypes, regx[2] === "true");
    }
    if (regx[1] === "PRAM") {
      string = string.replace(regxTypes, prams[regx[2]]);
    }
    if (regx[1] === "WINDOW") {
      string = string.replace(regxTypes, str(getValueByPath(regx[2], window)));
    }
    if (regx[1] === "WINDOW_FUNCTION") {
      getValueByPath(regx[2], window)();
      string = string.replace(regxTypes, "");
    }
    break;
  }
  return string;
}


function basicOperation(string, prams) {
  const regx = string.match(/([^-)]+[\)]{0,})-([A-Z_]+)-([^-)]+[\)]{0,})/);
  if (regx === null) {
    return false;
  }
  const operation = operations[regx[2]];
  return [
    operation(getValue(regx[1], prams), getValue(regx[3], prams)),
    `${getValue(regx[1], prams)}-${regx[2]}-${getValue(regx[3], prams)}`,
  ];
}

// console.log(basicOperation("PRAM(num1)-IS-PRAM(num2)", {
//   text: "Hello World",
//   num1: 5,
//   num2: 5,
// }));

// const rules = new popup("rules");
// rules.load(
//   `
// <h1>Rule</h1>
// <div>
// <h2>Make a new Rule:</h2>
//     <div style="
//     width: 500px;
//     text-align: center;
//     margin: auto;
//     background-color: darkcyan;
//     border-radius: 20px;
//     padding: 20px;
//     ">
//         <form>
//             <label for="ruleName">Name:</label><br>
//             <input id="ruleName" type="text" placeholder="This can be anything..."><br>
//             <br>
//             <label for="selector">Trigger:</label><br>
//             <select id="ruleTrigger">
//                 <option>Name Change</option>
//                 <option>Click Play</option>
//             </select>
//             <br>
//             <br>
//             <label for="ruleCondition">Condition:</label><br>
//             <textarea id="ruleCondition" type="text" placeholder="Condition"></textarea><br>
//             <br>
//             <label for="ruleAction">Action:</label><br>
//             <textarea id="ruleAction" type="text" placeholder="Action"></textarea><br>
//             <br><br><input id="ruleSave" style="
//             width: 200px;
//             border-radius: 20px;
//             border-style: double;
//             " type="submit" value="Save">
//         </form>
//     </div>
//     <br>
//     <h2>Or edit a existing one:</h2>
//     <br>
//     <div id="existingRules">
//     </div>
// </div>
// `,
//   document.body
// );

// rules.show();

// perms.sub(() => {
//   document.getElementById("openRules").onclick = () => {
//     rules.show();
//   };
// });

// // document.getElementById("insertSave").onclick = (e) => {
// //   permissions = checkPermissions();
// //   if (permissions.premium === false) {
// //     return;
// //   }
// //   if (permissions.signedIn === false) {
// //     return;
// //   }
// //   e.preventDefault();
// //   settings.config.htmlAddons.push({
// //     name: document.getElementById("insertName").value,
// //     selector: document.getElementById("insertSelector").value,
// //     html: document.getElementById("insertHTML").value,
// //   });
// //   settings.save();
// //   addonHTMLremove();
// //   addonHTMLadd();
// //   removeTemps();
// //   addTemps();
// // };

// // function addHTMLlisteners() {
// //   document.querySelectorAll(".insertSaveEdit").forEach((elm) => {
// //     elm.onclick = (e) => {
// //       permissions = checkPermissions();
// //       if (permissions.premium === false) {
// //         return;
// //       }
// //       if (permissions.signedIn === false) {
// //         return;
// //       }
// //       e.preventDefault();
// //       let index = e.srcElement.parentElement.parentElement.id,
// //         name = e.srcElement.parentElement.childNodes[4].value,
// //         selector = e.srcElement.parentElement.childNodes[10].value,
// //         html = e.srcElement.parentElement.childNodes[16].value;
// //       settings.config.htmlAddons[index] = {
// //         name: name,
// //         selector: selector,
// //         html: html,
// //       };
// //       settings.save();
// //       addonHTMLremove();
// //       addonHTMLadd();
// //       addHTMLlisteners();
// //     };
// //     let index = elm.parentElement.parentElement.id;
// //     elm.parentElement.childNodes[4].value =
// //       settings.config.htmlAddons[index].name;
// //     elm.parentElement.childNodes[10].value =
// //       settings.config.htmlAddons[index].selector;
// //     elm.parentElement.childNodes[16].value =
// //       settings.config.htmlAddons[index].html;
// //   });

// //   document.querySelectorAll(".insertRemove").forEach((elm) => {
// //     elm.onclick = (e) => {
// //       e.preventDefault();
// //       let index = e.srcElement.parentElement.parentElement.id;
// //       settings.config.htmlAddons.splice(index, 1);
// //       settings.save();
// //       addonHTMLremove();
// //       addonHTMLadd();
// //       removeTemps();
// //       addTemps();
// //       addHTMLlisteners();
// //     };
// //   });
// // }
