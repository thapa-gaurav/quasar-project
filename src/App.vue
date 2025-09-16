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
    <q-header class="bg-primary text-white" elevated>
      <q-toolbar>
        <!--        <q-btn dense flat round icon="menu" @click="toggleDrawer"/>-->

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Blog App
        </q-toolbar-title>
        <div>
          <q-toggle
            v-model="darkMode"
            checked-icon="dark_mode"
            color="green"
            unchecked-icon="light_mode"
            @update:model-value="changeMode"
          />
        </div>
        <ProfileLogout v-if="authStore.isLoggedIn" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="authStore.isLoggedIn"
      :breakpoint="500"
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
      :mini="miniState"
      :width="200"
      bordered
      mini-to-overlay
      show-if-above
      side="left"
      @mouseenter="miniState = false"
      @mouseleave="miniState = true"
    >
      <q-scroll-area :horizontal-thumb-style="{ opacity: 0 }" class="fit">
        <q-list padding>
          <RouterLink label="List" name="dashboard" to="/dashboard">
            <q-item v-ripple clickable>
              <q-item-section avatar>
                <q-icon name="dashboard" />
              </q-item-section>

              <q-item-section> Dashboard </q-item-section>
            </q-item>
          </RouterLink>
          <RouterLink
            v-if="hasRoles(['admin'])"
            label="Permission"
            name="permission"
            to="/permission"
          >
            <q-item v-if="hasRoles(['admin'])" v-ripple clickable>
              <q-item-section avatar>
                <q-icon name="shield" />
              </q-item-section>

              <q-item-section> Permissions </q-item-section>
            </q-item>
          </RouterLink>
          <RouterLink v-if="hasRoles(['admin'])" label="Roles" name="role" to="/role">
            <q-item v-if="hasRoles(['admin'])" v-ripple clickable>
              <q-item-section avatar>
                <q-icon name="assignment_ind" />
              </q-item-section>

              <q-item-section> Role </q-item-section>
            </q-item>
          </RouterLink>
          <q-item v-if="hasRoles(['admin'])" v-ripple clickable>
            <q-item-section avatar>
              <q-icon name="group" />
            </q-item-section>

            <q-item-section>
              <RouterLink v-if="hasRoles(['admin'])" label="Users" name="user" to="/user"
                >User</RouterLink
              >
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script setup>
import ProfileLogout from 'components/ProfileLogout.vue'
import { onBeforeMount, ref } from 'vue'
import { useUserStore } from 'stores/userStore.js'
import { useAuthStore } from 'stores/auth.js'
import { hasRoles } from 'src/utils/roleAndPermissionHelper.js'
import { useQuasar} from 'quasar'
// import {useRouter} from "vue-router";
const userStore = useUserStore()
const authStore = useAuthStore()
// const drawer = ref(false)
const miniState = ref(false)
const $q = useQuasar()
const darkMode = ref($q.dark.isActive)

function  changeMode (){
  $q.dark.set(!$q.dark.isActive)
}

onBeforeMount(async () => {
  await authStore.checkAuth()
  if (authStore.isLoggedIn) {
    await userStore.getCurrentUser()
  }
})
</script>
