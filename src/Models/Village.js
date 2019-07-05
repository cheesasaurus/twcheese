
class Village {
    constructor(id, x, y) {
        this.id = id;
        this.x = x;
        this.y = y;
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