import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import AnimationController from '../animationController'
import PLAYER_ACTIONS from '../../globals/actions'
import adlezActions from './adlezActions'

/** @type { import ('../../physicsWorld').PhysicsWorld } */
let physicsWorld = null

let adlezLoader = null
let walkSpeed = 2
let runSpeed = 3

let position = { x: 0, y: 0, z: 0 }
let rotation = 0

/** @typedef {Adlez} Adlez */
export default class Adlez {
  constructor (spawnPos = { x: 0, y: 0, z: 0 }, inputHandler, physWorld) {
    adlezLoader = new GLTFLoader()
    physicsWorld = physWorld
    position.x = spawnPos.x
    position.y = spawnPos.y
    position.z = spawnPos.z
    this.spawnPos = spawnPos
    this.inputHandler = inputHandler
    this.model = null
    this.body = null
  }

  /**
   * Asynchronously loads the model and animations
   * @returns {Promise<void>}
   * */
  async init () {
    const modelData = await adlezLoader.loadAsync('./meshes/characters/adlez.glb')
    modelData.scene.traverse(child => {
      child.receiveShadow = true
    })
    this.animationController  = new AnimationController(modelData.scene, modelData.animations, adlezActions, adlezActions.idle)

    this.model = modelData.scene
    this.model.position.set(position.x, position.y, position.z)
    // Positive 90 degree (Math.PI / 2) rotation around X-axis results in cylinder "top" being up
    this.body = physicsWorld.createAndAddBody(position.x, position.y, position.z, Math.PI / 2, 0, 0, {
      type: 'cylinder',
      radius: 1
    })
  }

  /**
   * @param {import('../../systems/loop').TimeProps} timeProps
   */
  tick (timeProps) {
    if (!this.model) return

    processActionsWithDeltaTime(timeProps.deltaTime, this.inputHandler, this.animationController)
    this.model.position.set(position.x, position.y, position.z)
    if (rotation !== null && Math.abs(rotation - this.model.rotation.z) > 0.00001) {
      this.model.rotation.z = rotation
    }

    this.animationController.tick(timeProps.deltaTime)
  }

  getSkeleton () {
    return this.animationController.skeleton
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

function processActionsWithDeltaTime (deltaTime, inputHandler, animationController) {
  const actions = inputHandler.getActions()
  if (actions.has(PLAYER_ACTIONS.ATTACK_PRIMARY)) {
    console.log('attack primary')
  } else if (actions.has(PLAYER_ACTIONS.ATTACK_SECONDARY)) {
    console.log('attack secondary')
  } else {
    if (actions.has(PLAYER_ACTIONS.MOVE_LEFT)) {
      processLeftMoves(deltaTime, actions)
      if (animationController.currentBaseAction !== adlezActions.walk) {

        animationController.newAction(adlezActions.walk.name, 0.5)
      }
    } else if (actions.has(PLAYER_ACTIONS.MOVE_RIGHT)) {
      processRightMoves(deltaTime, actions)
      if (animationController.currentBaseAction !== adlezActions.walk) {
        animationController.newAction(adlezActions.walk.name, 0.5)
      }
    } else if (actions.has(PLAYER_ACTIONS.MOVE_UP)) {
      processUpMoves(deltaTime, actions)
      if (animationController.currentBaseAction !== adlezActions.walk) {
        animationController.newAction(adlezActions.walk.name, 0.5)
      }
    } else if (actions.has(PLAYER_ACTIONS.MOVE_DOWN)) {
      processDownMoves(deltaTime, actions)
      if (animationController.currentBaseAction !== adlezActions.walk) {
        animationController.newAction(adlezActions.walk.name, 0.5)
      }
    } else {
      // No movement
      if (animationController.currentBaseAction !== adlezActions.idle) {
        animationController.newAction(adlezActions.idle.name, 0.5)
      }
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

  this.body.position.set(position.x, position.y, position.z)
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