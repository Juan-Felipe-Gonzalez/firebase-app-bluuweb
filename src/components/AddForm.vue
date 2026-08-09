<template>
  <a-form
    name="addForm"
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
        Add URL
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script setup>
import { reactive } from "vue";
import { useDatabaseStore } from "../stores/database";
import { message } from "ant-design-vue";

const databaseStore = useDatabaseStore();

const formState = reactive({
  url: "",
});

const onFinish = async (value) => {
  const error = await databaseStore.addUrl(formState.url);
  formState.url = ""

  if (!error) return message.success("URL Added");
  else message.error("Something went wrong");
};
</script>
