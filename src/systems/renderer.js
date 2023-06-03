const { WebGLRenderer } = require('three')

function createRenderer () {
  const renderer = new WebGLRenderer({
    antialias: true
  })

  renderer.shadowMap.enabled = true

  return renderer
}

export { createRenderer }