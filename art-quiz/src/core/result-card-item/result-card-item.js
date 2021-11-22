import './result-card-item.css'

class ResultCardItem {
    constructor(cardInfo, userAnswer) {
        this.container = document.createElement('div');
        this.container.classList.add('result-card-item');

        this.cover = `url(../src/data-images/img/${cardInfo.imageNum}.jpg)`;
        this.userAnswer = userAnswer;
        this.container.dataset.userAnswer = userAnswer;
        this.cardInfo = cardInfo;
    }

    render() {
        let imageResultCard = document.createElement('div');
        imageResultCard.classList.add('result-card-item__image');
        imageResultCard.style.backgroundImage = this.cover;
        imageResultCard.style.filter = `grayscale(${this.userAnswer? '0' : '1'}) `;

        let cardInfo = document.createElement('div');
        cardInfo.classList.add('result-card-item__info', 'fadeOut');
        
        let cardInfoAuthor = document.createElement('p');
        cardInfoAuthor.classList.add('result-card-item__info-author');
        cardInfoAuthor.textContent = this.cardInfo.author;
        let cardInfoPicture = document.createElement('p');
        cardInfoPicture.classList.add('result-card-item__info-picture');
        cardInfoPicture.textContent = `${this.cardInfo.name}, ${this.cardInfo.year}`;

        cardInfo.append(cardInfoAuthor, cardInfoPicture);
        this.container.append(imageResultCard);
        this.container.append(cardInfo);
        return this.container
    }

    static enableInfoAnimation(cards) {
        [...cards].forEach( card => {
            card.addEventListener('click', (event) => {
                for (let child of card.children) {
                    if (child.classList.contains('result-card-item__info')) {
                        child.classList.toggle('fadeIn')
                    }
                }        
            });
        })
    }
}

export default ResultCardItem