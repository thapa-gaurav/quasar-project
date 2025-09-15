<template>
  <div class="q-pa-md">
    <div class="row justify-between">
      <!--      <LogoutForm />-->
      <q-btn color="secondary" label="create" size="sm" @click="create" />
    </div>
    <q-table :columns="columns" :rows="userStore.users" row-key="id" title="Users">
      <!--      <template v-slot:body-cell-functions="props">-->
      <!--        <q-td :props="props">-->
      <!--          <q-btn color="accent" label="delete" outline size="sms" @click="confirm(props.row.id)" />-->
      <!--          <q-btn color="accent" label="edit" outline size="sms" @click="edit(props.row)" />-->
      <!--          <q-btn color="accent" label="show" outline size="sms" @click="show(props.row.id)"/>-->
      <!--        </q-td>-->
      <!--      </template>-->
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn outline size="sms" @click="confirmDelete(props.row.id)">
            <q-icon name="delete" />
          </q-btn>
          <q-btn outline size="sms" @click="edit(props.row)">
            <q-icon name="edit" />
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useUserStore } from 'stores/userStore.js'
import CreateUser from 'components/user/CreateUser.vue'
import EditUser from 'components/user/EditUser.vue'

const userStore = useUserStore()
const columns = [
  {
    name: 'id',
    required: true,
    label: 'ID',
    field: 'id',
  },
  {
    name: 'name',
    label: 'Name',
    field: 'name',
  },
  {
    name: 'email',
    label: 'Email',
    field: 'email',
  },
  {
    name: 'actions',
    label: 'actions',
  },
]

const $q = useQuasar()
const create = () => {
  $q.dialog({
    title: 'Create new User.',
    component: CreateUser,
    persistent: true,
  })
    .onOk(() => {
      console.log('Creating new user')
    })
    .onCancel(() => {
      console.log('user creation cancelled.')
    })
}

const confirmDelete = (userId) => {
  $q.dialog({
    title: 'Confirm Deletion',
    message: 'Are you sure you want to delete this?',
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    await userStore.deleteUser(userId)
    await userStore.getUsers()
  })
}

const edit = (user) => {
  userStore.currentUser = user
  $q.dialog({
    component: EditUser,
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
  await userStore.getUsers()
  console.log(userStore.users)
})
</script>
