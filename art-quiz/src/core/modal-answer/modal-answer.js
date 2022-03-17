import './modal-answer.css'

class ModalAnswer {
    constructor(userAnswer, rightAnswer) {
        this.container = document.createElement('div');
        this.container.classList.add('modal-answer');

        this.rightAnswer = rightAnswer;
        this.userAnswer = userAnswer;
        this.cover = require(`../../data-images/img/${rightAnswer.imageNum}.jpg`);
    }

    render() {
        let modalWindow = document.createElement('div');
        modalWindow.classList.add('modal', 'modal_show', 'fadeOut');
        modalWindow.id = 'modal_window'
        let modalContainer = document.createElement('div')
        modalContainer.classList.add('modal-container');
        let modalContent = document.createElement('div')
        modalContent.classList.add('modal-container__content');

        let indicatorClass = this.userAnswer? 'answer-indicator_right' : 'answer-indicator_wrong';
        let template = `
            <div class="modal-answer__picture-info">
                <div class="picture-description">
                    <div class="picture-description__image" style="background-image: url(${this.cover})">
                        <div class="answer-indicator ${indicatorClass}"></div>
                    </div>
                    <p class="picture-description__name">${this.rightAnswer.name}</p>
                    <p class="picture-description__author">${this.rightAnswer.author}, ${this.rightAnswer.year}</p>
                </div>
            </div>
            <button class="button button_basic button_basic_dark button_pink modal-answer__button" id="next_question">Next</button>
        `;

        this.container.innerHTML = template;
        modalContent.append(this.container);
        modalContainer.append(modalContent);
        modalWindow.append(modalContainer)
        return modalWindow
    }
}

export default ModalAnswer
