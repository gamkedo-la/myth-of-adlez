const { ASPECT } = require('../globals/constants')

export default class Resizer {
  constructor(container, camera, renderer) {
    this.container = container
    this.camera = camera
    this.renderer = renderer
    this.renderer.domElement.style.display = 'block'
    this.renderer.domElement.style.margin = '0px auto'

    this.resize()

    this.renderer.setPixelRatio(window.devicePixelRatio)
    window.addEventListener('resize', () => { this.resize() })
  }

  resize () {
    let widthToUse = window.innerWidth
    let heightToUse = (1/ASPECT) * window.innerWidth
  
    if (heightToUse > window.innerHeight) {
      heightToUse = window.innerHeight
      widthToUse = ASPECT * heightToUse
    }
  
    this.renderer.setSize(widthToUse, heightToUse)
    this.renderer.domElement.style.width = `${widthToUse}px`
    this.renderer.domElement.style.height = `${heightToUse}px`
    this.onResize()
  }

  onResize () {
    // Hook for world.js to access
  }
}

export { Resizer }