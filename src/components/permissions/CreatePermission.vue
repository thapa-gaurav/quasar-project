<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">

      <q-form class="q-gutter-md">
        <q-input v-model="permission" label="permission" lazy-rules/>

        <!--    <q-input v-model="password" filled type="password" hint="Password" />-->

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
import {ref} from 'vue'
import {usePermissionStore} from "stores/permissionStore.js";
// import router from 'src/router'
// import {useAuthStore} from "stores/auth.js";

defineEmits([...useDialogPluginComponent.emits])
const {dialogRef, onDialogHide, onDialogOK, onDialogCancel} = useDialogPluginComponent()

const permissionStore = usePermissionStore()
const permission = ref('')

const onOKClick = async () => {
  onDialogOK()
  await permissionStore.createPermission({permission: permission.value})
  //todo redirect somewhere
}
</script>

