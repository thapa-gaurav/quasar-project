<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-form class="q-gutter-md">
        <div class="text-h6">{{ userStore.currentUser.name }}</div>
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
          <q-btn label="Cancel" color="primary" @click="onDialogCancel"/>
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

defineEmits([...useDialogPluginComponent.emits])
const {dialogRef, onDialogHide, onDialogOK, onDialogCancel} = useDialogPluginComponent()

const roleStore = useRoleStore()
const userStore = useUserStore()
const selectedRoles = ref([])

// const role = ref(roleStore.currentRole.name)
const group = ref(selectedRoles)
const options = computed(() => {
  return roleStore.roles.map(role => ({label: role.name, value: role.id}))
})
const onOKClick = async () => {
  onDialogOK()
  await userStore.editUserRole({role: group.value})
}
onMounted(async () => {
  await roleStore.getRoles()
  await userStore.getUserRoles()

  if (userStore.rolesOfCurrentUser) {
    selectedRoles.value = userStore.rolesOfCurrentUser?.map(role => role.id)
  }
})
</script>

