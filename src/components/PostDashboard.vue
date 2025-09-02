<template>
  <div class="q-pa-md">
    <div class="row justify-between">
      <q-btn color="secondary" label="create" size="sm" @click="create" />
    </div>
    <q-table :columns="columns" :rows="postStore.posts" row-key="id" title="posts">
<!--      <template v-slot:body-cell-delete="props">-->
<!--        <q-td :props="props">-->
<!--          <q-btn color="primary" label="delete" outline size="sm" @click="confirm(props.row.id)" />-->
<!--        </q-td>-->
<!--      </template>-->
<!--      <template v-slot:body-cell-edit="props">-->
<!--        <q-td :props="props">-->
<!--          <q-btn color="accent" label="edit" outline size="sms" @click="edit(props.row)" />-->
<!--        </q-td>-->
<!--      </template>-->
      <template v-slot:body-cell-functions="props">
        <q-td :props="props">
          <q-btn color="accent" label="delete" outline size="sms" @click="confirm(props.row.id)" />
          <q-btn color="accent" label="edit" outline size="sms" @click="edit(props.row)" />
          <q-btn color="accent" label="show" outline size="sms" @click="show(props.row.id)"/>
        </q-td>
      </template>
    </q-table>
  </div>
  <!-- @click="deletePost(props.row.id)" -->
</template>

<script setup>
import { usePostStore } from 'src/stores/post'
import { onMounted } from 'vue'
import { useQuasar } from 'quasar'
import EditPost from './EditPost.vue'
import CreatePost from './CreatePost.vue'
import ShowPost from "components/ShowPost.vue";

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
    name:'functions',
    label:'functions',
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
      await postStore.deletePost(postId)
      await postStore.getPosts()
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
      console.log('Creating new post.')
    })
    .onCancel(() => {
      console.log('post creation canceled.')
    })
}

const show = async (post)=>{
  await postStore.showPost(post);
  $q.dialog({
    component:ShowPost,
    persistent:true,
  }).onOk(()=>{
    console.log("A post was shown.")
  }).onCancel(()=>{
    console.log('Show post cancelled');
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
