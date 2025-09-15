<template>
  <div class="flex flex-row justify-center content-center h-screen">
    <q-form
      class="h-96 w-96 flex flex-col gap-2 border-2 border-sky-400 justify-center p-2 rounded-md"
      @submit="changePass()"
    >
      <!--  <q-input v-model="current_password" type="password" label="current_password" lazy-rules />-->
      <q-input
        v-model="current_password"
        :type="isPwd ? 'password' : 'text'"
        class="m-4"
        filled
        label="Current Password"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <!--  <q-input v-model="password" label="new_password" type="password" lazy-rules />-->
      <q-input
        v-model="password"
        :type="isPwd ? 'password' : 'text'"
        class="m-4"
        filled
        label="New Password"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <!--  <q-input v-model="password_confirmation" label="password_confirmation" type="password" lazy-rules />-->
      <q-input
        v-model="password_confirmation"
        :type="isPwd ? 'password' : 'text'"
        class="m-4"
        filled
        label="Confirm Password"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <div class="m-4">
        <q-btn color="primary" label="Submit" type="submit" />
      </div>
    </q-form>
  </div>
</template>

<script setup>
import { ref } from 'vue' // import {useRouter} from "vue-router"
import { useUserStore } from 'stores/userStore.js' // const router = useRouter()
import { useQuasar } from 'quasar' // const router = useRouter()

// const router = useRouter()
const userStore = useUserStore()
const current_password = ref('')
const password = ref('')
const password_confirmation = ref('')

const $q = useQuasar()
const changePass = () => {
  $q.dialog({
    title: 'Confirm change password?',
    message: 'Are you sure you want to change your password?',
    cancel: true,
    persistent: true,
  })
    .onOk(async () => {
      const data = {
        current_password: current_password.value,
        password: password.value,
        password_confirmation: password_confirmation.value,
      }
      await userStore.changePassword(data)
    })
    .onCancel(() => {
      console.log('Canceled deletion.')
    })
}
</script>
