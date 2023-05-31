const { WebGLRenderer } = require('three')

function createRenderer () {
  const renderer = new WebGLRenderer({
    antialias: true
  })

  return renderer
}

export { createRenderer }