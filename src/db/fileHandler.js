const fs = require('fs');

const file = './src/db/data/tasksBBDD.json';

const listData = () => {
  return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, { encoding: 'utf-8'})) : {};
}

const saveData = (data) => {  
  fs.writeFileSync(file,data);
}

module.exports = {
  listData,
  saveData
}