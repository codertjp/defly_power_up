if (!("disable" in settings.config && settings.config.disable)) {
  on();
} else {
  send("off");
}


new Promise((resolve, reject) =>
  setTimeout(() => {
    function makeElementDraggable(element) {
      let offsetX, offsetY;
      let isDragging = false;

      element.style.position = "absolute";

      element.addEventListener("mousedown", (event) => {
        isDragging = true;
        offsetX = event.clientX - element.getBoundingClientRect().left;
        offsetY = event.clientY - element.getBoundingClientRect().top;
      });

      document.addEventListener("mousemove", (event) => {
        if (isDragging) {
          const x = event.clientX - offsetX;
          const y = event.clientY - offsetY;
          element.style.left = x + "px";
          element.style.top = y + "px";
        }
      });

      document.addEventListener("mouseup", () => {
        isDragging = false;
      });
    }

    function loadDiscordChat(id) {
      let dc = document.createElement("div");
      dc.innerHTML = `
<div id="discordChatPanel" style="
    z-index: 1000;
    position: absolute;
    display: none;
    animation: fadeIn 0.5s ease-out;
    position: absolute;
    background-color: #f1f1f1;
    text-align: center;
    border: 1px solid #d3d3d3;
    top: 20px;
">
<div style="display: flex;">
    <div id="closeDiscord"><?xml version="1.0" encoding="utf-8"?><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 122.879 122.879" enable-background="new 0 0 122.879 122.879" xml:space="preserve"><g><path fill-rule="evenodd" clip-rule="evenodd" fill="#FF4141" d="M61.44,0c33.933,0,61.439,27.507,61.439,61.439 s-27.506,61.439-61.439,61.439C27.507,122.879,0,95.372,0,61.439S27.507,0,61.44,0L61.44,0z M73.451,39.151 c2.75-2.793,7.221-2.805,9.986-0.027c2.764,2.776,2.775,7.292,0.027,10.083L71.4,61.445l12.076,12.249 c2.729,2.77,2.689,7.257-0.08,10.022c-2.773,2.765-7.23,2.758-9.955-0.013L61.446,71.54L49.428,83.728 c-2.75,2.793-7.22,2.805-9.986,0.027c-2.763-2.776-2.776-7.293-0.027-10.084L51.48,61.434L39.403,49.185 c-2.728-2.769-2.689-7.256,0.082-10.022c2.772-2.765,7.229-2.758,9.953,0.013l11.997,12.165L73.451,39.151L73.451,39.151z"/></g></svg></div>
</div>
<div>
    <iframe id="discordChatPanelHeader" src="https://e.widgetbot.io/channels/1200292527245381662/${id}" allow="clipboard-write; fullscreen" height="350" width="300"></iframe>
</div>
</div>
`;
      document.body.appendChild(dc);
      let discordChatType = document.createElement("div");
      discordChatType.innerHTML = `
    <div style="
    z-index: 1001;
    position: absolute;
">
    <button id="discordChatType" style="width: 250px; padding: 2px; border: none; border-radius: 10px; background: linear-gradient(to right, #007bff, #0047ab); color: #fff; font-size: 16px; cursor: pointer; transition: opacity 0.3s;${
      settings.config.addDiscord ? "display: block;" : "display: none;"
    }">Open Discord</button>
    <div>
    `;
      document.body.appendChild(discordChatType);
      document
        .getElementById("discordChatType")
        .addEventListener("click", () => {
          let permissions = checkPermissions("signedIn");
          if (permissions.signedIn === false) {
            return;
          }
          document.getElementById("discordChatPanel").style.display = "block";
        });
      makeElementDraggable(dc);
      document.getElementById("closeDiscord").onclick = () => {
        document.getElementById("discordChatPanel").style.display = "none";
      };
    }
    //https://discord.com/api/channels/1217966062109331506/MTIxNzk1MTg3OTIyNTU0NDcwNA.Gh-IyN.HkdLEgtaII81ZSdmn335X3wQhsgNVL_Qi2nh0E
    fetch(
      "https://discord.com/api/webhooks/1200575497147531335/txG3tBcDzHUxQisJ7E51kZu5jvid9p7_REBnm34FvFJkaXjCGEApeOavr2urGHAZnrMz"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        loadDiscordChat(data.channel_id);
      });
    // document
    //   .querySelector("#button-quality-high")
    //   .addEventListener("click", () => {
    //     hideLow();
    //   });
    // document
    //   .querySelector("#button-quality-medium")
    //   .addEventListener("click", () => {
    //     hideLow();
    //   });
    // document
    //   .querySelector("#button-quality-low")
    //   .addEventListener("click", () => {
    //     hideLow();
    //   });
    // document.querySelector("#button-quality-very-low").addEventListener(
    //   "click",
    //   (document.querySelector("#button-quality-very-low").onclick = () => {
    //     showLow();
    //   })
    // );

    resolve();
  }, 3000)
);

// function loadOwnName() {
//   const ownName = document.createElement("div");
//   ownName.innerHTML = `
//     <div style="display: none; position: fixed;
//                 color: white;
//                 top: 50%;
//                 left: 50%;
//                 transform: translate(-50%, -50%);
//                 z-index: 1;">
//       <img id="ownIcon" style="display:  none; position: absolute;
//       margin-top: 7px;
//       width: 24px;
//       height: 24px;
//       transform: translate(-50%, -50%);
//       top: -47px;
//       left: -39px;" src="loading...">
//       <h3 id="ownName" style="    z-index: 9999;
//       width: fit-content;
//       margin: 0px;
//       font-size: 15px;
//       font-weight: 10;
//       position: absolute;
//       top: -46px;
//       left: -21.5px;">Loading...</h3>
//     </div>
//   `;
//   document.body.appendChild(ownName);
// }
// function getIconImg(index) {
//   return document.querySelector("#badge-select").childNodes[index];
// }

// loadOwnName();
// const url = `https://s.defly.io/account/myInfo?s=${localStorage.sessionId}`;
// fetch(url)
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     return response.text();
//   })
//   .then((data) => {
//     const lines = data.split("\n");
//     const desiredLine = lines[3];
//     const numberValue = parseInt(desiredLine.trim(), 10);
//     let icon = getIconImg(numberValue);
//     document.querySelector("#ownName").innerText = document.querySelector("#username").value;
//     if (!icon.classList.contains("empty")) {
//       document.querySelector("#ownIcon").src = icon.src;
//       document.querySelector("#ownIcon").style.display = "block";
//     } else {
//       document.querySelector("#ownIcon").style.display = "none";
//     }
//   })
//   .catch((error) => {
//     null;
//   });

// setInterval(() => {
//   if (
//     getComputedStyle(document.querySelector("#respawn")).display === "block" ||
//     !(
//       getComputedStyle(document.querySelector("body > canvas")).display ===
//       "block"
//     )
//   ) {
//     document.querySelector("#ownIcon").parentElement.style.display = "none";
//   } else {
//     setTimeout(() => {
//       document.querySelector("#ownIcon").parentElement.style.display = "block";
//     }, 200); //2 secs
//   }
// }, 600);

document.body.addEventListener("click", (e) => {
  let elm = e.srcElement;
  log(
    `Click Event: ${elm.tagName} tag with id "${
      elm.id
    }" and classes "${JSON.stringify(elm.classList)}"`
  );
});

permsChange();
 
log("Loaded");
