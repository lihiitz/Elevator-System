
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
        button.setArrived()
    }

    elevatorArrived(elevator, button){
        elevator.setArrived()
        button.setCall()
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
            button.setWaiting()
            this.callElevator(button)
        })
    }

    drawElements(elements){
        elements.forEach(e => e.draw());
    }

    init() {
        this.drawElements([...this.elevators, ...this.buttons, ...this.floors])

        this.buttons.forEach(b => {
            this.initButtonListener(b)
        })
    }
}