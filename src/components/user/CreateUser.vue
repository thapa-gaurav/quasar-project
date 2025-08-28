<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">

      <q-form class="q-gutter-md">
        <q-input v-model="name" label="Name" lazy-rules/>
        <q-input v-model="email" type="email" label="Email" lazy-rules/>
        <q-input v-model="password" type="password" label="Password" lazy-rules/>
        <div class="q-pa-lg">
          <q-option-group
            v-model="group"
            :options="options"
            color="green"
            type="checkbox"
          />
        </div>
        <div>
          <q-btn label="Submit" type="submit" @click="onOKClick" color="primary"/>
          <q-btn color="primary" label="Cancel" @click="onDialogCancel"/>
        </div>
      </q-form>
    </q-card>

  </q-dialog>
</template>


<script setup>
import {useDialogPluginComponent} from "quasar";
import {computed, onMounted, ref} from 'vue'
import {useRoleStore} from "stores/roleStore.js";
import {useUserStore} from "stores/userStore.js";
// import router from 'src/router'
// import {useAuthStore} from "stores/auth.js";

defineEmits([...useDialogPluginComponent.emits])
const {dialogRef, onDialogHide, onDialogOK, onDialogCancel} = useDialogPluginComponent()

const roleStore = useRoleStore()
const userStore = useUserStore()
const name = ref('')
const email = ref('')
const password = ref('')
const options = computed(() => {
  return roleStore.roles.map(role => ({label: role.name, value: role.id}))
})
const group = ref([])


const onOKClick = async () => {
  onDialogOK()
  await userStore.createUser({name: name.value,email:email.value,password:password.value, role: group.value})
}
onMounted(async () => {
  await roleStore.getRoles()

})
</script>

