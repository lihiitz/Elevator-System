class Button {
    constructor(color, width, height, top, left, id, state, fontColor) {
        this.color = color
        this.width = width
        this.height = height
        this.top = top
        this.left = left
        this.id = id
        this.state = state
        this.fontColor = fontColor
        this.div = null
    }

    draw() {
        if (this.div){
            this.div.remove()
        }
        $(`#container`).append(`<button id="${this.id}" class="element" style="border: solid ${this.fontColor}; width: ${this.width}px; height: ${this.height}px; top: ${this.top}px; left: ${this.left}px; color: ${this.fontColor}; background: ${this.color};"}>${this.state}</button>`)
        this.div = document.getElementById(this.id)
        this.div.addEventListener("click", this.handleButton)
    }

    handleButton = () => {
        if (this.state === "call"){
            this.state = "waiting"
            this.color = "red"
            this.draw()
        }

    }    

}