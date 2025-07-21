import './styles.css';
import { renderStartGame, getName, renderShipPlacement,
         getClickedCord, renderHitLanded, renderHitMissed,
         toggleClick, hideGameBoard, showGameBoard } from './dom.ts';
import Player from './player.ts';
import Computer from './computer.ts';

let playerOne : Player;
let computer : Computer
let lastClicked: string = ''

const computerHit = () => {
    const hit = computer.hitEnemy()
    playerOne.gameboard.recieveAttack(hit)
    if(playerOne.gameboard.getHitLanded().has(hit)) {
        renderHitLanded(`A-${hit}`)
     } else {
        renderHitMissed(`A-${hit}`)
     }
     toggleClick(false)
     setTimeout(() => {
        hideGameBoard('A')
        showGameBoard('B')
     }, 1000)
     document.getElementById('B').addEventListener('click', attackBoard)
}


const startGame = () => {
    playerOne = new Player(getName())
    computer = new Computer()
    computer.placeShips()
    playerOne.gameboard.placeShip(3, 'Destroyer', [0, 0])
    playerOne.gameboard.placeShip(5, 'Submarine', [2, 0])
    playerOne.gameboard.placeShip(4, 'Submarine', [4, 3])
    playerOne.gameboard.placeShip(4, 'Submarine', [6, 1])
    playerOne.gameboard.placeShip(6, 'Submarine', [8, 4])
    renderStartGame(playerOne.gameboard.board)
    playerOne.gameboard.ships.map(shipObj => renderShipPlacement(shipObj.cords, 'A'))
    setTimeout(() => hideGameBoard('A'), 1000)
}

const attackBoard = () => {
    if(lastClicked === getClickedCord()) return
    lastClicked = getClickedCord()
    const cords = getClickedCord().split('-')

    computer.gameboard.recieveAttack(cords[1])
    if(computer.gameboard.getHitLanded().has(cords[1])) {
        renderHitLanded(lastClicked)
    } else {
        renderHitMissed(lastClicked)
    }
    
    toggleClick(true)
    document.getElementById('B').removeEventListener('click', attackBoard)
    if(computer.gameboard.isAllSunk()) return setTimeout(() => alert('congrats you win'), 500)
    setTimeout(() => {
        hideGameBoard('B')
        showGameBoard('A')
     }, 1000)
    setTimeout(() => computerHit(), 2000)
}

document.getElementById('start-button').addEventListener('click', startGame)

document.getElementById('B').addEventListener('click', attackBoard)