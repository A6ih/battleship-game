import Ship from '../src/ship'

test('create a new ship', () => {
    const shipOne = new Ship(3)

    expect(shipOne.length).toBe(3)
})

test('hits registers on ship', () => {
    const shipOne = new Ship(3)
    shipOne.hit()
    shipOne.hit()

    expect(shipOne.hits).toBe(2)
})

test('ship sunks if hits are equal to length', () => {
    const shipOne = new Ship(3)
    shipOne.hit()
    shipOne.hit()
    shipOne.hit()

    expect(shipOne.isSunk()).toBe(true)
})