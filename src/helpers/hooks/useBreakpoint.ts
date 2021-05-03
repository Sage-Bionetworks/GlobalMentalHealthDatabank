import { useState, useEffect } from 'react'
import throttle from 'lodash/throttle'

const breakpoints = {
  xs: 0,
  sm: 320,
  md: 768,
  lg: 1024,
  xl: 1280,
}

const getBreakpoint = (width: number) => {
  if (width >= breakpoints.xs && width < breakpoints.sm) {
    return breakpoints.xs
  }
  if (width >= breakpoints.sm && width < breakpoints.md) {
    return breakpoints.sm
  }
  if (width >= breakpoints.md && width < breakpoints.lg) {
    return breakpoints.md
  }
  if (width >= breakpoints.lg && width < breakpoints.xl) {
    return breakpoints.lg
  }
  return breakpoints.xl
}

const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState(() =>
    getBreakpoint(window.innerWidth),
  )

  useEffect(() => {
    const calcInnerWidth = throttle(() => {
      return setBreakpoint(getBreakpoint(window.innerWidth))
    }, 200)
    window.addEventListener('resize', calcInnerWidth)
    return () => window.removeEventListener('resize', calcInnerWidth)
  }, [])

  return breakpoint
}
export default useBreakpoint
