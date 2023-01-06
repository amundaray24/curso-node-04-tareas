const { 
  showMenu,
  readInput,
  showTasks,
  selectTask,
  confirmSelection,
  deleteTask,
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
        if (empty = validateEmpty(listTasksAnswer)) break;
        await showTasks(listTasksAnswer);
        break;
      case '3': 
        const listTasksByStateDone = listTasksByState(TaskStatus.DONE);
        if (empty = validateEmpty(listTasksByStateDone)) break;
        await showTasks(listTasksByStateDone);
        break;
      case '4': 
        const listTasksByStatePending = listTasksByState(TaskStatus.PENDING);
        if (empty = validateEmpty(listTasksByStatePending)) break;
        await showTasks(listTasksByStatePending);
        break;
      case '5':
        const changeStatusTasks = listTasks();
        if (empty = validateEmpty(changeStatusTasks)) break;
        const changeStatusTaskIds = await selectTask(changeStatusTasks);
        changeStatusById(changeStatusTaskIds);
        break;
      case '6': 
        const deleteTasks = listTasks();
        if (empty = validateEmpty(deleteTasks)) break;
        const deleteTaskId = await deleteTask(deleteTasks);
        if (deleteTaskId != '-1') {
          const confirm = await confirmSelection('Are you sure?');
          if (confirm){
            deleteTaskById(deleteTaskId);
          }
        } else {
          empty = null;
        }
        break;
    }
    await pause(empty);
  } while (opt !== '0');
  console.clear();
}

const validateEmpty = (tasks) => {
  return !(Object.keys(tasks).length > 0);
}

main();