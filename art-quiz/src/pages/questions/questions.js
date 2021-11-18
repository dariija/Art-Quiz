import Page from '../../core/templates/page.js'
import questionsContent from './questions.m.html'
import './questions.css'

class QuestionsPage extends Page {
    constructor(id) {
        super(id);
        this.container.classList.add('questions')
    }

    render() {
        this.container.innerHTML = questionsContent;
        return this.container
    }
}

export default QuestionsPage