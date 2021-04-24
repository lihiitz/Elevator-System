
let numOfElevators = 5
let numOfFloors = 10
let elementWidth = 60
let elementHeight = 30

const floors =  Array.apply(null, Array(numOfFloors)).map((f, i) => {//width, height, top, left, id, name
    return (new Floor(elementWidth, elementHeight, (numOfFloors - i - 1) * (elementHeight * 2), 0, i, i))
})

const elevators =  Array.apply(null, Array(numOfElevators)).map((e, i) => {//color, width, height, top, left, id, available, speed
    return (new Elevator("black", elementWidth, elementHeight, (numOfFloors -1) * (elementHeight * 2), (i + 1) * (elementWidth * 2), i + numOfFloors, true, 10))
})

const buttons =  Array.apply(null, Array(numOfFloors)).map((b, i) => {//color, width, height, top, left, id, state, fontColor
    return (new Button("green", elementWidth, elementHeight, (i * (elementHeight * 2)), elevators[numOfElevators - 1].left + elementWidth * 2, i + numOfFloors + numOfElevators, "call", "white"))
})


let rowHeight = ((numOfFloors - 1) * elementHeight) + (numOfFloors * elementHeight)
rowHeight /= numOfFloors
let rowWidth = ((numOfElevators * elementWidth) * 2)
rowWidth /= numOfElevators

const controller = new Controller(elementWidth, elementHeight,  elevators, buttons, floors)
const table = new Table(0, elementWidth*1.5, numOfFloors, numOfElevators, rowWidth, rowHeight)
table.drawTable()
controller.init()

