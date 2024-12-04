document.addEventListener('DOMContentLoaded', () => {
    const loginSection = document.getElementById('login');
    const gameSection = document.getElementById('game');
    const cardsContainer = document.getElementById('cards-container');

    let currentUser = localStorage.getItem('user');
    const openedCards = JSON.parse(localStorage.getItem('openedCards') || '{}');

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

    function initializeGame() {
        const startDate = new Date('2024-12-12');
        const endDate = new Date('2025-01-25');
        const today = new Date();
        cardsContainer.innerHTML = '';

        for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
            const day = new Date(d);
            const dayKey = day.toISOString().split('T')[0];

            const card = document.createElement('div');
            card.classList.add('col-auto', 'card');

            const cardInner = document.createElement('div');
            cardInner.classList.add('card-inner');

            const cardFront = document.createElement('div');
            cardFront.classList.add('card-front');
            cardFront.textContent = dayKey;

            const cardBack = document.createElement('div');
            cardBack.classList.add('card-back');

            cardInner.appendChild(cardFront);
            cardInner.appendChild(cardBack);
            card.appendChild(cardInner);

            if (day <= today) {
                cardInner.addEventListener('click', () => {
                    if (!openedCards[dayKey]) {
                        openedCards[dayKey] = true;
                        localStorage.setItem('openedCards', JSON.stringify(openedCards));
                        cardInner.classList.add('card-flipped');
                        alert(`Você abriu a carta do dia ${dayKey}!`);
                    }
                });
            } else {
                card.classList.add('locked');
            }

            cardsContainer.appendChild(card);
        }
    }
});
