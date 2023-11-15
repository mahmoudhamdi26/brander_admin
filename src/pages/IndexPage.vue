<template>
  <q-page class="flex flex-center">
    <div class="fit column no-wrap items-center">
      <img
        alt="Quasar logo"
        src="~assets/quasar-logo-vertical.svg"
        style="width: 200px; height: 200px"
      >
      <q-btn class="q-mt-lg" flat color="primary" label="Logout" @click="logout()" />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useAuthStore } from "stores/auth";
const authStore = useAuthStore();

export default defineComponent({
  name: 'IndexPage',

  methods: {
    logout(){
      authStore.logout();
      this.$router.push({name: "Login"});
    }
  }

})
</script>
