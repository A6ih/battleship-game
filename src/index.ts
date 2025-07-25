import './styles.css';
import { renderStartGame, getName, renderShipPlacement,
        renderHitLanded, renderHitMissed, renderDock,
        hideGameBoard, showGameBoard, getCurrentCords,
        getCurrentShip, removeHighlight, removeShip,
        enablePlacement,
        disablePlacement,
        getCurrentAxis,
        resetShips,
        resetFilledCords} from './dom.ts';
import Player from './player.ts';
import Computer from './computer.ts';

let playerOne : Player;
let computer : Computer
const playerOneGrid = document.getElementById('A') as HTMLElement
const playerTwoGrid = document.getElementById('B') as HTMLElement

const computerHit = () => {
    const hit = computer.hitEnemy()
    playerOne.gameboard.recieveAttack(hit)
    if(playerOne.gameboard.getHitLanded().has(hit)) {
        renderHitLanded(`A-${hit}`)
     } else {
        renderHitMissed(`A-${hit}`)
     }
     playerTwoGrid.addEventListener('click', attackBoard)
     setTimeout(() => {
        hideGameBoard('A')
        showGameBoard('B')
     }, 1000)
}

const placeShip = (event: Event) => {
    event.preventDefault()
    const target = event.target as HTMLElement
    removeHighlight(event)
    const cords = target.id.split('-')[1].split('')
    if(target.classList.contains('filled')) return
    if(getCurrentCords().length === 0) return
    const ship = getCurrentShip()
    playerOne.gameboard.placeShip(+ship.size, ship.name, [+cords[0], +cords[1]], getCurrentAxis())
    const currentCords = getCurrentCords()
    currentCords.map(cord => {
        const element = document.getElementById(`${target.id.split('-')[0]}-${cord}`)
        element.classList.add('filled')
    })
    removeShip()
    setTimeout(() => {
        if(playerOne.gameboard.ships.length === 5) {
            document.getElementById('start-btn').style.visibility = 'visible'
            document.getElementById('start-btn').addEventListener('click', startGame)
        }
    }, 500)
}

const enterGame = () => {
    playerOne = new Player(getName())
    computer = new Computer()
    computer.placeShips()
    renderStartGame(playerOne.gameboard.board)
    renderDock()
    hideGameBoard('B')
    enablePlacement()
    playerOneGrid.addEventListener('drop', placeShip)
    document.getElementById('reset-placement').addEventListener('click', resetShipPlacement)
}

const startGame = () => {
    disablePlacement()
    playerOneGrid.removeEventListener('drop', placeShip)
    playerTwoGrid.addEventListener('click', attackBoard)
    showGameBoard('B')
    hideGameBoard('A')
}

const attackBoard = (event: Event) => {
    const target = event.target as HTMLElement
    if(target.classList.contains('hit')) return
    playerTwoGrid.removeEventListener('click', attackBoard)
    const cords = target.id.split('-')
    computer.gameboard.recieveAttack(cords[1])
    if(computer.gameboard.getHitLanded().has(cords[1])) {
        renderHitLanded(target.id)
    } else {
        renderHitMissed(target.id)
    }
    
    document.getElementById('B').removeEventListener('click', attackBoard)
    if(computer.gameboard.isAllSunk()) return setTimeout(() => alert('congrats you win'), 500)
    setTimeout(() => {
        hideGameBoard('B')
        showGameBoard('A')
     }, 1000)
    setTimeout(() => computerHit(), 2000)
}

const resetShipPlacement = () => {
    playerOne.gameboard.filledCords.clear()
    playerOne.gameboard.ships.length = 0
    resetFilledCords()
    resetShips()
    document.getElementById('start-btn').style.visibility = 'hidden'
    document.getElementById('start-btn').removeEventListener('click', startGame)
}

document.getElementById('enter-button').addEventListener('click', enterGame)