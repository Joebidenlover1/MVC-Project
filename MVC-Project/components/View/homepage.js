class Question {
    constructor(data) {
        this.id = data.id;
        this.question = data.question;
        this.choice1 = data.choice1;
        this.choice2 = data.choice2;
        this.votes1 = data.votes1 || 0;
        this.votes2 = data.votes2 || 0;
    }

    getPercentage1() {
        const totalVotes = this.votes1 + this.votes2;
        return totalVotes === 0 ? 0 : Math.round((this.votes1 / totalVotes) * 100);
    }

    getPercentage2() {
        const totalVotes = this.votes1 + this.votes2;
        return totalVotes === 0 ? 0 : Math.round((this.votes2 / totalVotes) * 100);
    }
}

class Game {
    constructor() {
        this.questions = [];
        this.currentSection = 0;
        this.isVoting = false;
        this.questionsAnswered = 0; // Counter for answered questions
        this.init();
    }

    async init() {
        const rawQuestions = await this.getQuestions();
        this.questions = rawQuestions.map(data => new Question(data));
        this.loadQuestion();
    }

    async loadQuestion() {
        if (this.currentSection < this.questions.length) {
            const { question, choice1, choice2 } = this.questions[this.currentSection];
            document.getElementById('question').textContent = question;
            document.getElementById('choice1Text').textContent = choice1;
            document.getElementById('choice2Text').textContent = choice2;
            document.getElementById('voteResults').style.display = 'none';
            document.getElementById('option1-results').textContent = '';
            document.getElementById('option2-results').textContent = '';
        } else {
            this.showFinalMessage();
        }
    }

    async selectChoice(choice) {
        if (this.isVoting) return;

        this.isVoting = true;
        const questionId = this.questions[this.currentSection]?.id;
        if (questionId) {
            await this.submitVote(questionId, choice);
            this.questionsAnswered++; // Increment the counter
        }
        this.loadVoteResults(questionId);

        setTimeout(() => {
            this.currentSection++;
            this.isVoting = false;
            this.loadQuestion();
        }, 2000);
    }

    loadVoteResults(id) {
        const questionData = this.questions.find(q => q.id === id);
        document.getElementById('option1-results').textContent = `${questionData.getPercentage1()}%`;
        document.getElementById('option2-results').textContent = `${questionData.getPercentage2()}%`;
        document.getElementById('voteResults').style.display = 'block'; // Show results
    }

    async getQuestions() {
        const response = await fetch('../Controller/controller.php');
        return response.json();
    }

    async submitVote(id, choice) {
        await fetch('../Controller/controller.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id, choice: choice }),
        });
    }

    showFinalMessage() {
        document.getElementById('question').style.display = 'none';
        document.querySelector('.container').style.display = 'none';
        const finalMessageElement = document.getElementById('finalMessage');
        finalMessageElement.textContent = `Thank you for participating! You answered ${this.questionsAnswered} questions.`; // Updated message with count
        finalMessageElement.style.display = 'block'; // Show final message
    }
}

window.onload = () => {
    const game = new Game();
    document.getElementById('choice1').addEventListener('click', () => game.selectChoice('1'));
    document.getElementById('choice2').addEventListener('click', () => game.selectChoice('2'));
};