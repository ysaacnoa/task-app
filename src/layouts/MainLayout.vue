<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="header">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title class="text-weight-bold text-h5">
          Task List App
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Navegacion
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">

import { Vue, Component } from 'vue-property-decorator';
import EssentialLink from 'components/EssentialLink.vue'

const linksData = [
  {
    title: 'Todas las tareas',
    icon: 'fa-solid fa-list-check',
    link: '/'
  },
  {
    title: 'Tareas Importantes',
    icon: 'fa-solid fa-star',
    link: '/importants'
  },
];

@Component({
  components: { EssentialLink }
})
export default class MainLayout extends Vue {
  leftDrawerOpen = false;
  essentialLinks = linksData;
}

</script>


<style scoped>
.header{
  background: rgba(0, 0, 0, 0);
  backdrop-filter: blur(10px);
}
</style>