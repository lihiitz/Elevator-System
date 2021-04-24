class Floor extends Element {
    constructor(width, height, top, left, id, name) {
        super(width, height, top, left, id)
        this.name = name
        this.getName()
    }

    getName(){
        if (this.name === 0){
            this.name = "Ground Floor"
        }else if (this.name === 1){
            this.name = "1st"
        }else if (this.name === 2){
            this.name = "2nd"
        }else if (this.name === 3){
            this.name = "3rd"
        }else{
            this.name = this.name + "th"
        }
    }

    draw() {
        super.removeDiv()
        $(`#container`).append(`<div id="${this.id}" class="element" style="width: ${this.width}px; height: ${this.height}px; top: ${this.top}px; left: ${this.left}px;"}>${this.name}</div>`)
        super.draw()
    }    

}