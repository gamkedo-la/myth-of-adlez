const { AmbientLight, DirectionalLight } = require('three')
const { NEAR_CLIPPING, FAR_CLIPPING } = require('../globals/constants')

function createLights () {
  const ambientLight = new AmbientLight('white', 2)
  const mainLight = new DirectionalLight('white', 8)
  mainLight.castShadow = true
  mainLight.position.set(100, 10, 10)
  //Set up shadow properties for the light
  mainLight.shadow.mapSize.width = 512 // default
  mainLight.shadow.mapSize.height = 512 // default
  mainLight.shadow.camera.near = NEAR_CLIPPING // default
  mainLight.shadow.camera.far = FAR_CLIPPING // default

  return { ambientLight, mainLight }
}

export { createLights }