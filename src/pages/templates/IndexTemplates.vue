<template>
  <q-page class="q-pa-md">
    <div class="q-pa-md row q-gutter-md flex">
      <q-card flat class="my-card full-width">
        <q-card-section>
          <q-table
            class="my-card full-width"
            flat bordered
            :title="$t('pages.templates.templates')"
            :rows="rows"
            :columns="columns"
            row-key="id" >
            <template v-slot:body-cell-actions="props">
              <q-td :props="props">
                <q-btn icon="mode_edit" @click="onEdit(props.row)"></q-btn>
                <q-btn icon="delete" @click="onDelete(props.row)"></q-btn>
              </q-td>
            </template>
          </q-table>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
  import { api } from 'boot/axios'

  const columns = [
    { name: 'id', label: '#', field: 'id' },
    // field: row => row.title, // format: val => `${val}`,
    { name: 'desc', label: 'Title', align: 'left', field: 'title' },
    { name: 'logo', align: 'center', label: 'Logo', field: 'logo'},
    { name: 'cover', align: 'center', label: 'Cover', field: 'cover'},
    { name: 'filesize', label: 'Size', field: 'filesize'},
    { name: 'filetype', label: 'filetype', field: 'filetype'},
    { name: 'filename', label: 'filename', field: 'filename'},
    { name: 'actions', label: 'Actions'},
    // filepath
  ]
  export default {
    created(){
      this.getItems();
    },
    data () {
      return {
        file: null,
        title: '',
        rows: [],
        columns: columns
      }
    },
    methods: {
      getItems() {
        api.get('/templates', { useAuth: true })
              .then(result => {
                console.log(result);
                let response = result.data
                if(response.status == 1){
                  this.rows = response.data.items;
                  console.log(this.rows)
                }
              })
              .catch(error => {
                console.log(error);
                this.$q.notify({ color: 'negative', message: 'Form submission failed' })
              })
      },
      onSubmit() {
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
      onReset() {
        this.file = null
        this.title = ''
      },
      onEdit(row) {
        console.log(row);
      },
      onDelete(row) {
        console.log(row);
      }
    }
  }
</script>
