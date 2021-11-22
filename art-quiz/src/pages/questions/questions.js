import Page from '../../core/templates/page.js'
import questionsContent from './questions.m.html'
import './questions.css'

class QuestionsPage extends Page {
    constructor(id) {
        super(id);
        this.container.classList.add('questions')
    }

    render() {
        this.container.innerHTML = questionsContent;
        return this.container
    }

    static renderTimer(quiz) {
        if (!quiz.settings.timer.enable) return
        let timerContainer = document.getElementById('timer_container');
        let timer = document.createElement('div');
        timer.classList.add('timer');

        let timerRange = document.createElement('input');
        timerRange.id = 'timer_range';
        timerRange.type = 'range';
        timerRange.classList.add('timer__scale');
        timerRange.min = 0;
        timerRange.max = quiz.settings.timer.value;
        timerRange.value = quiz.settings.timer.value;

        let timerTime = document.createElement('span');
        timerTime.id = 'timer_time';
        timerTime.dataset.timerTime = `${quiz.settings.timer.value}`;
        timerTime.textContent = `0:${quiz.settings.timer.value < 10? '0'+quiz.settings.timer.value : quiz.settings.timer.value}`;

        let observerTime = new MutationObserver( () => {
            timerTime.textContent = `0:${timerTime.dataset.timerTime < 10? '0'+ timerTime.dataset.timerTime : timerTime.dataset.timerTime}`;
            timerRange.value = timerTime.dataset.timerTime;
            if (timerRange.value === '0') {
                quiz.stopTimer();
                quiz.showRightAnswer(false);
            }
        });
        observerTime.observe(timerTime, {
            attributes: true,
        });

        timer.append(timerRange, timerTime);
        timerContainer.append(timer);
    }

    static resetTimer(quiz) {
        let timerRange = document.getElementById('timer_range');
        let timerTime = document.getElementById('timer_time');

        timerRange.value = quiz.settings.timer.value;
        timerTime.dataset.timerTime = quiz.settings.timer.value;
    }

    static enableAudio(quiz) {
        let rightSound = document.getElementById('right_answer_sound');
        let wrongSound = document.getElementById('wrong_answer_sound');
        let sound = document.getElementById('result_sound');

        rightSound.volume = quiz.settings.volume;
        wrongSound.volume = quiz.settings.volume;
        sound.volume = quiz.settings.volume;
    }

    static enableButtons(quiz) {
        let exitButton = document.getElementById('exit_button');
        exitButton.addEventListener('click', () =>{
            if (quiz.settings.timer.enable) {
                quiz.stopTimer()
            }
        })
    }
}

export default QuestionsPage