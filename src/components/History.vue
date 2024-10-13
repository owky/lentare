<template>
  <div>
    <v-list>
      <v-list-item
        :prepend-avatar="history.thumbnail"
        :title="history.title"
        :subtitle="history.channel"
      ></v-list-item>
    </v-list>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const history = ref({})

onMounted(async () => {
    history.value = JSON.parse(localStorage.getItem('lentare'))
})
</script>