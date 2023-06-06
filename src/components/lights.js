import { AmbientLight, DirectionalLight, Color } from 'three'
const Consts = require('../globals/constants')

let isDay = true
let dayCount = 0
let moonPhase = Consts.MOON_PHASES[dayCount % Consts.MOON_PHASES.length]

const AMBIENT_LIGHT = new AmbientLight(Consts.SUN_COLOR, Consts.AMBIENT_DAY_INTENSITY)
const SUN = new DirectionalLight(Consts.SUN_COLOR, Consts.SUN_INTENSITY) // Pink = 255, 182, 193; yellow = 255, 255, 224, deep purple = 87, 8, 97

function createLights () {
  SUN.position.set(Consts.SUN_RISE_POS.x, Consts.SUN_RISE_POS.y, Consts.SUN_RISE_POS.z)
  //Set up shadow properties for the light
  SUN.castShadow = true
  SUN.shadow.mapSize.width = 2048 // default
  SUN.shadow.mapSize.height = 2048 // default
  SUN.shadow.normalBias = 0.1
  SUN.shadow.camera.near = Consts.CAMERA_NEAR_CLIPPING // default
  SUN.shadow.camera.far = Consts.CAMERA_FAR_CLIPPING // default
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
  SUN.position.x = 100 * Math.cos(Math.PI * (SUN.timeSinceSunrise / Consts.DAY_LENGTH))
  SUN.position.y = -60 * Math.sin(Math.PI * (SUN.timeSinceSunrise / Consts.DAY_LENGTH))
  if (SUN.timeSinceSunrise >= Consts.DAY_LENGTH) {
    SUN.position.set(Consts.SUN_SET_POS.x, Consts.SUN_SET_POS.y, Consts.SUN_SET_POS.z)
    SUN.color = Consts.MOON_COLOR
    AMBIENT_LIGHT.color = Consts.AMBIENT_NIGHT_COLOR
    SUN.timeSinceSunrise = 0
    return false
  }

  if (SUN.timeSinceSunrise < 0.1 * Consts.DAY_LENGTH) {
    SUN.intensity = Consts.SUN_INTENSITY * Math.sin((Math.PI / 2) * SUN.timeSinceSunrise / (0.1 * Consts.DAY_LENGTH))
    let green = 0
    let blue = 0
    if (SUN.timeSinceSunrise > 0.05 * Consts.DAY_LENGTH) {
      green = Math.round(255 * Math.sin((Math.PI / 2) * ((SUN.timeSinceSunrise - (0.05 * Consts.DAY_LENGTH)) / (0.05 * Consts.DAY_LENGTH))))
      blue = Math.round(224 * Math.sin((Math.PI / 2) * ((SUN.timeSinceSunrise - (0.05 * Consts.DAY_LENGTH)) / (0.05 * Consts.DAY_LENGTH))))
    }

    const color = new Color(`rgb(255, ${green}, ${blue})`)
    SUN.color = color
    AMBIENT_LIGHT.color = Consts.SUN_COLOR
  } else if (SUN.timeSinceSunrise > 0.9 * Consts.DAY_LENGTH) {
    SUN.intensity = Consts.SUN_INTENSITY * Math.sin((Math.PI / 2) * (Consts.DAY_LENGTH - SUN.timeSinceSunrise) / (0.1 * Consts.DAY_LENGTH))
    let green = 255
    let blue = 224
    if (SUN.timeSinceSunrise > 0.95 * Consts.DAY_LENGTH) {
      green -= Math.round(255 * Math.sin((Math.PI / 2) * ((SUN.timeSinceSunrise - (0.95 * Consts.DAY_LENGTH)) / (0.05 * Consts.DAY_LENGTH))))
      blue -= Math.round(224 * Math.sin((Math.PI / 2) * ((SUN.timeSinceSunrise - (0.95 * Consts.DAY_LENGTH)) / (0.05 * Consts.DAY_LENGTH))))
    }

    const color = new Color(`rgb(255, ${green}, ${blue})`)
    SUN.color = color
    AMBIENT_LIGHT.color = Consts.SUN_COLOR
  } else {
    SUN.intensity = Consts.SUN_INTENSITY
    SUN.color = Consts.SUN_COLOR
    AMBIENT_LIGHT.color = Consts.SUN_COLOR
  }

  return true
}

function nightTimeTick (deltaTime) {
  SUN.timeSinceSunset += deltaTime
  SUN.position.x = 100 * Math.cos(Math.PI * (SUN.timeSinceSunset / Consts.DAY_LENGTH))
  SUN.position.y = -60 * Math.sin(Math.PI * (SUN.timeSinceSunset / Consts.DAY_LENGTH))
  if (SUN.timeSinceSunset >= Consts.DAY_LENGTH) {
    SUN.position.set(Consts.SUN_RISE_POS.x, Consts.SUN_RISE_POS.y, Consts.SUN_RISE_POS.z)
    SUN.color = Consts.SUN_COLOR
    AMBIENT_LIGHT.color = Consts.SUN_COLOR
    SUN.timeSinceSunset = 0
    return false
  }

  if (SUN.timeSinceSunset < 0.1 * Consts.DAY_LENGTH) {
    SUN.intensity = Consts.MOON_FULL_INTENSITY * Math.sin((Math.PI / 2) * SUN.timeSinceSunset / (0.1 * Consts.DAY_LENGTH))
  } else if (SUN.timeSinceSunset > 0.9 * Consts.DAY_LENGTH) {
    SUN.intensity = Consts.MOON_FULL_INTENSITY * Math.sin((Math.PI / 2) * (Consts.DAY_LENGTH - SUN.timeSinceSunset) / (0.1 * Consts.DAY_LENGTH))
  } else {
    SUN.intensity = Consts.MOON_FULL_INTENSITY
  }

  return true
}

export { createLights }