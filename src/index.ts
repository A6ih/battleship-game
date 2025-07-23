import './styles.css';
import { renderStartGame, getName, renderShipPlacement,
        renderHitLanded, renderHitMissed, renderDock,
        hideGameBoard, showGameBoard, activateHighlighting,
        disableHighlighting, toggleCurrentShip, getCurrentCords,
        getCurrentShip,
        removeHighlight,
        removeShip} from './dom.ts';
import Player from './player.ts';
import Computer from './computer.ts';

let playerOne : Player;
let computer : Computer

const dragShipStart = (e: Event) => {
    const target = e.target as HTMLElement
    const targets = target.id.split('-')
    const ship = {
        name: targets[0],
        size: +targets[1]
    }
    toggleCurrentShip(ship)
    setTimeout(() => {
      activateHighlighting()
    }, 10);
}

const dragShipEnd = (e: Event) => {
    disableHighlighting()
}

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
    const ships = Array.from(document.getElementsByClassName('dock-ships'))
    ships.map(element => {
        element.addEventListener('dragstart', dragShipStart)
        element.addEventListener('dragend', dragShipEnd)
    })
    const grids = Array.from(document.getElementsByClassName('cords'))
    grids.map(grid => grid.addEventListener('drop', placeShip))
}

const startGame = () => {
    playerOne = new Player(getName())
    computer = new Computer()
    computer.placeShips()
    playerOne.gameboard.placeShip(3, 'Destroyer', [0, 0], 'H')
    playerOne.gameboard.placeShip(5, 'Submarine', [2, 0], 'H')
    playerOne.gameboard.placeShip(4, 'Submarine', [4, 3], 'H')
    playerOne.gameboard.placeShip(4, 'Submarine', [6, 1], 'H')
    playerOne.gameboard.placeShip(6, 'Submarine', [8, 4], 'H')
    renderStartGame(playerOne.gameboard.board)
    playerOne.gameboard.ships.map(shipObj => renderShipPlacement(shipObj.cords, 'A'))
    computer.gameboard.ships.map(shipObj => renderShipPlacement(shipObj.cords, 'B'))
    setTimeout(() => hideGameBoard('A'), 1000)
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
