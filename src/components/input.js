import GamepadInput from "./gamepadInput"
import KeyboardInput from "./keyboardInput"
import KEYS from "../globals/keyboard"
import BUTTONS from "../globals/gamepad"

export default class Input {
  constructor () {
    this.gamepad = new GamepadInput()
    this.keyboard = new KeyboardInput()
  }

  tick (deltaTime) {
    if (this.gamepad.pad) {
      this.gamepad.tick(deltaTime)
      
    } else {

    }

    // Clear Gamepad
    this.gamepad.clearJustDownButtons()
    this.gamepad.clearJustUpButtons()

    // Clear Keyboard
    this.keyboard.clearJustDownKeys()
    this.keyboard.clearJustUpKeys()
  }
}

function actionForButton (button) {
  switch (button) {
    case BUTTONS.X_SQUARE:
      // Attack Primary
      break
    case BUTTONS.A_X:
      // Attack Secondary
      break
    case BUTTONS.DPAD_LEFT:
      break
    case BUTTONS.DPAD_RIGHT:
      break
    case BUTTONS.DPAD_UP:
      break
    case BUTTONS.DPAD_DOWN:
      break
  }
}

function actionForKey (key) {
  switch (key) {
    case KEYS.UP:
    case KEYS.W:
      break
    case KEYS.DOWN:
    case KEYS.S:
      break
    case KEYS.LEFT:
    case KEYS.A:
      break
    case KEYS.RIGHT:
    case KEYS.D:
      break
    case KEYS.SPACE:
      // Attack Primary
      break
    case KEYS.X:
      // Attack Secondary
      break
  }
}

export { Input }
