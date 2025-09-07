<!--<template>-->
<!--  <q-layout view="hHh lpR fFf">-->
<!--    <q-header elevated class="bg-primary text-white" height-hint="98">-->
<!--      <q-toolbar>-->
<!--        <q-toolbar-title>-->
<!--          <q-avatar>-->
<!--            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg"  alt=""/>-->
<!--          </q-avatar>-->
<!--          Title-->
<!--        </q-toolbar-title>-->
<!--        <ProfileLogout v-if="authStore.isLoggedIn"/>-->
<!--      </q-toolbar>-->
<!--      <q-tabs align="left" v-if="!!useUserStore().loggedUser">-->
<!--        <q-route-tab to="/dashboard" name="dashboard" label="List" />-->
<!--        <q-route-tab v-if="hasRoles(['admin'])" to="/permission" name="permission" label="Permission" />-->
<!--        <q-route-tab v-if="hasRoles(['admin'])" to="/role" name="role" label="Roles" />-->
<!--        <q-route-tab v-if="hasRoles(['admin'])" to="/user" name="user" label="Users"/>-->
<!--      </q-tabs>-->
<!--    </q-header>-->

<!--    <q-page-container>-->
<!--      <router-view />-->
<!--    </q-page-container>-->
<!--  </q-layout>-->
<!--</template>-->

<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
<!--        <q-btn dense flat round icon="menu" @click="toggleDrawer"/>-->

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          Blog App
        </q-toolbar-title>
        <ProfileLogout v-if="authStore.isLoggedIn"/>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above side="left" bordered
              :mini="miniState"
              @mouseenter="miniState = false"
              @mouseleave="miniState = true"
              mini-to-overlay

              :width="200"
              :breakpoint="500"
              :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
              v-if="authStore.isLoggedIn"
    >
      <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }" >
        <q-list padding>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="dashboard"/>
            </q-item-section>

            <q-item-section>
              <RouterLink to="/dashboard" name="dashboard" label="List">Dashboard</RouterLink>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple v-if="hasRoles(['admin'])">
            <q-item-section avatar>
              <q-icon name="shield"/>
            </q-item-section>

            <q-item-section>
              <RouterLink v-if="hasRoles(['admin'])" to="/permission" name="permission" label="Permission" >Permissions</RouterLink>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple v-if="hasRoles(['admin'])">
            <q-item-section avatar>
              <q-icon name="assignment_ind"/>
            </q-item-section>

            <q-item-section>
              <RouterLink v-if="hasRoles(['admin'])" to="/role" name="role" label="Roles">Role</RouterLink>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple v-if="hasRoles(['admin'])">
            <q-item-section avatar>
              <q-icon name="group"/>
            </q-item-section>

            <q-item-section>
              <RouterLink v-if="hasRoles(['admin'])" to="/user" name="user" label="Users">User</RouterLink>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>

  </q-layout>
</template>
<script setup>

import ProfileLogout from "components/ProfileLogout.vue";
import {onBeforeMount, ref} from "vue";
import {useUserStore} from "stores/userStore.js";
import {useAuthStore} from "stores/auth.js";
import {hasRoles} from "src/utils/roleAndPermissionHelper.js";
// import {useRouter} from "vue-router";
const userStore = useUserStore()
const authStore = useAuthStore()
// const drawer = ref(false)
const miniState = ref(false)
// const router = useRouter()

// const toggleDrawer = () =>{
//   drawer.value = !drawer.value
// }

onBeforeMount(async () => {
  await authStore.checkAuth()
  if (authStore.isLoggedIn) {
    await userStore.getCurrentUser()
  }
})
</script>
