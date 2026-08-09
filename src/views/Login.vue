<template>

  <h1 class="text-center">Login</h1>
  
  <a-row>
    <a-col :xs="{ span: 24 }" :sm="{ span: 12, offset: 6 }">
      <a-form
        name="basicLogin"
        layout="vertical"
        :model="formState"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <!-- :model="formState: to watch with reactive email and password values and validate -->
        <!-- validations are integrated with antdv -->
        <a-form-item
          name="email"
          label="Email"
          :rules="[
            {
              required: true,
              message: 'Email cannot be empty',
              whitespace: true,
              type: 'email',
            },
          ]"
        >
          <!-- :rules from antdv -->
          <!-- whitespace: trim() the field -->
          <a-input v-model:value="formState.email"></a-input>
        </a-form-item>

        <a-form-item
          name="password"
          label="Password"
          :rules="[
            {
              required: true,
              message: 'Password cannot be empty (at least 6 characters)',
              min: 6,
            },
          ]"
        >
          <!-- :rules from antdv -->
          <a-input-password
            v-model:value="formState.password"
          ></a-input-password>
        </a-form-item>

        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            :disable="userStore.loadingUser"
            :loading="userStore.loadingUser"
          >
            Login
          </a-button>
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
</template>

<script setup>
import { message } from "ant-design-vue";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { type } from "firebase/firestore/pipelines";

const userStore = useUserStore();
const router = useRouter();

const formState = reactive({
  email: "aynose@correo.com",
  password: "123456",
  repassword: "123456",
});

const onFinish = async (values) => {
  const error = await userStore.loginUser(formState.email, formState.password);

  if (!error) return message.success("Check your email and verify your account");

  switch (error) {
    case "auth/invalid-credential":
      message.error("auth/invalid-credential")
      break;
    default:
      message.error("Validate your information");
  }
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed", errorInfo);
};
</script>
