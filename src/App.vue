<!-- We can create a layout -->
<template>
  <div>
    <h1>Hello world</h1>
    
    <!-- more info: router.js -->
    <nav style="display: flex; gap: 1rem;" v-if="!userStore.loadingSession">
      <router-link to="/" v-if="userStore.userData">Home</router-link> |
      <router-link to="/login" v-if="!userStore.userData">Login</router-link> |
      <router-link to="/register" v-if="!userStore.userData">Register</router-link> |
      <button @click="userStore.logoutUser" :disabled="userStore.loadingUser" v-if="userStore.userData">Sign Out</button> 
    </nav>

    <div v-else>
      loading user...
    </div>
    
    <router-view></router-view>
  </div>
</template>

<script setup>
  import { useUserStore } from './stores/user';
  const userStore = useUserStore()

</script>