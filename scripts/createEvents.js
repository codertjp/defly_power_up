new gameEvent("died", (callbackID) => {
  setTimeout(() => {
    const targetElement = document.querySelector("#respawn");
    function handleDisplayChange(mutationsList) {
      for (let mutation of mutationsList) {
        if (mutation.attributeName === "style") {
          const displayValue = window.getComputedStyle(targetElement).display;
          if (displayValue === "block") {
            gameEvents[callbackID].fire();
          }
        }
      }
    }
    const observer = new MutationObserver(handleDisplayChange);
    observer.observe(targetElement, {
      attributes: true,
      attributeFilter: ["style"],
    });
    const targetElement2 = document.querySelector("#gm-1v1-lobby");
    function handleDisplayChange(mutationsList) {
      for (let mutation of mutationsList) {
        if (mutation.attributeName === "style") {
          const displayValue = window.getComputedStyle(targetElement).display;
          if (displayValue === "block") {
            gameEvents[callbackID].fire();
          }
        }
      }
    }
    const observer2 = new MutationObserver(handleDisplayChange);
    observer2.observe(targetElement2, {
      attributes: true,
      attributeFilter: ["style"],
    });
  }, 1000);
});
