import './categories.css'
import Page from '../../core/templates/page.js'
import categoriesContent from './categories.m.html'
import CategoryCardItem from '../../core/category-card-item/category-card-item.js'
import Category from '../../core/templates/category.js'

class CategoriesPage extends Page{
    constructor(id) {
        super(id);
        this.container.classList.add('categories')
    }

    render() {
        this.container.innerHTML = categoriesContent;
        return this.container
    }

    static renderCategories(quiz) {
        let container = document.getElementById('categories_cards');
        for (let category of Object.values(quiz.categories)) {
            let categoryCard = new CategoryCardItem(category.name, category.results, category.data[0].imageNum);
            container.append(categoryCard.render());
        };
        Category.enableCategoryQuiz(container.children, quiz);
    }

    static showCategories() {
        let container = document.getElementById('categories_cards');
        container.classList.add('fadeIn');
    }
}

export default CategoriesPage