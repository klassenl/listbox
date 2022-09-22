import { EventHandler, useRef, useEffect, ForwardedRef } from 'react'

const useOutsideClick = ({
  clickCallback,
  trigger
}: {
  clickCallback: () => void
  trigger: HTMLElement | ForwardedRef<HTMLElement>
}) => {
  const ref = useRef<HTMLElement>()
  useEffect(() => {
    const handleClick: EventHandler<any> = (event) => {
      const isTrigger =
        //@ts-ignore
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref])

  return ref
}

export default useOutsideClick
