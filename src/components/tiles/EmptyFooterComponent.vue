<template>
  <q-toolbar>
    <q-toolbar-title>
    </q-toolbar-title>
    <q-space />
      <q-btn flat round dense icon="whatshot" />
      <!-- ...... -->
      <q-select
        v-model="locale"
        :options="localeOptions"
        label="Language"
        dense
        borderless
        emit-value
        map-options
        options-dense
        style="min-width: 150px"
        @update:model-value="changeLanguage"
      />
      <!-- ...... -->
  </q-toolbar>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'EmptyFooterComponent',
  setup () {
    const $q = useQuasar()
    const { locale } = useI18n({ useScope: 'global' })

    // add this method
    const changeLanguage = (val) => {
      console.log($q.lang.rtl);
      if(val == 'ar'){
        console.log('ar');
        $q.lang.set(val, true);
      }else{
        $q.lang.set(val, false);
      }
    }

    return {
      locale,
      localeOptions: [
        { value: 'en-US', label: 'English' },
        { value: 'ar', label: 'Arabic' }
      ],
      changeLanguage
    }
  },
  watch: {
    locale(lang) {
      this.$i18n.locale = lang
    }
  }

})
</script>
