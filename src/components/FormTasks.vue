<template>
  <section class=" q-pa-lg q-mt-md container">
    <section class="row size-container">
      <form @submit.prevent="addNewTask" class=" q-mr-xl q-px-sm q-pb-md ">
        
        <section class=" bg-grey-10 q-mr-xl q-mb-sm q-px-sm q-pb-lg row justify-center">
          <section class="column q-pa-sm">
            <div class="text-h5 text-weight-bold q-my-md">Registra tu Tarea:</div>
            <q-input filled bottom-slots 
            v-model="newTaskText" 
            label="Title task">
              <template v-slot:prepend>
                <q-icon name="fa-solid fa-list-check" />
              </template>
              <template v-slot:append>
                <q-icon name="close" @click="newTaskText = ''" class="cursor-pointer" />
              </template>
            </q-input>
            <q-btn type="submit" 
            class="glossy q-pa-xs q-mt-sm" color="primary" label="Registrar Tarea" />
          </section>
          <q-input
            class="q-mx-md q-mt-lg size-text-area"
            v-model="textareaModel"
            filled
            clearable
            type="textarea"
            label="Descripcion de tu Tarea"
          >
          <template v-slot:prepend>
            <q-icon name="fa-regular fa-file-lines" />
          </template>
          </q-input>
        </section>
        
      </form>
      <aside class="column items-center bg-grey-10  q-mt-sm q-px-lg q-py-md">
        <div class="text-h5 text-weight-bold q-my-md">Ordenar Tareas por: </div>
        <article class="row q-py-md items-center">
          <q-btn
            no-caps
            class="q-ma-sm glossy"
            v-for="filterOption in filterOptions"
            :key="filterOption.id"
            @click="changeFilter(filterOption.id)"
            v-model="selectedFilter"
            :label="filterOption.label"
            :color="filterOption.color"
          />
        </article>

      </aside>
    </section>   
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { uid } from 'quasar';
import { Task } from '../store/tasks/state';

import { mapActions } from 'vuex'

interface FormTaskComponent extends Vue{
  addTask: (task: Task) => void;
  filterTasks: (filter: string) => Task[];
}

@Component(
  {
    methods: {
    ...mapActions('tasks', ['addTask','filterTasks']),
  }
  }
)
export default class FormTasks extends Vue implements FormTaskComponent{
  addTask!: (task: Task) => void;
  filterTasks!: (filter: string) => Task[];
  newTaskText = '';
  textareaModel = '';
  selectedFilter = 'all';
  filterOptions = [
    { id: 'all', label: 'Todos', color: 'purple' },
    { id: 'pending', label: 'Pendientes', color: 'orange' },
    { id: 'completed', label: 'Completados', color: 'green' },
  ];

  //agregar tarea
  addNewTask() {
    if (this.newTaskText.trim() !== '') {
      let newId = uid();
      const newTask: Task = {
        id: newId,
        text: this.newTaskText.trim(),
        largeText: this.textareaModel,
        completed: false,
        starred: false
      };
      this.addTask(newTask);
      this.filterTasks(this.selectedFilter);
      this.newTaskText = '';
      this.textareaModel = '';
    }
  }

  changeFilter(filter: string) {
    this.selectedFilter = filter;
    this.filterTasks(filter);
  }
}

</script>

<style scoped>
.size-text-area{
  width: 274px;
}

.size-container{
  max-width: 1500px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.container{
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>