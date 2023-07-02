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
      // if (child.name === 'Adlez') {
      //   child.receiveShadow = true
      //   this.model = child
      // }
    })
    this.model = modelData.scene
    this.model.scale.set(2, 2, 2)
  }

  tick (deltaTime) {}
}

export { Adlez }