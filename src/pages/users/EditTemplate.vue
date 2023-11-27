<template>
  <q-page class="q-pa-md">
    <div class="q-pa-md row q-gutter-md flex">
      <q-card v-if="item" flat bordered class="my-card full-width">
        <q-card-section>
          <q-bar>
            <div class="cursor-pointer non-selectable">
              File
              <q-menu>
                <q-list dense style="min-width: 100px">
                  <q-item clickable v-close-popup>
                    <q-item-section>Open...</q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup>
                    <q-item-section>New</q-item-section>
                  </q-item>

                  <q-separator />

                  <q-item clickable>
                    <q-item-section>Preferences</q-item-section>
                    <q-item-section side>
                      <q-icon name="keyboard_arrow_right" />
                    </q-item-section>

                    <q-menu anchor="top end" self="top start">
                      <q-list>
                        <q-item v-for="n in 3" :key="n" dense clickable>
                          <q-item-section>Submenu Label</q-item-section>
                          <q-item-section side>
                            <q-icon name="keyboard_arrow_right" />
                          </q-item-section>
                          <q-menu auto-close anchor="top end" self="top start">
                            <q-list>
                              <q-item v-for="n in 3" :key="n" dense clickable>
                                <q-item-section>3rd level Label</q-item-section>
                              </q-item>
                            </q-list>
                          </q-menu>
                        </q-item>
                      </q-list>
                    </q-menu>
                  </q-item>

                  <q-separator />

                  <q-item clickable v-close-popup>
                    <q-item-section>Quit</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </div>

            <div class="q-ml-md cursor-pointer non-selectable">
              Edit
              <q-menu auto-close>
                <q-list dense style="min-width: 100px">
                  <q-item clickable>
                    <q-item-section>Cut</q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>Copy</q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>Paste</q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item clickable>
                    <q-item-section>Select All</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </div>

            <q-space />

            <q-btn dense flat icon="minimize" />
            <q-btn dense flat icon="crop_square" />
            <q-btn dense flat icon="close" />
          </q-bar>

          <q-splitter v-model="splitterModel" style="height: 400px">

            <template v-slot:before>
              <div class="q-pa-md">
                <div class="text-h4 q-mb-md">{{ item.fileid }}</div>

                <div class="text-h5 q-mb-md">{{ $t('common.layers') }}</div>
                <q-list bordered class="rounded-borders">
                  <q-expansion-item v-for="x in item.layers" :key="x.id" expand-separator icon="perm_identity"
                    :label="x.id" :caption="'Current Value: ' + x.val">
                    <q-card>
                      <q-card-section>
                        <q-input v-model="x.val" :label="x.id" />
                      </q-card-section>
                    </q-card>
                  </q-expansion-item>
                </q-list>

                <div class="fit row wrap justify-center items-start content-start q-mt-md">
                  <q-btn color="primary" label="Save" @click="saveLayer()" />
                </div>
              </div>
            </template>

            <template v-slot:after>
              <div class="q-pa-md flex flex-col justify-center content-center">
                <div v-html="svgContent" style="max-height: 350px; height: 350px;"></div>
                <!-- <q-img :src="templateImageUrl" spinner-color="white" style="height: 400px; max-width: 400px" /> -->
              </div>
            </template>

          </q-splitter>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { api } from 'boot/axios'
import { ref } from 'vue';
import parameters from "src/config/parameters";

export default {
  created() {
    this.getItem();
  },
  data() {
    return {
      splitterModel: ref(50),
      templateImageUrl: null,
      svgContent: "",
      item: null,
      layers: [],
      selectedLayer: null,
      attrs: [],
      columns: [
        {
          name: "key",
          label: "Key",
          field: (row) => row.key,
          sortable: true
        },
        {
          name: "value",
          label: "Value",
          field: (row) => row.value,
          sortable: true
        }
      ]
    }
  },
  methods: {
    getItem() {
      api.get(`/user-templates/${this.$route.params.id}`, { useAuth: true })
        .then(result => {
          console.log(result);
          let response = result.data
          if (response.status == 1) {
            this.item = response.data;
            this.layers = this.item.layers;
            this.attrs = Object.entries(this.item.layers[0].attrs).map(([key, value]) => ({
              key,
              value
            }));
            // Load Preview
            this.templateImageUrl = parameters.base_url + `/files/download/${this.item.fileid}`;
            fetch(this.templateImageUrl)
              .then((response) => response.text())
              .then((data) => {
                // set the svgContent to the data
                this.svgContent = data;
              })
              .catch((error) => {
                // handle the error
                console.error(error);
              });
          }
        })
        .catch(error => {
          console.log(error);
          this.$q.notify({ color: 'negative', message: 'Loading data failed: ' + error })
        })
    },

    saveLayer() {
      if (!this.item || !this.item.layers) {
        console.log('Nothing to save.')
        return;
      }

      api.get(`/user-templates/edit-layer/${this.$route.params.id}`,
        {
          useAuth: true,
          params: {
            "layer_name": this.item.layers[0].id,
            "layer_val": this.item.layers[0].val
          }
        })
        .then(result => {
          console.log(result);
          let response = result.data
          if (response.status == 1) {
            this.getItem();
          }
        })
        .catch(error => {
          console.log(error);
          this.$q.notify({ color: 'negative', message: 'Loading data failed: ' + error })
        })
    }
  },
  components: {}
}
</script>
