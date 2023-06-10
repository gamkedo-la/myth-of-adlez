import { AmbientLight, DirectionalLight, Color } from 'three'
const Consts = require('../globals/constants')

let moonIntensity = Consts.MOON_FULL_INTENSITY

const AMBIENT_LIGHT = new AmbientLight(Consts.SUN_COLOR, Consts.AMBIENT_DAY_INTENSITY)
const SUN = new DirectionalLight(Consts.SUN_COLOR, Consts.SUN_INTENSITY)
const MOON = SUN // Alias

function createLights () {
  SUN.position.set(Consts.SUN_RISE_POS.x, Consts.SUN_RISE_POS.y, Consts.SUN_RISE_POS.z)
  
  setShadowProps()

  AMBIENT_LIGHT.tick = (timeProps) => {}

  SUN.tick = (timeProps) => {
    if (timeProps.isDay) {
      sunTick(timeProps.timeSinceSunrise, timeProps.sunIsRising, timeProps.sunIsSetting)
    } else {
      moonTick(timeProps.timeSinceSunset, timeProps.moonPhase, timeProps.moonIsRising, timeProps.moonIsSetting)
    }
  }

  return { AMBIENT_LIGHT, SUN }
}

function setShadowProps () {
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
}

function sunTick (timeSinceSunrise, sunIsRising, sunIsSetting) {
  SUN.position.x = Consts.SUN_MAX_POS.x * Math.cos(Math.PI * (timeSinceSunrise / Consts.DAY_LENGTH))
  SUN.position.y = Consts.SUN_MAX_POS.y * Math.sin(Math.PI * (timeSinceSunrise / Consts.DAY_LENGTH))
  SUN.position.z = Consts.SUN_SET_POS.z + (Consts.SUN_MAX_POS.z - Consts.SUN_SET_POS.z) * Math.sin(Math.PI * (timeSinceSunrise / Consts.DAY_LENGTH))

  if (timeSinceSunrise >= Consts.DAY_LENGTH) {
    SUN.position.set(Consts.SUN_SET_POS.x, Consts.SUN_SET_POS.y, Consts.SUN_SET_POS.z)
  } else if (sunIsRising) {
    //Sun is rising
    const sunRiseTime = Consts.SUN_RISE_PROPORTION * Consts.DAY_LENGTH
    const deltaIntensity = Consts.SUN_INTENSITY - Consts.MOON_FULL_INTENSITY
    SUN.intensity = Consts.MOON_FULL_INTENSITY + deltaIntensity * Math.sin((Math.PI / 2) * (timeSinceSunrise / sunRiseTime))
    SUN.color = interpolateColor(Consts.SUN_NIGHT_DAY_COLOR, Consts.SUN_COLOR, timeSinceSunrise, sunRiseTime)
    AMBIENT_LIGHT.color = interpolateColor(Consts.AMBIENT_DAY_NIGHT_COLOR, Consts.SUN_COLOR, timeSinceSunrise, sunRiseTime)
  } else if (sunIsSetting) {
    // Sun is setting
    const sunSetTime = (1 - Consts.SUN_SET_PROPORTION) * Consts.DAY_LENGTH
    const elapsedTime = timeSinceSunrise - (Consts.SUN_SET_PROPORTION * Consts.DAY_LENGTH)
    const deltaIntensity = Consts.MOON_FULL_INTENSITY - Consts.SUN_INTENSITY
    SUN.intensity = Consts.SUN_INTENSITY + deltaIntensity * Math.sin((Math.PI / 2) * (elapsedTime / sunSetTime))
    SUN.color = interpolateColor(Consts.SUN_COLOR, Consts.SUN_SET_COLOR, elapsedTime, sunSetTime)
    AMBIENT_LIGHT.color = interpolateColor(Consts.SUN_COLOR, Consts.AMBIENT_DAY_NIGHT_COLOR, elapsedTime, sunSetTime)
  } else {
    // Day time proper
    SUN.intensity = Consts.SUN_INTENSITY
    SUN.color = Consts.SUN_COLOR
    AMBIENT_LIGHT.color = Consts.SUN_COLOR
  }
}

