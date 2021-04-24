class Floor {
    constructor(width, height, top, left, id, name) {
        this.width = width
        this.height = height
        this.top = top
        this.left = left
        this.id = id
        this.name = name
        this.div = null
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
        if (this.div){
            this.div.remove()
        }
        $(`#container`).append(`<div id="${this.id}" class="element" style="width: ${this.width}px; height: ${this.height}px; top: ${this.top}px; left: ${this.left}px;"}>${this.name}</div>`)
        this.div = document.getElementById(this.id)
    }    

}