const features = {};

class Feature {
    constructor(id, up = ()=>{}, down = ()=>{}, autoOn = true, isPermission = true){
        this.id = id;
        this.states = {}
        this.states.up = up;
        this.states.down = down;
        this.isPermission = isPermission;
        features[id] = this;
        if (!autoOn || !this.allowed && this.isPermission) return;
        this.up();
    }
    up() {
        if (!this.allowed && this.isPermission){
            console.extension(`You do not have the perms to use "${this.id}" package`);
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
