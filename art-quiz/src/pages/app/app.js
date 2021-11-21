import './basis.css';
import StartPage from '../start/start.js';
import SettingsPage from '../settings/settings.js'
import QuestionsPage from '../questions/questions.js'
import CategoriesPage from '../categories/categories.js'
import ResultsPage from '../results/results.js'

import {Quiz, AuthorsQuiz, PicturesQuiz} from '../../core/templates/quiz.js'

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

        if (hash === 'categories') {
            CategoriesPage.renderCategories(this.quiz);
        };

        if (hash === 'questions') {
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
            this.quiz = new AuthorsQuiz();
        });

        const picturesQuizButton = document.getElementById('pictures_quiz');
        picturesQuizButton.addEventListener('click', () => {
            this.quiz = new PicturesQuiz();
        });
    }
}

export default App