class Manager {
    questions = [];//в идеале с запроса
    form = new Form(this);
    table = new Table(document.querySelector(".forum-table"));
    number = 10;
    constructor() {
        this.EventList = {};
        this.initListener();
    }
    initListener() {
        this.subscribeListener("newQuestionUpload", this.table.addNewRow.bind(this.table));
        this.subscribeListener("newQuestionUpload", this.form.clearInputs.bind(this.form));
    }
    subscribeListener(event, callback) {
        if (!this.EventList[event]) {
            this.EventList[event] = [];
        }
        this.EventList[event].push(callback)
    }
    publishListener(event, params = []) {
        if (!this.EventList[event]) {
            return;
        }
        this.EventList[event].forEach(callback => callback(params));
    }
    getLastId() {
        return this.questions.length - 1;
    }


}



class Form {
    constructor(manager) {
        this.manager = manager;
        this.init();
        this.initEventListener();
    }
    init() {
        this.$submitButton = document.querySelector("[data-name = 'submit-button'")
        this.$userNameInput = document.querySelector("[data-name = 'user-name']");
        this.$userQuestionInput = document.querySelector("[data-name = 'user-question']");
    }
    initEventListener() {
        this.$submitButton.addEventListener("click", this.createNewQuestion.bind(this));
    }
    clearInputs() {
        this.$userNameInput.value = "";
        this.$userQuestionInput.value = "";
    }
    isFormValidate() {
        if (this.$userNameInput.value && this.$userQuestionInput.value) {
            return true;
        }
        return false;
    }
    createErrorFormText() {
        alert("Необходимо заполнить 2 поля");
    }
    createNewQuestion() {
        if (!this.isFormValidate()) {
            return this.createErrorFormText();
        }
        let questionForPush = {
            username: this.$userNameInput.value,
            question: this.$userQuestionInput.value,
            answer: ""
        };

        manager.questions.push(questionForPush);
        manager.publishListener("newQuestionUpload",questionForPush);
    }
}



class Table {
    constructor($table) {
        this.$table = $table;
    }
    addNewRow(question) {
        let counter = 0;
        const $newRow = this.$table.insertRow();
        for (let element in question) {
            const $cell = $newRow.insertCell(counter++);
            $cell.appendChild(document.createTextNode(question[element]));
        }
    }

}
const manager = new Manager();