<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg"  alt=""/>
          </q-avatar>
          Title
        </q-toolbar-title>
        <ProfileLogout v-if="authStore.isLoggedIn"/>
      </q-toolbar>
      <q-tabs align="left" v-if="!!useUserStore().loggedUser">
        <q-route-tab to="/dashboard" name="dashboard" label="List" />
        <q-route-tab v-if="hasRoles(['admin'])" to="/permission" name="permission" label="Permission" />
        <q-route-tab v-if="hasRoles(['admin'])" to="/role" name="role" label="Roles" />
        <q-route-tab v-if="hasRoles(['admin'])" to="/user" name="user" label="Users"/>
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script setup>

import ProfileLogout from "components/ProfileLogout.vue";
import {onBeforeMount} from "vue";
import {useUserStore} from "stores/userStore.js";
import {useAuthStore} from "stores/auth.js";
import {hasRoles} from "src/utils/roleAndPermissionHelper.js";
// import {useRouter} from "vue-router";
const userStore = useUserStore()
const authStore = useAuthStore()

// const router = useRouter()

onBeforeMount(async ()=>{
  await  authStore.checkAuth()
  if(authStore.isLoggedIn){
    await  userStore.getCurrentUser()
  }
})
</script>
