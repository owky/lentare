<template>
  <v-text-field class="mx-auto" max-width="334"
    :loading="loading"
    :disabled="loading"
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

const videos = ref([])
const loading = ref(false)

let query = ""

function search() {
  loading.value = true

  fetch(url + "?q=" + query)
  .then(result => result.json())
  .then(json => {
    videos.value = json
    loading.value = false
  })
}
</script>

<style scoped>
</style>