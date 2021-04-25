
class Button extends Element{
    constructor(width, height, top, left, id, color, state, fontColor){
        super(width, height, top, left, id)
        this.color = color
        this.state = state
        this.fontColor = fontColor
    }

    draw() {
        super.removeDiv()
        $(`#container`).append(`<button id="${this.id}" class="element" style="border: solid ${this.fontColor}; width: ${this.width}px; height: ${this.height}px; top: ${this.top}px; left: ${this.left}px; color: ${this.fontColor}; background: ${this.color};"}>${this.state}</button>`)
        super.draw()
    }

    setCall = () => {
        this.state = "call"
        this. color = "#7FEAB5"
        this.fontColor = "white"
        this.draw()
    }

    setWaiting = () => {
        if (this.state === "call"){
            this.state = "waiting"
            this.color = "red"
            this.draw()
        }
    }

    setArrived = () => {
        this.state = "arrived"
        this.color = "white"
        this.fontColor = "#7FEAB5"
        this.draw()
    }

}