function moonTick (timeSinceSunset, moonPhase, moonIsRising, moonIsSetting) {
  moonIntensity = moonIntensityForPhase(moonPhase)

  MOON.position.x = -Consts.SUN_MAX_POS.x * Math.cos(Math.PI * (timeSinceSunset / Consts.NIGHT_LENGTH))
  MOON.position.y = -Consts.SUN_MAX_POS.y * Math.sin(Math.PI * (timeSinceSunset / Consts.NIGHT_LENGTH))
  MOON.position.z = Consts.SUN_SET_POS.z + (Consts.SUN_MAX_POS.z - Consts.SUN_SET_POS.z) * Math.sin(Math.PI * (timeSinceSunset / Consts.NIGHT_LENGTH))

  if (timeSinceSunset >= Consts.NIGHT_LENGTH) {
    MOON.position.set(Consts.SUN_RISE_POS.x, Consts.SUN_RISE_POS.y, Consts.SUN_RISE_POS.z)
    return
  } else if (moonIsRising) {
    // Moon is Rising
    const moonRiseTime = Consts.MOON_RISE_PROPORTION * Consts.NIGHT_LENGTH
    const deltaIntensity = moonIntensity - Consts.MOON_FULL_INTENSITY
    MOON.intensity = Consts.MOON_FULL_INTENSITY + deltaIntensity * Math.sin((Math.PI / 2) * (timeSinceSunset / moonRiseTime))
    MOON.color = interpolateColor(Consts.SUN_DAY_NIGHT_COLOR, Consts.MOON_COLOR, timeSinceSunset, moonRiseTime)
    AMBIENT_LIGHT.color = interpolateColor(Consts.AMBIENT_DAY_NIGHT_COLOR, Consts.AMBIENT_NIGHT_COLOR, timeSinceSunset, moonRiseTime)
  } else if (moonIsSetting) {
    // Moon is Setting
    const moonSetTime = (1 - Consts.MOON_SET_PROPORTION) * Consts.NIGHT_LENGTH
    const elapsedTime = timeSinceSunset - (Consts.MOON_SET_PROPORTION * Consts.NIGHT_LENGTH)
    const deltaIntensity = Consts.MOON_FULL_INTENSITY - moonIntensity
    MOON.intensity = moonIntensity + deltaIntensity * Math.sin((Math.PI / 2) * (elapsedTime / moonSetTime))
    MOON.color = interpolateColor(Consts.MOON_COLOR, Consts.SUN_NIGHT_DAY_COLOR, elapsedTime, moonSetTime)
    AMBIENT_LIGHT.color = interpolateColor(Consts.AMBIENT_NIGHT_COLOR, Consts.AMBIENT_DAY_NIGHT_COLOR, elapsedTime, moonSetTime)
  } else {
    // Night Time Proper
    MOON.intensity = moonIntensity
    MOON.color = Consts.MOON_COLOR
    AMBIENT_LIGHT.color = Consts.AMBIENT_NIGHT_COLOR
  }

  return true
}

function moonIntensityForPhase (moonPhase) {
  switch (moonPhase) {
    case 'FULL': return Consts.MOON_FULL_INTENSITY
    case 'GIBBOUS': return Consts.MOON_GIBBOUS_INTENSITY
    case 'HALF': return Consts.MOON_HALF_INTENSITY
    case 'CRESCENT': return Consts.MOON_CRESCENT_INTENSITY
    case 'NEW': return Consts.MOON_NEW_INTENSITY
    default:
      // Shouldn't end up here
      return Consts.MOON_FULL_INTENSITY
  }
}

function interpolateColor (initialColor, finalColor, elapsedTime, timeFrame) {
  const proportion = Math.sin((Math.PI / 2) * elapsedTime / timeFrame)

  const deltaR = finalColor.r - initialColor.r
  const deltaG = finalColor.g - initialColor.g
  const deltaB = finalColor.b - initialColor.b

  const red = initialColor.r + deltaR * proportion
  const green = initialColor.g + deltaG * proportion
  const blue = initialColor.b + deltaB * proportion

  return new Color(red, green, blue)
}

export { createLights }