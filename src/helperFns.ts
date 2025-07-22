type Ship = {
  size: number;
  name: string;
};

export const getShipsArr = () => {
  const carrier: Ship = {
    size: 5,
    name: 'carrier',
  };
  const battleship: Ship = {
    size: 4,
    name: 'battleship',
  };
  const destroyer: Ship = {
    size: 3,
    name: 'destroyer',
  };
  const submarine: Ship = {
    size: 3,
    name: 'submarine',
  };
  const patrolBoat: Ship = {
    size: 2,
    name: 'patrol boat',
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