const { GLTFLoader } = require('three/examples/jsm/loaders/GLTFLoader')

async function loadScreen(row, col) {
  const loader = new GLTFLoader()

  const screenData = await loader.loadAsync(`./meshes/overworld/row${row}/col${col}.glb`)

  const model = screenData.scene.children[0]
  console.log(Object.keys(model))
  model.rotateZ(Math.PI)
  model.castShadow = true
  model.receiveShadow = true
  model.tick = (deltaTime) => {
    // Do nothing, perhaps do nothing unless changing screens?
  }

  return model
}

export { loadScreen }