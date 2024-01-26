import { Task } from '../store/tasks/state'


export function addStarredTask(allTasks: Task[], currentStarredTasks: Task[]): Task[] {
  currentStarredTasks = allTasks.filter(task => task.starred);
  return currentStarredTasks;
}