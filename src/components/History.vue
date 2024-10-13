<template>
  <div>
    <div class="pa-2" v-if="!isAuthenticated">
      <v-btn block variant="outlined" color="blue-grey" @click="loginWithRedirect">
        Login
      </v-btn>
    </div>
    <v-list v-if="isAuthenticated" v-for="h in history">
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