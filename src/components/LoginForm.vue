<template>
  <div class="flex flex-col justify-center content-center h-screen">
    <p class="p-0.5 text-[50px]">Login</p>
    <q-form class="h-fit w-96 flex flex-col gap-2 justify-center p-2 rounded-md" @submit="login()">
      <q-input v-model="email" class="w-full" filled label="Email" />

      <q-input v-model="password" class="w-full" filled label="password" type="password" />

      <div class="content-center">
        <q-btn color="primary" label="Submit" type="submit" />
      </div>
    </q-form>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useAuthStore } from 'src/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const email = ref('')
const password = ref('')
const router = useRouter()

const login = async () => {
  const credentials = {
    email: email.value,
    password: password.value,
  }
  await authStore.handleLogin(credentials)
}

onMounted(() => {
  if (localStorage.getItem('userToken')) {
    alert('You are already logged in.')
    router.push('/dashboard')
  }
})
</script>
