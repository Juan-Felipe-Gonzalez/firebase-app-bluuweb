<template>
  <div>
    <h1>Home</h1>
    <p>{{ userStore.userData?.email }}</p>

    <add-form></add-form>

    <p v-if="databaseStore.loadingDoc">Loading docs...</p>

    <a-space 
      direction="vertical"
      style="width: 100%;"
      v-if="!databaseStore.loadingDoc"
    >
      <a-card 
      v-for="item in databaseStore.documents"
      :key="item.id"
      :title="item.short"
      title="url extensa" 
      style="width: 100%"
      >
        <template #extra>
          <a-space>
            <a-popconfirm
              title="This action cant be undo"
              ok-text="Yes"
              cancel-text="Cancel"
              @confirm="confirm(item.id)"
              @cancel="cancel"
            >
              <a-button 
                danger
                :loading="databaseStore.loadingDoc"
                :disabled="databaseStore.loadingDoc"
              
              >Delete</a-button
              >
            </a-popconfirm>
            <a-button type="primary" @click="router.push(`/edit/${item.id}`)"
              >Edit</a-button
            >
          </a-space>
        </template>
        <p>{{item.name}}L</p>
      </a-card>
    </a-space>
  </div>
</template>

<script setup>
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useDatabaseStore } from "../stores/database";
import { useUserStore } from "../stores/user";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";

const databaseStore = useDatabaseStore();
const userStore = useUserStore();
const router = useRouter();

onAuthStateChanged(auth, (user) => {
  console.log("Cambió el usuario ", user);
});

databaseStore.getUrls();

const confirm = async (id) => {
  const error = await databaseStore.deleteUrl(id)
  if(!error) return message.success("Deleted succesfully")
  return message.error(error)
}

const cancel = () => {
  message.error("Canceled succesfully")
}
</script>
