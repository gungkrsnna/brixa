// Same-page section anchors (navbar, Hero's CTAs, footer, the promo banner,
// etc.) are plain <a href="#id"> for semantics/SEO. But the browser's own
// "scroll to fragment" navigation races each section's Framer Motion
// useScroll/whileInView tracking and can leave it stuck at its initial,
// invisible state — repro was clicking straight from Hero to "Lihat
// Portofolio" and the project cards never fading in, even though manual
// scrolling or a JS-driven scrollIntoView() to the same element both work
// fine. Intercepting the click and driving the same scroll ourselves avoids
// whichever part of the native fragment-navigation path causes that.
//
// Cross-page hrefs (a different pathname, e.g. a detail page linking back
// to "/#portfolio") are left untouched so React Router/the browser can
// perform the actual navigation.
export function handleSectionLinkClick(event, href) {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return
  }

  const url = new URL(href, window.location.origin)
  if (url.pathname !== window.location.pathname) return

  const target = url.hash ? document.getElementById(url.hash.slice(1)) : null
  if (!target) return

  event.preventDefault()
  target.scrollIntoView({ behavior: 'smooth' })
  window.history.replaceState(null, '', url.hash)
}
