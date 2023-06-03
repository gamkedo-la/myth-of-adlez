const { PerspectiveCamera } = require('three')
const { FOV, ASPECT, NEAR_CLIPPING, FAR_CLIPPING } = require('../globals/constants')

function createCamera () {
  const camera = new PerspectiveCamera(FOV, ASPECT, NEAR_CLIPPING, FAR_CLIPPING)

  camera.position.z = 28.5

  return camera
}

export { createCamera }