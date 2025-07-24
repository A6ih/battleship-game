import Ship from './ship.ts'

type ShipObj = {
    name: string,
    cords: string[],
    ship: Ship
}

const createBoard = (size: number) => {
    const board: number[][] = [];
    for (let i = 0; i < size; i++) {
        board[i] = Array.from(Array(size).keys())
    }

    return board
}

const createShipObj = (name: string, cords: string[], ship: Ship) => {
    const newShip : ShipObj= {
        name,
        cords,
        ship
    }

    return newShip
}

const hitShip = (cords: string, ships: ShipObj[]) => {
    const shipToHit = ships.filter((ship: ShipObj) => ship.cords.includes(cords))
    shipToHit[0].ship.hit()
}

export default class Gameboard {
    size: number
    board: number[][]
    filledCords: Set<string>
    ships: ShipObj[]
    missedAttacks: Set<string>
    successfulAttacks : Set<string>

    constructor(size: number) {
        this.size = size
        this.board = createBoard(this.size)
        this.filledCords = new Set()
        this.ships = []
        this.missedAttacks = new Set()
        this.successfulAttacks = new Set()
    }

    placeShip(size:number, name: string, cords: number[], axis: string) {
        if(this.filledCords.has(`${cords[0]}${cords[1]}`)) return
        
        const newShip : Ship = new Ship(size)
        const newCords: string[] = []
        
        if(axis === 'y') {
            this.filledCords.add([cords[0], cords[1]].join(''))
            newCords.push([cords[0], cords[1]].join(''))

            for(let i = 1; i < size; i++) {
              this.filledCords.add([(cords[0] + i), cords[1]].join(''))
              newCords.push([(cords[0] + i), cords[1]].join(''))
            }
        } else {
            this.filledCords.add([cords[0], cords[1]].join(''))
            newCords.push([cords[0], cords[1]].join(''))

            for(let i = 1; i < size; i++) {
              this.filledCords.add([cords[0], (cords[1] + i)].join(''))
              newCords.push([cords[0], (cords[1] + i)].join(''))
            }
        }

        const shipObj = createShipObj(name, newCords, newShip)

        this.ships.push(shipObj);
    }

    recieveAttack(cords: string) {
        if(this.missedAttacks.has(cords) || this.successfulAttacks.has(cords)) return

        if(this.filledCords.has(cords)) {
            hitShip(cords, this.ships)
            this.successfulAttacks.add(cords)
        } else {
            this.missedAttacks.add(cords)
        }
    }

    isAllSunk() {
       const resultArr = this.ships.map((shipObj: ShipObj) => shipObj.ship.isSunk())
        if(resultArr.includes(false)) return false
        return true
    }

    getHitMissed() {
        return this.missedAttacks
    }

    getHitLanded() {
        return this.successfulAttacks
    }

    getFilledCords() {
        return this.filledCords
    }
    
    isValidPlacement(cords: string[]) {
        const results = cords.map(cord => this.filledCords.has(cord))
        return results.includes(true) ? false : true
    } 
}