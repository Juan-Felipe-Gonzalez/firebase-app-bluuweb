<template>
  <h1>Edit id: {{ route.params.id }}</h1>

  <a-form
    name="editForm"
    layout="vertical"
    :model="formState"
    @finish="onFinish"
  >
    <a-form-item
      name="url"
      label="Add a url"
      :rules="[
        {
          required: true,
          whitespace: true,
          pattern: /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/,
          message: 'Add a valid url ',
        },
      ]"
    >
      <a-input v-model:value="formState.url"></a-input>
    </a-form-item>

    <a-form-item>
      <a-button
        type="primary"
        html-type="submit"
        :disabled="databaseStore.loadingDocs"
        :loading="databaseStore.loadingDocs"
      >
        Edit URL
      </a-button>
    </a-form-item>
    
    <a-form-item>
      <a-button
        type="default"
        :disabled="databaseStore.loadingDocs"
        :loading="databaseStore.loadingDocs"
        @click="backHome"
      >
        Back Home
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script setup>
import { useRoute } from "vue-router";
import { useDatabaseStore } from "../stores/database";
import { onMounted, reactive } from "vue";
import {message} from "ant-design-vue"
import router from "../router";

const route = useRoute();
const databaseStore = useDatabaseStore();

onMounted(async () => {
  formState.url = await databaseStore.getURL(route.params.id);
});

const formState = reactive({
  url: "",
});

const backHome = () => {
  console.log("hola")
  router.push("/");
}

const onFinish = async (value) => {
  const error = await databaseStore.updateURL(route.params.id, formState.url);
  formState.url = "";

  if (!error) return message.success("URL Added");
  else message.error("Something went wrong");
};
</script>
