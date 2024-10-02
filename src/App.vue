<template>
  <v-app>
    <v-main>
      <Player :video="currentVideo" />
      <Auth />
      <VideoList @changeVideo="changeVideo"/>
      <HelloWorld />
    </v-main>

    <AppFooter />
  </v-app>
</template>

<script setup>
import { ref } from 'vue'

const currentVideo = ref('')

const changeVideo = (videoId) => {
  currentVideo.value = videoId
}
</script>
