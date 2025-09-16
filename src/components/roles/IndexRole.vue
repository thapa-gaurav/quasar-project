<template>
  <div class="q-pa-md">
    <div class="row justify-between">
      <!--      <LogoutForm />-->
      <q-btn color="secondary" label="create" size="sm" @click="create" />
    </div>
    <q-table :columns="columns" :rows="roleStore.roles" row-key="id" title="Roles">
      <!--      <template v-slot:body-cell-functions="props">-->
      <!--        <q-td :props="props">-->
      <!--          <q-btn color="accent" label="delete" outline size="sms" @click="confirm(props.row.id)" />-->
      <!--          <q-btn color="accent" label="edit" outline size="sms" @click="edit(props.row)" />-->
      <!--          <q-btn color="accent" label="show" outline size="sms" @click="show(props.row.id)"/>-->
      <!--        </q-td>-->
      <!--      </template>-->
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn outline size="sms" @click="confirm(props.row.id)">
            <q-icon name="delete" />
            <q-tooltip :delay="500" :offset="[0, 10]">Delete role</q-tooltip>

          </q-btn>
          <q-btn outline size="sms" @click="edit(props.row)">
            <q-icon name="edit" />
            <q-tooltip :delay="500" :offset="[0, 10]">Edit role</q-tooltip>

          </q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoleStore } from 'stores/roleStore'
import { useQuasar } from 'quasar'
import CreateRole from 'components/roles/CreateRole.vue'
import EditRole from 'components/roles/EditRole.vue'

const roleStore = useRoleStore()
const columns = [
  {
    name: 'name',
    required: true,
    label: 'ID',
    field: 'id',
  },
  {
    name: 'role',
    label: 'Roles',
    field: 'name',
  },
  {
    name: 'actions',
    label: 'actions',
  },
]

const $q = useQuasar()
const create = () => {
  $q.dialog({
    title: 'Create new Role',
    component: CreateRole,
    persistent: true,
  })
    .onOk(() => {
      console.log('Creating new Role')
    })
    .onCancel(() => {
      console.log('Role creation cancelled.')
    })
}

const confirm = (roleId) => {
  $q.dialog({
    title: 'Confirm Deletion',
    message: 'Are you sure you want to delete this?',
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    await roleStore.deleteRole(roleId)
    await roleStore.getRoles()
  })
}

const edit = (role) => {
  roleStore.currentRole = role
  $q.dialog({
    component: EditRole,
    componentProps: {
      title: 'Confirm Edit?',
      message: 'Are you sure you want to edit this?',
      persistent: true,
    },
  })
    .onOk(() => {
      console.log('Oked')
    })
    .onCancel(() => {
      console.log('canceled')
    })
}
onMounted(async () => {
  await roleStore.getRoles()
})
</script>
