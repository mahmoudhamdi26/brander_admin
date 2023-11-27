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
              {{ title }}
            </q-toolbar-title>
          </q-toolbar>

          <h5 class="text-h5">{{ $t('common.templates') }}</h5>

          <q-table class="my-card full-width" :grid="$q.screen.xs" flat bordered :rows="rows" :columns="columns"
            row-key="id">
            <template v-slot:body-cell-fileid="props">
              <q-td :props="props">
                <q-item clickable tag="a" :to="{ name: 'UserTemplate', params: { id: props.row.id } }">
                  {{ props.row.id }}
                </q-item>
              </q-td>
            </template>
            <template v-slot:body-cell-actions="props">
              <q-td :props="props">
                <q-btn icon="mode_edit" @click="onEdit(props.rowIndex, props.row)"></q-btn>
                <q-btn icon="delete" @click="onDelete(props.rowIndex, props.row)"></q-btn>
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
import { ref } from 'vue';

const columns = [
  { name: 'id', label: '#', field: 'id' },
  { name: 'fileid', label: 'File ID', align: 'left', field: 'fileid' },
  { name: 'title', label: 'Title', align: 'left', field: 'title' },
  { name: 'filename', label: 'File Name', align: 'left', field: 'filename' },
  { name: 'filesize', label: 'File Size', align: 'left', field: 'filesize' },
  { name: 'actions', label: 'Actions' },
  // filepath
]
export default {
  created() {
    this.getItem();
  },
  data() {
    return {
      fixed: ref(false),
      title: '',
      user: null,
      // templates
      rows: [],
      columns: columns,
      selectedRow: null,
      selectedIdx: null,
    }
  },
  methods: {
    getItem() {
      api.get(`/users/${this.$route.params.id}`, { useAuth: true })
        .then(result => {
          console.log(result);
          let response = result.data
          if (response.status == 1) {
            this.rows = response.data.templates;
            this.user = response.data
            this.title = this.user.username
            console.log(this.rows)
          }
        })
        .catch(error => {
          console.log(error);
          this.$q.notify({ color: 'negative', message: 'Form submission failed' })
        })
    },
    onEdit(idx, row) {
      console.log(row);
    },
    onDelete(idx, row) {
      console.log(row);
      api.delete(`/users/${row.id}`, null, { useAuth: true })
        .then(response => {
          this.$q.notify({ color: 'positive', message: 'Form submitted successfully' });
          this.rows.splice(idx, 1);
        })
        .catch(error => {
          console.log(error);
          this.$q.notify({ color: 'negative', message: 'Form submission failed' })
        })
    }
  },
  components: {}
}
</script>
