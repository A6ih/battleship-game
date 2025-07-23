import './styles.css';
import { renderStartGame, getName, renderShipPlacement,
        renderHitLanded, renderHitMissed, renderDock,
        hideGameBoard, showGameBoard, getCurrentCords,
        getCurrentShip, removeHighlight, removeShip,
        enablePlacement} from './dom.ts';
import Player from './player.ts';
import Computer from './computer.ts';

let playerOne : Player;
let computer : Computer

const computerHit = () => {
    const hit = computer.hitEnemy()
    playerOne.gameboard.recieveAttack(hit)
    if(playerOne.gameboard.getHitLanded().has(hit)) {
        renderHitLanded(`A-${hit}`)
     } else {
        renderHitMissed(`A-${hit}`)
     }
     document.getElementById('B').addEventListener('click', attackBoard)
     setTimeout(() => {
        hideGameBoard('A')
        showGameBoard('B')
     }, 1000)
     document.getElementById('B').addEventListener('click', attackBoard)
}

const placeShip = (event: Event) => {
    event.preventDefault()
    const target = event.target as HTMLElement
    console.log(playerOne.gameboard.ships)
    removeHighlight(event)
    const cords = target.id.split('-')[1].split('')
    if(target.classList.contains('filled')) return
    if(getCurrentCords().length === 0) return
    const ship = getCurrentShip()
    playerOne.gameboard.placeShip(+ship.size, ship.name, [+cords[0], +cords[1]], 'V')
    const currentCords = getCurrentCords()
    currentCords.map(cord => {
        const element = document.getElementById(`${target.id.split('-')[0]}-${cord}`)
        element.classList.add('filled')
    })
    removeShip()
}

const enterGame = () => {
    playerOne = new Player(getName())
    computer = new Computer()
    computer.placeShips()
    renderStartGame(playerOne.gameboard.board)
    renderDock()
    hideGameBoard('B')
    enablePlacement()
    document.getElementById('A').addEventListener('drop', placeShip)
}

const startGame = () => {
    
}

const attackBoard = (event: Event) => {
    const target = event.target as HTMLElement
    if(target.classList.contains('hit')) return
    document.getElementById('B').removeEventListener('click', attackBoard)
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

document.getElementById('start-button').addEventListener('click', enterGame)

document.getElementById('B').addEventListener('click', attackBoard)
