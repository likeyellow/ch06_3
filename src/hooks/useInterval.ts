import {useEffect} from 'react'

export const useInterval = (callback: () => void, duration: number = 100) => {
  useEffect(() => {
    const id = setInterval(callback, duration)
    return () => clearInterval(id)
  }, [callback, duration])
}
