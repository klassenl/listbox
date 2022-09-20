export const focus = {
  next: (el: HTMLElement) => {
    const nextEl = el.nextElementSibling as HTMLElement
    if (nextEl) {
      nextEl.focus()
    }
  },
  prev: (el: HTMLElement) => {
    const prevEl = el.previousElementSibling as HTMLElement
    if (prevEl) {
      prevEl.focus()
    }
  },
  first: (el: HTMLElement) => {
    const firstSibling = (el.parentElement as HTMLElement).childNodes[0] as HTMLElement
    if (firstSibling) {
      firstSibling.focus()
    }
  },
  last: (el: HTMLElement) => {
    const siblingNodes = (el.parentElement as HTMLElement).childNodes
    const lastSibling = siblingNodes[siblingNodes.length -1] as HTMLElement
    if (lastSibling) {
      lastSibling.focus()
    }
  },
}

export const getFirstSelectedItem = (
  items: (HTMLElement | null)[],
): HTMLElement | null | undefined => {
  return items
    ? items.find((item) => item?.getAttribute('aria-selected') === 'true')
    : null
}
