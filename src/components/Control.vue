<template>
  <v-row>
    <v-col cols="12" align="center" class="text-overline pb-0">control</v-col>

    <v-col cols="3" align="center">
      <v-icon icon="mdi-skip-previous"></v-icon>
    </v-col>
    <v-col cols="3" align="center">
      <v-icon icon="mdi-rewind-10"></v-icon>
    </v-col>
    <v-col cols="3" align="center">
      <v-icon icon="mdi-play"></v-icon>
    </v-col>
    <v-col cols="3" align="center">
      <v-icon icon="mdi-fast-forward-10"></v-icon>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12" align="center" class="text-overline pb-0">speed</v-col>

    <v-col cols="6" align="center">
      x 1.00
    </v-col>
    <v-col cols="3" align="center">
      <v-icon icon="mdi-chevron-down"></v-icon>
    </v-col>
    <v-col cols="3" align="center">
      <v-icon icon="mdi-chevron-up"></v-icon>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12" align="center" class="text-overline pb-0">repeat</v-col>

    <v-col cols="4" align="center">
      <v-icon icon="mdi-repeat" class="mt-2"></v-icon>
    </v-col>
    <v-col cols="3" align="center">
      <v-text-field label="FROM" variant="underlined" density="compact"></v-text-field>
    </v-col>
    <v-col cols="2" align="center">
      <v-icon icon="mdi-chevron-double-right" class="mt-2"></v-icon>
    </v-col>
    <v-col cols="3" align="center">
      <v-text-field label="TO" variant="underlined" density="compact"></v-text-field>
    </v-col>
  </v-row>
</template>

<script setup>
import { ref } from 'vue'

</script>

<style scoped>
</style>