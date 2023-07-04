import KEYS from "../globals/keyboard"

const justDownKeys = new Set()
const downKeys = new Set()
const justUpKeys = new Set()

export default class KeyboardInput {
  constructor () {
    this.keys = KEYS

    window.addEventListener('keydown', (e) => {
      if (downKeys.has(e.key)) return
      justDownKeys.add(e.key)
      downKeys.add(e.key)
    })

    window.addEventListener('keyup', (e) => {
      if (!downKeys.has(e.key)) return
      justUpKeys.add(e.key)
      downKeys.delete(e.key)
    })
  }

  isDown (key) {
    return downKeys.has(key)
  }

  isJustDown (key) {
    return justDownKeys.has(key)
  }

  isJustUp (key) {
    return justUpKeys.has(key)
  }

  getJustDownKeys () {
    return justDownKeys
  }

  getDownKeys () {
    return downKeys
  }

  getJustUpKeys () {
    return justUpKeys
  }

  clearJustDownKeys () {
    justDownKeys.clear()
  }

  clearJustUpKeys () {
    justUpKeys.clear()
  }
}

export { KeyboardInput }