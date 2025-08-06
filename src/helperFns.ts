type Ship = {
  size: number;
  name: string;
};

export const getShipsArr = () => {
  const carrier: Ship = {
    size: 5,
    name: 'Carrier',
  };
  const battleship: Ship = {
    size: 4,
    name: 'Battleship',
  };
  const destroyer: Ship = {
    size: 3,
    name: 'Cruiser',
  };
  const submarine: Ship = {
    size: 3,
    name: 'Submarine',
  };
  const patrolBoat: Ship = {
    size: 2,
    name: 'Destroyer',
  };

  const arr: Ship[] = [carrier, battleship, destroyer, submarine, patrolBoat];
  return arr;
};

export const generateCords = (cords: number[], size: number) => {
  const newCords: string[] = [];
  newCords.push([cords[0], cords[1]].join(''));
  for (let i = 1; i < size; i++) {
    newCords.push([cords[0], cords[1] + i].join(''));
  }
  return newCords;
};

export const generateCordsVertical = (cords: number[], size: number) => {
  const newCords: string[] = [];
  newCords.push([cords[0], cords[1]].join(''));
  for (let i = 1; i < size; i++) {
    newCords.push([cords[0] + i, cords[1]].join(''));
  }
  return newCords;
};

export const hitOnLeft = (cord: string): string => {
  const cords = cord.split('')
  const numberCords = cords.map(cord => Number(cord))
  return `${numberCords[0]}${numberCords[1] - 1}`
}

export const hitOnRight = (cord: string): string => {
  const cords = cord.split('')
  const numberCords = cords.map(cord => Number(cord))
  return `${numberCords[0]}${numberCords[1] + 1}`
}

export const hitOnUp = (cord: string): string => {
  const cords = cord.split('')
  const numberCords = cords.map(cord => Number(cord))
  return `${numberCords[0] - 1}${numberCords[1]}`
}

export const hitOnDown = (cord: string): string => {
  const cords = cord.split('')
  const numberCords = cords.map(cord => Number(cord))
  return `${numberCords[0] + 1}${numberCords[1]}`
}