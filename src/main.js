/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import { createAuth0 } from '@auth0/auth0-vue'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

const app = createApp(App)

registerPlugins(app)

app.use(
  createAuth0({
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
    authorizationParams: {
      redirect_uri: window.location.origin
    }
  })
)

app.config.globalProperties.appConfig = {
  searchUrl: window.location.origin + "/.netlify/functions/search",
  historyApi: window.location.origin + "/.netlify/functions/history"
}

app.mount('#app')
