import { useCallback, EventHandler, SyntheticEvent } from 'react'

export type ContextualMenuEvent = {
  onClick: EventHandler<SyntheticEvent>
  onContextMenu: EventHandler<SyntheticEvent>
}

const useContextualMenu = (fn: EventHandler<SyntheticEvent>) => {
  const eventHandler = useCallback((event) => {
    if (event.type === 'contextmenu') {
      event.preventDefault()

      // make this cleaner
      // special value to override using current target in overlay
      event.currentTarget.rect = {
        x: event.pageX,
        y: event.pageY,
        width: 0,
        height: 0,
      }

      fn(event)
    }
  }, [])

  return {
    onClick: eventHandler,
    onContextMenu: eventHandler,
  }
}

export default useContextualMenu
