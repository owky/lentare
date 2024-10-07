<template>
  <v-app>
    <v-main>
      <v-container>
        <YoutubeControl :video="currentVideo" />
        <Control />
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
