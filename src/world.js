import { CameraHelper } from 'three'

// Globals
const { DIRECTIONS } = require('./globals/directions')

// Systems
const { createRenderer } = require('./systems/renderer')
const { Resizer } = require('./systems/resizer')
const { Loop } = require('./systems/loop')

// Screens
const { loadScreen } = require('./screens/screen1_1/source')

// Components
const { createCamera } = require('./components/camera')
const { createScene } = require('./components/scene')
const { createLights } = require('./components/lights')

let camera = null
let scene = null
let renderer = null
let loop = null

class World {
  constructor (container) {
    camera = createCamera()
    scene = createScene()
    renderer = createRenderer()
    loop = new Loop(camera, scene, renderer)

    const { ambientLight, mainLight } = createLights()
    loop.addEntity(mainLight)
    const helper = new CameraHelper( mainLight.shadow.camera )

    scene.add(ambientLight, mainLight)

    container.append(renderer.domElement)

    const resizer = new Resizer(container, camera, renderer)
  }

  async init () {
    const screenModel = await loadScreen(1, 1)
    scene.add(screenModel)
    loop.addEntity(screenModel)
  }

  start () {
    loop.start()
  }

  scrollToScreen (newScreen, fromDirection) {
    switch (fromDirection) {
      case DIRECTIONS.UP:
        break
      case DIRECTIONS.DOWN:
        break
      case DIRECTIONS.LEFT:
        break
      case DIRECTIONS.RIGHT:
        break
    }
  }

  addScreen (mapToAdd) {

  }

  removeScreen (mapToRemove) {

  }

  stop () {
    loop.stop()
  }

  render () {
    renderer.render(scene, camera)
  }
}

export { World }