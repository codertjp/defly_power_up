document.querySelector("#skin-button").onclick = () => {
  let colors = [
    "#3d5dff",
    "#924bff",
    "#f659ff",
    "#ff5fae",
    "#fd3535",
    "#ff8a2a",
    "#93fe00",
    "#18e21f",
    "#008037",
    "#00ffbc",
    "#55d5ff",
  ];
  for (let i = 0; i < 11; i++) {
    document.querySelector(`#color-list > div:nth-child(${i + 3})`).title =
      colors[i];
  }
};

function setupEliteColorClickEvent() {
  if (!packages.eliteSkinHighlight) return;
  const eliteSkinsMap = [
    { name: "S1 Pink", color: "#F659ff" },
    { name: "S2 Pink", color: "#F659ff" },
    { name: "S3 Pink", color: "#F659ff" },
    { name: "S4 Pink", color: "#F659ff" },
    { name: "S4 Pink", color: "#F659ff" },
    { name: "S5 Green", color: "#18e21f" },
    { name: "S6 Sky", color: "#55d5ff" },
    { name: "S7 Green", color: "#18e21f" },
    { name: "S8 Red", color: "#fd3535" },
  ];
  let eliteTab = null;
  document.querySelector("#skin-tabs").childNodes.forEach((e) => {
    if (e.innerText === "Elite") {
      eliteTab = e;
    }
  });
  try {
    eliteTab.addEventListener("click", () => {
      setTimeout(() => {
        let i = 0;
        document.querySelector("#skin-list").childNodes.forEach((skin) => {
          skin.setAttribute(
            "style",
            `cursor: pointer; border: 4px solid ${eliteSkinsMap[i].color};`
          );
          if (skin.childNodes[1] !== undefined) {
            skin.childNodes[1].innerText = eliteSkinsMap[i].name;
          }
          i++;
        });
      }, 50);
    });
  } catch {
    null;
  }
}
setupEliteColorClickEvent();
document.querySelector("#skin-tabs").onclick = () => {
  setupEliteColorClickEvent();
};
document.querySelector("#skin-button").addEventListener("click", () => {
  setupEliteColorClickEvent();
});

// document.querySelector("#skin-list").childNodes.forEach((elm) => {
//   if (elm.classList.contains("locked")) {
//     return;
//   }
//   console.log(elm);
//   elm.innerHTML += `
//       <div style="border-radius: 20px; width: 20px; height: 20px; position: absolute; top: 3px; left: 3px">
//       <img style="width: 20px;" src="https://static.vecteezy.com/system/resources/thumbnails/024/279/679/small/add-or-plus-button-icon-in-black-and-white-color-vector.jpg">
//       </div>
//       `;
//   elm.childNodes[2].onclick = () => {
//     console.log("clicked");
//   };
// });

// function removeElementAtIndex(array, index) {
//   if (index < 0 || index >= array.length) {
//     // Index out of bounds
//     return [];
//   }
//   array.splice(index, 1);
//   return array;
// }

// function skinRatioTwoHeader(px, type = "+") {
//   let num = px.replace("px", "");
//   if (type === "+") {
//     num = num / 0.64;
//   } else if (type === "-") {
//     num = num * 0.78125;
//   }
//   return num + "px";
// }

// function factorRatio(elm, type = "+") {
//   elm.forEach((e) => {
//     e.style.width = skinRatioTwoHeader(e.style.width, type);
//     e.style.height = skinRatioTwoHeader(e.style.height, type);
//     e.style.top = skinRatioTwoHeader(e.style.top, type);
//     e.style.left = skinRatioTwoHeader(e.style.left, type);
//   });
// }

