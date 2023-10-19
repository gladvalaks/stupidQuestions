class Manager {
    questions = [];//в идеале с запроса
    table = new Table(document.querySelector(".forum-table"));
    number = 10;
    constructor() {
        this.listener = new EventListener();
        this.form = new Form(this.listener);
        this.initListener();
    }
    initListener() {
        this.listener.subscribeListener("newQuestionUpload", (question) => {
            this.addToQuestions(question);
            this.table.addNewRow(question);
        });

        this.listener.subscribeListener("newQuestionUpload", this.form.clearInputs.bind(this.form));
    }
    addToQuestions(question){
        question.id = this.questions.length
        this.questions.push(question);

    }
    getLastId() {
        return this.questions.length - 1;
    }
}

class EventListener{
     EventList = {};
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
}


class Form {
    constructor(listener) {
        this.listener = listener;
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
        this.listener.publishListener("newQuestionUpload",questionForPush);


    }
    answerUpload(){

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
            if (element == "id"){
                $newRow.dataset.id = question[element];
                continue;
            }
            const $cell = $newRow.insertCell(counter++);
            if (question[element] == "" && element =="answer"){
                const $buttonAnswer = document.createElement("BUTTON");
                $buttonAnswer.innerHTML = "Введите правильный ответ";
                $cell.appendChild($buttonAnswer);
                
            }
            else{
                $cell.appendChild(document.createTextNode(question[element]));
            }
        }
    }
    addAnswer(id){

    }

}
const manager = new Manager();