<template>
  <q-form @submit="login()" class="q-gutter-md">
    <q-input v-model="email" label="email" lazy-rules />

    <q-input v-model="password" filled type="password" hint="Password" />

    <div>
      <q-btn label="Submit" type="submit" @submit="handleLogin" color="primary" />
    </div>
  </q-form>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from 'src/stores/auth'
import router from 'src/router'

const authStore = useAuthStore()
const email = ref('')
const password = ref('')

const login = () => {
  const credentials = {
    email: email.value,
    password: password.value,
  }
  authStore.handleLogin(credentials)
  if (authStore.loginToken) {
    router.push('/dashboard')
  }
}
</script>
