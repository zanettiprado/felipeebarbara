// User login and session management
let currentUser = null;

// Check if user is logged in
document.addEventListener('DOMContentLoaded', () => {
    const loginSection = document.getElementById('login');
    const gameSection = document.getElementById('game');

    currentUser = localStorage.getItem('user');
    if (currentUser) {
        loginSection.classList.add('hidden');
        gameSection.classList.remove('hidden');
        initializeGame();
    } else {
        loginSection.classList.remove('hidden');
    }

    document.getElementById('login-btn').addEventListener('click', () => {
        const username = document.getElementById('username').value;
        if (username) {
            localStorage.setItem('user', username);
            currentUser = username;
            loginSection.classList.add('hidden');
            gameSection.classList.remove('hidden');
            initializeGame();
        }
    });
});

// Initialize game
function initializeGame() {
    const startDate = new Date('2024-12-12');
    const endDate = new Date('2025-01-25');
    const today = new Date();

    const cardsContainer = document.getElementById('cards-container');
    cardsContainer.innerHTML = '';

    const openedCards = JSON.parse(localStorage.getItem('openedCards') || '{}');

    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        const day = new Date(d);
        const dayKey = day.toISOString().split('T')[0];
        const card = document.createElement('div');
        card.classList.add('card');

        // Check if card is unlocked or already opened
        if (day <= today) {
            if (openedCards[dayKey]) {
                card.textContent = `Carta de ${dayKey} (Aberta)`;
                card.classList.add('opened');
            } else {
                card.textContent = `Carta de ${dayKey}`;
                card.addEventListener('click', () => openCard(dayKey));
            }
        } else {
            card.textContent = `Carta de ${dayKey}`;
            card.classList.add('locked');
        }

        cardsContainer.appendChild(card);
    }
}

// Open card logic
function openCard(dayKey) {
    const openedCards = JSON.parse(localStorage.getItem('openedCards') || '{}');
    openedCards[dayKey] = true;
    localStorage.setItem('openedCards', JSON.stringify(openedCards));
    alert(`Você abriu a carta do dia ${dayKey}`);
    initializeGame();
}
