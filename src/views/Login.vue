<template>
  <div>
    <h1>Home </h1>
    <p>{{ textUpperCase }}</p>
  </div>
</template>

<script setup>
  import { computed } from "vue";
  import {useUserStore} from "../stores/user"

  const userStore = useUserStore()
  const textUpperCase = computed(() => userStore.userData.toUpperCase())
</script>