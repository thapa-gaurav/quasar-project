<template>
  <div class="q-pa-md">
    <div class="row justify-between">
      <LogoutForm />
      <q-btn color="secondary" size="sm" @click="create" label="create" />
    </div>
    <q-table title="posts" :rows="postStore.posts" :columns="columns" row-key="id">
      <template v-slot:body-cell-delete="props">
        <q-td :props="props">
          <q-btn label="delete" color="primary" size="sm" @click="confirm(props.row.id)" outline />
        </q-td>
      </template>
      <template v-slot:body-cell-edit="props">
        <q-td :props="props">
          <q-btn label="edit" color="accent" size="sms" @click="edit(props.row)" outline />
        </q-td>
      </template>
    </q-table>
  </div>
  <!-- @click="deletePost(props.row.id)" -->
</template>

<script setup>
import { usePostStore } from 'src/stores/post'
import LogoutForm from './LogoutForm.vue'
import { onMounted } from 'vue'
import { useQuasar } from 'quasar'
import EditPost from './EditPost.vue'
import CreatePost from './CreatePost.vue'
const $q = useQuasar()
const postStore = usePostStore()
const columns = [
  {
    name: 'name',
    required: true,
    label: 'ID',
    field: 'id',
  },
  {
    name: 'caption',
    label: 'caption',
    field: 'caption',
  },
  {
    name: 'text',
    label: 'text',
    field: 'text',
  },
  {
    name: 'delete',
    label: 'delete',
    field: '',
  },
  {
    name: 'edit',
    label: 'edit',
    field: '',
  },
]

const confirm = (postId) => {
  $q.dialog({
    title: 'Confirm Deletion',
    message: 'Are you sure you want to delete this?',
    cancel: true,
    persistent: true,
  })
    .onOk(async () => {
      postStore.deletePost(postId)
      postStore.getPosts()
    })
    .onCancel(() => {
      console.log('Canceled deletion.')
    })
}

const edit = (post) => {
  console.log(post)
  postStore.currentPosts(post)
  $q.dialog({
    component: EditPost,
    componentProps: {
      title: 'Confirm Edit',
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

const create = () => {
  $q.dialog({
    component: CreatePost,
    persistent: true,
  })
    .onOk(() => {
      console.log('New post created.')
    })
    .onCancel(() => {
      console.log('post creation canceled.')
    })
}

// const deletePost = async (postId) => {
//   postStore.deletePost(postId)
//   await postStore.getPosts()
// }

onMounted(async () => {
  await postStore.getPosts()
})
</script>
