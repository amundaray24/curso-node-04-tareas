const inquirer = require('inquirer');
require('colors');

const menuOptions = [
  {
    type: 'list',
    name: 'options',
    message: 'Choose one option',
    choices: [
      {value: '1' , name: `${'1.'.green} Create Task`,},
      {value: '2' , name: `${'2.'.green} List Tasks`,},
      {value: '3' , name: `${'3.'.green} List Completed Tasks`,},
      {value: '4' , name: `${'4.'.green} List Pending Tasks`,},
      {value: '5' , name: `${'5.'.green} Mark as complete Task`,},
      {value: '6' , name: `${'6.'.green} Erase Task`,},
      {value: '0' , name: `${'0.'.green} Exit`}
    ]
  }
]

const showMenu = async () => {
  console.clear();
  console.log('==============================='.green);
  console.log('====== choose one option ======'.blue);
  console.log('==============================='.green);

  const {options} = await inquirer.prompt(menuOptions);
  return options;
}

const readInput = async ( message ) => {
  const question = [
    {
      type: 'input',
      name: 'description',
      message,
      validate(value) {
        if (value.length === 0) return 'Enter a valid text';
        return true;
      }
    }
  ];

  const {description} = await inquirer.prompt(question);
  return description;
}

const showTasks = async ( tasks ) => {
  Object.keys(tasks).forEach(( key, index) => {
    const order = `${index + 1}.`.green;
    const {description, status, completedDate} = tasks[key];
    console.log(`${order} ${description} :: ${status==='PENDING' ? 'PENDING'.red : ('DONE'.green + ' :: ' + completedDate.toString().green)}`);
  })
}

const selectTask = async ( tasks ) => {
  
  let choices = [];
  Object.keys(tasks).forEach(( key, index) => {
    const order = `${index + 1}.`.green;
    const {id, description, status, completedDate} = tasks[key];
    choices.push(
      {
        value: id,
        name: `${order} ${description} :: ${status==='PENDING' ? 'PENDING'.red : ('DONE'.green + ' :: ' + completedDate.toString().green)}`
      }
    );
  });
  
  const selectOptions = [
    {
      type: 'list',
      name: 'id',
      message: 'Select',
      choices
    }
  ];
  
  const {id} = await inquirer.prompt(selectOptions);
  return id;
}

const pause = async ( empty ) => {
  const question = [
    {
      type: 'input',
      name: 'enter',
      message: empty ? `${'Empty list of tasks'.red}, push ${'ENTER'.green} to continue` : `Push ${'ENTER'.green} to continue`
    }
  ];

  console.log('\n');
  await inquirer.prompt(question);

}

module.exports = {
  showMenu,
  readInput,
  showTasks,
  selectTask,
  pause
}