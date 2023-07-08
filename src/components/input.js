import GamepadInput from "./gamepadInput"
import KeyboardInput from "./keyboardInput"
import KEYS, { M } from "../globals/keyboard"
import BUTTONS from "../globals/gamepad"
import PLAYER_ACTIONS from "../globals/actions"

const actions = new Set()

export default class Input {
  constructor () {
    this.gamepad = new GamepadInput()
    this.keyboard = new KeyboardInput()
  }

  tick (timeProps) {
    // Clear Actions
    actions.clear()

    if (this.gamepad.pad) {
      this.gamepad.tick(timeProps.deltaTime)
      getActionsFromGamepad(this.gamepad)
    } else {
      getActionsFromKeyboard(this.keyboard)
    }

    // Clear Gamepad
    this.gamepad.clearJustDownButtons()
    this.gamepad.clearJustUpButtons()

    // Clear Keyboard
    this.keyboard.clearJustDownKeys()
    this.keyboard.clearJustUpKeys()
  }

  getActions () {
    return actions
  }
}

function getActionsFromGamepad (gamepad) {
  const justDownButtons = gamepad.getJustDownButtons()
  const downButtons = gamepad.getDownButtons()

  if (justDownButtons.size === 0 && downButtons.size === 0) return

  // Check for pause
  if (justDownButtons.has(BUTTONS.START)) {
    actions.add(PLAYER_ACTIONS.PAUSE)
    return
  }

  // Check for menu
  if (justDownButtons.has(BUTTONS.SELECT)) {
    actions.add(PLAYER_ACTIONS.MENU)
    return
  }

  // Check for attack
  if (justDownButtons.has(BUTTONS.X_SQUARE)) actions.add(PLAYER_ACTIONS.ATTACK_PRIMARY)
  if (justDownButtons.has(BUTTONS.A_X)) actions.add(PLAYER_ACTIONS.ATTACK_SECONDARY)

  // if (!actions.has(PLAYER_ACTIONS.ATTACK_PRIMARY) && !actions.has(PLAYER_ACTIONS.ATTACK_SECONDARY)) {
  //   // Not attacking, so check for movement
  //   if (downButtons.has(BUTTONS.DPAD_LEFT)) actions.add(PLAYER_ACTIONS.MOVE_LEFT)
  //   if (downButtons.has(BUTTONS.DPAD_RIGHT)) actions.add(PLAYER_ACTIONS.MOVE_RIGHT)
  //   if (downButtons.has(BUTTONS.DPAD_UP)) actions.add(PLAYER_ACTIONS.MOVE_UP)
  //   if (downButtons.has(BUTTONS.DPAD_DOWN)) actions.add(PLAYER_ACTIONS.MOVE_DOWN)
  // }

  if (!actions.has(PLAYER_ACTIONS.ATTACK_PRIMARY) && !actions.has(PLAYER_ACTIONS.ATTACK_SECONDARY)) {
    // Not attacking, so check for movement
    const justActions = new Set()
    justDownButtons.forEach(button => {
      const action = actionForButton(button)
      if (action) justActions.add(action)
    })
    const downActions = new Set()
    downButtons.forEach(button => {
      const action = actionForButton(button)
      if (action) downActions.add(action)
    })

    if (justActions.size > 0) {
      if (justActions.has(PLAYER_ACTIONS.MOVE_LEFT)) {
        if (justActions.has(PLAYER_ACTIONS.MOVE_RIGHT)) {
          justActions.delete(PLAYER_ACTIONS.MOVE_LEFT)
          justActions.delete(PLAYER_ACTIONS.MOVE_RIGHT)
        } else {
          downActions.delete(PLAYER_ACTIONS.MOVE_RIGHT)
          actions.add(PLAYER_ACTIONS.MOVE_LEFT)
        }
      }
  
      if (justActions.has(PLAYER_ACTIONS.MOVE_RIGHT)) {
        if (justActions.has(PLAYER_ACTIONS.MOVE_LEFT)) {
          justActions.delete(PLAYER_ACTIONS.MOVE_LEFT)
          justActions.delete(PLAYER_ACTIONS.MOVE_RIGHT)
        } else {
          downActions.delete(PLAYER_ACTIONS.MOVE_LEFT)
          actions.add(PLAYER_ACTIONS.MOVE_RIGHT)
        }
      }
  
      if (justActions.has(PLAYER_ACTIONS.MOVE_UP)) {
        if (justActions.has(PLAYER_ACTIONS.MOVE_DOWN)) {
          justActions.delete(PLAYER_ACTIONS.MOVE_UP)
          justActions.delete(PLAYER_ACTIONS.MOVE_DOWN)
        } else {
          downActions.delete(PLAYER_ACTIONS.MOVE_DOWN)
          actions.add(PLAYER_ACTIONS.MOVE_UP)
        }
      }
  
      if (justActions.has(PLAYER_ACTIONS.MOVE_DOWN)) {
        if (justActions.has(PLAYER_ACTIONS.MOVE_UP)) {
          justActions.delete(PLAYER_ACTIONS.MOVE_UP)
          justActions.delete(PLAYER_ACTIONS.MOVE_DOWN)
        } else {
          downActions.delete(PLAYER_ACTIONS.MOVE_UP)
          actions.add(PLAYER_ACTIONS.MOVE_DOWN)
        }
      }
    }

    if (downButtons.has(BUTTONS.DPAD_LEFT)) actions.add(PLAYER_ACTIONS.MOVE_LEFT)
    if (downButtons.has(BUTTONS.DPAD_RIGHT)) actions.add(PLAYER_ACTIONS.MOVE_RIGHT)
    if (downButtons.has(BUTTONS.DPAD_UP)) actions.add(PLAYER_ACTIONS.MOVE_UP)
    if (downButtons.has(BUTTONS.DPAD_DOWN)) actions.add(PLAYER_ACTIONS.MOVE_DOWN)

    if (actions.has(PLAYER_ACTIONS.MOVE_LEFT) && actions.has(PLAYER_ACTIONS.MOVE_RIGHT)) {
      actions.delete(PLAYER_ACTIONS.MOVE_LEFT)
      actions.delete(PLAYER_ACTIONS.MOVE_RIGHT)
    }

    if (actions.has(PLAYER_ACTIONS.MOVE_UP) && actions.has(PLAYER_ACTIONS.MOVE_DOWN)) {
      actions.delete(PLAYER_ACTIONS.MOVE_UP)
      actions.delete(PLAYER_ACTIONS.MOVE_DOWN)
    }
  }
}

