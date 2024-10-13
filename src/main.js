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
    domain: "dev-nvudkqxwg4at35s3.us.auth0.com",
    clientId: "b2v59TrAefs4eV1ZyBj0TF0U2cEPRkUl",
    authorizationParams: {
      redirect_uri: window.location.origin
    }
  })
)

app.config.globalProperties.appConfig = {
  searchUrl: window.location.origin + "/.netlify/functions/search"
}

app.mount('#app')
