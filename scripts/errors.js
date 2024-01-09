// Loading screen / error page
// Inline CSS and HTML
var inlineStyles = `
#popup-container {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 75%;
    max-width: 1000px;
    background-color: #fff;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 20px;
    margin-top: 20px;
    display: none;
    z-index: 999;
}

#popup-content {
    text-align: center;
    color: #333;
}

#close-btn {
    cursor: pointer;
    color: #007bff;
    font-weight: bold;
}
`;
var inlineHTML = `
<div id="popup-container">
    <div id="popup-content">
        <p>Your notification message here</p>
        <span id="close-btn">Close</span>
    </div>
</div>
`;

// Create a style element and append it to the head
var styleElement = document.createElement("style");
styleElement.innerHTML = inlineStyles;
document.head.appendChild(styleElement);

// Inject HTML into the body
document.body.insertAdjacentHTML("beforeend", inlineHTML);

// Get the popup container and close button
var popupContainer = document.getElementById("popup-container");
var closeBtn = document.getElementById("close-btn");

// Function to show the popup
function showPopup(text) {
  popupContainer.style.display = "block";
  popupContainer.childNodes[1].childNodes[1].innerHTML = text;
  setTimeout(hidePopup, 10000); // Auto-hide after 5 seconds
}

// Function to hide the popup
function hidePopup() {
  popupContainer.style.display = "none";
}

// Event listener for the close button
closeBtn.addEventListener("click", hidePopup);

function pageError(
  text = "There has been an unknown error loading the page...",
  type = "screen"
) {
  if (type === "screen") {
    let loader = document.createElement("div");
    loader.innerHTML = `
    <style>

            .loading-screen {
                display: flex;
                backdrop-filter: blur(33px);
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.6);
                justify-content: center;
                align-items: center;
                z-index: 9999;
            }

            #loading-spinner {
                border: 8px solid #f3f3f3;
                border-top: 8px solid #3498db;
                border-radius: 50%;
                width: 50px;
                height: 50px;
                animation: spin 1s linear infinite;
            }

            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
        <div id="loading-screen" class="loading-screen">
        <h1 style="color: white; position: absolute; padding-bottom: 300px;">${text}</h1>
        <br />
        <!--<button style="text-decoration: underline;background-color: transparent;border: none;color: white;position: absolute;margin-top: 300px;font-size: 20px;">What to do about it...</button>-->
        <div id="loading-spinner"></div>
    </div>
    `;
    document.body.appendChild(loader);
    // document.querySelector("#loading-screen > button").onclick = () => {
    //   let helpPage = document.createElement("div");
    //   helpPage.innerHTML = `
    //         <div class="loading-screen">
    //             <div style="color: white;">
    //                 <h1>Steps to do:</h1>
    //                 <h1>Steps to do:</h1>
    //                 <h1>Steps to do:</h1>
    //             </div>
    //         </div>
    //     `;
    //   document.body.appendChild(helpPage);
    //   document.getElementById("loading-screen").style.display = "none";
    // };
  } else if (type === "error") {
    console.error(text);
  } else if (type === "alert") {
    alert(`Error: ${text}`);
  } else if (type === "popup") {
    showPopup(text);
  }
}
