import { Color } from 'three'

const ambientNightColor = new Color('rgb(134, 81, 143)') // mid-level purple
const ambientDayNightColor = new Color('rgb(215, 168, 184)') // mid-way between ambientNightColor and sunColor
const ambientSunRiseColor = new Color('rgb(255, 214, 218)') // light red
const moonColor = new Color('rgb(205, 205, 235)') // slightly blue
const sunColor = new Color('rgb(255, 255, 224)') // light yellow
const sunDayNightColor = new Color('rgb(245, 213, 128)') // mid-way between sunSetColor and moonColor
const sunNightDayColor = new Color('rgb(245, 175, 187)') // mid-way between moonColor and sunRiseColor
const sunRiseColor = new Color('rgb(255, 114, 118)') // light red
const sunSetColor = new Color('rgb(255, 191, 0)') // Amber

const Consts = {
  AMBIENT_DAY_INTENSITY: 1,
  AMBIENT_DAY_NIGHT_COLOR: ambientDayNightColor,
  AMBIENT_NIGHT_COLOR: ambientNightColor,
  AMBIENT_NIGHT_INTENSITY: 0.5,
  AMBIENT_SUN_RISE_COLOR: ambientSunRiseColor,
  CAMERA_ASPECT: 16/9,
  CAMERA_FAR_CLIPPING: 300,
  CAMERA_FOV: 35,
  CAMERA_NEAR_CLIPPING: 0.1,
  DAY_LENGTH: 60, // length of a day in seconds
  MOON_COLOR: moonColor,
  MOON_CRESCENT_INTENSITY: 0.625,
  MOON_FULL_INTENSITY: 0.75,
  MOON_GIBBOUS_INTENSITY: 0.625,
  MOON_HALF_INTENSITY: 0.5,
  MOON_NEW_INTENSITY: 0.25,
  MOON_PHASES: ['FULL', 'GIBBOUS', 'HALF', 'CRESCENT', 'NEW', 'CRESCENT', 'HALF', 'GIBBOUS'],
  MOON_RISE_PROPORTION: 0.1,
  MOON_SET_PROPORTION: 0.9,
  NIGHT_LENGTH: 60, // length of night in seconds
  SUN_COLOR: sunColor,
  SUN_DAY_NIGHT_COLOR: sunDayNightColor,
  SUN_INTENSITY: 2,
  SUN_MAX_POS: { x: 100, y: -30, z: 100 }, // Sun is never in this position, but defines maximum values along all 3 axes
  SUN_NIGHT_DAY_COLOR: sunNightDayColor,
  SUN_RISE_COLOR: sunRiseColor,
  SUN_RISE_POS: { x: 100, y: 0, z: 10 },
  SUN_RISE_PROPORTION: 0.1,
  SUN_SET_COLOR: sunSetColor,
  SUN_SET_POS: { x: -100, y: 0, z: 10 },
  SUN_SET_PROPORTION: 0.9
}




export default Consts
export const {
  AMBIENT_DAY_INTENSITY,
  AMBIENT_DAY_NIGHT_COLOR,
  AMBIENT_NIGHT_COLOR,
  AMBIENT_NIGHT_INTENSITY,
  AMBIENT_SUN_RISE_COLOR,
  CAMERA_ASPECT,
  CAMERA_FAR_CLIPPING,
  CAMERA_FOV,
  CAMERA_NEAR_CLIPPING,
  DAY_LENGTH,
  MOON_COLOR,
  MOON_CRESCENT_INTENSITY,
  MOON_FULL_INTENSITY,
  MOON_GIBBOUS_INTENSITY,
  MOON_HALF_INTENSITY,
  MOON_NEW_INTENSITY,
  MOON_PHASES,
  MOON_RISE_PROPORTION,
  MOON_SET_PROPORTION,
  NIGHT_LENGTH,
  SUN_COLOR,
  SUN_DAY_NIGHT_COLOR,
  SUN_INTENSITY,
  SUN_MAX_POS,
  SUN_NIGHT_DAY_COLOR,
  SUN_RISE_COLOR,
  SUN_RISE_POS,
  SUN_RISE_PROPORTION,
  SUN_SET_COLOR,
  SUN_SET_POS,
  SUN_SET_PROPORTION
} = Consts