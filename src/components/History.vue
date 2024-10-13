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
import { useAuth0 } from '@auth0/auth0-vue'

const history = ref({})
const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0()

onMounted(async () => {
  history.value = JSON.parse(localStorage.getItem('lentare'))
})

const login = () => {
  loginWithRedirect()
}
</script>