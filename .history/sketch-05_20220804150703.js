const canvasSketch = require('canvas-sketch');

const settings = {
	dimensions: [ 1080, 1080 ]
};

const sketch = ({ }) => {

	return ({ context, width, height }) => {
		context.fillStyle = 'white'
		context.fillRect(0, 0, width, height)

		context.fillStyle = 'black'
		context.font = '400px serif'
	}
}

canvasSketch(sketch, settings);
