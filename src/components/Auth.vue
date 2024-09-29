<template>
  <v-btn v-show="userNotFound" @click="auth">Google Authentication</v-btn>
</template>

<script setup>
import { ref } from 'vue'

const userNotFound = !(localStorage.getItem(APP_ID) && JSON.parse(localStorage.getItem(APP_ID)).sub)

function auth() {
  window.location.href = window.location.origin + "/.netlify/functions/oauth"
}
</script>

<style scoped>
</style>