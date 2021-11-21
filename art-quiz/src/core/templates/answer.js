class Answer {
    constructor(value, correctness) {
        this.value = value;
        this.correctness = correctness
    }

    static shuffleAnswers(answers) {
        for (let i = answers.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [answers[i],answers[j]] = [answers[j], answers[i]];
        };
        return answers
    }
}

export default Answer