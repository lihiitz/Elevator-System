
class Table {
    constructor(top, left, numRows, numCols, width, height) {
        this.top = top
        this.left = left
        this.numRows = numRows
        this.numCols = numCols
        this.width = width
        this.height = height
    }

    drawTable(){
        let row = ""
        for (let i = 0; i < this.numCols; i++){
            row += `<td style="width: ${this.width}px; height: ${this.height}px;"></td>`
        }
        row = `<tr>${row}</tr>`
        let table = ""
        for (let i = 0; i < this.numRows; i++){
            table += row
        }

        $(`#container`).append(`<table style="top: ${this.top}px; left: ${this.left}px;">${table}</table>`)
    }

}