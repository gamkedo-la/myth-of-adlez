import { AnimationMixer, SkeletonHelper } from "three"

export default class AnimationController {
  constructor (model, animations, baseActions, initialAction) {
    this.model = model
    this.animations = animations
    this.baseActions = baseActions
    this.currentBaseAction = initialAction

    this.skeleton = new SkeletonHelper(model)
    this.skeleton.visible = false
    this.allActions = []
    this.animationMixer = new AnimationMixer(model)

    for (const clip of animations) {
      const action = this.animationMixer.clipAction(clip)
      activateAction(this, action)
      this.baseActions[action._clip.name].action = action
      this.allActions.push(action)
    }
  }

  tick (delta) {
    for (const action of this.allActions) {
      const clip = action.getClip()
      const settings = this.baseActions[clip.name]
      settings.weight = action.getEffectiveWeight()
    }

    this.animationMixer.update(delta)
  }

  newAction (actionName, duration = 0.5) {
    const action = this.baseActions[actionName].action
    if (action !== this.currentBaseAction) {
      prepareCrossFade(this, this.currentBaseAction.action, action, duration)
      this.currentBaseAction = this.baseActions[actionName]
    }
  }
}

function activateAction (context, action) {
  const clip = action.getClip()
  const settings = context.baseActions[clip.name]
  setWeight(action, settings.weight)
  action.play()
}

function setWeight(action, weight) {
  action.enabled = true
  action.setEffectiveTimeScale(1)
  action.setEffectiveWeight(weight)
}

function prepareCrossFade (context, startAction, endAction, duration) {
  if (context.currentBaseAction === context.baseActions.idle || !startAction || !endAction || endAction === context.baseActions.idle.action) {
    executeCrossFade(startAction, endAction, duration)
  } else {
    synchronizeCrossFade(context, startAction, endAction, duration)
  }
}

function synchronizeCrossFade (context, startAction, endAction, duration) {
  context.animationMixer.addEventListener('loop', onLoopFinished)
  function onLoopFinished (event) {
    if (event.action === startAction) {
      context.animationMixer.removeEventListener('loop', onLoopFinished)
      executeCrossFade(startAction, endAction, duration)
    }
  }
}

function executeCrossFade (startAction, endAction, duration) {
  if (endAction) {
    setWeight(endAction, 1)
    endAction.time = 0
    if (startAction) {
      startAction.crossFadeTo(endAction, duration, true)
    } else {
      endAction.fadeIn(duration)
    }
  } else {
    startAction.fadeOut(duration)
  }
}