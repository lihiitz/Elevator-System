
class Time {
    constructor(id ,width, height) {
        this.id = id
        this.width = width
        this.height = height
        this.div = null
    }

    msToTimeFormat(milliseconds) {
        const ms = milliseconds % 1000;
        milliseconds = (milliseconds - ms) / 1000;
        let secs = (milliseconds % 60) + 1;
        milliseconds = (milliseconds - secs) / 60;
        const mins = milliseconds % 60;
        return (mins > 0 ? (mins + ' min. ' + secs + ' sec') : (secs + ' sec'));
    }

    removeRemainingTime(){
        if (this.div){
            this.div.remove()
        }
    }

    drawRemainingTime(elevator, button){
        let timeMillis = this.calcTime(elevator, button)
        if (this.div){
            this.div.remove()
        }
        $(`#container`).append(`<div id = ${this.id} class="time element" style="width: ${this.width}px; height: ${this.height}px; top: ${button.top}px; left: ${elevator.left}px;"}>${this.msToTimeFormat(timeMillis)}</div>`)
        this.div = document.getElementById(this.id)
    }

    calcTime(elevator, button){
        let distance = Math.abs(button.top - elevator.top)
        let timeMillis = (elevator.speed * distance)
        return timeMillis 
    }
}