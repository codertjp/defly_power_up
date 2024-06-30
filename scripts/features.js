const features = {};

class Feature {
  /**
   * This is a clean way to make a new feature
   * @constructor
   * @param {string} id - Package name
   * @param {function} up - Build the feature
   * @param {function} down - Deconstruct the feature
   * @param {bool} autoOn - Automatically enable?
   * @param {bool} isPermission - Does it exist in packages.js?
   * @return Feature
   **/
  constructor(
    id,
    up = () => {},
    down = () => {},
    autoOn = true,
    isPermission = true
  ) {
    this.id = id;
    this.states = {};
    this.states.up = up;
    this.states.down = down;
    this.isPermission = isPermission;
    features[id] = this;
    if (!autoOn || (!this.allowed && this.isPermission)) return;
    this.up();
  }
  up() {
    if (!this.allowed && this.isPermission) {
      console.extension(
        `errorYou do not have the perms to use "${this.id}" package`
      );
      return;
    }
    this.states.up(this);
  }
  down() {
    this.states.down(this);
  }
  get allowed() {
    return packages[this.id];
  }
}
