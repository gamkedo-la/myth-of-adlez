const { AmbientLight, DirectionalLight, Vector3 } = require('three')
const { NEAR_CLIPPING, FAR_CLIPPING } = require('../globals/constants')

function createLights () {
  const ambientLight = new AmbientLight('white', 1)
  const mainLight = new DirectionalLight('white', 2)
  mainLight.castShadow = true
  mainLight.position.set(-20, -30, 50)
  //Set up shadow properties for the light
  // mainLight.shadow.radius = 2.95
  // mainLight.shadow.mapSize.width = 2048 // default
  // mainLight.shadow.mapSize.height = 2048 // default
  // mainLight.shadow.bias = 0.000001
  mainLight.shadow.camera.near = NEAR_CLIPPING // default
  mainLight.shadow.camera.far = FAR_CLIPPING // default
  mainLight.shadow.camera.left = -16
  mainLight.shadow.camera.right = 16
  mainLight.shadow.camera.top = -20
  mainLight.shadow.camera.bottom = 20
  mainLight.tick = () => {
    // mainLight.position.x += 0.1
  }

  return { ambientLight, mainLight }
}

export { createLights }