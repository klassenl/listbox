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
}

export const getFirstSelectedItem = (
  items: (HTMLElement | null)[],
): HTMLElement | null | undefined => {
  return items
    ? items.find((item) => item?.getAttribute('aria-selected') === 'true')
    : null
}
