class Task {
  constructor(id, description,status,creationDate,completedDate) {
    this.id = id;
    this.description = description;
    this.status = status;
    this.creationDate = creationDate;
    this.completedDate = completedDate;
  }
}

module.exports = Task;