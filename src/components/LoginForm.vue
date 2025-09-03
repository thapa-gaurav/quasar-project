<template>
  <q-form @submit="login()" class=" max-w-96">
    <q-input v-model="email" filled class="m-4" label="Email"  />

    <q-input v-model="password" filled class="m-4" type="password" label="password"/>

    <div class="m-4">
      <q-btn label="Submit" type="submit"  color="primary" />
    </div>
  </q-form>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from 'src/stores/auth'
const authStore = useAuthStore()
const email = ref('')
const password = ref('')

const login = async () => {
  const credentials = {
    email: email.value,
    password: password.value,
  }
  await authStore.handleLogin(credentials)
}
</script>
