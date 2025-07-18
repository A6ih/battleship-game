import Gameboard from "./gameboard";

const numArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

export default class Computer {
    name: string
    gameboard: Gameboard
    cordsToHit: string[]
    constructor() {
        this.name = 'Computer'
        this.gameboard = new Gameboard(10)
        this.cordsToHit = []
    }

    fillCordsToHit() {
        for(let i = 0; i < 10; i++) {
            numArr.map(number => this.cordsToHit.push(`${i}${number}`))
        }
    }

    hitEnemy() {
        const number = Math.floor(Math.random() * this.cordsToHit.length)
        const cords = this.cordsToHit[number]
        this.cordsToHit.splice(number, 1)
        return cords
    }
}