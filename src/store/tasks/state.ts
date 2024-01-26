export type Task = {
  id: string;
  text: string;
  largeText: string;
  completed: boolean;
  starred: boolean;
}

export interface TaskStateInterface{
  tasks: Task[];
  filteredTasks: Task[]; 
  starredTasks: Task[];
}


function state(): TaskStateInterface {
  //si hay algo en localstorage lo guardamos en tasksFromLocalStorage sino que sea vacio
  const storedTasks: string | null = localStorage.getItem('tasks');
  const tasksFromLocalStorage: Task[] = storedTasks 
    ? (JSON.parse(storedTasks) as Task[]) 
    : [];

  return {
    tasks: tasksFromLocalStorage,
    filteredTasks: tasksFromLocalStorage,
    starredTasks: []
  }
}

export default state;
