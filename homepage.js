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
    const questions = [
      new Question("Would you rather have the ability to see 10 minutes into the future or 150 years into the future?", "10 Minutes", "150 Years"),
      new Question("Would you rather have telekinesis or telepathy?", "Telekinesis", "Telepathy"),
      new Question("Would you rather team up with Wonder Woman or Captain Marvel?", "Wonder Woman", "Captain Marvel"),
      new Question("Would you rather be forced to sing along or dance to every single song you hear?", "Sing Along", "Dance"),
      new Question("Would you rather find true love today or win the lottery next year?", "True Love", "Win the Lottery"),
      new Question("Would you rather be in jail for five years or be in a coma for a decade?", "Jail for 5 Years", "Coma for 10 Years"),
      new Question("Would you rather have another 10 years with your partner or a one-night stand with your celebrity crush?", "10 More Years", "One-Night Stand"),
      new Question("Would you rather be chronically under-dressed or overdressed?", "Under-dressed", "Overdressed"),
      new Question("Would you rather have everyone you know be able to read your thoughts or have access to your Internet history?", "Read Thoughts", "Internet History"),
      new Question("Would you rather lose your sight or your memories?", "Lose Sight", "Lose Memories"),
      new Question("Would you rather have universal respect or unlimited power?", "Universal Respect", "Unlimited Power"),
      new Question("Would you rather give up air conditioning and heating for the rest of your life or give up the Internet for the rest of your life?", "Give Up AC/Heating", "Give Up Internet")
    ];
  
    const game = new Game(questions);
    game.loadQuestion();
    document.getElementById('choice1').addEventListener('click', () => game.selectChoice());
    document.getElementById('choice2').addEventListener('click', () => game.selectChoice());
    new Navigation('navIcon', 'navMenu');
  };
  