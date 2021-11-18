import Page from '../../core/templates/page.js'
import settingsContent from './settings.m.html'
import './settings.css'

class SettingsPage extends Page{
    constructor(id) {
        super(id);
        this.container.classList.add('settings')
    }

    render() {
        this.container.innerHTML = settingsContent;
        return this.container
    }
}

export default SettingsPage