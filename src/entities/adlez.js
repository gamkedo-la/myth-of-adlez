import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

let adlezLoader = null
export default class Adlez {
  constructor (x = 0, y = 0, z = 0) {
    adlezLoader = new GLTFLoader()
    this.x = x
    this.y = y
    this.z = z
    this.model = null
  }

  async init () {
    const modelData = await adlezLoader.loadAsync('./meshes/characters/adlez.glb')
    modelData.scene.traverse(child => {
      child.receiveShadow = true
    })
    this.model = modelData.scene
  }

  tick (deltaTime) {}
}

export { Adlez }