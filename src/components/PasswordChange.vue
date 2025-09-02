<template>
  <q-form @submit="changePass()" class=" max-w-96">
    <!--  <q-input v-model="current_password" type="password" label="current_password" lazy-rules />-->
    <q-input v-model="current_password" class="m-4" filled :type="isPwd ? 'password' : 'text'" label="Current Password">
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        />
      </template>
    </q-input>
    <!--  <q-input v-model="password" label="new_password" type="password" lazy-rules />-->
    <q-input v-model="password" filled class="m-4" :type="isPwd ? 'password' : 'text'" label="New Password">
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        />
      </template>
    </q-input>
    <!--  <q-input v-model="password_confirmation" label="password_confirmation" type="password" lazy-rules />-->
    <q-input v-model="password_confirmation" filled class="m-4" :type="isPwd ? 'password' : 'text'" label="Confirm Password">
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="isPwd = !isPwd"
        />
      </template>
    </q-input>
    <div class="m-4">
      <q-btn label="Submit" type="submit" color="primary"/>
    </div>
  </q-form>
</template>

<script setup>
import {ref} from 'vue'
// import {useRouter} from "vue-router"
import {useUserStore} from "stores/userStore.js";

// const router = useRouter()
const userStore = useUserStore()
const current_password = ref('')
const password = ref('')
const password_confirmation = ref('')
import {useQuasar} from "quasar";

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
