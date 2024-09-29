<template>
  <v-text-field class="mx-auto" max-width="334"
    :loading="loading"
    append-inner-icon="mdi-magnify"
    label="Search Youtube"
    v-model="query"
    @click:append-inner="search"
    @keyup.enter="search"
  ></v-text-field>

  <v-card class="mx-auto mt-2" max-width="334" v-for="video in videos">
    <v-img :src="video.thumbnail" class="align-end"
           gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200px" cover>
      <v-card-title class="text-white" v-text="video.title"></v-card-title>
    </v-img>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="medium-emphasis"
        icon="mdi-heart"
        size="small"
      ></v-btn>

      <v-btn
        color="medium-emphasis"
        icon="mdi-bookmark"
        size="small"
      ></v-btn>

      <v-btn
        color="medium-emphasis"
        icon="mdi-share-variant"
        size="small"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue';

const { proxy } = getCurrentInstance()
const url = proxy.appConfig.searchUrl

const loading = ref(false)
const loaded = ref(false)
let query = ""

const videos = ref([])
const searchResult = [
  {
    thumbnail: 'https://i.ytimg.com/vi/6670kqCdb8E/hqdefault.jpg',
    title: '【Official Live Video】MyGO!!!!!「迷星叫」（「BanG Dream! Special☆LIVE Girls Band Party! 2020→2022」より）',
    subtitle: '',
  },
  {
    thumbnail: 'https://i.ytimg.com/vi/rBL930dHVkY/hqdefault.jpg',
    title: 'Returns',
    subtitle: '',
  },
  {
    thumbnail: 'https://i.ytimg.com/vi/_CraJ8654Bg/hqdefault.jpg',
    title: '「壱雫空」（アニメ「BanG Dream! It&#39;s MyGO!!!!!」オープニング映像）',
    subtitle: '',
  },
]

function search() {
  loading.value = true
  console.log(url + "?=" + query)
  console.log(videos.value)
  videos.value = searchResult
  loading.value = false
  loaded.value = true
}
</script>

<style scoped>
.title-container {
  max-width: 70%; /* タイトル部分の幅を調整 */
}

.image-container {
  margin-left: auto; /* 画像を右寄せ */
}
</style>