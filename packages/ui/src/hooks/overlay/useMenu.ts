import { Menu } from '../../Components/Overlay/Menu'
import useOverlay from './useOverlay'
import { OnClose } from '../../Components/Overlay'
import { PositionProps } from './useOverlayPosition'
import { Data } from '../../types'
import { ComponentType, PropsWithChildren, SyntheticEvent } from 'react'

export default function useMenu<P = PropsWithChildren<{ data: Data }>>(
  component: ComponentType<P>,
  props?: PropsWithChildren<P & PositionProps & { data: Data }>,
  handler?: (selection: Event | any) => OnClose | undefined
): (
  e: Event | SyntheticEvent,
  selectionProps?: PropsWithChildren<any & { data?: Data }>
) => void {
  return useOverlay<P>(component, props, handler, Menu)
}
