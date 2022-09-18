import { EventHandler, RefObject, useRef, useEffect} from 'react'
const useOutsideClick = (
  callback: () => void,
  trigger: RefObject<HTMLElement>
) => {
  const ref = useRef<HTMLElement>()

  useEffect(() => {
    const handleClick: EventHandler<any> = (event) => {
      if (trigger?.current && trigger?.current.contains(event.target as Node)) {
        return
      }
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback()
      }
    }
    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [ref])

  return ref
}

export default useOutsideClick
