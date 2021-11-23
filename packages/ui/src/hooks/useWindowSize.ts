import { useEffect, useState } from 'react'

function useWindowSize(): {
  width: number
  height: number
} {
  if (typeof window === 'undefined') {
    return { width: 0, height: 0 }
  }

  const [position, update] = useState({
    width: window.innerWidth ?? 0,
    height: window.innerHeight ?? 0,
  })

  useEffect(() => {
    const handler = () => {
      update({
        width: window.innerWidth ?? 0,
        height: window.innerHeight ?? 0,
      })
    }

    window.addEventListener('resize', handler)

    return () => {
      window.removeEventListener('resize', handler)
    }
  }, [])

  return position
}

export { useWindowSize }
