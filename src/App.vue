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

    </v-navigation-drawer>

    <v-main>
      <v-container>
        <YoutubeControl v-show="playerVisible" :video="currentVideo" />
        <VideoList v-show="searchVisible" @changeVideo="changeVideo"/>
        <History v-show="historyVisible" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'

const { proxy } = getCurrentInstance()
const { user } = useAuth0()
const drawer = ref(false)
const currentVideo = ref({})
const playerVisible = ref(true)
const searchVisible = ref(false)
const historyVisible = ref(false)

const changeVideo = (video) => {
  currentVideo.value = video
  playerVisible.value = true
  searchVisible.value = false
  fetch(proxy.appConfig.historyApi, {
    method: 'POST',
    body: JSON.stringify({sub: user.value.sub, video: video})
  })
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
}
</script>
