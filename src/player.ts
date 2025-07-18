import Gameboard from "./gameboard";

export default class Player {
    name: string
    gameboard: Gameboard
    constructor(name: string) {
        this.name = name
        this.gameboard = new Gameboard(10)
    }
}