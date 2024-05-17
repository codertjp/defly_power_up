const gameEvents = {};

class gameEvent {
  constructor(id, eventFinder) {
    this.id = id;
    gameEvents[id] = this;
    this.subscribes = [];
    eventFinder(this.id);
  }
  subscribe(callback) {
    this.subscribes.push(callback);
  }
  fire() {
    console.log(this);
    this.subscribes.forEach((func) => {
        console.extension('fire');
      func();
    });
  }
}
