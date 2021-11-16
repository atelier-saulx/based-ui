const animateScroll = (animation, element, scroller, x, y) => {
  const rect = scroller.getBoundingClientRect()

  const shouldAnimate =
    y > rect.y &&
    y < rect.height + rect.y &&
    x > rect.x &&
    x < rect.width + rect.x

  if (!shouldAnimate) {
    return false
  }

  const hasVerticalScrollbar = scroller.scrollHeight > rect.height
  const overflowY =
    hasVerticalScrollbar && global.getComputedStyle(scroller)['overflow-y']

  const shouldUpdate =
    hasVerticalScrollbar && (overflowY === 'scroll' || overflowY === 'auto')

  if (!shouldUpdate) {
    return false
  }

  if (!element.reference) {
    element.reference = scroller
  }

  if (animation.elem && animation.elem !== scroller) {
    delete animation.elem
    animation.amount = 0
    animation.frames = 0
  }

  const scrollArea = Math.min(Math.max(40, 0.1 * rect.height), 125)
  const ratio = 40 / scrollArea

  if (y > rect.y + rect.height - scrollArea) {
    const delta = rect.y + rect.height - y
    animation.amount = (scrollArea - delta) * ratio
    animation.elem = scroller
    animation.start()
  } else if (y < rect.y + scrollArea) {
    const delta = y - (rect.y + scrollArea)
    animation.elem = scroller
    animation.amount = delta * ratio
    animation.start()
  } else if (animation.elem) {
    delete animation.elem
    animation.amount = 0
    animation.frames = 0
    animation.stop()
  } else {
    animation.stop()
  }

  return true
}

const dragScroll = (target) => {
  const animation: {
    loop?: any
    animating?: boolean
    frames?: number
    elem?: Element
    amount?: number
    start?: Function
    stop?: Function
  } = {
    animating: false,
    loop: false,
  }

  const dragScrollers = document.querySelectorAll('[data-dragscroll="true"]')

  const nextFrame = () => {
    animation.loop = global.requestAnimationFrame(() => {
      if (animation.elem) {
        if (animation.frames > 20) {
          animation.frames += 0.03
        } else {
          animation.frames += 1
        }
        if (animation.frames > 100) {
          animation.frames = 100
        }
        animation.elem.scrollTop +=
          animation.amount *
          (animation.frames * animation.frames * 0.002 + 0.05)
      }

      nextFrame()
    })
  }

  animation.start = () => {
    if (!animation.animating) {
      animation.animating = true
      nextFrame()
    }
  }

  animation.stop = () => {
    animation.animating = false
    global.cancelAnimationFrame(animation.loop)
  }

  const dragListener = (event) => {
    const element = target

    let refence = element.reference || element

    const y = event.pageY
    const x = event.pageX

    for (const scroller of dragScrollers) {
      if (animateScroll(animation, element, scroller, x, y)) {
        return
      }
    }

    while (refence && refence.getBoundingClientRect) {
      if (animateScroll(animation, element, refence, x, y)) {
        return
      }

      refence = refence.parentNode
    }

    animation.stop()
  }

  document.body.addEventListener('drag', dragListener)

  return () => {
    animation.stop()
    document.body.removeEventListener('drag', dragListener)
  }
}

export default dragScroll
