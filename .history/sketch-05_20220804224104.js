const canvasSketch = require('canvas-sketch');

const settings = {
	dimensions: [ 1080, 1080 ]
};

const text = 'A'
const fontSize = 1200
const fontFamily = 'serif'

const sketch = ({ }) => {

	return ({ context, width, height }) => {
		context.fillStyle = 'white'
		context.fillRect(0, 0, width, height)

		context.fillStyle = 'black'
		// context.font = fontSize + 'px' + fontFamily
		context.font = `bold ${fontSize}px ${fontFamily}`
		context.textBaseline = 'top'
		// context.textAlign = 'center'


		const metrics = context.measureText(text)
		const mx  = metrics.actualBoundingBoxLeft * -1
		const my  = metrics.actualBoundingBoxAscent * -1
		const mw  = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight
		const mh  = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent

		const x = (width - mw) * 0.5 - mx
		const y = (height - mh) * 0.5 - my

		context.save()
		context.translate(x, y)

		context.beginPath()
		context.rect(mx, my, mw, mh)
		context.stroke()

		context.save()
		// context.translate(width * 0.5, height * 0.5)

		context.fillText(text, 0, 0)
		context.restore()
	}
}

const onKeyUp = (e) => {
	console.log(e)
}

document.addEventListener('keyup', onKeyUp)

canvasSketch(sketch, settings);

const url = 'https://picsum.photos/200'

const loadMeSomeImage = (url) => {
	return new Promise()
}