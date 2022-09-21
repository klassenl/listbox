import { EventHandler, RefObject, useRef, useEffect } from 'react'

const useOutsideClick = ({
  clickCallback,
  trigger
}: {
  clickCallback: () => void
  trigger: RefObject<HTMLElement>
}) => {
  const ref = useRef<HTMLElement>()
  useEffect(() => {
    const handleClick: EventHandler<any> = (event) => {
      const isTrigger =
        Boolean(trigger?.current) && trigger?.current?.contains(event.target)
      const isContent =
        Boolean(ref?.current) && ref?.current?.contains(event.target)

      if (isTrigger || isContent) {
        return
      }
      clickCallback()
    }
    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [ref])

  return ref
}

export default useOutsideClick
