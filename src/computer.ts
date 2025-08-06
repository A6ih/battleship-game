import Gameboard from './gameboard.ts';
import { getShipsArr, generateCords, generateCordsVertical, hitOnLeft, hitOnRight, hitOnUp, hitOnDown } from './helperFns.ts';

type callBack = (cords: string) => string

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

const getSmartCords = (fn: callBack, cords: string, hits: Set<string>, valid: string[],) => {
  const resultCords = fn(cords)
  if(hits.has(resultCords)) {
    return getSmartCords(fn, resultCords, hits, valid)
  } else if (valid.includes(resultCords)) {
    return resultCords
  } else {
    false
  }
}

const numArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

export default class Computer {
  name: string;
  gameboard: Gameboard;
  cordsToHit: string[];
  cordsToPlaceShip: string[];
  lastHit: boolean;
  lastHitCord: string;
  isEnemyShipSunk: boolean = true;
  allHits: Set<string>;
  validCords: string[];
  firstHitCord: string;
  directions: string[] = ['left', 'right', 'up', 'down']
  direction: string = this.directions.shift()
  constructor() {
    this.name = 'Computer';
    this.gameboard = new Gameboard(10);
    this.cordsToHit = [];
    this.cordsToPlaceShip = [];
    this.allHits = new Set();
    this.validCords = []
  }

  fillCords() {
    for (let i = 0; i < 10; i++) {
      numArr.map((number) => {
        this.cordsToHit.push(`${i}${number}`);
        this.cordsToPlaceShip.push(`${i}${number}`);
        this.validCords.push(`${i}${number}`);
      });
    }
  }

  hitEnemy() {
    if(!this.isEnemyShipSunk) {
      const firstHit = this.firstHitCord
      const hitCords = this.lastHitCord
      const NumberCords = hitCords.split('').map(string => Number(string))
      let resultCords: string;
      if(!this.lastHit) {
        this.direction = this.directions.shift()
      }
      switch(this.direction) {
        case 'left':
          if(NumberCords[1] === 0) {
            this.direction = this.directions.shift()
            resultCords = getSmartCords(hitOnRight, firstHit, this.allHits, this.validCords)
          } else {
            resultCords = getSmartCords(hitOnLeft, firstHit, this.allHits, this.validCords)
          }
        break;
        case 'right':
          if(NumberCords[1] === 9) {
            this.direction = this.directions.shift()
            resultCords = getSmartCords(hitOnUp, firstHit, this.allHits, this.validCords)
          } else {
            resultCords = getSmartCords(hitOnRight, firstHit, this.allHits, this.validCords)
          }
        break;
        case 'up':
          if(NumberCords[0] === 0) {
            this.direction = this.directions.shift()
            resultCords = getSmartCords(hitOnDown, firstHit, this.allHits, this.validCords)
          } else {
            resultCords = getSmartCords(hitOnUp, firstHit, this.allHits, this.validCords)
          }
        break;
        case 'down':
          if(NumberCords[0] === 9) {
            const number = Math.floor(Math.random() * this.cordsToHit.length);
            resultCords = this.cordsToHit[number];
          } else {
            resultCords = getSmartCords(hitOnDown, firstHit, this.allHits, this.validCords)
          }
        break;
      }
      if(resultCords) {
        this.cordsToHit.splice(this.cordsToHit.indexOf(resultCords), 1)
        this.lastHitCord = resultCords
        return resultCords
      } else {
        const number = Math.floor(Math.random() * this.cordsToHit.length);
        const cords = this.cordsToHit[number];
        this.lastHitCord = cords
        this.cordsToHit.splice(number, 1);
        return cords;
      }
    }

    if(this.lastHit) {
      const firstHit = this.firstHitCord
      const NumberCords = firstHit.split('').map(string => Number(string))
      if(this.direction === 'left' && NumberCords[1] < 9) {
        this.direction = 'right'
        const result = hitOnRight(firstHit)
        if(this.validCords.includes(result)) {
          this.cordsToHit.splice(this.cordsToHit.indexOf(result), 1)
          this.lastHitCord = result
          return result
        }
      } else if(this.direction === 'up' && NumberCords[0] < 9) {
        this.direction = 'down'
        const result = hitOnDown(firstHit)
         if(this.validCords.includes(result)) {
          this.cordsToHit.splice(this.cordsToHit.indexOf(result), 1)
          this.lastHitCord = result
          return result
        }
      }
    }

    this.directions = ['left', 'right', 'up', 'down']
    this.direction = this.directions.shift()
    const number = Math.floor(Math.random() * this.cordsToHit.length);
    const cords = this.cordsToHit[number];
    this.firstHitCord = cords
    this.lastHitCord = cords
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

  getLastHit(value: boolean) {
    this.lastHit = value
  }

  updateIsSunk(isSunk: boolean) {
    this.isEnemyShipSunk = isSunk
  }

  updateAllHits(cord: string) {
    this.allHits.add(cord)
  }
}
