const elevatorBlackImg = './icons/elevatorBlack.svg'
const elevatorGreenImg = './icons/elevatorGreen.svg'
const elevatorRedImg = './icons/elevatorRed.svg'


class Elevator extends Element{
    constructor(width, height, top, left, id, color, available, speed) {
        super(width, height, top, left, id)
        this.color = color
        this.available = available
        this.speed = speed
    }

    draw(){
        super.removeDiv()
        $(`#container`).append(`<img src=${this.color === "black" ? elevatorBlackImg : this.color === "red" ? elevatorRedImg : elevatorGreenImg} id="${this.id}" class="element"  style="width: ${this.width}px; height: ${this.height}px; top: ${this.top}px; left: ${this.left}px;"}></img>`)
        super.draw()
    }

    makeSound() {
        const sound = new Audio("Bell Ding.mp3");  
        sound.play();
    }

    reachedDes(){
        this.makeSound();
        this.color = "green"
        this.draw()
    }

    doMove(pos){
        this.top += pos
        this.div.style.top = this.top + "px";
    }

    move(moveTo) {
        this.available = false
        if (this.top === moveTo){
            this.reachedDes()
            return true
        }
        this.color = "red"
        this.draw()
        this.doMove(moveTo < this.top ? -1 : 1)
        return false
    }

    setArrived = () => {
        this.available = true
        this.color = "black"
        this.draw()
    }

}