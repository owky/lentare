<template>
  <div>
    <div ref="playerContainer"></div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

const playerContainer = ref()
let player = null

const props = defineProps({
  video: {
    type: String,
    required: true,
  }
});

const loadYouTubeIframeAPI = () => {
  return new Promise((resolve) => {
    const scriptTag = document.createElement('script')
    scriptTag.src = 'https://www.youtube.com/iframe_api'
    scriptTag.onload = resolve
    document.body.appendChild(scriptTag)
  })
}

watch(() => props.video, (newVideo, oldVideo) => {
  player.loadVideoById(newVideo)
});

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

const onPlayerReady = () => {
  console.log('YouTube Player is ready');
}
</script>

<style scoped>
</style>
