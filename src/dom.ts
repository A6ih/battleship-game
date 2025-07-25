import { getShipsArr, generateCords, generateCordsVertical } from "./helperFns.ts"
import { enableDragDropTouch } from "./drag-drop-touch.esm.min.js";

enableDragDropTouch()

type Ship = {
    name: string,
    size: number
}

let currentShip: Ship = {
    name: 'Destroyer',
    size: 5
}

let currentCords: string[]

let currentAxis: string = 'x'

const toggleAxis = (e: Event) => {
    const target = e.target as HTMLElement
    if(target.id === 'y-button') {
        currentAxis = 'y'
        target.style.borderColor = 'aquamarine'
        document.getElementById('x-button').style.borderColor = 'black'
    } else {
        currentAxis = 'x'
        target.style.borderColor = 'aquamarine'
        document.getElementById('y-button').style.borderColor = 'black'
    }
}

const createElement = (type: string, selectorType: string, selector:string) => {
    const element = document.createElement(type)
    element.setAttribute(selectorType, selector)
    return element
}

const hideStartScreen = () => {
    document.querySelector('h1').style.display = 'none'
    document.getElementById('login-screen').style.display = 'none'
}

const createGameboard = (array: number[][], id: string, name:string) => {
    const boardContainer = document.getElementById(`player-${id}`)
    const boardHeading = document.createElement('h2')
    boardHeading.textContent = `${name}'s Grid`
    const mainBoard = document.getElementById(id)
    for (let i = 0; i < array.length; i++) {
        array[i].map((number: number)  => {
            const element = createElement('div', 'id', `${id}-${i}${number}`)
            element.classList.add('cords')
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

export const renderHitLanded = (id: string) => {
    document.getElementById(id).classList.add('hitLanded')
    document.getElementById(id).classList.add('hit')
}

export const renderHitMissed = (id: string) => {
    document.getElementById(id).classList.add('hitMissed')
    document.getElementById(id).classList.add('hit')
}

export const hideGameBoard = (id: string) => {
    document.getElementById(`player-${id}`).style.display = 'none'
}

export const showGameBoard = (id: string) => {
    document.getElementById(`player-${id}`).style.display = 'block'
}

export const renderDock = () => {
    const shipArr = getShipsArr()
    const shipContainer = document.getElementById('ship-container')
    shipArr.map(shipObj => {
        const ship = createElement('div', 'id', `${shipObj.name.toLowerCase()}-${shipObj.size}`)
        ship.classList.add('dock-ships')
        ship.setAttribute('draggable', 'true')
        ship.textContent = `${shipObj.name}(${shipObj.size})`
        shipContainer.appendChild(ship)
    })
}

const renderControlBtns = () => {
    const container = document.getElementById('controller-container') as HTMLElement
    const axisXBtn = createElement('button', 'id', 'x-button')
    const axisYBtn = createElement('button', 'id', 'y-button')
    const resetBtn = createElement('button', 'id', 'reset-placement')
    const startBtn = createElement('button', 'id', 'start-btn')
    axisXBtn.textContent = 'Axis X'
    axisYBtn.textContent = 'Axis Y'
    resetBtn.textContent = 'Reset'
    startBtn.textContent = 'Start'
    startBtn.style.visibility = 'hidden'
    axisXBtn.addEventListener('click', toggleAxis)
    axisYBtn.addEventListener('click', toggleAxis)
    axisXBtn.style.borderColor = 'aquamarine'
    const btnArr = [axisXBtn, axisYBtn, resetBtn, startBtn]
    btnArr.map(btn => {
        btn.classList.add('control-btns')
        container.appendChild(btn)
    })
}

const highlightPlacement = (e: Event) => {
    e.preventDefault()
    const axis = currentAxis // placeHolder
    const target = e.target as HTMLElement
    const cordsArr = target.id.split('-')
    const numberCords = cordsArr[1].split('')
    let changeCords
    if(axis === 'y') {
        changeCords = generateCordsVertical([+numberCords[0], +numberCords[1]], currentShip.size)
    } else {
        changeCords = generateCords([+numberCords[0], +numberCords[1]], currentShip.size)
    } 
    const result = changeCords.map(cord => document.getElementById(`${cordsArr[0]}-${cord}`) as HTMLElement)
    const checkFilledCords = result.map(element => {
        if(!element) return
        return element.classList.contains('filled') 
    })
    if(result.includes(null) || checkFilledCords.includes(true)) {
        setTimeout(() => {
            result.map(element => {
            if(!element) return
             element.style.borderColor = 'red'
            })
        }, 0)
        currentCords = []
    } else {
        setTimeout(() => {
            result.map(element => {
            element.style.borderColor = 'green'
            })
            }, 0)
        currentCords = changeCords
    }
}

export const removeHighlight = (e: Event) => {
    const axis = currentAxis // placeHolder
    const target = e.target as HTMLElement
    const cordsArr = target.id.split('-')
    const numberCords = cordsArr[1].split('')
    let changeCords
    if(axis === 'y') {
        changeCords = generateCordsVertical([+numberCords[0], +numberCords[1]], currentShip.size)
    } else {
        changeCords = generateCords([+numberCords[0], +numberCords[1]], currentShip.size)
    } 
    changeCords.map(cord => {
        const target = document.getElementById(`${cordsArr[0]}-${cord}`) as HTMLElement
         if(!target) return
        target.style.borderColor = 'aquamarine'
     }
    )
}

export const activateHighlighting = () => {
    const cordsArr = Array.from(document.getElementsByClassName('cords'))
    cordsArr.map(element => {
        element.addEventListener('dragenter', highlightPlacement)
        element.addEventListener('dragleave', removeHighlight)
        element.addEventListener("dragover", (event) => {
           event.preventDefault();
        }, false,)
    })
}

export const disableHighlighting = () => {
    const cordsArr = Array.from(document.getElementsByClassName('cords'))
    cordsArr.map(element => {
        element.removeEventListener('dragenter', highlightPlacement)
        element.removeEventListener('dragleave', removeHighlight)
    })
}

export const toggleCurrentShip = (ship: Ship) => {
    currentShip = ship
}

export const getCurrentCords = () => {
    return currentCords
}

export const getCurrentShip = () => {
    return currentShip
}

export const removeShip = () => {
    const shipElement = document.getElementById(`${currentShip.name}-${currentShip.size}`)
    shipElement.style.visibility = 'hidden'
}

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

export const enablePlacement = () => {
    document.getElementById('ship-container').addEventListener('dragstart', dragShipStart)
    document.getElementById('ship-container').addEventListener('dragend', dragShipEnd)
    renderControlBtns()
}

export const disablePlacement = () => {
    document.getElementById('ship-container').removeEventListener('dragstart', dragShipStart)
    document.getElementById('ship-container').removeEventListener('dragend', dragShipEnd)
    document.getElementById('dock-container').style.display = 'none'
    document.getElementById('controller-container').style.display = 'none'
}

export const getCurrentAxis = () => currentAxis