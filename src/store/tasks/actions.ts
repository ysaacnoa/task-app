import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { TaskStateInterface, Task } from './state';
import { filterTasksLogic } from '../../services/filterTasksLogic';

const actions: ActionTree<TaskStateInterface, StateInterface> = {
  
  addTask ({ commit }, task: Task) {
    commit('addTask', task);
  },

  completeTask({commit}, taskId: string){
    commit('completeTask', taskId);
  },

  deleteTask({commit}, taskId: string){
    commit('deleteTask', taskId);
  },
  
  updateTask({ commit }, updatedTask: Task) {
    commit('updateTask', updatedTask);
  },

  filterTasks({ commit, state }, filter: string) {
    const filteredTasks = filterTasksLogic(state.tasks, filter);
    commit('filterTasks', filteredTasks);
  },


};

export default actions;
