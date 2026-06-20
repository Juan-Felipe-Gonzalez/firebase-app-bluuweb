<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="handleSubmit" >
      <legend>Sing up </legend>
      <input type="email" placeholder="email" v-model.trim="email">
      <input type="password" placeholder="password" v-model.trim="password">
      <button type="submit" :disabled="userStore.loadingUser">Create user</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '../stores/user';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'vue-router';

  const email = ref("jfelipeg05@gmail.com")
  const password = ref("123412")

  const userStore = useUserStore()
  const router= useRouter()

  const handleSubmit = async () => { 

    if(!email.value || password.value.length < 6) return alert ("All fields are required")

    await userStore.registerUser(email.value, password.value)
    
    // router.push("/")

  }
</script>