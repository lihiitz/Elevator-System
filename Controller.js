
class Controller {
    constructor(width, height, elevators, buttons, floors) {
        this.elevators = elevators
        this.buttons = buttons
        this.floors = floors
        this.width = width
        this.height = height
        this.queue = []
    }


    stopInterval(intervalId, timeDivId, button){
        clearInterval(intervalId)
        this.removeRemainingTime(timeDivId)
        button.state = "arrived"
        button.color = "white"
        button.fontColor = "green"
        button.draw()
    }

    elevatorArrived(elevator, button){
        elevator.available = true
        elevator.color = "black"
        button.state = "call"
        button. color = "green"
        button.fontColor = "white"
        elevator.draw()
        button.draw()
        this.initButtonListener(button)
        this.handleQueue(elevator)
    }

    moveElevator(elevator, button) { 
        let divId = elevator.id + "time"
        let id = setInterval(() => {
            this.drawRemainingTime(divId, this.calcTime(elevator, button), elevator, button)
            let stop = elevator.move(button.top)
            if (stop) {
                this.stopInterval(id, divId, button)
                setTimeout(() => { 
                    this.elevatorArrived(elevator, button)
                }, 2000);
            }
        }, elevator.speed)
    }

    handleQueue(availableElevator){
        if (this.queue.length > 0){
            let firstBtnInQueue = this.queue.shift()
            this.moveElevator(availableElevator, firstBtnInQueue)
        }
    }

    findClosestElevator(elevators, moveTo){
        let tempDis = Math.abs(elevators[0].top - moveTo)
        let min = 
        {
            elevator: elevators[0],
            dis: tempDis
        }
        for (let e of elevators){
            if (e.top === moveTo){
                min.elevator = e
                stop
            }
            tempDis = Math.abs(e.top - moveTo)
            if (tempDis < min.dis){
                min.elevator = e
                min.dis = tempDis
            }
        }
        return min.elevator
    }

    msToTime(s) {
    const ms = s % 1000;
    s = (s - ms) / 1000;
    let secs = (s % 60) + 1;
    s = (s - secs) / 60;
    const mins = s % 60;

    return (mins > 0 ? (mins + ' min. ' + secs + ' sec') : (secs + ' sec'));
    }

    removeRemainingTime(id){
        let div = document.getElementById(id)
        if (div){
            div.remove()
        }
    }

    drawRemainingTime(id, time, elevator, button){//time in milliseconds
        let div = document.getElementById(id)
        if (div){
            div.remove()
        }
        $(`#container`).append(`<div id = ${id} class="time element" style="width: ${this.width}px; height: ${this.height}px; top: ${button.top}px; left: ${elevator.left}px; background: ${this.color};"}>${this.msToTime(time)}</div>`)
    }

    calcTime(elevator, button){
        let distance = Math.abs(button.top - elevator.top)
        let totalTime = (elevator.speed * distance)
        console.log(totalTime);
        return totalTime // in milliseconds
    }

    callElevator(button){
        const availableElevators = this.elevators.filter(e => e.available === true)
            if (availableElevators.length === 0){
            this.queue.push(button)
        }else{
            const closestElevator = this.findClosestElevator(availableElevators, button.top)
            this.moveElevator(closestElevator, button)
        }
    }

    initButtonListener(button){
        $(`#${button.id}`).on('click', () => {
            this.callElevator(button)
        })
    }

    init() {
        this.elevators.forEach(e => e.draw());
        this.buttons.forEach(b => b.draw());
        this.floors.forEach(f => f.draw())

        this.buttons.forEach(b => {
            this.initButtonListener(b)
        })
    }
}