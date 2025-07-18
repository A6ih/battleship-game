import Gameboard from '../src/gameboard'

test('create a board with correct size', () => {
    const newGame = new Gameboard(10)

    expect(newGame.size).toBe(10)
})

test('return undefined if accessing non existance coords', () => {
    const newGame = new Gameboard(10)

    expect(() => newGame.board[11][11]).toThrow('Cannot read properties of undefined')
})

test('create and place ship at a specific coords', () => {
    const newGame = new Gameboard(10)
    newGame.placeShip(3, 'destroyer', [0, 0])

    expect(newGame.filledCords.has('00')).toBe(true)
    expect(newGame.filledCords.has('01')).toBe(true)
    expect(newGame.filledCords.has('02')).toBe(true)
    expect(newGame.filledCords.has('03')).toBe(false)
})

test('attack is missed if cords does not have a ship', () => {
    const newGame = new Gameboard(10)
    newGame.placeShip(3, 'Submarine', [1, 1])

    newGame.recieveAttack('01')

    expect(newGame.missedAttacks.has('01')).toBe(true)
    expect(newGame.successfulAttacks.has('01')).toBe(false)
})

describe('attack is succesfull', () => {
    const newGame = new Gameboard(10)
    newGame.placeShip(3, 'Submarine', [1, 1])

    newGame.recieveAttack('12')

    test('if cords has a ship', () => {
        expect(newGame.missedAttacks.has('12')).toBe(false)
        expect(newGame.successfulAttacks.has('12')).toBe(true)
    })

    test('ship registers the attack', () => {
        expect(newGame.ships[0].ship.hits).toBe(1)
    })
})

describe('all the ships', () => {
    const newGame = new Gameboard(10)
    newGame.placeShip(3, 'Submarine', [1, 1])

    newGame.recieveAttack('12')
    newGame.recieveAttack('11')
    
    test('are not sunk', () => {
        expect(newGame.isAllSunk()).toBe(false)
    })

    test('are sunk', () => {
        newGame.recieveAttack('13')

        expect(newGame.isAllSunk()).toBe(true)
    })
})
