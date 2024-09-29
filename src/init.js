const APP_ID = "lentare"

const sub = new URLSearchParams(window.location.search).get('sub')

if (!!sub) {
  localStorage.setItem(APP_ID, JSON.stringify({sub: sub}))
  window.history.replaceState({}, '', '/')
}
