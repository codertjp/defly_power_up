if (!("disable" in settings.config && settings.config.disable)) {
  on();
} else {
  send("off");
}
