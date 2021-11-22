import { resetCssCounter } from '.'
import { noop } from './misc/utils'

const useResetHooksLogic = (): void => {
  resetCssCounter()
}

const useResetHooks = typeof window !== 'undefined' ? useResetHooksLogic : noop

export { useResetHooks }
