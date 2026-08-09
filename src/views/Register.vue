<template>

  <h1 class="text-center">Register</h1>

  <a-row>
    <a-col :xs="{ span: 24 }" :sm="{ span: 12, offset: 6 }">
      <a-form
        name="registerForm"
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

        <a-form-item
          name="repassword"
          label="Repeat the password"
          :rules="[
            {
              validator: validatePass,
            },
          ]"
        >
          <a-input-password v-model:value="formState.repassword">
          </a-input-password>
        </a-form-item>

        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            :disable="userStore.loadingUser"
            :loading="userStore.loadingUser"
          >
            Create user
          </a-button>
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useUserStore } from "../stores/user";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";

const userStore = useUserStore();
const router = useRouter();

const formState = reactive({
  email: "quepedo@correo.com",
  password: "123412",
  repassword: "123412",
});

const validatePass = async (_rule, value) => {
  if (value === "") {
    return Promise.reject("Repeat the password");
  }

  if (value !== formState.password) {
    return Promise.reject("The passwords arent equal");
  }

  return Promise.resolve();
};

const onFinish = async (value) => {
  const error = await userStore.registerUser(formState.email, formState.password);

  if (!error) return message.success("Check your email and verify your account");

  switch (error) {
    case "auth/email-already-in-use":
      message.error("auth/email-already-in-use")
      break;
    default:
      message.error("Validate your information");
  }

  // router.push("/")
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed", errorInfo);
};
</script>
