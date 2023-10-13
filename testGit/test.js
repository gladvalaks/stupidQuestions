
class Forum {
  questions = {
    0: {
      userName: "Kesha",
      question: "Как не биться головой об стену",
      answer: ""
    },
    1: {
      userName: "Kesha",
      question: "Как не биться головой об стену",
      answer: "Нужно убиться до стены"
    }
  }
  $userNameInput = undefined;
  $userQuestionInput = undefined;
  constructor($table) {
    this.$table = $table;    
    this.$userNameInput = document.querySelector("[data-name = 'user-name']");
    this.init.call(this);

  }

  createNewQuestion(){

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
    console.log(this.$userNameInput)
  }
}
const forum = new Forum(document.querySelector("#forum-table"));




