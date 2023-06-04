const { GLTFLoader } = require('three/examples/jsm/loaders/GLTFLoader')

async function loadScreen(row, col) {
  const loader = new GLTFLoader()

  const screenData = await loader.loadAsync(`./meshes/overworld/row${row}col${col}.glb`)

  screenData.scene.traverse(child => {
      // child.castShadow = true
      child.receiveShadow = true  
  })
  const model = screenData.scene.children[0]

  model.tick = (deltaTime) => {
    // Do nothing, perhaps do nothing unless changing screens?
  }

  return model
}

export { loadScreen }