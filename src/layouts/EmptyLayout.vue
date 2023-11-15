<template>
  <q-layout view="hHh LpR fFf">

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer reveal height-hint="80px">
      <EmptyFooterComponent/>
    </q-footer>

  </q-layout>
</template>

<script>
import EmptyFooterComponent from 'src/components/tiles/EmptyFooterComponent.vue';
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'EmptyLayout',
  components: {
    EmptyFooterComponent,
  }
})
</script>
