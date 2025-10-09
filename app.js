let tg = window.Telegram.WebApp;
const BACKEND_URL = "https://script.google.com/macros/s/AKfycbxI0MVhsaRWeCsG8kMnpwJwKIGQ5aZf7JkO6b0VK0S4jZk45Bie9X7QZ2DqyBkzH_3c/exec";

const cases = [
    {
        id: 1,
        name: "Сектор 42",
        image: "https://placehold.co/300x200/2a3a48/FFFFFF/png?text=Сектор+42",
        description: "Пополните счет на 150₽ с промокодом 001 и получите кейс 'Сектор 42' + 5% к депозиту!",
        promoCode: "001",
        refLink: "https://ggstandoff.me/deposit?promo_code=001",
        minDeposit: 150
    },
    {
        id: 2,
        name: "Биоопасность",
        image: "https://placehold.co/300x200/2a3a48/FFFFFF/png?text=Биоопасность",
        description: "Пополните счет на 160₽ с промокодом 002 и получите кейс 'Биоопасность' + 5% к депозиту!",
        promoCode: "002",
        refLink: "https://ggstandoff.me/deposit?promo_code=002", 
        minDeposit: 160
    },
    {
        id: 3,
        name: "Похищение",
        image: "https://placehold.co/300x200/2a3a48/FFFFFF/png?text=Похищение",
        description: "Пополните счет на 350₽ с промокодом 003 и получите кейс 'Похищение' + 5% к депозиту!",
        promoCode: "003",
        refLink: "https://ggstandoff.me/deposit?promo_code=003",
        minDeposit: 350
    },
    {
        id: 4, 
        name: "Обломки НЛО",
        image: "https://placehold.co/300x200/2a3a48/FFFFFF/png?text=Обломки+НЛО",
        description: "Пополните счет на 3800₽ с промокодом 004 и получите кейс 'Обломки НЛО' + 5% к депозиту!",
        promoCode: "004",
        refLink: "https://ggstandoff.me/deposit?promo_code=004",
        minDeposit: 3800
    }
];

async function registerUser(userData) {
    try {
        const response = await fetch(BACKEND_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                action: "register",
                ...userData
            })
        });
        return await response.json();
    } catch (error) {
        console.error("Registration error:", error);
    }
}

async function submitPayoutRequest(requestData) {
    try {
        const response = await fetch(BACKEND_URL, {
            method: "POST", 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                action: "payout",
                ...requestData
            })
        });
        return await response.json();
    } catch (error) {
        console.error("Payout request error:", error);
    }
}

function main() {
    tg.ready();
    tg.expand();
    
    const user = tg.initDataUnsafe.user;
    if (user) {
        registerUser({
            telegramId: user.id,
            username: user.username || `user_${user.id}`,
            firstName: user.first_name,
            lastName: user.last_name
        });
    }
    
    renderCases();
}

function renderCases() {
    const grid = document.getElementById('cases-grid');
    grid.innerHTML = '';

    cases.forEach(caseItem => {
        const card = document.createElement('div');
        card.className = 'case-card';
        card.innerHTML = `
            <img src="${caseItem.image}" alt="${caseItem.name}" class="case-image">
            <div class="case-name">${caseItem.name}</div>
            <div>Мин. депозит: ${caseItem.minDeposit}₽</div>
        `;
        card.addEventListener('click', () => {
            openCaseModal(caseItem);
        });
        grid.appendChild(card);
    });
}

function openCaseModal(caseItem) {
    const modal = document.getElementById('caseModal');
    const modalImage = document.getElementById('modalImage');
    const modalDescription = document.getElementById('modalDescription');
    
    modalImage.src = caseItem.image;
    modalDescription.textContent = caseItem.description;
    
    document.getElementById('depositButton').onclick = () => {
        tg.openLink(caseItem.refLink);
    };
    
    document.getElementById('payoutButton').onclick = async () => {
        const user = tg.initDataUnsafe.user;
        if (user) {
            const result = await submitPayoutRequest({
                telegramId: user.id,
                username: user.username || `user_${user.id}`,
                ggStandoffId: "НЕОБХОДИМО ВВЕСТИ ID", // ВРЕМЕННО - ПОТОМ ДОБАВИМ ФОРМУ
                caseName: caseItem.name,
                promoCode: caseItem.promoCode
            });
            
            if (result && result.status === "success") {
                tg.showPopup({
                    title: "Запрос отправлен!",
                    message: `Администратор проверит депозит с промокодом ${caseItem.promoCode}`
                });
            }
        }
    };
    
    modal.style.display = 'flex';
}

document.getElementById('closeModal').onclick = () => {
    document.getElementById('caseModal').style.display = 'none';
};

document.addEventListener('DOMContentLoaded', main);
