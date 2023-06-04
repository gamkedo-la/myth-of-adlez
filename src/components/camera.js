const { FOV, ASPECT, NEAR_CLIPPING, FAR_CLIPPING } = require('../globals/constants')
import { PerspectiveCamera, Vector3 }  from 'three'

function createCamera () {
  const camera = new PerspectiveCamera(FOV, ASPECT, NEAR_CLIPPING, FAR_CLIPPING)

  camera.position.z = 28.5

  return camera
}

export { createCamera }