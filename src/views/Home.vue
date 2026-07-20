<template>
  <div>
    <h1>Home</h1>
    <p>{{ userStore.userData?.email }}</p>

    <form action="" @submit.prevent="handleSubmit">
      <input type="text" placeholder="Add URL" v-model="url">
      <button type="submit">Add</button>
    </form>

    <p v-if="databaseStore.loadingDoc">Loading docs...</p>
    <ul v-else>
      <div v-for="doc of databaseStore.documents" :key="doc.id" style="margin: 1rem;">
        <li>
          Id: {{ doc.id }}
        </li>
        <li>
          Name: {{ doc.name }}
        </li>
        <li>
          Short: {{ doc.short }}
        </li>
        <button @click="databaseStore.deleteUrl(doc.id)">Delete</button>
        <button @click="router.push(`/edit/${doc.id}`)">Edit</button>
      </div>
    </ul>
  </div>
</template>

<script setup>
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebaseConfig"
import { useDatabaseStore } from "../stores/database";
import { useUserStore } from "../stores/user"
import { ref } from "vue";
import { useRouter } from "vue-router";

const databaseStore = useDatabaseStore()
const userStore = useUserStore()
const router = useRouter()

onAuthStateChanged(auth, (user) => {
  console.log("Cambió el usuario ", user)
})

databaseStore.getUrls()

const url = ref('')

const handleSubmit = () => {
  databaseStore.addUrl(url.value)
}

</script>