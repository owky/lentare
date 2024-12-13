<template>
  <div>
  <div ref="playerContainer"></div>
  <v-progress-linear v-model="progress" color="blue-grey-darken-2"></v-progress-linear>
  <div class="time-display">{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</div>

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
      x {{ speed.toFixed(2) }}
    </v-col>
    <v-col cols="3" align="center" @click="speedDown">
      <v-icon icon="mdi-chevron-down"></v-icon>
    </v-col>
    <v-col cols="3" align="center" @click="speedUp">
      <v-icon icon="mdi-chevron-up"></v-icon>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12" align="center" class="text-overline pb-0">repeat</v-col>

    <v-col cols="4" align="center">
      <v-icon
        :color="repeatToggle ? 'light-green-accent-4' : ''"
        class="mt-2" @click="toggleRepeat">
        {{ repeatToggle ? 'mdi-repeat' : 'mdi-repeat-off' }}
      </v-icon>
    </v-col>
    <v-col cols="3" align="center">
      <v-text-field
        label="FROM" variant="underlined" density="compact" type="number" readonly
        v-model="displayRepeatFrom" @click="setRepeatFrom">
      </v-text-field>
    </v-col>
    <v-col cols="2" align="center">
      <v-icon icon="mdi-chevron-double-right" class="mt-2"></v-icon>
    </v-col>
    <v-col cols="3" align="center">
      <v-text-field
        label="TO" variant="underlined" density="compact" type="number" readonly
        v-model="displayRepeatTo" @click="setRepeatTo">
     </v-text-field>
    </v-col>
  </v-row>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted, getCurrentInstance } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'

const auth0 = useAuth0()
const { proxy } = getCurrentInstance()
const playerContainer = ref()
let player = null
let playing = ref(false)
let video_id = null
const speed = ref(1.0)
const repeatToggle = ref(false)
const repeatFrom = ref(null)
const repeatTo = ref(null)
const props = defineProps({ video: { type: Object, required: true }})
let currentTime = ref(0.0)
let duration = ref(0.0)
let progress = ref(0)

watch(() => props.video, (newVideo, oldVideo) => {
  video_id = newVideo.id
  playing.value = true
  speed.value = newVideo.speed || 1.0
  repeatFrom.value = newVideo.repeatFrom || null
  repeatTo.value = newVideo.repeatTo || null
  saveData()
  player.loadVideoById(video_id)
  player.setPlaybackRate(speed.value)
})

const displayRepeatFrom = computed(() => {
  return repeatFrom.value ? repeatFrom.value.toFixed() : null
})

const displayRepeatTo = computed(() => {
  return repeatTo.value ? repeatTo.value.toFixed() : null
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
  const data = JSON.parse(localStorage.getItem('lentare'))

  if (data?.id) {
    video_id = data.id
    speed.value = data.speed
    repeatFrom.value = data.repeatFrom
    repeatTo.value = data.repeatTo

    player.cueVideoById(video_id)
    player.setPlaybackRate(speed.value)
  }

  player.getIframe().style.pointerEvents = 'none'

  setInterval(repeater, 500)

  setInterval(() => {
    currentTime.value = player.getCurrentTime()
    duration.value = player.getDuration()
    progress.value = currentTime.value / duration.value * 100
  }, 1000)
}

onMounted(async () => {
  await loadYouTubeIframeAPI();

  window.onYouTubeIframeAPIReady = () => {
    const width = playerContainer.value.clientWidth

    player = new YT.Player(playerContainer.value, {
      videoId: null,
      width: width,
      height: width * 9 / 16,
      playerVars: {
        controls: 0,
        disablekb: 1,
      },
      events: {
        onReady: onPlayerReady,
      },
    })
  }
})

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

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

function speedDown() {
  speed.value >= 0.05 ? speed.value -= 0.05 : speed.value = 0
  player.setPlaybackRate(speed.value)
  saveData()
}

function speedUp() {
  speed.value <= 0.95 ? speed.value += 0.05 : speed.value = 1.0
  player.setPlaybackRate(speed.value)
  saveData()
}

function setRepeatFrom() {
  repeatFrom.value = player.getCurrentTime()
  saveData()
}

function setRepeatTo() {
  repeatTo.value = player.getCurrentTime()
  saveData()
}

function repeater () {
  if (!repeatToggle.value || isNaN(repeatFrom.value) || isNaN(repeatTo.value)) return

  if (player.getCurrentTime() >= repeatTo.value) {
    player.seekTo(repeatFrom.value)
  }
}

function toggleRepeat() {
  repeatToggle.value = !repeatToggle.value
}

function saveData() {
  const data = Object.assign(props.video, {
    id: video_id,
    speed: Math.round(speed.value * 100) / 100,
    repeatFrom: repeatFrom.value,
    repeatTo: repeatTo.value
  })

  localStorage.setItem('lentare', JSON.stringify(data))

  if (auth0.isAuthenticated.value) {
    const api = proxy.appConfig.currentApi
    fetch(api +"?sub="+ auth0.user.value.sub, {
      method: 'PUT',
      body: JSON.stringify({video: data})
    })
  }
}
</script>

<style scoped>
.time-display {
  text-align:right;
  font-size:small;
  background-color: rgba(255,255,255,0.8);
  margin-top: -11px;
  padding-right: 3px;
  position: relative;
  z-index: 100;
}
</style>
