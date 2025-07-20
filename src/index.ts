import './styles.css';
import { renderStartGame, getName, renderShipPlacement } from './dom.ts';
import Player from './player.ts';

let playerOne;

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

document.getElementById('start-button').addEventListener('click', startGame)