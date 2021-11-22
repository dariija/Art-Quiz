import './basis.css';
import StartPage from '../start/start.js';
import SettingsPage from '../settings/settings.js'
import QuestionsPage from '../questions/questions.js'
import CategoriesPage from '../categories/categories.js'
import ResultsPage from '../results/results.js'
import {Quiz, AuthorsQuiz, PicturesQuiz} from '../../core/templates/quiz.js'
import Settings from '../../core/templates/settings';

class App {
    constructor() {
        this.container = document.body;
        this.pages = {
            'start': new StartPage('start-page'),
            'settings': new SettingsPage('settings-page'),
            'questions': new QuestionsPage('questions-page'),
            'categories': new CategoriesPage('categories-page'),
            'results': new ResultsPage('results-page'),
        };
        this.settings = localStorage.getItem('appSettings')? JSON.parse(localStorage.getItem('appSettings')) : new Settings();
        this.quiz;
    }

    enableRootChange() {
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.slice(1);
                this.renderPage(hash)
        })
    }

    renderPage(hash) {
        const pageHTML = this.pages[hash].render();
        this.container.innerHTML = '';
        this.container.append(pageHTML);

        if (hash === 'start') {
            this.enableQuiz();
        };

        if (hash === 'settings') {
            SettingsPage.enableSettings(this);
            SettingsPage.checkSettings(this);
        };

        if (hash === 'categories') {
            this.saveData();
            CategoriesPage.renderCategories(this.quiz);
        };

        if (hash === 'questions') {
            QuestionsPage.enableButtons(this.quiz);
            if (this.settings.timer) {
                QuestionsPage.renderTimer(this.quiz)
            };
            if (this.settings.valueAsNumber) {
                QuestionsPage.enableAudio(this.quiz)
            };
            this.quiz.runQuiz();
        }
    }

    run() {
        this.renderPage('start');
        this.enableRootChange();
    }

    enableQuiz() {
        const authorQuizButton = document.getElementById('authors_quiz');
        authorQuizButton.addEventListener('click', () => {
            if (localStorage.getItem('authorsQuiz')) {
                let quiz = JSON.parse(localStorage.getItem('authorsQuiz'));
                Object.setPrototypeOf(quiz, AuthorsQuiz.prototype);
                this.quiz = quiz;
                this.quiz.settings = this.settings;
            } else this.quiz = new AuthorsQuiz(this.settings);
        });

        const picturesQuizButton = document.getElementById('pictures_quiz');
        picturesQuizButton.addEventListener('click', () => {
            if (localStorage.getItem('picturesQuiz')) {
                let quiz = JSON.parse(localStorage.getItem('picturesQuiz'));
                Object.setPrototypeOf(quiz, PicturesQuiz.prototype);
                this.quiz = quiz;
                this.quiz.settings = this.settings;
            } else this.quiz = new PicturesQuiz(this.settings);
        });
    }

    saveData() {
        localStorage.setItem(`${this.quiz.type}Quiz`, JSON.stringify(this.quiz));
    }
}

export default App