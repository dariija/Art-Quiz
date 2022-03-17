import Page from '../../core/templates/page.js'
import resultsContent from './results.m.html'
import ResultCardItem from '../../core/result-card-item/result-card-item.js';
import './results.css'

class ResultsPage extends Page {
    constructor(id) {
        super(id);
        this.container.classList.add('results')
    }

    render() {
        this.container.innerHTML = resultsContent;
        return this.container
    }

    static renderResults(quiz) {
        let container = document.getElementById('results_cards');
        for (let category of Object.values(quiz.categories)) {
            for (let i = 0; i < category.data.length; i++) {
                let resultCard = new ResultCardItem(category.data[i], category.userAnswers[i] || false);
                container.append(resultCard.render());
            }
        };
        ResultCardItem.enableInfoAnimation(container.children, quiz);
    }

    static showResults() {
        let container = document.getElementById('results_cards');
        container.classList.add('fadeIn');
    }
}

export default ResultsPage