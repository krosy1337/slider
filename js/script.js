const ELEMS_IN_ROW = 10
const ROWS = 10

const SQUARE_WIDTH = 60

const images = document.querySelectorAll('.source-image')

const slider = document.querySelector('.slider')

images.forEach((image, index) => {
	const slide = document.createElement('div')
	const canvasElems = []
	slide.classList.add('slide')
	for (let i = 0; i < (ELEMS_IN_ROW * ROWS); i++) {
		const canvas = document.createElement('canvas')
		canvas.width = SQUARE_WIDTH
		canvas.height = SQUARE_WIDTH
		canvas.classList.add('myCanvas')
		canvas.dataset.index = index

		slide.append(canvas)
		canvasElems.push(canvas)
	}
	slider.append(slide)

	canvasElems.forEach((canvas, i) => {
		const context = canvas.getContext('2d')

		let imageObj = new Image()

		imageObj.onload = function () {
			let sourceX = (i - (parseInt(i / ELEMS_IN_ROW) * ELEMS_IN_ROW)) * SQUARE_WIDTH
			let sourceY = Math.floor(i / ELEMS_IN_ROW) * SQUARE_WIDTH


			let sourceWidth = SQUARE_WIDTH
			let sourceHeight = SQUARE_WIDTH

			let destWidth = sourceWidth
			let destHeight = sourceHeight

			let destX = canvas.width / 2 - destWidth / 2
			let destY = canvas.height / 2 - destHeight / 2

			context.drawImage(imageObj, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight)

		}
		imageObj.src = image.src
		image.remove()
		canvas.addEventListener('click', () => {
			const duration = .5
			const each = .03
			gsap.to(`[data-index="${canvas.dataset.index}"]`, {
				duration: duration,
				scale: 0,
				y: 100,
				rotateX: 60,
				stagger: {
					each: each,
					from: 'edges',
					from: i,
					grid: 'auto',
				},
			})

			slider.style.overflow = 'visible'
			setTimeout(() => {
				canvas.closest('.slide').style.zIndex = +canvas.closest('.slide').style.zIndex - 1
				if (canvas.dataset.index === 0) {
					slider.style.zIndex = +slider.style.zIndex - 1
				}

				gsap.to(`[data-index="${canvas.dataset.index}"]`, {
					scale: 1,
					y: 0,
					rotateX: 0,
					duration: .2,
				})
				slider.style.overflow = 'hidden'
			}, 900)
		})
	})
})
