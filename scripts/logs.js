/**
 * Log to console, but make a tag that says Defly Power Up+
 * @function
 * @alias console.extension
 * @param {...*} arguments
 * @example console.extension('Hello World')
 **/
function logExtension(...arguments) {
  const text = arguments.join(" ");
  if (text.match("ERROR") !== null) {
    console.log(
      `${text.replace("ERROR", "")} %cError at Defly Power Up+`,
      "color: #430353; font-size: 10px; border-radius: 5px; background-color: #FF5600; padding: 3px"
    );
    return;
  }
  if (text.match("WARN") !== null) {
    console.log(
      `${text.replace("WARN", "")} %cWarning at Defly Power Up+`,
      "color: #151515; font-size: 10px; border-radius: 5px; background-color: #FFFF00; padding: 3px"
    );
    return;
  }
  console.log(
    `${text} %cDefly Power Up+`,
    "color: blue; font-size: 10px; border-radius: 5px; background-color: #ff00f7; padding: 3px"
  );
}
console.extension = logExtension;
