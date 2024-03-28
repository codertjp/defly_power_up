function encrypt(text) {
  return btoa(text);
}
function decrypt(encodedText) {
  return atob(encodedText);
}

function from(num) {
  return String.fromCharCode(num);
}

function to(str) {
  return str.charCodeAt(0);
}

function cryptWithKey(string, key) {
  let output = "",
    i = 0;
  string.split("").forEach((letter) => {
    output += from(to(letter) + to(key[i]));
    i++;
    if (i === key.length) {
      i = 0;
    }
  });
  return output;
}

function uncryptWithKey(string, key) {
  let output = "",
    i = 0;
  string.split("").forEach((letter) => {
    output += from(to(letter) - to(key[i]));
    i++;
    if (i === key.length) {
      i = 0;
    }
  });
  return output;
}

function log(text) {
  var date = new Date();
  var dd = String(date.getDate()).padStart(2, "0");
  var mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = date.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;
  localStorage.setItem(
    "logs",
    localStorage.getItem("logs") === null
      ? ""
      : localStorage.getItem("logs") +
          `${cryptWithKey(
            today +
            ">" +
            date.toLocaleTimeString() +
            ">" + text,
            "DEVLOGS"
          )}\n`
  );
}

function unLog(text) {
  let output = "";
  text.split("\n").forEach((item) => {
    output += `${uncryptWithKey(item, "DEVLOGS")}\n`;
  });
  return output;
}

function clearLogs() {
  localStorage.removeItem("logs");
}
