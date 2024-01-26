<template>
  <q-page class="column ">
    <FormTasks/>
    <section class="margin-page">
      <section class="bg-grey-10 q-pa-sm q-px-xl q-mt-lg q-mx-xl">
        <p class="q-my-md text-h5 text-weight-bold ">Tareas: </p>
        <Tasks />
      </section>
    </section>
  </q-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import FormTasks from 'src/components/FormTasks.vue';
import Tasks from '../components/Tasks.vue';
@Component({
  components: { Tasks, FormTasks }
})
export default class PageIndex extends Vue {

};

</script>

<style scoped>
.margin-page{
  margin-inline: 6rem;
}
</style>
