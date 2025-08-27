<template>
  <div class="q-pa-md">
    <div class="row justify-between">
      <!--      <LogoutForm />-->
      <q-btn color="secondary" label="create" size="sm" @click="create"/>
    </div>
    <q-table :columns="columns" :rows="permissionStore.permissions" row-key="id" title="Permissions">
      <!--      <template v-slot:body-cell-functions="props">-->
      <!--        <q-td :props="props">-->
      <!--          <q-btn color="accent" label="delete" outline size="sms" @click="confirm(props.row.id)" />-->
      <!--          <q-btn color="accent" label="edit" outline size="sms" @click="edit(props.row)" />-->
      <!--          <q-btn color="accent" label="show" outline size="sms" @click="show(props.row.id)"/>-->
      <!--        </q-td>-->
      <!--      </template>-->
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn color="accent" label="delete" outline size="sms" @click="confirm(props.row.id)"/>
          <q-btn color="accent" label="edit" outline size="sms" @click="edit(props.row)"/>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import {usePermissionStore} from 'src/stores/permissionStore'
import {onMounted} from "vue";
import {useQuasar} from 'quasar'
import CreatePermission from "components/permissions/CreatePermission.vue";
import PermissionEdit from "components/permissions/PermissionEdit.vue";

const permissionStore = usePermissionStore()
const columns = [
  {
    name: 'name',
    required: true,
    label: 'ID',
    field: 'id'
  },
  {
    name: 'permission',
    label: 'Permission',
    field: 'name'
  },
  {
    name: 'actions',
    label: 'actions',
  }
]

const $q = useQuasar()
const create = () => {
  $q.dialog({
    title: 'Create new Permission',
    component: CreatePermission,
    persistent: true,
  })
    .onOk(() => {
      console.log('Creating new permission')
    }).onCancel(() => {
    console.log('Permission creation cancelled.')
  })
}

const confirm = (permissionId) =>{
  $q.dialog({
    title: 'Confirm Deletion',
    message: 'Are you sure you want to delete this?',
    cancel: true,
    persistent: true,
  }).onOk(async () =>{
    await permissionStore.deletePermission(permissionId)
    await permissionStore.getPermissions()
  })
}

const edit = (permission)=> {
  permissionStore.currentPermission = permission
  $q.dialog({
    component: PermissionEdit,
    componentProps: {
      title: 'Confirm Edit?',
      message: 'Are you sure you want to edit this?',
      persistent: true,
    },
  })
    .onOk(() => {
      console.log('here')
    })
    .onCancel(() => {
      console.log('canceled')
    })
}
onMounted(async () => {
  await permissionStore.getPermissions()
})
</script>
