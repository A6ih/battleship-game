import Gameboard from "./gameboard.ts";

export default class Player {
    name: string
    gameboard: Gameboard
    constructor(name: string) {
        this.name = name
        this.gameboard = new Gameboard(10)
    }
}