function getActionsFromKeyboard (keyboard) {
  const justDownKeys = keyboard.getJustDownKeys()
  const downKeys = keyboard.getDownKeys()

  if (justDownKeys.size === 0 && downKeys.size === 0) return

  // Check for pause
  if (justDownKeys.has(KEYS.ESCAPE)) {
    actions.add(PLAYER_ACTIONS.PAUSE)
    return
  }

  // Check for menu
  if (justDownKeys.has(KEYS.ENTER)) {
    actions.add(PLAYER_ACTIONS.MENU)
    return
  }

  // Check for attack
  if (justDownKeys.has(KEYS.SPACE)) actions.add(PLAYER_ACTIONS.ATTACK_PRIMARY)
  if (justDownKeys.has(KEYS.SHIFT)) actions.add(PLAYER_ACTIONS.ATTACK_SECONDARY)

  if (!actions.has(PLAYER_ACTIONS.ATTACK_PRIMARY) && !actions.has(PLAYER_ACTIONS.ATTACK_SECONDARY)) {
    // Not attacking, so check for movement
    const justActions = new Set()
    justDownKeys.forEach(key => {
      const action = actionForKey(key)
      if (action) justActions.add(action)
    })
    const downActions = new Set()
    downKeys.forEach(key => {
      const action = actionForKey(key)
      if (action) downActions.add(action)
    })

    if (justActions.size > 0) {
      if (justActions.has(PLAYER_ACTIONS.MOVE_LEFT)) {
        if (justActions.has(PLAYER_ACTIONS.MOVE_RIGHT)) {
          justActions.delete(PLAYER_ACTIONS.MOVE_LEFT)
          justActions.delete(PLAYER_ACTIONS.MOVE_RIGHT)
        } else {
          downActions.delete(PLAYER_ACTIONS.MOVE_RIGHT)
          actions.add(PLAYER_ACTIONS.MOVE_LEFT)
        }
      }
  
      if (justActions.has(PLAYER_ACTIONS.MOVE_RIGHT)) {
        if (justActions.has(PLAYER_ACTIONS.MOVE_LEFT)) {
          justActions.delete(PLAYER_ACTIONS.MOVE_LEFT)
          justActions.delete(PLAYER_ACTIONS.MOVE_RIGHT)
        } else {
          downActions.delete(PLAYER_ACTIONS.MOVE_LEFT)
          actions.add(PLAYER_ACTIONS.MOVE_RIGHT)
        }
      }
  
      if (justActions.has(PLAYER_ACTIONS.MOVE_UP)) {
        if (justActions.has(PLAYER_ACTIONS.MOVE_DOWN)) {
          justActions.delete(PLAYER_ACTIONS.MOVE_UP)
          justActions.delete(PLAYER_ACTIONS.MOVE_DOWN)
        } else {
          downActions.delete(PLAYER_ACTIONS.MOVE_DOWN)
          actions.add(PLAYER_ACTIONS.MOVE_UP)
        }
      }
  
      if (justActions.has(PLAYER_ACTIONS.MOVE_DOWN)) {
        if (justActions.has(PLAYER_ACTIONS.MOVE_UP)) {
          justActions.delete(PLAYER_ACTIONS.MOVE_UP)
          justActions.delete(PLAYER_ACTIONS.MOVE_DOWN)
        } else {
          downActions.delete(PLAYER_ACTIONS.MOVE_UP)
          actions.add(PLAYER_ACTIONS.MOVE_DOWN)
        }
      }
    }

    if (downKeys.has(KEYS.LEFT_ARROW) || downKeys.has(KEYS.A)) actions.add(PLAYER_ACTIONS.MOVE_LEFT)
    if (downKeys.has(KEYS.RIGHT_ARROW) || downKeys.has(KEYS.D)) actions.add(PLAYER_ACTIONS.MOVE_RIGHT)
    if (downKeys.has(KEYS.UP_ARROW) || downKeys.has(KEYS.W)) actions.add(PLAYER_ACTIONS.MOVE_UP)
    if (downKeys.has(KEYS.DOWN_ARROW) || downKeys.has(KEYS.S)) actions.add(PLAYER_ACTIONS.MOVE_DOWN)

    if (actions.has(PLAYER_ACTIONS.MOVE_LEFT) && actions.has(PLAYER_ACTIONS.MOVE_RIGHT)) {
      actions.delete(PLAYER_ACTIONS.MOVE_LEFT)
      actions.delete(PLAYER_ACTIONS.MOVE_RIGHT)
    }

    if (actions.has(PLAYER_ACTIONS.MOVE_UP) && actions.has(PLAYER_ACTIONS.MOVE_DOWN)) {
      actions.delete(PLAYER_ACTIONS.MOVE_UP)
      actions.delete(PLAYER_ACTIONS.MOVE_DOWN)
    }
  }
}

