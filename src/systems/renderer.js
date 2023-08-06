import { WebGLRenderer, VSMShadowMap } from 'three'

function createRenderer () {
  const renderer = new WebGLRenderer({
    // antialias: true
  })

  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = VSMShadowMap

  return renderer
}

export { createRenderer }

/**
 * @typedef {import('three').WebGLRenderer} Renderer
 */