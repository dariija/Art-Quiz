import Page from '../../core/templates/page.js'
import resultsContent from './results.m.html'
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
}

export default ResultsPage