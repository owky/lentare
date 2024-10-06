<template>
  <v-app>
    <v-main>
      <Player :video="currentVideo" />
      <Control />
      <Auth />
      <VideoList @changeVideo="changeVideo"/>
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
