
class Village {
    constructor(id, x, y) {
        this.id = parseInt(id);
        this.x = parseInt(x);
        this.y = parseInt(y);
    }

    /**
     * @param {Village} otherVillage 
     */
    distanceTo(otherVillage) {
        let diffX = this.x - otherVillage.x;
        let diffY = this.y - otherVillage.y;
        return Math.hypot(diffX, diffY);
    }
}


export { Village };