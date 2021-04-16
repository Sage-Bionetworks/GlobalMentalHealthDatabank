import { GA_PROPERTY_ID } from '../types/types'

export const GoogleService = {
  sendPageView,
  sendEvent,
}

function sendPageView() {
  const windowAny: any = window
  const gtag = windowAny.gtag
  if (gtag) {
    gtag('config', GA_PROPERTY_ID, {
      page_location: window.location.href,
      page_path: window.location.pathname,
    })
  }
}

function sendEvent(
  action: string,
  category: string,
  label: string,
  value: string,
) {
  const windowAny: any = window
  const gtag = windowAny.gtag
  if (gtag) {
    gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}
