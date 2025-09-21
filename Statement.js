let id_Statement = 0

class Statement {
        constructor(raw, element) {
                this.mobject = new MObject(raw)
                this.id = id_Statement++
                this.x = undefined
                this.y = undefined
                this.randomPosition()
                this.element = element
        }

        copy() {
                return new Statement(this.raw)
        }

        randomPosition() {
                this.x = Math.round(80 - Math.random() * 60)
                this.y = Math.round(80 - Math.random() * 60)

                if (this.element) {
                        this.element.style.left = `${this.x}%`
                        this.element.style.top = `${this.y}%`
                }
        }
}