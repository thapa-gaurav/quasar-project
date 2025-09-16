<template class="bg-sky-500">
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <div class="text-h6">Create Post?</div>
      </q-card-section>
      <q-form class="q-gutter-md">
        <q-input label="caption" lazy-rules v-model="caption" outlined />

        <q-input label="text" filled type="text" v-model="text" outlined />

        <q-input label="image" filled type="file" v-model="imageFile" @change="onFileChange" outlined required/>
        <q-card-actions>
          <q-btn :loading="loading" label="Submit" type="submit" @click="onOKClick" color="primary"/>
          <q-btn v-if="hasRoles(['admin','junior'])" color="primary" label="Cancel" @click="onDialogCancel"/>
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import {useDialogPluginComponent} from 'quasar'
import {hasRoles} from "src/utils/roleAndPermissionHelper.js";
import {usePostStore} from 'src/stores/post'
import {ref} from 'vue'

defineEmits([...useDialogPluginComponent.emits])
const {dialogRef, onDialogHide, onDialogOK, onDialogCancel} = useDialogPluginComponent()

const postStore = usePostStore()
const caption = ref('')
const text = ref('')
const imageFile = ref(null) // will hold FileList
const selectedFile = ref(null) // actual File
const loading = ref(false)


function onFileChange() {
  if (imageFile.value && imageFile.value[0]) {
    selectedFile.value = imageFile.value[0]
  }
}

const onOKClick = async () => {
  loading.value=true
 try {
   if(!selectedFile.value) return
   const formData = new FormData()
   formData.append('caption', caption.value)
   formData.append('text', text.value)
   formData.append('image', selectedFile.value)
   await postStore.createPost(formData)
 }catch (error){
    console.log(error.message)
 }finally {
    setTimeout(()=>{
   loading.value=false
   onDialogOK()
    },1000)
 }

}
</script>
