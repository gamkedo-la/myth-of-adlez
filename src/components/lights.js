import { AmbientLight, DirectionalLight, Color } from 'three'
const { NEAR_CLIPPING, FAR_CLIPPING } = require('../globals/constants')

const SUN_INTENSITY = 2
const FULL_MOON_INTENSITY = 1
const GIBBOUS_MOON_INTENSITY = 0.875
const HALF_MOON_INTENSITY = 0.75
const CRESCENT_MOON_INTENSITY = 0.625
const NEW_MOON_INTENSITY = 0.5
const AMBIENT_DAY_INTENSITY = 1
const AMBIENT_NIGHT_INTENSITY = 0.5

const DAY_LENGTH = 60 // length of a day in seconds
const NIGHT_LENGTH = 60 // length of night in seconds
const MOON_PHASES = ['FULL', 'GIBBOUS', 'HALF', 'CRESCENT', 'NEW', 'CRESCENT', 'HALF', 'GIBBOUS']

const SUN_COLOR = new Color('rgb(255, 255, 224)') // light yellow
const MOON_COLOR = new Color('rgb(235, 235, 255)') // slightly blue
const AMBIENT_NIGHT_COLOR = new Color('#86518F')// mid-level purple, probably needs to be lighter, but lower intensity

const SUNRISE_POS = { x: 100, y: 0, z: 50 }
const SUNSET_POS = { x: -100, y: 0, z: 50 }

let isDay = true
let dayCount = 0
let moonPhase = MOON_PHASES[dayCount % MOON_PHASES.length]

const AMBIENT_LIGHT = new AmbientLight(SUN_COLOR, AMBIENT_DAY_INTENSITY)
const SUN = new DirectionalLight(SUN_COLOR, SUN_INTENSITY) // Pink = 255, 182, 193; yellow = 255, 255, 224, deep purple = 87, 8, 97

function createLights () {
  SUN.position.set(SUNRISE_POS.x, SUNRISE_POS.y, SUNRISE_POS.z)
  //Set up shadow properties for the light
  SUN.castShadow = true
  SUN.shadow.mapSize.width = 2048 // default
  SUN.shadow.mapSize.height = 2048 // default
  SUN.shadow.normalBias = 0.1
  SUN.shadow.camera.near = NEAR_CLIPPING // default
  SUN.shadow.camera.far = FAR_CLIPPING // default
  SUN.shadow.camera.left = -16
  SUN.shadow.camera.right = 16
  SUN.shadow.camera.top = -20
  SUN.shadow.camera.bottom = 20
  SUN.timeSinceSunrise = 0
  SUN.timeSinceSunset = 0
  SUN.tick = (deltaTime) => {
    if (isDay) {
      isDay = dayTimeTick(deltaTime)
    } else {
      isDay = !nightTimeTick(deltaTime)
    }
  }

  return { AMBIENT_LIGHT, SUN }
}

function dayTimeTick (deltaTime) {
  SUN.timeSinceSunrise += deltaTime
  SUN.position.x = 100 * Math.cos(Math.PI * (SUN.timeSinceSunrise / DAY_LENGTH))
  SUN.position.y = -60 * Math.sin(Math.PI * (SUN.timeSinceSunrise / DAY_LENGTH))
  if (SUN.timeSinceSunrise >= DAY_LENGTH) {
    SUN.position.set(SUNSET_POS.x, SUNSET_POS.y, SUNSET_POS.z)
    SUN.color = MOON_COLOR
    AMBIENT_LIGHT.color = AMBIENT_NIGHT_COLOR
    SUN.timeSinceSunrise = 0
    return false
  }

  if (SUN.timeSinceSunrise < 0.1 * DAY_LENGTH) {
    SUN.intensity = SUN_INTENSITY * Math.sin((Math.PI / 2) * SUN.timeSinceSunrise / (0.1 * DAY_LENGTH))
    let green = 0
    let blue = 0
    if (SUN.timeSinceSunrise > 0.05 * DAY_LENGTH) {
      green = Math.round(255 * Math.sin((Math.PI / 2) * ((SUN.timeSinceSunrise - (0.05 * DAY_LENGTH)) / (0.05 * DAY_LENGTH))))
      blue = Math.round(224 * Math.sin((Math.PI / 2) * ((SUN.timeSinceSunrise - (0.05 * DAY_LENGTH)) / (0.05 * DAY_LENGTH))))
    }

    const color = new Color(`rgb(255, ${green}, ${blue})`)
    SUN.color = color
    AMBIENT_LIGHT.color = SUN_COLOR
  } else if (SUN.timeSinceSunrise > 0.9 * DAY_LENGTH) {
    SUN.intensity = SUN_INTENSITY * Math.sin((Math.PI / 2) * (DAY_LENGTH - SUN.timeSinceSunrise) / (0.1 * DAY_LENGTH))
    let green = 255
    let blue = 224
    if (SUN.timeSinceSunrise > 0.95 * DAY_LENGTH) {
      green -= Math.round(255 * Math.sin((Math.PI / 2) * ((SUN.timeSinceSunrise - (0.95 * DAY_LENGTH)) / (0.05 * DAY_LENGTH))))
      blue -= Math.round(224 * Math.sin((Math.PI / 2) * ((SUN.timeSinceSunrise - (0.95 * DAY_LENGTH)) / (0.05 * DAY_LENGTH))))
    }

    const color = new Color(`rgb(255, ${green}, ${blue})`)
    SUN.color = color
    AMBIENT_LIGHT.color = SUN_COLOR
  } else {
    SUN.intensity = SUN_INTENSITY
    SUN.color = SUN_COLOR
    AMBIENT_LIGHT.color = SUN_COLOR
  }

  return true
}

function nightTimeTick (deltaTime) {
  SUN.timeSinceSunset += deltaTime
  SUN.position.x = 100 * Math.cos(Math.PI * (SUN.timeSinceSunset / DAY_LENGTH))
  SUN.position.y = -60 * Math.sin(Math.PI * (SUN.timeSinceSunset / DAY_LENGTH))
  if (SUN.timeSinceSunset >= DAY_LENGTH) {
    SUN.position.set(SUNRISE_POS.x, SUNRISE_POS.y, SUNRISE_POS.z)
    SUN.color = SUN_COLOR
    AMBIENT_LIGHT.color = SUN_COLOR
    SUN.timeSinceSunset = 0
    return false
  }

  if (SUN.timeSinceSunset < 0.1 * DAY_LENGTH) {
    SUN.intensity = FULL_MOON_INTENSITY * Math.sin((Math.PI / 2) * SUN.timeSinceSunset / (0.1 * DAY_LENGTH))
  } else if (SUN.timeSinceSunset > 0.9 * DAY_LENGTH) {
    SUN.intensity = FULL_MOON_INTENSITY * Math.sin((Math.PI / 2) * (DAY_LENGTH - SUN.timeSinceSunset) / (0.1 * DAY_LENGTH))
  } else {
    SUN.intensity = FULL_MOON_INTENSITY
  }

  return true
}

export { createLights }