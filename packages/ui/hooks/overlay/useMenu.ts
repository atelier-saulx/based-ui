import { Menu } from '../../Components/Overlay/Menu'
import useOverlay from './useOverlay'
import { OnClose } from '../../Components/Overlay'
import { GenericOverlay } from '../../Components/Overlay/GenericOverlay'
import { PositionProps } from './useOverlayPosition'
import { ComponentType, PropsWithChildren, SyntheticEvent } from 'react'

export default function useMenu<P>(
  component: ComponentType<P>,
  props?: PropsWithChildren<P & PositionProps>,
  handler?: (selection: Event | any) => OnClose | undefined,
  Overlay: ComponentType = GenericOverlay
): (
  e: Event | SyntheticEvent,
  selectionProps?: PropsWithChildren<any>
) => void {
  return useOverlay<P>(component, props, handler, Menu)
}
