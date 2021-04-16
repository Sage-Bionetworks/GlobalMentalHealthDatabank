export const GoogleService = {
  sendPageView,
  sendEvent,
}

function sendPageView() {
  const windowAny: any = window
  const ga = windowAny.ga
  if (ga) {
    ga('set', 'page', window.location.pathname + window.location.search)
    ga('send', 'pageview')
  }
}

function sendEvent(
  action: string,
  category: string,
  label: string,
  value: number | boolean,
) {
  const windowAny: any = window
  const ga = windowAny.ga
  if (value === true || value === false) {
    value = value === true ? 1 : 0
  }
  if (ga) {
    ga('send', {
      hitType: 'event',
      eventAction: action,
      eventCategory: category,
      eventLabel: label,
      eventValue: value,
    })
  }
}
