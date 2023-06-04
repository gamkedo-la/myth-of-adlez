const { AmbientLight, DirectionalLight, Vector3 } = require('three')
const { NEAR_CLIPPING, FAR_CLIPPING } = require('../globals/constants')

function createLights () {
  const ambientLight = new AmbientLight('white', 1)
  const sun = new DirectionalLight('white', 2)
  const dayLength = 60 //length of a day in milliseconds
  const sunrisePos = { x: 100, y: 0, z: 50 }
  sun.position.set(sunrisePos.x, sunrisePos.y, sunrisePos.z)
  //Set up shadow properties for the light
  sun.castShadow = true
  sun.shadow.mapSize.width = 2048 // default
  sun.shadow.mapSize.height = 2048 // default
  sun.shadow.normalBias = 0.1
  sun.shadow.camera.near = NEAR_CLIPPING // default
  sun.shadow.camera.far = FAR_CLIPPING // default
  sun.shadow.camera.left = -16
  sun.shadow.camera.right = 16
  sun.shadow.camera.top = -20
  sun.shadow.camera.bottom = 20
  sun.timeSinceSunrise = 0
  sun.tick = (deltaTime) => {
    sun.timeSinceSunrise += deltaTime
    sun.position.x = 100 * Math.cos(Math.PI * (sun.timeSinceSunrise / dayLength))
    sun.position.y = -60 * Math.sin(Math.PI * (sun.timeSinceSunrise / dayLength))
    if (sun.timeSinceSunrise >= dayLength) {
      sun.position.set(sunrisePos.x, sunrisePos.y, sunrisePos.z)
      sun.timeSinceSunrise = 0
    }
  }

  return { ambientLight, sun }
}

export { createLights }