import './authors-question-item.css'
import Answer from '../templates/answer';
import Button from '../button/button.js';

class AuthorsQuestionItem {
    constructor(question, fullInfo, quiz) {
        this.container = document.createElement('div');
        this.text = question.text;
        this.answers = question.answers;
        this.quiz = quiz;
        this.cover = require(`../../data-images/full/${fullInfo.imageNum}full.jpg`);
    }

    render() {
        let shuffledAnswers = Answer.shuffleAnswers(this.answers);
        let buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('authors-questions__answers-group');
        for (let i = 0; i < this.answers.length; i++) {
            let classes = 'button button_basic authors-questions__answers-item'.split(' ');
            let button = new Button(classes, shuffledAnswers[i]);
            buttonsContainer.append(button.render());
        };
        Button.enableShowAnswer(buttonsContainer.children, this.quiz);

        let template = `
            <p class="questions-page__question">${this.text}</p>
            <div class="authors-questions">
                <div class="authors-questions__image" style="background-image: url(${this.cover})"></div>
            </div>
        `;
        this.container.innerHTML = template;

        let buttonsContainerParentEl = this.container.getElementsByClassName('authors-questions')[0];
        buttonsContainerParentEl.append(buttonsContainer);
        return this.container
    }
}

export default AuthorsQuestionItem