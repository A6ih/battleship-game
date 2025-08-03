import Gameboard from './gameboard.ts';
import { getShipsArr, generateCords, generateCordsVertical } from './helperFns.ts';

const getAxis = () => {
  const number = Math.floor(Math.random() * 2);
  if (number === 1) {
    return 'x';
  } else {
    return 'y';
  }
};

const getFinalCords = (
  placeShip: string[],
  filledCords: Set<string>,
  size: number,
  axis: string
) => {
  const number = Math.floor(Math.random() * placeShip.length);
  const cordsArr = placeShip[number].split('');
  const cordsArrNum = [Number(cordsArr[0]), Number(cordsArr[1])];
  if (axis === 'y') {
    if (cordsArrNum[0] + size > 9) {
      return getFinalCords(placeShip, filledCords, size, axis);
    }
    const cords = generateCordsVertical(cordsArrNum, size);
    const result = cords.map((cord) => {
      if (filledCords.has(cord) || cord.length > 2) return true;
      return false;
    });
    if (result.includes(true)) {
      return getFinalCords(placeShip, filledCords, size, axis);
    } else {
      placeShip.splice(placeShip.indexOf(cords[0]), size);
      return cordsArrNum;
    }
  } else {
    if (cordsArrNum[1] + size > 9) {
      return getFinalCords(placeShip, filledCords, size, axis);
    }
    const cords = generateCords(cordsArrNum, size);
    const result = cords.map((cord) => {
      if (filledCords.has(cord) || cord.length > 2) return true;
      return false;
    });
    if (result.includes(true)) {
      return getFinalCords(placeShip, filledCords, size, axis);
    } else {
      placeShip.splice(placeShip.indexOf(cords[0]), size);
      return cordsArrNum;
    }
  }
};

const numArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export default class Computer {
  name: string;
  gameboard: Gameboard;
  cordsToHit: string[];
  cordsToPlaceShip: string[];
  lastHit: boolean;
  lastHitCord: string;
  constructor() {
    this.name = 'Computer';
    this.gameboard = new Gameboard(10);
    this.cordsToHit = [];
    this.cordsToPlaceShip = [];
  }

  fillCords() {
    for (let i = 0; i < 10; i++) {
      numArr.map((number) => {
        this.cordsToHit.push(`${i}${number}`);
        this.cordsToPlaceShip.push(`${i}${number}`);
      });
    }
  }

  hitEnemy() {
    const number = Math.floor(Math.random() * this.cordsToHit.length);
    const cords = this.cordsToHit[number];
    this.cordsToHit.splice(number, 1);
    return cords;
  }

  placeShips() {
    const shipArr = getShipsArr();
    this.fillCords();
    while (shipArr.length > 0) {
      const ship = shipArr.shift();
      const axis = getAxis();
      const cords = getFinalCords(
        this.cordsToPlaceShip,
        this.gameboard.getFilledCords(),
        ship.size,
        axis
      );
      this.gameboard.placeShip(ship.size, ship.name, cords, axis);
    }
  }

  getLastHit(value: boolean, cord: string) {
    this.lastHit = value
  }
}
