import Page from '../../core/templates/page.js'
import categoriesContent from './categories.m.html'
import './categories.css'

class CategoriesPage extends Page{
    constructor(id) {
        super(id);
        this.container.classList.add('categories')
    }

    render() {
        this.container.innerHTML = categoriesContent;
        return this.container
    }
}

export default CategoriesPage