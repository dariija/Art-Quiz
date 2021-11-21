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
    constructor(type) {
        this.type = type;
        this.data = getDataByType(this.type);
        this.categories = Category.divideDataByCategories(this.data);
        this.questions = Question.createQuestions(this.categories, this.type);

        this.currentCategoryGame;
        this.currentQuestion = 0;


        // this.settings = new SettingsQuiz()
    }

    nextQuestion() {
        let modal = document.getElementById('modal_window');
        modal.remove();
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
        let result = this.categories[this.currentCategoryGame].userAnswers.filter( answer => answer).length;
        this.categories[this.currentCategoryGame].results = result;

        let container = document.body;
        let modal = new ModalResult(result).render();
        container.append(modal);


        this.currentCategoryGame = '';
        this.currentQuestion = 0;
    }

    showRightAnswer(userAnswer) {
        let fullAnswer = this.categories[this.currentCategoryGame].data[this.currentQuestion];
        let answer = new ModalAnswer(userAnswer, fullAnswer).render();

        let container = document.body;
        container.append(answer);
        Button.enableNextQuestion(this);

        this.categories[this.currentCategoryGame].userAnswers.push(userAnswer)
    }
}

class AuthorsQuiz extends Quiz {
    constructor(type = 'authors') {
        super(type)
    }

    renderQuestion(question) {
        let container = document.getElementById('questions-page__content');
        container.innerHTML = '';

        let fullInfoQuestion = this.categories[this.currentCategoryGame].data[this.currentQuestion];
        let questionElement = new AuthorQuestionItem(question, fullInfoQuestion, this).render();
        container.append(questionElement);
    }
}

class PicturesQuiz extends Quiz {
    constructor(type = 'pictures') {
        super(type)
    }

    renderQuestion(question) {
        let container = document.getElementById('questions-page__content');
        container.innerHTML = '';

        let fullInfoQuestion = this.categories[this.currentCategoryGame].data[this.currentQuestion];
        let questionElement = new PicturesQuestionItem(question, fullInfoQuestion, this).render();
        container.append(questionElement);
    }
}

export {Quiz, AuthorsQuiz, PicturesQuiz}