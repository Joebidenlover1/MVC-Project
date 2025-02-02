const counters = {};

function vote(sectionId, subject) {
    if (!counters[sectionId]) {
        counters[sectionId] = { A: 0, B: 0 };
    }

    counters[sectionId][subject]++;
    document.getElementById(`countA-${sectionId}`).textContent = counters[sectionId].A;
    document.getElementById(`countB-${sectionId}`).textContent = counters[sectionId].B;
}

function showLoginPage() {
    document.getElementById('login-page').classList.remove('hidden');
    document.getElementById('main-content').classList.add('hidden');
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'user' && password === 'password') {
        alert('Login successful!');
        document.getElementById('login-page').classList.add('hidden');
        document.getElementById('main-content').classList.remove('hidden');
    } else {
        alert('Invalid credentials. Please try again.');
    }
}