<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">

      <q-form class="q-gutter-md">
        <q-input v-model="role" label="role" lazy-rules/>

        <!--    <q-input v-model="password" filled type="password" hint="Password" />-->
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
import {onMounted, ref} from 'vue'
import {useRoleStore} from "stores/roleStore.js";
import {usePermissionStore} from "stores/permissionStore.js";

defineEmits([...useDialogPluginComponent.emits])
const {dialogRef, onDialogHide, onDialogOK, onDialogCancel} = useDialogPluginComponent()

const roleStore = useRoleStore()
const permissionStore = usePermissionStore()
const currentPermissions = permissionStore.permissions
const role = ref(roleStore.currentRole.name)

const options  = []
const group = ref(roleStore.permissionOfCurrentRoles)
for (const currentPermission of currentPermissions) {
  options.push({label: currentPermission.name, value: currentPermission.id})
}

const onOKClick = async () => {
  onDialogOK()
  await roleStore.editRole({name: role.value,permission:group.value})
}

onMounted(async ()=>{
  await permissionStore.getPermissions()
  await roleStore.getRolePermissions()

})
</script>

