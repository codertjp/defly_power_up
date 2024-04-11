let CLI = new CommandPrefix(
  "/",
  {
    Any: (inp) => {
      return true;
    },
    Number: (inp) => {
      return !isNaN(inp) && !isNaN(parseFloat(inp));
    },
    Bool: (inp) => {
      return inp === "true" || inp === "false";
    },
    ConditionCode: (inp) => {
      if (inp.match(/([A-z0-9\(\)]+)-([A-Z_]+)-([A-z0-9\(\)]+)/) != null)
        return true;
      return false;
    },
    JSON: (inp) => {
      try {
        JSON.parse(inp);
        return true;
      } catch {
        return false;
      }
    },
  },
  (item, inp) => {
    if (inp === undefined) {
      consoleLog(`Enter another parameter with type of: ${item}`, "orange");
      return;
    }
    consoleLog(`-   ${inp} is not type of ${item}`, "red");
  }
);

function consoleLog(string, color = "white") {
  let historyItem = document.createElement("li");
  historyItem.textContent = string;
  historyItem.style.color = color;
  document.querySelector("#CLIhistory").appendChild(historyItem);
}

// Function to create and style the command line interface
function createCLI() {
  // Create a div for the CLI
  let cliDiv = document.createElement("div");
  cliDiv.id = "CLIcontainer";
  cliDiv.style.position = "fixed";
  //   cliDiv.style.display = "none";
  cliDiv.style.bottom = "0";
  cliDiv.style.left = "0";
  cliDiv.style.width = "100%";
  cliDiv.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
  cliDiv.style.padding = "10px";

  // Create a list element to display command history
  let historyList = document.createElement("ul");
  historyList.style.listStyleType = "none";
  historyList.id = "CLIhistory";
  historyList.style.margin = "0";
  historyList.style.padding = "0";
  cliDiv.appendChild(historyList);

  // Create a span for the prompt symbol
  let promptSymbol = document.createElement("span");
  promptSymbol.textContent = ">";
  promptSymbol.style.color = "#00FF00"; // Green color for prompt symbol
  cliDiv.appendChild(promptSymbol);

  // Create an input field for the user to input commands
  let inputField = document.createElement("input");
  inputField.id = "CLIinput";
  inputField.type = "text";
  inputField.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  inputField.style.color = "#FFFFFF"; // White color for text
  inputField.style.border = "none";
  inputField.style.outline = "none";
  inputField.style.width = "calc(100% - 80px)"; // Adjusted width to accommodate the button
  inputField.style.marginLeft = "10px";
  inputField.style.padding = "5px";
  inputField.style.fontFamily = "monospace";
  inputField.autocomplete = false;
  cliDiv.appendChild(inputField);

  // Create a button for executing the command
  let executeButton = document.createElement("button");
  executeButton.textContent = "Execute";
  executeButton.id = "execute";
  executeButton.style.backgroundColor = "#333333";
  executeButton.style.color = "#FFFFFF";
  executeButton.style.border = "none";
  executeButton.style.padding = "5px 10px";
  executeButton.style.margin = "0 10px";
  executeButton.style.cursor = "pointer";
  executeButton.style.width = "100%";
  executeButton.addEventListener("click", function () {
    let command = inputField.value.trim();
    if (command !== "") {
      lastCommand = command;
      if (!executeCommand(command)) {
        consoleLog(`-  Unknown command "${command.split(" ")[0]}"`, "red");
      }
      inputField.value = ""; // Clear input field after executing command
    }
  });
  cliDiv.appendChild(executeButton);

  // Create a button for closing CLI
  let CLIclose = document.createElement("button");
  CLIclose.textContent = "Close";
  CLIclose.id = "close";
  CLIclose.style.backgroundColor = "#4a4444";
  CLIclose.style.color = "#FFFFFF";
  CLIclose.style.border = "none";
  CLIclose.style.padding = "5px 10px";
  CLIclose.style.margin = "0 10px";
  CLIclose.style.cursor = "pointer";
  CLIclose.style.width = "100%";
  CLIclose.addEventListener("click", function () {
    cliDiv.remove();
    inCLI = false;
  });
  cliDiv.appendChild(CLIclose);

  // Append CLI to the document body
  document.body.appendChild(cliDiv);
}

let lastCommand = "";
// Function to execute a command
function executeCommand(command) {
  // Display command in the command history
  consoleLog(command, "#0d802b");
  return CLI.execute(`/${command}`, true);
}

CLI.addCommand("/test", ["ConditionCode", "JSON"], (e) => {
  consoleLog(`-  Verified "${e[0]}"`, "#25ccab");
  const command = basicOperation(e[0], JSON.parse(e[1]));
  consoleLog(`-  Converted: ${command[1]}`, "blue");
  consoleLog(`-  Output: ${command[0]}`, "yellow");
});

CLI.addCommand("/config.edit", ["Any", "Any", "Bool"], (e) => {
  consoleLog(`-  Changing "${e[0]}": ${getValue(e[1], {})}`, "#25ccab");
  settings.config[e[0]] = getValue(e[1], {});
  settings.save();
  consoleLog(
    `-  Converted "${e[0]}": ${getValue(e[1], {})}, and saved!`,
    "yellow"
  );
  if (e[2] === "true") {
    permsChange();
    consoleLog(`-  Reloaded Extension Perms`, "blue");
  }
});

CLI.addCommand("/config.view", ["Any"], (e) => {
  consoleLog(`-  Locating "${e[0]}"`, "#25ccab");
  const value = settings.config[e[0]];
  consoleLog(`-  Found "${value}"`, "yellow");
});

CLI.addCommand("/config.remove", ["Any"], (e) => {
  consoleLog(`-  Deleting "${e[0]}"`, "#25ccab");
  delete settings.config[e[0]];
  settings.save();
  consoleLog(`-  Deleted "${e[0]}", and saved!`, "yellow");
});

CLI.addCommand("/user", ["Any"], (e) => {
  consoleLog(`-  Finding server...`, "#25ccab");
  urls.API.fetchData.User(settings.config.licenseKey, (userData) => {
    console.log(e);
    if (e.length > 0) {
      consoleLog(`-  You Have ${userData.data[e[0]]} ${e[0]}`, "yellow");
    } else {
      consoleLog(`-  User Data ${JSON.stringify(userData.data)}`, "yellow");
    }
  });
});

CLI.addCommand("/clear", [], (e) => {
  document.querySelector("#CLIhistory").innerHTML = "";
});

CLI.addCommand("/console", ["Any"], (e) => {
  consoleLog(`-  ${e[0].replace("_", " ")}`, "yellow");
});

CLI.addCommand("/exit", [], (e) => {
  document.getElementById("CLIcontainer").remove();
  inCLI = false;
});
