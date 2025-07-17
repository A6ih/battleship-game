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

    console.log(newGame.filledCords.values())

    expect(newGame.filledCords.has('00')).toBe(true)
    expect(newGame.filledCords.has('01')).toBe(true)
    expect(newGame.filledCords.has('02')).toBe(true)
    expect(newGame.filledCords.has('03')).toBe(false)
})