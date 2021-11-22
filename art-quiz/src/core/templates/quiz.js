import dataImages from '../../data-images/images.js';
import {Question, AuthorQuestion, PicturesQuestion} from './question.js';
import AuthorQuestionItem from '../authors-question-item/authors-question-item.js'
import PicturesQuestionItem from '../pictures-question/pictures-question-item.js';
import Answer from './answer.js';
import Category from './category.js';
import App from '../../pages/app/app.js';
import ModalAnswer from '../modal-answer/modal-answer.js'
import Button from '../button/button.js';
import ModalResult from '../modal-result/modal-result.js';
import QuestionsPage from '../../pages/questions/questions.js';

function getDataByType(type) {
    const dataByType = [];
    if (type === 'authors') {
        dataImages.forEach((elem, index) => {
            if (index % 2 === 0) dataByType.push(elem)
        })
    } else if (type === 'pictures') {
        dataImages.forEach((elem, index) => {
            if (index % 2 === 1) dataByType.push(elem)
        })
    };
    return dataByType
}

class Quiz {

    constructor(settings, type) {
        this.settings = settings;
        this.type = type;
        this.data = getDataByType(this.type);
        this.categories = Category.divideDataByCategories(this.data);
        this.questions = Question.createQuestions(this.categories, this.type);

        this.currentCategoryGame;
        this.currentQuestion = 0;
    }

    nextQuestion() {
        let modal = document.getElementById('modal_window');
        modal.remove();
        if(this.settings.timer.enable) QuestionsPage.resetTimer(this);

        this.currentQuestion++;
        if (this.currentQuestion < this.questions[this.currentCategoryGame].length) {
            this.renderQuestion(this.questions[this.currentCategoryGame][this.currentQuestion])
        } else this.endQuiz();
    }

    runQuiz() {
        this.categories[this.currentCategoryGame].results = 0;
        this.categories[this.currentCategoryGame].userAnswers = [];
        this.renderQuestion(this.questions[this.currentCategoryGame][this.currentQuestion])
    }

    endQuiz() {
        let sound = document.getElementById('result_sound');
        if (this.settings.valueAsNumber) sound.play();

        let result = this.categories[this.currentCategoryGame].userAnswers.filter( answer => answer).length;
        this.categories[this.currentCategoryGame].results = result;

        let container = document.body;
        let modal = new ModalResult(result).render();
        container.append(modal);

        this.currentCategoryGame = '';
        this.currentQuestion = 0;
    }

    showRightAnswer(userAnswer) {
        let sound = document.getElementById(`${userAnswer? 'right_answer_sound' : 'wrong_answer_sound'}`);
        if (this.settings.valueAsNumber) sound.play();

        let fullAnswer = this.categories[this.currentCategoryGame].data[this.currentQuestion];
        let answer = new ModalAnswer(userAnswer, fullAnswer).render();

        let container = document.body;
        container.append(answer);
        Button.enableNextQuestion(this);

        this.categories[this.currentCategoryGame].userAnswers.push(userAnswer)
    }

    startTimer() {
        let timerEl = document.getElementById('timer_time');
        this.settings.timer.timerFunc = setInterval( () => timerEl.dataset.timerTime -= 1, 1000);
    }

    stopTimer() {
        clearInterval(this.settings.timer.timerFunc)
    }
}

class AuthorsQuiz extends Quiz {
    constructor(settings, type = 'authors') {
        super(settings, type)
    }

    renderQuestion(question) {
        let container = document.getElementById('questions-page__content');
        container.innerHTML = '';

        let fullInfoQuestion = this.categories[this.currentCategoryGame].data[this.currentQuestion];
        let questionElement = new AuthorQuestionItem(question, fullInfoQuestion, this).render();
        container.append(questionElement);

        if (this.settings.timer.enable) this.startTimer();
    }
}

class PicturesQuiz extends Quiz {
    constructor(settings, type = 'pictures') {
        super(settings, type)
    }

    renderQuestion(question) {
        let container = document.getElementById('questions-page__content');
        container.innerHTML = '';

        let fullInfoQuestion = this.categories[this.currentCategoryGame].data[this.currentQuestion];
        let questionElement = new PicturesQuestionItem(question, fullInfoQuestion, this).render();
        container.append(questionElement);

        if (this.settings.timer.enable) this.startTimer();
    }
}

export {Quiz, AuthorsQuiz, PicturesQuiz}