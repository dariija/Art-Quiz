import Page from '../../core/templates/page.js'
import settingsContent from './settings.m.html'
import './settings.css'
import Settings from '../../core/templates/settings.js'

class SettingsPage extends Page{
    constructor(id) {
        super(id);
        this.container.classList.add('settings');
        this.timerOnEl;
        this.timerOffEl;
        this.timerValueEl
        this.timerMinusEl
        this.timerPlusEl
        this.volumeEl;
        this.volumeOnEl;
        this.volumeOffEl;
    }

    render() {
        this.container.innerHTML = settingsContent;
        return this.container
    }

    static checkSettings(app) {
        app.settings.timer.enable? this.timerOnEl.checked = true : this.timerOffEl.checked = true;
        this.timerValueEl.value = app.settings.timer.value;
        this.volumeEl.value = app.settings.volume;
    }

    static enableSettingsButtons() {
        this.timerOnEl =document.getElementById('timer_on');
        this.timerOffEl = document.getElementById('timer_off');
        this.timerValueEl = document.getElementById('timer_settings');
        this.timerMinusEl = document.getElementById('timer_settings_minus');
        this.timerPlusEl = document.getElementById('timer_settings_plus');
        this.volumeEl = document.getElementById('volume_settings');
        this.volumeOnEl = document.getElementById('volume_on');
        this.volumeOffEl = document.getElementById('volume_off');

        this.timerOnEl.addEventListener('change', () => {
            if (this.timerValueEl.value === '0') this.timerValueEl.value = 5;
        });

        this.timerOffEl.addEventListener('change', () => {
            this.timerValueEl.value = 0;
        });

        this.timerMinusEl.addEventListener('click', () => {
            this.timerMinusEl.nextElementSibling.stepDown();
            if (this.timerValueEl.value === '0') this.timerOffEl.checked = true;
        });

        this.timerPlusEl.addEventListener('click', () => {
            this.timerPlusEl.previousElementSibling.stepUp();
            if (this.timerValueEl.value !== '0') this.timerOnEl.checked = true;
        });

        this.volumeOnEl.addEventListener('click', () => {
            if(this.volumeEl.value = '0') this.volumeEl.value = '20'
        });

        this.volumeOffEl.addEventListener('click', () => {
            this.volumeEl.value = '0';
        });
    }

    static enableSettings(app) {
        SettingsPage.enableSettingsButtons();

        let defaultSettings = document.getElementById('default_settings');
        defaultSettings.addEventListener('click', () => {
            this.timerOffEl.checked = true;
            this.timerValueEl.value = 0;
            this.volumeEl.value = 0;
        });

        let saveSettings = document.getElementById('save_settings');
        saveSettings.addEventListener('click', () => {
            let settings = SettingsPage.getSettingsValues();
            app.settings = new Settings(settings);
            localStorage.setItem('appSettings', JSON.stringify(settings))
        })
    }

    static getSettingsValues() {
        let volume = this.volumeEl.value;
        let timerEnable = this.timerOnEl.checked? true : false;
        let timerValue = this.timerValueEl.value;

        return {
            volume: volume,
            timer: {
                enable: timerEnable,
                value: timerValue
            }
        }
    }
}

export default SettingsPage