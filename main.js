
let numOfElevators = 5
let numOfFloors = 10
let elementWidth = 60
let elementHeight = 30

const floors = []
for (let i = numOfFloors; i > 0; i--){//width, height, top, left, id, name
    floors[i] = new Floor(elementWidth, elementHeight, (numOfFloors - i) * (elementHeight * 2), 0, (numOfFloors - i + numOfElevators), i - 1)
}

const elevators = []
for (let i = 0; i < numOfElevators; i++){//color, width, height, top, left, id, available, speed
    elevators[i] = new Elevator("black", elementWidth, elementHeight, (numOfFloors -1) * (elementHeight * 2), (i + 1) * (elementWidth * 2), i, true, 10)
}

const buttons = []
for (let i = 0; i < numOfFloors; i++){//color, width, height, top, left, id, state, 
    buttons[i] = new Button("green", elementWidth, elementHeight, (i * (elementHeight * 2)), elevators[numOfElevators - 1].left + elementWidth * 2, i + numOfFloors + numOfElevators, "call", "white")

}


const controller = new Controller(elementWidth, elementHeight,  elevators, buttons, floors)
let rowHeight = ((numOfFloors - 1) * elementHeight) + (numOfFloors * elementHeight)
rowHeight /= numOfFloors
let rowWidth = ((numOfElevators * elementWidth) * 2)
rowWidth /= numOfElevators
const table = new Table(0, elementWidth*1.5, numOfFloors, numOfElevators, rowWidth, rowHeight)
table.drawTable()
controller.init()

