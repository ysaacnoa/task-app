import { Task } from '../store/tasks/state';

export function filterTasksLogic(tasks: Task[], filter: string): Task[] {
  let filteredTasks = [...tasks];

  if (filter === 'all') {
    return filteredTasks;
  } else if (filter === 'pending') {
    filteredTasks = filteredTasks.filter(task => !task.completed);
    return filteredTasks;
  } else if (filter === 'completed') {
    filteredTasks = filteredTasks.filter(task => task.completed);
    return filteredTasks;
  } else {
    return filteredTasks;
  }
}