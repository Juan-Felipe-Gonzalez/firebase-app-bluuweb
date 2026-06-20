<!-- We can create a layout -->
<template>
  <div>
    <h1>Hello world</h1>
    
    <nav style="display: flex; gap: 1rem;">
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/register">Register</router-link> |
      <button @click="userStore.logoutUser" :disabled="userStore.loadingUser">Sign Out</button> 
    </nav>
    
    <router-view></router-view>
  </div>
</template>

<script setup>
  import { useUserStore } from './stores/user';
  const userStore = useUserStore()
</script>