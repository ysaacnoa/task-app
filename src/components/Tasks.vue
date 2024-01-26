<template>
  <section class=" row justify-evenly q-gutter-lg q-mb-lg">
    <q-card 
      v-for="task in filteredTasks"
      :key="task.id"
      class="my-card size-card"
    >
      <q-card-section class="text-weight-bold">
        <div class="text-h6 row justify-between ">
          {{ task.text }}
          <div>
            <q-btn
              color="purple"
              round
              size="sm"
              icon="fas fa-pencil-alt"
              @click="openEditDialog(task)"
              />
            <q-btn
              round
              size="sm"
              color="yellow"
              @click="updateStarred(task)"
            >
            <q-icon size="xs" :name="task.starred ? 'fa-solid fa-star' : 'fa-regular fa-star'" />
            </q-btn>
          </div>
          
        </div>
        
      </q-card-section>

      <q-separator dark inset/>

      <q-card-section>
        {{task.largeText}}
      </q-card-section>

      <q-card-actions class="q-pa-md">
        <q-btn dense no-caps 
          :color="task.completed ? 'positive' : 'orange'"
          @click="completeTask(task.id)"
          :disabled="task.completed"
        >
          <q-icon  class="q-mr-xs" size="xs" :name="task.completed ? 'fa-solid fa-check' : 'fa-solid fa-x'" />
           Realizada
        </q-btn>
        <q-btn dense no-caps 
          color="red-10"
          @click="deleteTask(task.id)"  
        >
        <q-icon  class="q-mr-xs" size="xs" name="fa-solid fa-trash" />
          Borrar
        </q-btn>
      </q-card-actions>
    </q-card>
    <!-- MODAL -->
    <q-dialog v-model="showEditDialog" persistent>
      <q-card class="q-pa-lg">
        <!-- Contenido del modal con la tarea seleccionada -->
        <q-card-section class="text-weight-bold q-pb-none">
          <p class="text-h6">Modificando: </p>
          <q-input filled bottom-slots 
            v-model="editedTask.text" 
            label="Title task">
              <template v-slot:prepend>
                <q-icon name="fa-solid fa-list-check" />
              </template>
              <template v-slot:append>
                <q-icon name="close" @click="editedTask.text = ''" class="cursor-pointer" />
              </template>
            </q-input>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input
            class=" size-text-area"
            v-model="editedTask.largeText"
            filled
            clearable
            type="textarea"
            label="Descripcion de tu Tarea"
          >
          <template v-slot:prepend>
            <q-icon name="fa-regular fa-file-lines" />
          </template>
          </q-input>
        </q-card-section>
        <q-card-section class="q-py-none">
          <q-toggle v-model="editedTask.completed" color="primary" label="Tarea completada"></q-toggle>
        </q-card-section>
        <q-card-actions class="q-pa-md">
          <q-btn color="primary" @click="saveChanges" >Guardar cambios</q-btn>
          <q-btn color="negative" @click="cancelEdit" >Cancelar</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapState, mapActions } from 'vuex'
import { Task } from '../store/tasks/state'


interface TaskComponent extends Vue{
  filteredTasks: Task[];
  completeTask: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
  updateTask: (updatedTask: Task) => void;
}



@Component({
  computed:{
    ...mapState('tasks', ['filteredTasks']),
  },
  methods:{
    ...mapActions('tasks', ['completeTask', 'deleteTask','updateTask'])
  }
})
export default class Tasks extends Vue implements TaskComponent {
  
  //GLOBAL STATE
  filteredTasks!: Task[];
  completeTask!: (taskId: string) => void;
  deleteTask!: (taskId: string) => void;
  updateTask!: (updatedTask: Task) => void;

  //LOCAL STATE
  newTaskText = '';
  //textarea
  textareaModel= '';
  inputFillCancelled = false;
  textareaFillCancelled = false;
  
  showEditDialog = false;
  selectedTask = {} as Task
  editedTask = { } as Task


  openEditDialog(task: Task) {
    this.selectedTask = task;
    this.editedTask = { ...task }
    this.showEditDialog = true;
  }

  saveChanges() {
    this.updateTask(this.editedTask);
    this.showEditDialog = false; 
  }

  cancelEdit() {
    this.editedTask = { ...this.selectedTask };
    this.showEditDialog = false; 
  }

  updateStarred(task: Task) {
    task.starred = !task.starred;
  }
};

</script>

<style scoped>
.size-card{
  width: 300px;
  height: auto;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.07);
}
.size-text-area{
  width: 273px;
}

</style>