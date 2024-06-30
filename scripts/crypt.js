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

function clearLogs() {
  localStorage.removeItem("logs");
}
