class Button {
    constructor(classes, answer) {
        this.container = document.createElement('button');
        this.container.textContent = answer.value;
        this.classes = classes;
        this.correctness = answer.correctness;
    }

    static enableShowAnswer(buttons, quiz) {
        [...buttons].forEach( button => {
            button.addEventListener('click', () => {
                button.dataset.answerCorrectness === 'true'? quiz.showRightAnswer(true) : quiz.showRightAnswer(false);
            })
        });
    }

    static enableNextQuestion(quiz) {
        let button = document.getElementById('next_question');
        button.addEventListener('click', () => {
            quiz.nextQuestion()
        })
    }

    static enableEndQuiz(quiz) {
        let button = document.getElementById('end_category_quiz');
        button.addEventListener('click', () => {
            // quiz.()
        })
    }

    // static enableExitQuiz(quiz) {

    // }

    render() {
        this.container.classList.add(...this.classes);
        this.container.dataset.answerCorrectness = this.correctness;
        return this.container
    }
}

export default Button