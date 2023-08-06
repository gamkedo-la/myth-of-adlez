// Globals
const Consts = require('./globals/constants')
const { DIRECTIONS } = require('./globals/directions')

// Systems
const { createRenderer } = require('./systems/renderer')
const { Resizer } = require('./systems/resizer')
const { Loop } = require('./systems/loop')
const { PhysicsWorld } = require('./physicsWorld')

// Components
const { Input } = require('./components/input')
const { loadScreen } = require('./components/screen')
const { createCamera } = require('./components/camera')
const { createScene } = require('./components/scene')
const { createLights } = require('./components/lights')

// Entities
const { Adlez } = require('./entities/adlez/adlez')

/** @type {import('./components/input').Input} */
let input = null
/** @type {import('./components/camera').PerspectiveCamera} */
let camera = null
/** @type {import('./components/scene').Scene} */
let scene = null
/** @type {import('./systems/renderer').Renderer} */
let renderer = null
let loop = null
/** @type {import('./physicsWorld').PhysicsWorld} */
let physicsWorld = null
/** @type {import('../src/entities/adlez/adlez').Adlez} */
let adlez = null

class World {
  constructor (container) {
    input = new Input()
    camera = createCamera()
    scene = createScene()
    renderer = createRenderer()
    physicsWorld = new PhysicsWorld(scene)
    /** @type {import('./systems/loop').Loop} */
    loop = new Loop(camera, scene, renderer)

    const { AMBIENT_LIGHT, SUN } = createLights()
    loop.addEntity(SUN)
    loop.addEntity(physicsWorld)

    scene.add(AMBIENT_LIGHT, SUN)

    container.append(renderer.domElement)

    const resizer = new Resizer(container, camera, renderer)
  }

  async init () {
    const { earth, enemies, spawnPoints, colliders } = await loadScreen(Consts.ADLEZ_INITIAL_SCREEN.row, Consts.ADLEZ_INITIAL_SCREEN.col)
    adlez = new Adlez(Consts.ADLEZ_INITIAL_SPAWN_POS, input, physicsWorld)
    await adlez.init()

    earth.tick = (deltaTime) => {
      // Do nothing, perhaps do nothing unless changing screens?
    }
    scene.add(adlez.getSkeleton(), adlez.model, earth, ...enemies, ...colliders)
    loop.addInput(input)
    loop.addAdlez(adlez)
    loop.addEntity(earth)
    loop.addEntities(enemies)
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