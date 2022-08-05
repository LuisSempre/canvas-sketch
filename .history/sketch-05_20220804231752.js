const canvasSketch = require('canvas-sketch');

const settings = {
	dimensions: [ 1080, 1080 ]
};

let manager
let text = 'A'
let fontSize = 1200
let fontFamily = 'serif'

const typeCanvas = document.createElement('canvas')
const typeContext = typeCanvas.getContext('2d')

const sketch = ({ context, width, height }) => {

	const cell = 20
	const cols = Math.floor(width / cell)
	const rows = Math.floor(height / cell)
	const numCells = cols * rows

	typeCanvas.width = cols
	typeCanvas.height = rows

	return ({ context, width, height }) => {
		typeContext.fillStyle = 'black'
		typeContext.fillRect(0, 0, cols, rows)

		fontSize = cols

		typeContext.fillStyle = 'white'
		typeContext.font = `bold ${fontSize}px ${fontFamily}`
		typeContext.textBaseline = 'top'

		const metrics = typeContext.measureText(text)
		const mx  = metrics.actualBoundingBoxLeft * -1
		const my  = metrics.actualBoundingBoxAscent * -1
		const mw  = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight
		const mh  = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent

		const x = (cols - mw) * 0.5 - mx
		const y = (rows - mh) * 0.5 - my

		typeContext.save()
		typeContext.translate(x, y)
		typeContext.beginPath()
		typeContext.rect(mx, my, mw, mh)
		typeContext.stroke()

		typeContext.save()
		typeContext.fillText(text, 0, 0)
		typeContext.restore()

		const typeData = typeContext.getImageData(0, 0, cols, rows)

		context.drawImage(typeCanvas, 0, 0)
	
		for (let i = 0; i < numCells; i++) {
			const col = i % cols;
			const row = Math.floor(i / cols)
		}
	}
}

const onKeyUp = (e) => {
	text = e.key.toUpperCase()
	manager.render()
}

document.addEventListener('keyup', onKeyUp)

const start = async () => {
	manager = await canvasSketch(sketch, settings);
}

start()
