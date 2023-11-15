<template>
  <q-page class="q-pa-md">
    <q-card class="q-pa-md">
      <q-form ref="form" @submit="onSubmit" @reset="onReset" >
        <q-file v-model="file" name="file" label="Choose file"
          accept=".ai,.svg,.zip,.rar,.7z,.jpg,.png,.gif" outlined clearable />
        <q-input v-model="title" name="title" label="Enter title" outlined clearable />
        <div class="row q-mt-md">
          <q-btn label="Submit" type="submit" color="primary" />
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
  import { api } from 'boot/axios'

  export default {
    data () {
      return { file: null, title: '' }
    },
    methods: {
      onSubmit () {
        const formData = new FormData()
        formData.append('file', this.file)
        formData.append('title', this.title)
        api.post('/templates', formData, { headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        } })
              .then(response => {
                  this.$q.notify({ color: 'positive', message: 'Form submitted successfully' })
              })
              .catch(error => {
                console.log(error);
                this.$q.notify({ color: 'negative', message: 'Form submission failed' })
              })
      },
      onReset () {
        this.file = null
        this.title = ''
      }
    }
  }
</script>
