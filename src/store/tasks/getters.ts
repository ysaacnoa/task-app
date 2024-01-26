import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { TaskStateInterface } from './state';

const getters: GetterTree<TaskStateInterface, StateInterface> = {
  completedTasks: state => state.tasks.filter(task=>task.completed),
  pendingTasks: state => state.tasks.filter(task=>!task.completed),
};

export default getters;
