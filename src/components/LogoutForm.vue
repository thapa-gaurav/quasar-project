<template>
  <div>
    <q-form class="bg-blue-grey-12" @submit="logout">
      <q-btn color="primary" label="Logout" type="submit" @submit="logout()" />
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
