import './category-card-item.css'

class CategoryCardItem {
    constructor(categoryName, rightAnswersNum, coverIndex) {
        this.container = document.createElement('div');
        this.container.classList.add('category-card-item');

        this.categoryName = categoryName;
        this.rightAnswers = rightAnswersNum;
        this.cover = `./src/data-images/img/${coverIndex}.jpg`;
    }

    render() {
        let template = `
            <div class="category-card-item__header">
                <span class="category-card-item__category-name">${this.categoryName}</span>
                <div class="category-card-item__questions-info">
                    <span class="category-card-item__passed-questions">${this.rightAnswers}</span>
                    <span class="delimiter">/</span>
                    <span class="category-card-item__total-questions">10</span>
                </div>
            </div>
            <a class="category-card-item__image" href="#questions" style="background-image: url(${this.cover}); filter: grayscale(${1 - (this.rightAnswers/10)})"></a>
        `;
        this.container.innerHTML = template;
        this.container.dataset.categoryName = this.categoryName;
        this.container.dataset.categoryResult = this.rightAnswers;
        return this.container
    }
}

export default CategoryCardItem 