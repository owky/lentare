<template>
  <v-btn @click="auth">Google Authentication</v-btn>
</template>

<script setup>
function auth() {
  window.location.href = window.location.origin + "/.netlify/functions/oauth"
}
</script>

<style scoped>
</style>