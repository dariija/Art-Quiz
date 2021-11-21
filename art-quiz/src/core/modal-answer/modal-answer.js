import './modal-answer.css'

class ModalAnswer {
    constructor(userAnswer, rightAnswer) {
        this.container = document.createElement('div');
        this.container.classList.add('modal-answer');

        this.rightAnswer = rightAnswer;
        this.userAnswer = userAnswer;
        this.cover = `../src/data-images/img/${rightAnswer.imageNum}.jpg`;
    }

    render() {
        let c = document.createElement('div');
        c.classList.add('modal', 'modal_show');
        c.id = 'modal_window'
        let b = document.createElement('div')
        b.classList.add('modal-container');
        let a = document.createElement('div')
        a.classList.add('modal-container__content');

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
        a.append(this.container);
        b.append(a);
        c.append(b)

        return c
    }
}

export default ModalAnswer
