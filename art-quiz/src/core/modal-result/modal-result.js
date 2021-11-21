// function getNumCorrectAnswers(answers) {
//     return answers.filter( answer => answer).length;
// }

class ModalResult {
    constructor(correctAnswersNum, userAnswers) {
        this.container = document.createElement('div');
        this.container.classList.add('modal-end-game');

        this.correctAnswersNum = correctAnswersNum;
        // this.correctAnswers = getNumCorrectAnswers(userAnswers)
    }

    // static consolationText = ['Maybe you should try again?']
    // static congratulationText = ['Well done!', 'Great job!', 'Super!', ]

    render() {

        // let random = getRandom();
        let c = document.createElement('div');
        c.classList.add('modal', 'modal_show');
        c.id = 'modal_window'
        let b = document.createElement('div')
        b.classList.add('modal-container');
        let a = document.createElement('div')
        a.classList.add('modal-container__content');

        let template = `
            <div class="modal-end-game__image"></div>
            <p class="modal-end-game__text">Congratulations!</p>
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
        a.append(this.container);
        b.append(a);
        c.append(b)

        return c
    }
}

export default ModalResult