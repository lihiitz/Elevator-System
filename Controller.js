
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
        button.fontColor = "#7FEAB5"
        button.draw()
    }

    elevatorArrived(elevator, button){
        elevator.available = true
        elevator.color = "black"
        button.state = "call"
        button. color = "#7FEAB5"
        button.fontColor = "white"
        elevator.draw()
        button.draw()
        this.initButtonListener(button)
        this.getNextJobFromQueue(elevator)
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

    getNextJobFromQueue(availableElevator){
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

    msToTimeFormat(milliseconds) {
    const ms = milliseconds % 1000;
    milliseconds = (milliseconds - ms) / 1000;
    let secs = (milliseconds % 60) + 1;
    milliseconds = (milliseconds - secs) / 60;
    const mins = milliseconds % 60;

    return (mins > 0 ? (mins + ' min. ' + secs + ' sec') : (secs + ' sec'));
    }

    removeRemainingTime(id){
        let div = document.getElementById(id)
        if (div){
            div.remove()
        }
    }

    drawRemainingTime(id, timeMillis, elevator, button){
        let div = document.getElementById(id)
        if (div){
            div.remove()
        }
        $(`#container`).append(`<div id = ${id} class="time element" style="width: ${this.width}px; height: ${this.height}px; top: ${button.top}px; left: ${elevator.left}px; background: ${this.color};"}>${this.msToTimeFormat(timeMillis)}</div>`)
    }

    calcTime(elevator, button){
        let distance = Math.abs(button.top - elevator.top)
        let timeMillis = (elevator.speed * distance)
        return timeMillis 
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