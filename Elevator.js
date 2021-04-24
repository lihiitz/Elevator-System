const elevatorBlackImg = './elevatorBlack.svg'
const elevatorGreenImg = './elevatorGreen.svg'
const elevatorRedImg = './elevatorRed.svg'


class Elevator {
    constructor(color, width, height, top, left, id, available, speed) {
        this.color = color
        this.width = width
        this.height = height
        this.top = top
        this.left = left
        this.id = id
        this.available = available
        this.speed = speed
        this.div = null
    }

    draw(){
        if (this.div){
            this.div.remove()
        }
        $(`#container`).append(`<img src=${this.color === "black" ? elevatorBlackImg : this.color === "red" ? elevatorRedImg : elevatorGreenImg} id="${this.id}" class="element"  style="width: ${this.width}px; height: ${this.height}px; top: ${this.top}px; left: ${this.left}px;"}></img>`)
        this.div = document.getElementById(this.id)
    }

    beep() {
        const sound = new Audio("Bell Ding.mp3");  
        sound.play();
    }

    reachedDes(){
        this.beep();
        this.color = "green"
        this.draw()
    }

    doMove(pos){
        this.top += pos
        this.div.style.top = this.top + "px";
    }

    move(moveTo) {
        if (this.top === moveTo){
            this.reachedDes()
            return true
        }
        this.available = false
        this.color = "red"
        this.draw()
        this.doMove(moveTo < this.top ? -1 : 1)
        return false
    }

}