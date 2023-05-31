const { Clock } = require('three')

const clock = new Clock()
const entities = []

export default class Loop {
  constructor (camera, scene, renderer) {
    this.camera = camera
    this.scene = scene
    this.renderer = renderer
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      const deltaTime = clock.getDelta()
      entities.forEach(entity => entity.tick(deltaTime))
      this.renderer.render(this.scene, this.camera)
    })
  }

  stop() {
    clock.stop()
    this.renderer.setAnimationLoop(null)
  }

  addEntity (entity) {
    entities.push(entity)
  }

  removeEntity (entity) {
    const indexToRemove = entities.findIndex(item => item === entity)
    entities.splice(indexToRemove, 1)
  }
}

export { Loop }