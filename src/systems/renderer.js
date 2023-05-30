const { WebGLRenderer } = require('three')

function createRenderer () {
  const renderer = new WebGLRenderer()

  return renderer
}

export { createRenderer }