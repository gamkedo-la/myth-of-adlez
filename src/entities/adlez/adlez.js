import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import PLAYER_ACTIONS from '../../globals/actions'

let adlezLoader = null
let walkSpeed = 2
let runSpeed = 3
let position = { x: 0, y: 0, z: 0 }
let rotation = 0

export default class Adlez {
  constructor (spawnPos = { x: 0, y: 0, z: 0 }, inputHandler) {
    adlezLoader = new GLTFLoader()
    position.x = spawnPos.x
    position.y = spawnPos.y
    position.z = spawnPos.z
    this.spawnPos = spawnPos
    this.inputHandler = inputHandler
    this.model = null
  }

  async init () {
    const modelData = await adlezLoader.loadAsync('./meshes/characters/adlez.glb')
    modelData.scene.traverse(child => {
      child.receiveShadow = true
    })
    this.model = modelData.scene
    this.model.position.set(position.x, position.y, position.z)
  }

  tick (timeProps) {
    if (!this.model) return

    processActionsWithDeltaTime(timeProps.deltaTime, this.inputHandler)
    this.model.position.set(position.x, position.y, position.z)
    if (rotation !== null && Math.abs(rotation - this.model.rotation.z) > 0.00001) {
      console.log(`Model: ${this.model.rotation.z}, Rotation: ${rotation}`)
      this.model.rotation.z = rotation
    }
  }

  getPosition () {
    return this.model.position
  }

  setPosition (position) {
    this.model.position.set(position.x, position.y, position.z)
  }

  getWalkSpeed () {
    return walkSpeed
  }

  setWalkSpeed (speed) {
    walkSpeed = speed
  }

  getRunSpeed () {
    return runSpeed
  }

  setRunSpeed (speed) {
    runSpeed = speed
  }
}

function processActionsWithDeltaTime (deltaTime, inputHandler) {
  const actions = inputHandler.getActions()
  if (actions.has(PLAYER_ACTIONS.ATTACK_PRIMARY)) {
    console.log('attack primary')
  } else if (actions.has(PLAYER_ACTIONS.ATTACK_SECONDARY)) {
    console.log('attack secondary')
  } else {
    if (actions.has(PLAYER_ACTIONS.MOVE_LEFT)) {
      processLeftMoves(deltaTime, actions)
    } else if (actions.has(PLAYER_ACTIONS.MOVE_RIGHT)) {
      processRightMoves(deltaTime, actions)
    } else if (actions.has(PLAYER_ACTIONS.MOVE_UP)) {
      processUpMoves(deltaTime, actions)
    } else if (actions.has(PLAYER_ACTIONS.MOVE_DOWN)) {
      processDownMoves(deltaTime, actions)
    }
  }
}

function processLeftMoves (deltaTime, actions) {
  if (actions.has(PLAYER_ACTIONS.MOVE_UP)) {
    // Walk up and left
    position.x -= (walkSpeed * 0.707) * deltaTime
    position.y += (walkSpeed * 0.707) * deltaTime
    rotation = Math.PI / 4
  } else if (actions.has(PLAYER_ACTIONS.MOVE_DOWN)) {
    // Walk down and left
    position.x -= (walkSpeed * 0.707) * deltaTime
    position.y -= (walkSpeed * 0.707) * deltaTime
    rotation = 3 * Math.PI / 4
  } else {
    // Walk left
    position.x -= (walkSpeed * 0.707) * deltaTime
    rotation = Math.PI / 2
  }
}

function processRightMoves (deltaTime, actions) {
  if (actions.has(PLAYER_ACTIONS.MOVE_UP)) {
    // Walk up and right
    position.x += (walkSpeed * 0.707) * deltaTime
    position.y += (walkSpeed * 0.707) * deltaTime
    rotation = 7 * Math.PI / 4
  } else if (actions.has(PLAYER_ACTIONS.MOVE_DOWN)) {
    // Walk down and right
    position.x += (walkSpeed * 0.707) * deltaTime
    position.y -= (walkSpeed * 0.707) * deltaTime
    rotation = 5 * Math.PI / 4
  } else {
    // Walk right
    position.x += (walkSpeed * 0.707) * deltaTime
    rotation = 3 * Math.PI / 2
  }
}

function processUpMoves (deltaTime, actions) {
  // Walk up; no need to check for left or right
  position.y += walkSpeed * deltaTime
  rotation = 0
}

function processDownMoves (deltaTime, actions) {
  // Walk down; no need to check for left or right
  position.y -= walkSpeed * deltaTime
  rotation = Math.PI
}

export { Adlez }