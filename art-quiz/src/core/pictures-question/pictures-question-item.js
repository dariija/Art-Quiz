import './pictures-question-item.css'
import Answer from '../templates/answer';
import Button from '../button/button.js';

class PicturesQuestionItem {
    constructor(question, fullInfo, quiz) {
        this.container = document.createElement('div');

        this.text = question.text;
        this.answers = question.answers;
        this.quiz = quiz;
    }

    render() {
        let shuffledAnswers = Answer.shuffleAnswers(this.answers);

        let questionEl = document.createElement('p');
        questionEl.classList.add('questions-page__question');
        questionEl.textContent = this.text;

        let answersContainer = document.createElement('div');
        answersContainer.classList.add('pictures-questions-cards');

        for (let i = 0; i < this.answers.length; i++) {
            let pictureCard = document.createElement('div');
            pictureCard.classList.add('pictures-question-card-item');
            pictureCard.dataset.answerCorrectness = shuffledAnswers[i].correctness;

            let pictureImage = document.createElement('div');
            pictureImage.classList.add("pictures-question-card-item__image");
            pictureImage.style.backgroundImage = `url("../src/data-images/full/${shuffledAnswers[i].value}full.jpg")`;

            pictureCard.append(pictureImage);
            answersContainer.append(pictureCard);
        };
        Button.enableShowAnswer(answersContainer.children, this.quiz);

        this.container.append(questionEl, answersContainer);
        return this.container
    }
}

export default PicturesQuestionItem