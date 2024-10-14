<template>
  <v-app>
    <v-app-bar flat density="compact">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>lentare</v-app-bar-title>

      <template v-slot:append>
        <v-btn icon="mdi-magnify" @click="showSearch"></v-btn>
      </template>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer">
      <v-list>
        <v-list-item v-if="!isAuthenticated">
          <template v-slot:prepend>
            <v-icon icon="mdi-login"></v-icon>
          </template>
          <v-btn density="compact" variant="outlined" color="blue-grey" @click="loginWithRedirect">Login</v-btn>
        </v-list-item>
        <v-list-item v-if="isAuthenticated"
          prepend-avatar="https://lh3.googleusercontent.com/a/ACg8ocIMk2u7SQPYzTOokKr0e9e8_IbaxEFWA6ZoH1tRnAosZuV7TVk=s96-c"
          :title="user.nickname"
        ></v-list-item>
        <v-divider></v-divider>
        <v-list-item title="Player" @click="showPlayer">
          <template v-slot:prepend>
            <v-icon icon="mdi-play-box-outline"></v-icon>
          </template>
        </v-list-item>
        <v-list-item title="Search" @click="showSearch">
          <template v-slot:prepend>
            <v-icon icon="mdi-magnify"></v-icon>
          </template>
        </v-list-item>
        <v-list-item title="History" @click="showHistory">
          <template v-slot:prepend>
            <v-icon icon="mdi-history"></v-icon>
          </template>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2" v-if="isAuthenticated">
          <v-btn block color="blue-grey-darken-2" @click="logout">
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <YoutubeControl v-show="playerVisible" :video="currentVideo" />
        <VideoList v-show="searchVisible" @changeVideo="changeVideo"/>
        <History v-show="historyVisible" :history="history"/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'

const { proxy } = getCurrentInstance()
const { loginWithRedirect, user, isAuthenticated } = useAuth0()
const auth0 = useAuth0()
const drawer = ref(false)
const currentVideo = ref({})
const history = ref([])
const playerVisible = ref(true)
const searchVisible = ref(false)
const historyVisible = ref(false)

const logout = () => {
  auth0.logout({
    logoutParams: {
      returnTo: window.location.origin
    }
  })
}

const changeVideo = (video) => {
  currentVideo.value = video
  playerVisible.value = true
  searchVisible.value = false

  if (isAuthenticated.value) {
    fetch(proxy.appConfig.historyApi + '?sub=' + user.value.sub, {
      method: 'POST',
      body: JSON.stringify({video: video})
    })
  }
}

const showPlayer = () => {
  playerVisible.value = true
  searchVisible.value = false
  historyVisible.value = false
  drawer.value = false
}

const showSearch = () => {
  playerVisible.value = false
  searchVisible.value = true
  historyVisible.value = false
  drawer.value = false
}

const showHistory = () => {
  playerVisible.value = false
  searchVisible.value = false
  historyVisible.value = true
  drawer.value = false

  if (isAuthenticated.value) {
    fetch(proxy.appConfig.historyApi + "?sub=" + user.value.sub)
    .then(result => result.json())
    .then(json => {
      history.value = json.history
    })
  }
}
</script>
