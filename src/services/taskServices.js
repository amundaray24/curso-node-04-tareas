const { v4: uuidv4 } = require('uuid');

const Task = require('../models/task');
const TaskStatus = require('../models/taskStatus');
const { saveData, listData } = require('../db/fileHandler');

let data = {};

const initialLoad = () => {
  data = listData();
}

const createTask = (description = '') => {
  const task = new Task(uuidv4(),description,TaskStatus.PENDING, new Date().toLocaleString() ,null);
  data[task.id] = task;
  saveData(JSON.stringify(data));
  return task
}

const listTasks = () => {
  return data;
}

const listTasksByState = ( status ) => {
  const tasks = Object.keys(data)
  .filter((key) => data[key].status === status)
  .reduce( (object, key) => {
    object[key] = data[key];
    return object
  },{});
  return tasks;
}

const deleteTaskById = ( id ) => {
  delete data[id];
  saveData(JSON.stringify(data));
}

const changeStatusById = ( id, status = TaskStatus.DONE ) => {
  data[id].status = status;
  data[id].completedDate = (status === TaskStatus.DONE) ? new Date().toLocaleString() : null;
  saveData(JSON.stringify(data));
}

module.exports = {
  initialLoad,
  createTask,
  listTasks,
  listTasksByState,
  deleteTaskById,
  changeStatusById
}