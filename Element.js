
class Element {
    constructor(width, height, top, left, id) {
        this.width = width
        this.height = height
        this.top = top
        this.left = left
        this.id = id
        this.div = null
    }

    removeDiv(){
        if (this.div){
            this.div.remove()
        }
    }
    draw(){
        this.div = document.getElementById(this.id)
    }
}