// function loadCustomTabs() {
//   for (index in settings.config.skinTabs) {
//     let tabIndex = parseInt(index) + 15;
//     let tab = settings.config.skinTabs[index];
//     document
//       .querySelector("#skin-tabs")
//       .insertAdjacentHTML(
//         "beforeend",
//         `<div id="skin-tab-${tabIndex}" class="skin-tab custom-tab">${tab.name}</div>`
//       );
//     document.querySelector(`#skin-tab-${tabIndex}`).onclick = () => {
//       document.querySelector(`.skin-tab.selected`).classList.remove("selected");
//       document.querySelector(`#skin-tab-${tabIndex}`).classList.add("selected");
//       document.querySelector("#skin-list").innerHTML = ``;
//       for (skinIndex in tab.skins) {
//         let skin = tab.skins[skinIndex];
//         document
//           .querySelector("#skin-list")
//           .insertAdjacentHTML("beforeend", skin.html);
//         console.log(
//           document.querySelector("#skin-list").childNodes[skinIndex],
//           skin.id,
//           settings.config.skinTabs
//         );
//         document.querySelector("#skin-list").childNodes[skinIndex].id = skin.id;
//         document.querySelector("#skin-list").childNodes[skinIndex].onclick = (
//           e
//         ) => {
//           let elm = e.target;
//           if (elm.parentElement.style.rotate === "45deg") {
//             return;
//           }
//           if (elm.tagName === "DIV") {
//             elm = elm.childNodes[0];
//           }
//           if (elm.tagName === "IMG") {
//             elm = elm.parentElement;
//           }
//           document.querySelector("#skin-popup-canvas > div").innerHTML =
//             elm.innerHTML;
//           document.querySelector("#skin-homepage-canvas > div").innerHTML =
//             elm.innerHTML;
//           factorRatio(
//             document.querySelector("#skin-popup-canvas > div").childNodes
//           );
//           factorRatio(
//             document.querySelector("#skin-homepage-canvas > div").childNodes,
//             "-"
//           );
//           localStorage.setItem("playerSkin", elm.parentElement.id);
//           location.reload();
//         };
//       }
//       document.querySelectorAll(".customSkinIcon").forEach((e) => {
//         e.style.rotate = "45deg";
//         e.id = skin.id;
//         e.onclick = () => {
//           settings.config.skinTabs[index].skins = removeElementAtIndex(
//             tab.skins,
//             skinIndex
//           );
//           settings.save();
//           e.parentElement.remove();
//         };
//       });
//     };
//   }
// }

// function loadPlusButtons() {
//   document.querySelector("#skin-list").childNodes.forEach((elm) => {
//     if (elm.classList.contains("locked")) {
//       return;
//     }
//     elm.innerHTML += `
//           <div class="customSkinIcon" style="border-radius: 20px; width: 20px; height: 20px; position: absolute; top: 3px; left: 3px">
//           <img style="width: 20px;" src="https://static.vecteezy.com/system/resources/thumbnails/024/279/679/small/add-or-plus-button-icon-in-black-and-white-color-vector.jpg">
//           </div>
//           `;
//     elm.childNodes[2].onclick = (e) => {
//       e.srcElement.parentElement.parentElement.click();
//       settings.config.skinTabs[0].skins.push({
//         html: `${e.srcElement.parentElement.parentElement.outerHTML}`,
//         id: localStorage.playerSkin,
//       });
//       settings.save();
//     };
//   });
// }

// document.querySelector("#skin-tabs").onclick = () => {
//   document.querySelectorAll(".skin-tab:not(.custom-tab)").forEach((elm) => {
//     elm.onclick = () => {
//       loadCustomTabs();
//       loadPlusButtons();
//     };
//   });
// };

// new Promise((resolve, reject) =>
//   setTimeout(() => {
//     loadCustomTabs();
//     loadPlusButtons();
//     document
//       .querySelector("#skin-popup > div.box")
//       .insertAdjacentHTML(
//         "afterbegin",
//         '<button class="button">Open Tabs Editor</button>'
//       );
//     let newSkinTab = new popup("newSkinTab");
//     newSkinTab.load(
//       `
//         <h1>Custom Skin Tabs</h1>
//         <div id="skinTabsDropDown"></div>
//         <br/><br/>
//         <input id="skinTabSave" style="width: 245px;" placeholder="Enter a name for this tab, then click save">
//     `,
//       document.body
//     );
//     document.querySelector("#skin-popup > div.box").firstChild.onclick = () => {
//       newSkinTab.show();
//     };
//     skinTabs.load(document.querySelector("#skinTabsDropDown"));
//     skinTabs.loadItems();
//     resolve();
//   }, 1000)
// );
