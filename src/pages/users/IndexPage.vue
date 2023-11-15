<template>
  <q-page class="q-pa-md">
    <div class="q-pa-md row q-gutter-md flex">
      <q-card flat bordered class="my-card full-width">
        <q-card-section>
          <q-toolbar class="bg-black text-white">
            <q-btn flat round dense icon="assignment_ind">
              <!-- <q-badge floating color="red">2</q-badge> -->
            </q-btn>
            <q-toolbar-title>
              {{ $t('pages.users.title') }}
            </q-toolbar-title>

            <q-btn flat dense icon="add" :label="$t('actions.create')" @click="fixed = true" />
          </q-toolbar>
          <q-table class="my-card full-width" :grid="$q.screen.xs" flat bordered :rows="rows" :columns="columns"
            row-key="id">
            <template v-slot:body-cell-actions="props">
              <q-td :props="props">
                <q-btn icon="mode_edit" @click="onEdit(props.row)"></q-btn>
                <q-btn icon="delete" @click="onDelete(props.row)"></q-btn>
              </q-td>
            </template>
          </q-table>
        </q-card-section>
      </q-card>

      <q-dialog v-model="fixed">
        <q-card style="width: 80vh">
          <q-card-section>
            <div class="text-h6">{{ $t('forms.titles.create_user') }}</div>
          </q-card-section>

          <q-separator />

          <q-card-section class="scroll">
            <div class="row">
              <div class="col">
                <user-form :edit_id="selectedRow" />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import { api } from 'boot/axios'
import { ref } from 'vue';
import UserForm from "components/forms/UserForm.vue";
const columns = [
  { name: 'id', label: '#', field: 'id' },
  { name: 'desc', label: 'Name', align: 'left', field: 'name' },
  { name: 'desc', label: 'User Name', align: 'left', field: 'username' },
  { name: 'desc', label: 'Main Role', align: 'left', field: 'role' },
  { name: 'actions', label: 'Actions' },
  // filepath
]
export default {
  created() {
    this.getItems();
  },
  data() {
    return {
      fixed: ref(false),
      file: null,
      title: '',
      rows: [],
      columns: columns,
      selectedRow: null,
    }
  },
  methods: {
    getItems() {
      api.get('/users', { useAuth: true })
        .then(result => {
          console.log(result);
          let response = result.data
          if (response.status == 1) {
            this.rows = response.data.items;
            console.log(this.rows)
          }
        })
        .catch(error => {
          console.log(error);
          this.$q.notify({ color: 'negative', message: 'Form submission failed' })
        })
    },
    // Add New
    showAddPopup() {

    },
    onSubmit() {
      const formData = new FormData()
      formData.append('file', this.file)
      formData.append('title', this.title)
      api.post('/templates', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
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
  },
  components: {
    UserForm,
  }
}
</script>
