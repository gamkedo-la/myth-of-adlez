import BUTTONS from "../globals/gamepad"

const justDownButtons = new Set()
const downButtons = new Set()
const justUpButtons = new Set()

export default class GamepadInput {
  constructor () {
    this.pad = null
    this.buttons = BUTTONS

    window.addEventListener('gamepadconnected', (e) => {
      this.pad = e.gamepad
    })

    window.addEventListener('gamepaddisconnected', (e) => {
      this.pad = null
    })
  }

  tick (deltaTime) {
    if (!this.pad) return

    this.pad.buttons.forEach((button, index) => {
      if (button.pressed) {
        if (!downButtons.has(index)) {
          justDownButtons.add(index)
          downButtons.add(index)
        }
      } else {
        if (downButtons.has(index)) {
          justUpButtons.add(index)
          downButtons.delete(index)
        }
      }
    })
  }

  getJustDownButtons () {
    return justDownButtons
  }

  getDownButtons () {
    return downButtons
  }

  getJustUpButtons () {
    return justUpButtons
  }

  clearJustDownButtons () {
    justDownButtons.clear()
  }

  clearJustUpButtons () {
    justUpButtons.clear()
  }
}
