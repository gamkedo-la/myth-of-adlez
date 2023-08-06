// AMMO
import * as CANNON from 'cannon-es'
import CannonDebugger from 'cannon-es-debugger'
import { DEBUG } from './globals/gameStates'

//Don't need gravity. Do need to figure out how to detect "triggers"

let cylinderBody = null

/** @typedef {PhysicsWorld} PhysicsWorld */
export default class PhysicsWorld {
  constructor(scene) {
    this.scene = scene
    this.world = new CANNON.World({
      gravity: new CANNON.Vec3(0, 0, -9.82), // m/s²
    })

    this.debugRenderer = new CannonDebugger(this.scene, this.world)

    // Create a sphere body
    const radius = 1 // m
    cylinderBody = new CANNON.Body({
      mass: 5, // kg
      // shape: new CANNON.Sphere(radius),
      shape: new CANNON.Cylinder(radius, radius, 2 * radius, 8),
    })
    // Positive rotation around X-axis results in cylinder "top" radius being up
    cylinderBody.quaternion.setFromEuler(Math.PI / 2, 0, 0) // make it face up
    cylinderBody.position.set(0, 0, 10) // m
    this.world.addBody(cylinderBody)

    // Create a static plane for the ground
    const groundBody = new CANNON.Body({
      type: CANNON.Body.STATIC, // can also be achieved by setting the mass to 0
      shape: new CANNON.Plane(),
    })
    groundBody.position.set(0, 0, 1) // m
    groundBody.quaternion.setFromEuler(0, 0, Math.PI / 2) // make it face up
    this.world.addBody(groundBody)
  }

  tick(timeProps) {
    this.world.step(1 / 60, timeProps.deltaTime)
    if (DEBUG) this.debugRenderer.update()
    // Copy coordinates from Cannon.js to Three.js

    // console.log(`Sphere Body Y: ${sphereBody.position.y}; Delta Time: ${timeProps.deltaTime}`)
  }

  /**
   * Creates a CANNON.js physics body and adds it to the world
   * @param {Number} x X position for the body
   * @param {Number} y Y position for the body
   * @param {Number} z Z position for the body
   * @param {Number} rx X rotation for the body in radians
   * @param {Number} ry Y rotation for the body in radians
   * @param {Number} rz Z rotation for the body in radians
   * @param {Object} shape Configuration object for the shape
   * @returns {CANNON.Body} The created body
   */
  createAndAddBody(x, y, z, rx, ry, rz, shape)  {
    const cannonShape = getCannonShape(shape)
    const body = new CANNON.Body({
      type: CANNON.Body.STATIC,
      shape: cannonShape,
    })
    body.quaternion.setFromEuler(rx, ry, rz)
    body.position.set(x, y, z)
    this.world.addBody(body)
    return body
  }
}

export { PhysicsWorld }

function getCannonShape(shape) {
  switch (shape.type) {
    case 'sphere':
      return new CANNON.Sphere(shape.radius)
    case 'box':
      return new CANNON.Box(new CANNON.Vec3(shape.width, shape.depth, shape.height))
    case 'cylinder':
      return new CANNON.Cylinder(shape.topRadius || shape.radius, shape.bottomRadius || shape.radius, shape.height || (2 * shape.radius), shape.segments || 8)
    default:
      throw new Error(`Invalid shape: ${shape}`)
  }
}