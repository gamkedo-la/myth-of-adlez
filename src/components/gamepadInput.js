import BUTTONS, { LEFT_STICK_X, LEFT_STICK_Y, RIGHT_STICK_X, RIGHT_STICK_Y } from "../globals/gamepad"

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

  tick (timeProps) {
    this.pad = navigator.getGamepads()[0]
    if (!this.pad) return

    this.pad.buttons.forEach((button, index) => {
      if (button.pressed) {
        if (index === 14) {
          console.log('left pressed')
        }
        if (!downButtons.has(index)) {
          justDownButtons.add(index)
          downButtons.add(index)
        }
      } else {
        if (index === 14) {
          console.log('left released')
        }
        if (downButtons.has(index)) {
          justUpButtons.add(index)
          downButtons.delete(index)
        }
      }
    })

    this.pad.axes.forEach((axis, index) => {
      if (index === LEFT_STICK_X) {
        if (axis > 0.5) {
          if (!downButtons.has(BUTTONS.DPAD_RIGHT)) {
            justDownButtons.add(BUTTONS.DPAD_RIGHT)
            downButtons.add(BUTTONS.DPAD_RIGHT)
          }
        } else if (axis < -0.5) {
          if (!downButtons.has(BUTTONS.DPAD_LEFT)) {
            justDownButtons.add(BUTTONS.DPAD_LEFT)
            downButtons.add(BUTTONS.DPAD_LEFT)
          }
        }
      }
      
      if (index === LEFT_STICK_Y) {
        if (axis > 0.5) {
          if (!downButtons.has(BUTTONS.DPAD_DOWN)) {
            justDownButtons.add(BUTTONS.DPAD_DOWN)
            downButtons.add(BUTTONS.DPAD_DOWN)
          }
        } else if (axis < -0.5) {
          if (!downButtons.has(BUTTONS.DPAD_UP)) {
            justDownButtons.add(BUTTONS.DPAD_UP)
            downButtons.add(BUTTONS.DPAD_UP)
          }
        }
      }

      if (index === RIGHT_STICK_X) {
        // Right Stick doesn't do anything yet
      }

      if (index === RIGHT_STICK_Y) {
        // Right Stick doesn't do anything yet
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
