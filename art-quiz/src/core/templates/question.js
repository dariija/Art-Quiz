import Answer from "./answer";
import dataImages from "../../data-images/images.js";

class Question {
    static createQuestions(data, quizType) {
        let questions = {};
        let quizTypeAuthor = (quizType === 'authors')? true : false;
        
        for (let category of Object.values(data)) {
            questions[category.name] = [];
    
            for (let i = 0; i < category.data.length; i++) {
                let answers = [];
                let rightAnswer = quizTypeAuthor? new Answer(category.data[i].author, true) : new Answer(category.data[i].imageNum, true)
                answers.push(rightAnswer);
    
                while( answers.length < 4) { 
                    if (quizTypeAuthor) {
                        let randomAnswer = dataImages[Math.floor(Math.random() * dataImages.length)].author;    
                        if (randomAnswer !== rightAnswer.value) {
                            answers.push(new Answer(randomAnswer, false))
                        }
                    } else {
                        let random = Math.floor(Math.random() * dataImages.length);
                        let randomAnswer = { 
                            author: dataImages[random].author, 
                            imageNum: dataImages[random].imageNum};
                            
                        if (randomAnswer.author !== category.data[i].author) {
                            answers.push(new Answer(randomAnswer.imageNum, false))
                        }
                    }
                }
                let question = quizTypeAuthor? new AuthorQuestion(answers) : new PicturesQuestion(answers, category.data[i].author);
                questions[category.name].push(question);
            }
        }
        return questions
    }
}

class AuthorQuestion extends Question{
    constructor(answers, text = 'Who is the author of this picture?') {
        super();
        this.text = text;
        this.answers = answers;
    }
}

class PicturesQuestion extends Question{
    constructor(answers, author) {
        super();
        this.text = `Which is ${author} picture?`;
        this.answers = answers;
    }
}

export {Question, AuthorQuestion, PicturesQuestion}