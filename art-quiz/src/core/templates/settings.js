class Settings {
    constructor(settings = {volume: '0', timer: {enable: false, value: '0'}}) {
        this.volume = settings.volume;
        this.timer = {
            enable: settings.timer.enable,
            value: settings.timer.value
        }
    }
}

export default Settings