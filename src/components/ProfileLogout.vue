<template>
  <div class="flex flex-row p-2 bg-gray-100 rounded-2xl shadow-md w-40">
    <div>
      <RouterLink to="/passchange">
        <img
          src="../assets/user.png"
          alt="Profile Picture"
          class="w-15 h-15 rounded-full object-cover border-2 border-gray-300 mb-4"
        />
      </RouterLink>
      <p class="text-lg font-small text-gray-800 mb-6">
        {{ userName }}
      </p>
      <ul class="text-gray-800">
        <li v-for="role in userRoles" :key="role.id">
          {{ role.name }}
        </li>
      </ul>
    </div>
    <LogoutForm/>
  </div>
</template>

<script setup>
import {useUserStore} from "stores/userStore.js";
// import {useAuthStore} from "stores/auth.js";
import LogoutForm from "components/LogoutForm.vue";
import {onBeforeMount} from "vue";
import {ref} from 'vue'

const userStore = useUserStore()
const userName = ref('')
const userRoles = ref([])
// const authStore = useAuthStore()
// async function logout() {
//  await authStore.handleLogout()
// }

onBeforeMount( async () => {
  await userStore.getCurrentUser()
  userName.value = userStore.loggedUser.data.name
  // await userStore.getLoggedUserRoles()
  userRoles.value = userStore.rolesOfLoggedUser
})
</script>

