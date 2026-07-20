<template>
  <div>
    <h1>Login</h1>
    <form action="" @submit.prevent="handleSubmit">
      <input type="email" v-model.trim="email" autocomplete="username">
      <input type="password" v-model.trim="password" autocomplete="current-password">
      <button type="submit" :disabled="userStore.loadingUser">Log in</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";

const userStore = useUserStore()
const router = useRouter()

const email = ref("")
const password = ref("")

const handleSubmit = async () => {

  if (!email.value || password.value.length < 6) return alert("All fields are required")

  try {
    await userStore.loginUser(email.value, password.value)
    // router.push("/")
  } catch (error) {
    console.log(error)
  }
}

</script>