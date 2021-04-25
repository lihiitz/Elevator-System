class Controller {
    constructor(width, height, elevators, buttons, floors) {
        this.elevators = elevators
        this.buttons = buttons
        this.floors = floors
        this.width = width
        this.height = height
        this.queue = []
    }


    stopInterval(time, intervalId, button){
        clearInterval(intervalId)
        time.removeRemainingTime()
        button.setArrived()
    }

    elevatorArrived(elevator, button){
        elevator.setArrived()
        button.setCall()
        this.initButtonListener(button)
        this.getNextJobFromQueue(elevator)
    }

    moveElevator(elevator, button) {
        let time = new Time(elevator.id + "time", this.width, this.height)
        let id = setInterval(() => {
            time.drawRemainingTime(elevator, button)
            let stop = elevator.move(button.top)
            if (stop) {
                this.stopInterval(time, id, button)
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