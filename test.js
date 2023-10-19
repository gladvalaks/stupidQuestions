
class Forum {
  questions = {
    0: {
      userName: "Kesha",
      question: "Как не биться головой об стену",
      answer: "Такого быть не может"
    },
    1: {
      userName: "Kesha",
      question: "Как не убиться об стену",
      answer: "Нужно убиться до стены"
    }
  }//Будет браться из запроса
  

  createNewQuestion() {
    if (this.$userNameInput.value && this.$userQuestionInput.value) {
      const newId = this.getLastId() + 1;
      this.questions[newId] = {
        userName: this.$userNameInput.value,
        question: this.$userQuestionInput.value,
        answer: ""
      }
      this.clearInputs();
      this.addNewRow(newId);
    }
  }

  getLastId() {
    Object.keys(this.questions);
    return keys.length - 1;
  }
  addNewRow(id) {
    let counter = 0;
    const $newRow = this.$table.insertRow();
    for (let value in this.questions[id]) {
      const $cell = $newRow.insertCell(counter++);
      $cell.appendChild(document.createTextNode(this.questions[id][value]));
    }
  }
  renderBaseTableRow() {
    for (let id in this.questions) {
      this.addNewRow(id);
    }
  }
  init() {
    this.renderBaseTableRow();
    this.$submitButton.addEventListener("click", this.createNewQuestion.bind(this));
  }
}
const forum = new Forum(document.querySelector("#forum-table"));




