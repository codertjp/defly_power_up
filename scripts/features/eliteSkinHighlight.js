new Feature(
    'eliteSkinHighlight',
    //Up:
    (feature)=>{
        function setupEliteColorClickEvent() {
            if (!feature.allowed) return;
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
    }
)
