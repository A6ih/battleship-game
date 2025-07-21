let clickedCord: string = ''
let disableClick: boolean = false

const createElement = (type: string, selectorType: string, selector:string) => {
    const element = document.createElement(type)
    element.setAttribute(selectorType, selector)
    return element
}

export const getClickedCord = () => clickedCord

export const toggleClick = (value: boolean) => {
    disableClick = value
}

const changeClickedCord = (event : Event) => {
    if (disableClick) return;
    const currentId = event.target as HTMLDivElement
    clickedCord = currentId.id
}

const hideStartScreen = () => {
    document.querySelector('h1').style.display = 'none'
    document.getElementById('login-screen').style.display = 'none'
}

const createGameboard = (array: number[][], id: string, name:string) => {
    const boardContainer = document.getElementById(`player-${id}`)
    const boardHeading = document.createElement('h2')
    boardHeading.textContent = `${name}'s Board`
    const mainBoard = document.getElementById(id)
    for (let i = 0; i < array.length; i++) {
        array[i].map((number: number)  => {
            const element = createElement('div', 'id', `${id}-${i}${number}`)
            element.classList.add('cords')
            element.addEventListener('click', changeClickedCord)
            mainBoard.appendChild(element)
        })
    }
    boardContainer.prepend(boardHeading)
    return boardContainer
}

export const renderStartGame = (array: number[][]) => {
    const name = getName()
    hideStartScreen()
    document.querySelector('body').appendChild(createGameboard(array, 'A', name))
    document.querySelector('body').appendChild(createGameboard(array, 'B', 'Computer'))
}

export const getName = () => {
    const name = (<HTMLInputElement>document.getElementById('player-name')).value
    if (name) return name
    return 'Captain'
}

export const renderShipPlacement = (cords: string[], id: string) => {
    for (let i = 0; i < cords.length; i++) {
        document.getElementById(`${id}-${cords[i]}`).classList.add('ship-placement')
    }
}

const removeListener = (id: string) => document.getElementById(id).removeEventListener('click', changeClickedCord)

export const renderHitLanded = (id: string) => {
    document.getElementById(id).classList.add('hitLanded')
    removeListener(id)
}

export const renderHitMissed = (id: string) => {
    document.getElementById(id).classList.add('hitMissed')
    removeListener(id)
}

export const hideGameBoard = (id: string) => {
    document.getElementById(`player-${id}`).style.display = 'none'
}

export const showGameBoard = (id: string) => {
    document.getElementById(`player-${id}`).style.display = 'block'
}