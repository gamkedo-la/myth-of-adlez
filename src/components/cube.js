const { BoxGeometry, Mesh, MeshStandardMaterial } = require('three')

function createCube () {
  const geometry = new BoxGeometry(1, 1, 1)
  const material = new MeshStandardMaterial({
    color: 'purple'
  })
  const cube = new Mesh(geometry, material)
  cube.tick = (deltaTime) => {
    cube.rotation.z += (1.01 * deltaTime)
    cube.rotation.x += (1.01 * deltaTime)
    cube.rotation.y += (1.01 * deltaTime)
  }

  return cube
}

export { createCube }