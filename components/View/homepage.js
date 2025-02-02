class Question {
    constructor(question, choice1, choice2) {
        this.question = question;
        this.choice1 = choice1;
        this.choice2 = choice2;
    }
}

class Game {
    constructor(questions) {
        this.questions = questions;
        this.currentSection = 0;
    }

    loadQuestion() {
        if (this.currentSection < this.questions.length) {
            const { question, choice1, choice2 } = this.questions[this.currentSection];
            document.getElementById('question').textContent = question;
            document.getElementById('choice1Text').textContent = choice1;
            document.getElementById('choice2Text').textContent = choice2;
        } else {
            this.showFinalMessage();
        }
    }

    selectChoice() {
        document.querySelector('.container').style.transform = `translateX(-100%)`;
        setTimeout(() => {
            this.currentSection++;
            this.loadQuestion();
            document.querySelector('.container').style.transform = `translateX(0)`;
        }, 2000);
    }

    showFinalMessage() {
        document.querySelector('.container').style.display = 'none';
        document.getElementById('finalMessage').style.display = 'block';
    }
}

class Navigation {
    constructor(iconId, menuId) {
        this.icon = document.getElementById(iconId);
        this.menu = document.getElementById(menuId);
        this.init();
    }

    init() {
        this.icon.addEventListener('click', () => {
            this.menu.style.display = this.menu.style.display === 'block' ? 'none' : 'block';
        });
    }
}

window.onload = () => {
    const questions = getQuestions(); // Fetch questions from the controller
    const game = new Game(questions);
    game.loadQuestion();
    document.getElementById('choice1').addEventListener('click', () => game.selectChoice());
    document.getElementById('choice2').addEventListener('click', () => game.selectChoice());
    new Navigation('navIcon', 'navMenu');
};