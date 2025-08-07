<template>
  <div>
    <q-form @submit="logout" class="q-gutter-md">
      <q-btn label="Logout" @submit="logout()" type="submit" color="primary" />
    </q-form>
  </div>
</template>

<script setup>
import { useAuthStore } from 'src/stores/auth'
const authStore = useAuthStore()

const logout = () => {
  authStore.handleLogout()
}
</script>
