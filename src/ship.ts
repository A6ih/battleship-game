export default class Ship {
    length: number
    hits: number

    constructor(length: number) {
        this.length = length
        this.hits = 0
    }

    hit() {
        this.hits++
    }

    isSunk() {
       const result = this.length === this.hits ? true : false
       return result
    }
}