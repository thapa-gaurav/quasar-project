<template class="bg-sky-500">
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <div class="text-h6">Create Post?</div>
      </q-card-section>
      <q-form class="q-gutter-md">
        <q-input label="caption" lazy-rules v-model="caption" outlined />

        <q-input label="text" filled type="text" v-model="text" outlined />

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

import { usePostStore } from 'src/stores/post'
import { ref } from 'vue'

defineEmits([...useDialogPluginComponent.emits])
const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

const postStore = usePostStore()
const caption = ref('')
const text = ref('')

const onOKClick = async () => {
  onDialogOK()
  const newPost = {
    caption: caption.value,
    text: text.value,
  }
  await postStore.createPost(newPost)
}
</script>
