<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <div class="text-h6">Edit Permission?</div>
      </q-card-section>
      <q-form class="q-gutter-md">
        <q-input label="caption" lazy-rules v-model="thisPermission.name" />

        <q-card-actions>
          <q-btn label="Submit" type="submit" @click="onOKClick" color="primary" />
          <q-btn color="primary" label="Cancel" @click="onDialogCancel" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
  <!-- {{ thisPost.text }} -->
</template>

<script setup>
import { useDialogPluginComponent } from 'quasar'
// import router from 'src/router'
import { ref } from 'vue'
import {usePermissionStore} from "stores/permissionStore.js";

// const props = defineProps(['props'])
// const newCaption = ref(props.thisPost.caption)
// const newText = ref(props.thisPost.text)

defineEmits([...useDialogPluginComponent.emits])
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

const permissionStore = usePermissionStore()
const thisPermission = ref(permissionStore.currentPermission)

function onOKClick() {
  onDialogOK()
  permissionStore.editPermission()
}
// const editPost = async () => {
//   // const newPost =
//   console.log(thisPost)
//   await postStore.editPosts(thisPost.value)
// }
</script>
