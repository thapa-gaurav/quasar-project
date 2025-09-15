<template>
  <div class="flex items-center gap-2 bg-sky-200 shadow-md w-full max-w-md">
    <RouterLink to="/passchange">
      <img alt="Profile Picture" class="mx-auto block h-24 rounded-full" src="../assets/user.png" />
    </RouterLink>
    <div class="space-y-0.5">
      <p class="text-lg font-semibold text-black">
        {{ userName }}
      </p>
      <ul class="font-medium text-gray-600">
        <li v-for="role in userRoles" :key="role.id">
          {{ role.name }}
        </li>
      </ul>
    </div>
    <div class="ml-auto">
      <LogoutForm />
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from 'stores/userStore.js'
// import {useAuthStore} from "stores/auth.js";
import LogoutForm from 'components/LogoutForm.vue'
import { onBeforeMount, ref } from 'vue'

const userStore = useUserStore()
const userName = ref('')
const userRoles = ref([])
// const authStore = useAuthStore()
// async function logout() {
//  await authStore.handleLogout()
// }

onBeforeMount(async () => {
  await userStore.getCurrentUser()
  userName.value = userStore.loggedUser.data.name
  // await userStore.getLoggedUserRoles()
  userRoles.value = userStore.rolesOfLoggedUser
})
</script>
