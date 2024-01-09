function encrypt(text) {
  return btoa(text);
}
function decrypt(encodedText) {
  return atob(encodedText);
}
