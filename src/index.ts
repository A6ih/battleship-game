import './styles.css';
import { renderStartGame, getName, renderShipPlacement, getClickedCord, renderHitLanded, renderHitMissed } from './dom.ts';
import Player from './player.ts';

let playerOne : Player;
let lastClicked: string = ''

const buttonClicked = () => {
    console.log(getClickedCord())
}


const startGame = () => {
    playerOne = new Player(getName())
    renderStartGame(playerOne.gameboard.board)
    playerOne.gameboard.placeShip(3, 'Destroyer', [0, 0])
    playerOne.gameboard.placeShip(5, 'Submarine', [2, 0])
    playerOne.gameboard.placeShip(4, 'Submarine', [4, 3])
    playerOne.gameboard.placeShip(4, 'Submarine', [6, 1])
    playerOne.gameboard.placeShip(6, 'Submarine', [8, 4])
    playerOne.gameboard.ships.map(shipObj => renderShipPlacement(shipObj.cords, 'A'))
}

const attackBoard = () => {
    if(lastClicked === getClickedCord()) return
    lastClicked = getClickedCord()
    const cords = getClickedCord().split('-')
    if(cords[0] === 'A') {
        playerOne.gameboard.recieveAttack(cords[1])
    }
    if(playerOne.gameboard.getHitLanded().has(cords[1])) {
        renderHitLanded(lastClicked)
    } else {
        renderHitMissed(lastClicked)
    }

    console.log(playerOne.gameboard.isAllSunk())
}

document.getElementById('start-button').addEventListener('click', startGame)

document.getElementById('A').addEventListener('click', attackBoard)
document.getElementById('B').addEventListener('click', attackBoard)
