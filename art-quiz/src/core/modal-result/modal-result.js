import './modal-result.css'

class ModalResult {
    constructor(correctAnswersNum, userAnswers) {
        this.container = document.createElement('div');
        this.container.classList.add('modal-end-game');
        this.correctAnswersNum = correctAnswersNum;
    }

    render() {
        let modalWindow = document.createElement('div');
        modalWindow.classList.add('modal', 'modal_show', 'fadeOut', 'fadeIn');
        modalWindow.id = 'modal_window'
        let modalContainer = document.createElement('div')
        modalContainer.classList.add('modal-container');
        let modalContent = document.createElement('div')
        modalContent.classList.add('modal-container__content');

        let template = `
            <div class="modal-end-game__image"></div>
            <p class="modal-end-game__text">${this.correctAnswersNum > 0? 'Congratulations!' : 'Maybe you should try again?'}</p>
            <div class="modal-end-game__result">
                <span class="modal-end-game__answered-questions-number">${this.correctAnswersNum}</span>
                <span>/</span>
                <span class="modal-end-game__all-questions-number">10</span>
            </div>
            <a href="#categories">
                <button class="button button_basic button_basic_dark button_pink modal-end-game__button" id="end_category_quiz">To categories</button>
            </a>
        `;

        this.container.innerHTML = template;
        modalContent.append(this.container);
        modalContainer.append(modalContent);
        modalWindow.append(modalContainer)
        return modalWindow
    }
}

export default ModalResult