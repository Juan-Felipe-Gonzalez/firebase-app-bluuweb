<template>
  <div>
    <h1>Edit id: {{ route.params }} </h1>

    <form action="" @submit.prevent="handleSubmit">
      <input type="text" placeholder="Add URL" v-model="url">
      <button type="submit">Edit</button>
    </form>
  </div>
</template>

<script setup>
  import { useRoute } from 'vue-router';
import { useDatabaseStore } from '../stores/database';
import { onMounted, ref } from 'vue';

  const route = useRoute()
  const databaseStore = useDatabaseStore()
  const url = ref("")

  const handleSubmit = () => {
    // ToDo: input validations
    databaseStore.updateURL(route.params.id, url.value)
  }

  onMounted(async () => {
    url.value = await databaseStore.getURL(route.params.id)
    console.log(url)
  })
</script>

