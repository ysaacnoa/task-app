import { MutationTree } from 'vuex';
import { TaskStateInterface, Task } from './state';


const mutations: MutationTree<TaskStateInterface> = {
  
  addTask ( state, task: Task) {
    state.tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
  },

  completeTask(state, taskId: string){
    const task = state.tasks.find(task => task.id === taskId);
    if(task){
      task.completed = !task.completed;
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    }
  },

  deleteTask(state, taskId: string){
    state.tasks = state.tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(state.tasks)); 
  },

  updateTask(state, updatedTask: Task) {
    const index = state.tasks.findIndex(task => task.id === updatedTask.id);
    if (index !== -1) {
      state.tasks.splice(index, 1, updatedTask);
      localStorage.setItem('tasks', JSON.stringify(state.tasks));
    }
  },
  
  filterTasks(state, tasks: Task[]) {
    state.filteredTasks = tasks;
  },


};

export default mutations;
