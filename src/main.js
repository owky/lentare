/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

const app = createApp(App)

registerPlugins(app)

app.config.globalProperties.appConfig = {
  searchUrl: window.location.origin + "/.netlify/functions/search"
}

app.mount('#app')
