import startContent from './start.m.html'
import Page from '../../core/templates/page.js'
import './start.css'

class StartPage extends Page{
    constructor(id) {
        super(id)
        this.container.classList.add('start')
    }

    render() {
        this.container.innerHTML = startContent;
        return this.container
    }
}

export default StartPage