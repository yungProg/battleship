import ship from "../src/ship";

const testShip = ship(2)

test('new ship has no hit', () => {
    expect(testShip.getHits()).toBe(0)
})

test('counts number of hits', () => {
    testShip.hit()
    expect(testShip.getHits()).toBe(1)
})

describe('ship floating status', () => {
    test('it is floating', () => {
        expect(testShip.isSunk()).toBe(false)
    })

    test('it has sunk', () => {
        testShip.hit()
        expect(testShip.isSunk()).toBe(true)
    })
})