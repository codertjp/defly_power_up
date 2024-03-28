window.onload = () => {
  let jsonData = {};
  document
    .getElementById("jsonFileInput")
    .addEventListener("change", handleFileSelect);

  function handleFileSelect(event) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        jsonData = JSON.parse(e.target.result);
        displayJsonData(jsonData);
      };

      reader.readAsText(file);
    }
  }

  function displayJsonData(data) {
    const outputList = document.getElementById("outputList");
    outputList.innerHTML = "";

    for (const key in data) {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
                    <input type="checkbox" checked id="${key}">
                    <label for="${key}">${key}</label>
                `;
      outputList.appendChild(listItem);
    }
  }

  function downloadFilteredJson() {
    const outputList = document.getElementById("outputList");
    const checkboxes = outputList.querySelectorAll('input[type="checkbox"]');
    const selectedKeys = Array.from(checkboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.id);

    let filteredJson = {};

    for (const key in jsonData) {
      if (selectedKeys.includes(key)) {
        filteredJson[key] = jsonData[key];
      }
    }

    const fileName = document.getElementById("fileName").value || "filtered";
    const fileExtension =
      document.getElementById("fileExtension").value || "json";
    const outputFileName = `${fileName}.${fileExtension}`;
    const outputBlob = new Blob([JSON.stringify(filteredJson)], {
      type: "application/json",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(outputBlob);
    link.download = outputFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function toggleDarkMode() {
    const darkModeCheckbox = document.getElementById("darkMode");
    const body = document.body;

    if (darkModeCheckbox.checked) {
      body.style.backgroundColor = "#343a40"; // Dark mode background color
      body.style.color = "#ffffff"; // Dark mode text color
    } else {
      body.style.backgroundColor = "#f8f9fa"; // Light mode background color
      body.style.color = "#495057"; // Light mode text color
    }
  }

  // Detect user's system dark mode preference and apply it
  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  document.getElementById("darkMode").checked = prefersDarkMode;
  toggleDarkMode(); // Apply initial color mode
  document.getElementById("download").onclick = () => {
    downloadFilteredJson();
  };
  document.getElementById("darkMode").onchange = () => {
    toggleDarkMode();
  };
};
