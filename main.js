const numOfElevators = 5
const numOfFloors = 10
const elementWidth = 60
const elementHeight = 30

const floors =  Array.apply(null, Array(numOfFloors)).map((f, i) => {//width, height, top, left, id, name
    return (new Floor(elementWidth, elementHeight, (numOfFloors - i - 1) * (elementHeight * 2), 0, i, i))
})

const elevators =  Array.apply(null, Array(numOfElevators)).map((e, i) => {//color, width, height, top, left, id, available, speed
    return (new Elevator(elementWidth, elementHeight, (numOfFloors -1) * (elementHeight * 2), (i + 1) * (elementWidth * 2), i + numOfFloors, "black", true, 10))
})

const buttons =  Array.apply(null, Array(numOfFloors)).map((b, i) => {//color, width, height, top, left, id, state, fontColor
    return (new Button(elementWidth, elementHeight, (i * (elementHeight * 2)), elevators[numOfElevators - 1].left + elementWidth * 2, i + numOfFloors + numOfElevators, "#7FEAB5", "call", "white"))
})

const rowHeight = (((numOfFloors - 1) * elementHeight) + (numOfFloors * elementHeight)) / numOfFloors
const colWidth = ((numOfElevators * elementWidth) * 2) / numOfElevators

const controller = new Controller(elementWidth, elementHeight,  elevators, buttons, floors)
const table = new Table(0, elementWidth*1.5, numOfFloors, numOfElevators, colWidth, rowHeight)
table.drawTable()
controller.init()

