<template>
  <div>
    login? : {{ isAuthenticated }}<br/>
    <div v-if="isAuthenticated">
      {{ user.nickname }} is logged in.
      <button @click="logout">Log out</button>
    </div>
    <div v-else>
      <button @click="login">Log in</button>
    </div>

    <v-list v-for="h in history">
      <v-list-item
        :prepend-avatar="h.thumbnail"
        :title="h.title"
        :subtitle="h.channel"
      ></v-list-item>
    </v-list>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'

const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0()
const props = defineProps({ history: { type: Array, required: true }})

const login = () => {
  loginWithRedirect()
}
</script>