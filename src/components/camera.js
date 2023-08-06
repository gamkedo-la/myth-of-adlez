const { CAMERA_ASPECT, CAMERA_FAR_CLIPPING, CAMERA_FOV, CAMERA_NEAR_CLIPPING } = require('../globals/constants')
import { PerspectiveCamera }  from 'three'

function createCamera () {
  const camera = new PerspectiveCamera(CAMERA_FOV, CAMERA_ASPECT, CAMERA_NEAR_CLIPPING, CAMERA_FAR_CLIPPING)

  camera.position.z = 28.5

  return camera
}

export { createCamera }

/**
 * @typedef {import('three').PerspectiveCamera} PerspectiveCamera
 */