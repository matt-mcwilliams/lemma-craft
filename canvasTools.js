const canvas = document.getElementById('venn-diagram')
const ctx = canvas.getContext('2d')

canvas.width = 1000
canvas.height = 1000

canvas.style.width = 100
canvas.style.height = 100

function drawCircle(x, y, r, color, stroke, lineWidth, label, flipLabel = false) {
        ctx.beginPath()

        ctx.arc(x*canvas.width/100, y*canvas.height/100, r*canvas.width/100, 0, Math.PI*2)
        ctx.fillStyle = color
        ctx.fill()

        ctx.strokeStyle = stroke
        ctx.lineWidth = lineWidth
        ctx.stroke()

        if (label) {
                ctx.font = '40px Ariel'
                ctx.fillStyle = 'black'
                ctx.textAlign = 'center'
                ctx.textBaseline = 'bottom';
                const labelOffset = flipLabel ? r*1.2 : -r*1.1
                ctx.fillText(label, x*canvas.width/100, (y+labelOffset)*canvas.height/100)
        }

        ctx.closePath()
}

function drawIntersection2([x1, y1, r1], 
                [x2, y2, r2], color, stroke, lineWidth) {
        const distance = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2))
        
        const projectedDistance = (r1*r1 - r2*r2 + distance*distance) / (2 * distance)
        
        const dirX = (x2-x1)/distance
        const dirY = (y2-y1)/distance

        const centerOffset = Math.sqrt(r1*r1-projectedDistance*projectedDistance)


        const insersectionCenterX = (x1+projectedDistance*dirX)
        const insersectionCenterY = (y1+projectedDistance*dirY)
        


        const intersection1X = insersectionCenterX-centerOffset*dirY
        const intersection1Y = insersectionCenterY+centerOffset*dirX

        const intersection2X = insersectionCenterX+centerOffset*dirY
        const intersection2Y = insersectionCenterY-centerOffset*dirX

        const circle1Dir1 = Math.atan2(y1-intersection1Y, x1-intersection1X)
        const circle1Dir2 = Math.atan2(y1-intersection2Y, x1-intersection2X)

        const circle2Dir1 = Math.atan2(y2-intersection1Y, x2-intersection1X)
        const circle2Dir2 = Math.atan2(y2-intersection2Y, x2-intersection2X)




        ctx.beginPath()

        ctx.arc(x1*canvas.width/100, y1*canvas.height/100, r1*canvas.width/100, circle2Dir1, circle2Dir2, false)

        ctx.arc(x2*canvas.width/100, y2*canvas.height/100, r2*canvas.width/100, circle1Dir2, circle1Dir1, false)

        ctx.strokeStyle = stroke
        ctx.lineWidth = lineWidth
        ctx.stroke()

        ctx.fillStyle = color
        ctx.fill()

        ctx.closePath()

}


function colorBackground(color) {
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
}


function drawTitle(text) {
        ctx.font = 'bold 48px Arial';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(text, 50*canvas.width/100, 5*canvas.width/100);
}


function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
}