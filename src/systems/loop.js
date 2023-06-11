const { DAY_LENGTH, MOON_PHASES, MOON_RISE_PROPORTION, MOON_SET_PROPORTION, NIGHT_LENGTH, SUN_RISE_PROPORTION, SUN_SET_PROPORTION } = require('../globals/constants')

import { Clock } from 'three'

const clock = new Clock()
const entities = []

let dayCount = 0
let timeSinceSunrise = 0
let timeSinceSunset = 0
let isDay = true
let isNight = false
let sunIsRising = true
let sunIsSetting = false
let moonIsRising = false
let moonIsSetting = false
let moonPhase = MOON_PHASES[dayCount % MOON_PHASES.length]

export default class Loop {
  constructor (camera, scene, renderer) {
    this.camera = camera
    this.scene = scene
    this.renderer = renderer
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      const deltaTime = clock.getDelta()
      updateCalendar(deltaTime)

      entities.forEach(entity => entity.tick({
        deltaTime,
        dayCount,
        timeSinceSunrise,
        timeSinceSunset,
        isDay,
        isNight,
        sunIsRising,
        sunIsSetting,
        moonIsRising,
        moonIsSetting,
        moonPhase
      }))

      this.renderer.render(this.scene, this.camera)
    })
  }

  stop() {
    clock.stop()
    this.renderer.setAnimationLoop(null)
  }

  addEntity (entity) {
    entities.push(entity)
  }

  addEntities (entities) {
    entities.push(...entities)
  }

  removeEntity (entity) {
    const indexToRemove = entities.findIndex(item => item === entity)
    entities.splice(indexToRemove, 1)
  }
}

function updateCalendar (deltaTime) {
  if (isDay) {
    timeSinceSunrise += deltaTime
    if (timeSinceSunrise >= DAY_LENGTH) {
      isDay = false
      isNight = true
      moonPhase = MOON_PHASES[dayCount % MOON_PHASES.length]
      timeSinceSunrise = 0
    }
  } else {
    timeSinceSunset += deltaTime
    if (timeSinceSunset >= NIGHT_LENGTH) {
      isDay = true
      isNight = false
      dayCount++
      timeSinceSunset = 0
    }
  }

  sunIsRising = isDay ? (timeSinceSunrise <= SUN_RISE_PROPORTION * DAY_LENGTH) : false
  sunIsSetting = isDay ? (timeSinceSunrise >= SUN_SET_PROPORTION * DAY_LENGTH) : false
  moonIsRising = isNight ? (timeSinceSunset <= MOON_RISE_PROPORTION * NIGHT_LENGTH) : false
  moonIsSetting = isNight ? (timeSinceSunset >= MOON_SET_PROPORTION * NIGHT_LENGTH) : false
}

export { Loop }