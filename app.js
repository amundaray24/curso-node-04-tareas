const { 
  showMenu,
  readInput,
  showTasks,
  selectTask,
  emptyList,
  pause
} = require('./src/helpers/menus');
const { 
  initialLoad,
  createTask,
  listTasks,
  listTasksByState,
  deleteTaskById,
  changeStatusById
} = require('./src/services/taskServices')
const TaskStatus = require('./src/models/taskStatus');


const main = async() => {

  
  let opt = ''
  initialLoad();
  do {
    let empty = false;
    opt = await showMenu();
    switch (opt) {
      case '1':
        const description = await readInput('Write the task description:');
        createTask(description);
        break;
    
      case '2': 
        const listTasksAnswer = listTasks();
        empty = validateEmpty(listTasksAnswer, async () => {
          await showTasks(listTasksAnswer);
        });
        break;
      case '3': 
        const listTasksByStateDone = listTasksByState(TaskStatus.DONE);
        empty = validateEmpty(listTasksByStateDone, async () => {
          await showTasks(listTasksByStateDone);
        });
        break;
      case '4': 
        const listTasksByStatePending = listTasksByState(TaskStatus.PENDING);
        empty = validateEmpty(listTasksByStatePending, async () => {
          await showTasks(listTasksByStatePending);
        });
        break;
      case '5':
        const changeStatusTasks = listTasksByState(TaskStatus.PENDING);
        empty = validateEmpty(changeStatusTasks, async () => {
          const changeStatusTaskId = await selectTask(changeStatusTasks);
          changeStatusById(changeStatusTaskId, TaskStatus.DONE);
        });
        break;
      case '6': 
        const deleteTasks = listTasks();
        empty = validateEmpty(deleteTasks, async () => {
          const deleteTaskId = await selectTask(deleteTasks);
          deleteTaskById(deleteTaskId);
        });
        break;
    }
    await pause(empty);
  } while (opt !== '0');
  console.clear();
}

const validateEmpty = (tasks, callback) => {
  if (Object.keys(tasks).length > 0) {
    callback();
  } else {
    return true;
  }
  
}

main();