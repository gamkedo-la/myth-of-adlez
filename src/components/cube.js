const { BoxGeometry, Mesh, MeshBasicMaterial } = require('three')

function createCube () {
  const geometry = new BoxGeometry(1, 1, 1)
  const material = new MeshBasicMaterial({
    color: 0xFFFFFF
  })
  const cube = new Mesh(geometry, material)

  return cube
}

export { createCube }