import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

async function loadScreen(row, col) {
  const loader = new GLTFLoader()

  const screenData = await loader.loadAsync(`./meshes/overworld/row${row}col${col}.glb`)

  let earth = null
  const enemies = []
  const spawnPoints = []
  const colliders = []
  screenData.scene.traverse(child => {
    child.receiveShadow = true
    const childName = child.name?.toLowerCase() || ''
    const childType = child.userData?.type?.toLowerCase() || ''
    
    if (childName === 'earth') {
      earth = child
    } else if (childType === 'enemy') {
      enemies.push(child)
    } else if (childType === 'spawnpoint') {
      child.visible = false
      spawnPoints.push(child)
    } else if (childType === 'collider') {
      child.visible = false
      colliders.push(child)
    }
  })

  return { earth, enemies, spawnPoints, colliders }
}

export { loadScreen }