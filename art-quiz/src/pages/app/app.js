import './basis.css';
import StartPage from '../start/start.js';
import SettingsPage from '../settings/settings.js'
import QuestionsPage from '../questions/questions.js'
import CategoriesPage from '../categories/categories.js'
import ResultsPage from '../results/results.js'

class App {
    constructor() {
        this.container = document.body;

        this.pages = {
            'start': new StartPage('start-page'),
            'settings': new SettingsPage('settings-page'),
            'questions': new QuestionsPage('questions-page'),
            'categories': new CategoriesPage('categories-page'),
            'results': new ResultsPage('results-page'),
        }
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
    }

    run() {
        this.renderPage('start');
        this.enableRootChange();
    }
}

export default App