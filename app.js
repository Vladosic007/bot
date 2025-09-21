let tg = window.Telegram.WebApp;

const cases = [
    {
        id: 1,
        name: "Сектор 42 (19₽)",
        image: "https://placehold.co/300x200/2a3a48/FFFFFF/png?text=Сектор+42",
        description: "Пополните счет на 147₽ с промокодом 001 и получите кейс!",
        promoCode: "001",
        refLink: "https://ggstandoff.com/?promo=001",
        minDeposit: 147
    },
    {
        id: 2,
        name: "Биоопасность (29₽)",
        image: "https://placehold.co/300x200/2a3a48/FFFFFF/png?text=Биоопасность",
        description: "Пополните счет на 153₽ с промокодом 002 и получите кейс!",
        promoCode: "002",
        refLink: "https://ggstandoff.com/?promo=002",
        minDeposit: 153
    }
];

function main() {
    tg.ready();
    tg.expand();
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
    const depositButton = document.getElementById('depositButton');
    
    modalImage.src = caseItem.image;
    modalDescription.textContent = caseItem.description;
    
    depositButton.onclick = () => {
        tg.openLink(caseItem.refLink);
    };
    
    document.getElementById('payoutButton').onclick = () => {
        tg.showPopup({
            title: "Запрос отправлен!",
            message: `Админ проверит депозит с промокодом ${caseItem.promoCode}`
        });
    };
    
    modal.style.display = 'flex';
}

document.getElementById('closeModal').onclick = () => {
    document.getElementById('caseModal').style.display = 'none';
};

document.addEventListener('DOMContentLoaded', main);
