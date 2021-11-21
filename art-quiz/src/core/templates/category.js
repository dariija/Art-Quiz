import '../modal-answer/modal-answer.css'

class Category {
    constructor(categoryName, data) {
        this.name = categoryName;
        this.data = data;

        this.results = 0;
        this.userAnswers = [];
    }

    static divideDataByCategories(data) {
        const dataByCategories = {};
        let startChunk = 0;
        let endChunk = 10;

        for (let i = 1; i <= (data.length/10); i++) {
            let categoryNumber = i;
            let categoryName = `Category ${categoryNumber}`;
            let chunk = data.slice(startChunk, endChunk);
            dataByCategories[categoryName] = new Category(categoryName, chunk);
        
            startChunk += 10;
            endChunk += 10;
        }
        return dataByCategories
    }

    static enableCategoryQuiz(categoryCards, quiz) {
        [...categoryCards].forEach( categoryCard => {
            categoryCard.addEventListener('click', (event) => {
                let categoryName = event.currentTarget.dataset.categoryName;
                quiz.currentCategoryGame = categoryName;
            })
        });
    }
}

export default Category