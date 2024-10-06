<template>
  <v-app>
    <v-main>
      <v-container>
        <Player :video="currentVideo" />
        <Control />
        <Auth />
        <VideoList @changeVideo="changeVideo"/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'

const currentVideo = ref('')

const changeVideo = (videoId) => {
  currentVideo.value = videoId
}
</script>