function actionForButton (button) {
  switch (button) {
    case BUTTONS.X_SQUARE: return PLAYER_ACTIONS.ATTACK_PRIMARY
    case BUTTONS.A_X: return PLAYER_ACTIONS.ATTACK_SECONDARY
    case BUTTONS.DPAD_LEFT: return PLAYER_ACTIONS.MOVE_LEFT
    case BUTTONS.DPAD_RIGHT: return PLAYER_ACTIONS.MOVE_RIGHT
    case BUTTONS.DPAD_UP: return PLAYER_ACTIONS.MOVE_UP
    case BUTTONS.DPAD_DOWN: return PLAYER_ACTIONS.MOVE_DOWN
    case BUTTONS.START: return PLAYER_ACTIONS.PAUSE
    case BUTTONS.SELECT: return PLAYER_ACTIONS.MENU
  }
}

function actionForKey (key) {
  switch (key) {
    case KEYS.UP_ARROW:
    case KEYS.W:
      return PLAYER_ACTIONS.MOVE_UP
    case KEYS.DOWN_ARROW:
    case KEYS.S:
      return PLAYER_ACTIONS.MOVE_DOWN
    case KEYS.LEFT_ARROW:
    case KEYS.A:
      return PLAYER_ACTIONS.MOVE_LEFT
    case KEYS.RIGHT_ARROW:
    case KEYS.D:
      return PLAYER_ACTIONS.MOVE_RIGHT
    case KEYS.SPACE: return PLAYER_ACTIONS.ATTACK_PRIMARY
    case KEYS.X: return PLAYER_ACTIONS.ATTACK_SECONDARY
    case KEYS.ESCAPE: return PLAYER_ACTIONS.PAUSE
    case KEYS.MENU: return PLAYER_ACTIONS.MENU
  }
}

export { Input }
