// AMMO
import * as CANNON from 'cannon-es'
import CannonDebugger from 'cannon-es-debugger'
import { DEBUG } from './globals/gameStates'

//Don't need gravity. Do need to figure out how to detect "triggers"

let sphereBody = null

export default class PhysicsWorld {
  constructor(scene) {
    this.scene = scene
    this.world = new CANNON.World({
      gravity: new CANNON.Vec3(0, 0, -9.82), // m/s²
    })
    this.debugRenderer = new CannonDebugger(this.scene, this.world)

    // Create a sphere body
    const radius = 1 // m
    sphereBody = new CANNON.Body({
      mass: 5, // kg
      shape: new CANNON.Sphere(radius),
    })
    sphereBody.position.set(0, 0, 10) // m
    this.world.addBody(sphereBody)

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
}

export { PhysicsWorld }