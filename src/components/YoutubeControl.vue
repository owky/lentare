<template>
  <div ref="playerContainer"></div>

  <v-row>
    <v-col cols="12" align="center" class="text-overline pb-0">control</v-col>

    <v-col cols="3" align="center">
      <v-icon icon="mdi-skip-previous" @click="backToTop"></v-icon>
    </v-col>
    <v-col cols="3" align="center">
      <v-icon icon="mdi-rewind-10" @click="backward"></v-icon>
    </v-col>
    <v-col cols="3" align="center">
      <v-icon @click="playAndPause">
        {{ playing ? "mdi-pause" : "mdi-play" }}
      </v-icon>
    </v-col>
    <v-col cols="3" align="center">
      <v-icon icon="mdi-fast-forward-10" @click="forward"></v-icon>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12" align="center" class="text-overline pb-0">speed</v-col>

    <v-col cols="6" align="center">
      x 1.00
    </v-col>
    <v-col cols="3" align="center">
      <v-icon icon="mdi-chevron-down"></v-icon>
    </v-col>
    <v-col cols="3" align="center">
      <v-icon icon="mdi-chevron-up"></v-icon>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12" align="center" class="text-overline pb-0">repeat</v-col>

    <v-col cols="4" align="center">
      <v-icon icon="mdi-repeat" class="mt-2"></v-icon>
    </v-col>
    <v-col cols="3" align="center">
      <v-text-field label="FROM" variant="underlined" density="compact"></v-text-field>
    </v-col>
    <v-col cols="2" align="center">
      <v-icon icon="mdi-chevron-double-right" class="mt-2"></v-icon>
    </v-col>
    <v-col cols="3" align="center">
      <v-text-field label="TO" variant="underlined" density="compact"></v-text-field>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

const playerContainer = ref()
let player = null
let playing = ref(false)
const props = defineProps({ video: { type: String, required: true }})

watch(() => props.video, (newVideo, oldVideo) => {
  player.loadVideoById(newVideo)
  playing.value = true
})

const loadYouTubeIframeAPI = () => {
  return new Promise((resolve) => {
    const scriptTag = document.createElement('script')
    scriptTag.src = 'https://www.youtube.com/iframe_api'
    scriptTag.onload = resolve
    document.body.appendChild(scriptTag)
  })
}

const onPlayerReady = () => {
  console.log('YouTube Player is ready');
}

onMounted(async () => {
  await loadYouTubeIframeAPI();

  window.onYouTubeIframeAPIReady = () => {
    const width = playerContainer.value.clientWidth

    player = new YT.Player(playerContainer.value, {
      videoId: null,
      width: width,
      height: width * 9 / 16,
      events: {
        onReady: onPlayerReady,
      },
    })
  }
})

function playAndPause() {
  const state = player.getPlayerState()
  if (state == 1) {
    player.pauseVideo()
    playing.value = false
  } else {
    player.playVideo()
    playing.value = true
  }
}

function backward() {
  player.seekTo(player.getCurrentTime() - 10)
}

function forward() {
  player.seekTo(player.getCurrentTime() + 10)
}

function backToTop() {
  player.seekTo(0)
}
</script>

<style scoped>
</style>