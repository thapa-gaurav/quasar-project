<template>
<!--  <q-dialog ref="dialogRef" @hide="onDialogHide">-->
<!--    <q-card class="q-dialog-plugin">-->
<!--      <q-card-section>-->
<!--      </q-card-section>-->
<!--      <q-form class="q-gutter-md">-->
<!--&lt;!&ndash;        <q-input label="caption" lazy-rules v-model="thisPost.caption" />&ndash;&gt;-->
<!--        <h1></h1>-->
<!--&lt;!&ndash;        <q-input label="text" filled type="text" v-model="thisPost.text" />&ndash;&gt;-->
<!--        <P>{{thisPost.text}}</P>-->

<!--        <img :src="`http://localhost:8000/storage/${thisPost.imageUrl}`" alt="image">-->
<!--        <q-card-actions>-->
<!--          <q-btn label="Ok" @click="onOKClick" color="primary" />-->

<!--        </q-card-actions>-->
<!--      </q-form>-->
<!--    </q-card>-->
<!--  </q-dialog>-->

<!--  <div class="q-pa-md row items-start q-gutter-md">-->
    <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="my-card">
      <img :src="`${postImage}`" alt="alternate image">

      <q-card-section>
        <div class="text-h6">{{thisPost.caption}}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{thisPost.text}}
        <q-btn label="Ok" @click="onOKClick" color="primary" />
        <q-btn :loading="loading" label="Replace" @click="replaceImg" color="secondary"/>
        <q-btn label="Detach" @click="detachImg" class="bg-negative"/>
        <q-file ref="fileInput" v-model="selectedFile"  @update:model-value="onFileSelected" style="display: none"/>
      </q-card-section>
    </q-card>
    </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent } from 'quasar'
import { usePostStore } from 'src/stores/post'
import {ref} from 'vue'
defineEmits([...useDialogPluginComponent.emits])
const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent()

const postStore = usePostStore()
const thisPost = ref(postStore.currentPost)
const postImage =  ref(postStore.currentPost.imageUrl)
const selectedFile = ref(null)
const fileInput = ref(null)
const loading = ref(false)
function onOKClick() {
  onDialogOK()
}

function  replaceImg(){
  fileInput.value.$el.click()
}

async function  onFileSelected(file){
  loading.value = true
  try {
    selectedFile.value = file
    if(!selectedFile.value) return
    const formData = new FormData()
    formData.append('image',selectedFile.value)
    await postStore.changeImage(formData)
    postImage.value  = postStore.currentPost.imageUrl
  }catch (error){
    console.log(error.messages)
  }finally {
  loading.value = false
  }


}
async function detachImg(){
  await postStore.detachImage()
  postImage.value  = postStore.currentPost.imageUrl
  console.log(postImage.value)
  // postImage = postStore.currentPost.imageUrl
}
</script>
