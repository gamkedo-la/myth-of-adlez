const { createCamera } = require('./components/camera')
const { createCube } = require('./components/cube')
const { createScene } = require('./components/scene')

const { createRenderer } = require('./systems/renderer')
const { Resizer } = require('./systems/resizer')

let camera = null
let scene = null
let renderer = null

class World {
  constructor (container) {
    camera = createCamera()
    scene = createScene()
    renderer = createRenderer()

    const cube = createCube()
    scene.add(cube)

    container.append(renderer.domElement)

    const resizer = new Resizer(container, camera, renderer)
  }

  render () {
    renderer.render(scene, camera)
  }
}

export { World }



/*







// const THREE = require('three')
// const { GLTFLoader } = require('three/addons/loaders/GLTFLoader.js')

// import * as THREE from 'three'
const { GLTFLoader } = require('three/addons/loaders/GLTFLoader.js')
import { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh } from 'three'
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const ASPECT = 16 / 9
const FoV = 75
const NEAR = 0.1
const FAR = 1000

document.body.style.margin = '0px'

const scene = new Scene()
const camera = new PerspectiveCamera(FoV, ASPECT, NEAR, FAR)

const renderer = new WebGLRenderer()
document.body.appendChild(renderer.domElement)

setRendererSize()

window.addEventListener('resize', setRendererSize)

const loader = new GLTFLoader()
// loader.load('./testScreen.glb',
// (gltf) => {
//   scene.add(gltf.scene)
// },
// (error) => {
//   console.error(error)
// })

// const loadedData = await loader.loadAsync('./testScreen.glb')

const geometry = new BoxGeometry(1, 1, 1)
const material = new MeshBasicMaterial({
  color: 0x00FF00
})
const cube = new Mesh(geometry, material)
scene.add(cube)

camera.position.z = 5

let mainLoop = null
function animate () {
  mainLoop = requestAnimationFrame(animate)
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01
  renderer.render(scene, camera)
}

animate()

function setRendererSize () {
  let widthToUse = window.innerWidth
  let heightToUse = (1/ASPECT) * window.innerWidth

  if (heightToUse > window.innerHeight) {
    heightToUse = window.innerHeight
    widthToUse = ASPECT * heightToUse
  }

  renderer.setSize(widthToUse, heightToUse)
  renderer.domElement.style.width = `${widthToUse}px`
  renderer.domElement.style.height = `${heightToUse}px`
  renderer.domElement.style.display = 'block'
  renderer.domElement.style.margin = '0px auto'
}

if (module.hot) {
  // module.hot.accept(animate())
  module.hot.dispose(() => {
    cancelAnimationFrame(mainLoop)
  })
}








*/