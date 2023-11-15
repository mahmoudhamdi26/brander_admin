<template>
  <q-layout view="hHh LpR fFf">

    <q-header elevated class="bg-deep-purple-7 text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <!-- <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar> -->
          {{ $t('app_name') }}
        </q-toolbar-title>

        <q-btn flat dense ripple label="Logout" @click="logout()" />
      </q-toolbar>

    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <!-- drawer content -->
      <SideMenuLink to="Home" title="Dashboard" caption="Home Page" icon="home" />
      <SideMenuLink to="UsersIndex" title="Users" caption="Users and Admins" icon="user" />
      <SideMenuLink to="AddTemplate" title="Add Template" caption="Illustrator Templates" icon="school" />
      <SideMenuLink to="TemplatesIndex" title="Templates" caption="Illustrator Templates" icon="school" />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer reveal height-hint="80px" class="bg-deep-purple-7">
      <EmptyFooterComponent/>
    </q-footer>

  </q-layout>
</template>

<script>
import EmptyFooterComponent from 'src/components/tiles/EmptyFooterComponent.vue'
import { ref } from 'vue'
import { useAuthStore } from "stores/auth";
import SideMenuLink from 'src/components/SideMenuLink.vue';
const authStore = useAuthStore();

export default {
    setup() {
        const leftDrawerOpen = ref(false);
        return {
            leftDrawerOpen,
            toggleLeftDrawer() {
                leftDrawerOpen.value = !leftDrawerOpen.value;
            }
        };
    },
    methods: {
      logout(){
        authStore.logout();
        this.$router.push({name: "Login"});
      }
    },
    components: { EmptyFooterComponent, SideMenuLink }
}
</script>
