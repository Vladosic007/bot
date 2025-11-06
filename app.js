let tg = window.Telegram.WebApp;

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
    
    modalImage.src = caseItem.image;
    modalDescription.textContent = caseItem.description;
    
    // Кнопка ПОПОЛНИТЬ
    document.getElementById('depositButton').onclick = () => {
        tg.openLink(caseItem.refLink);
    };
    
   // Кнопка ВЫВОД - ИСПРАВЛЕННАЯ ВЕРСИЯ
document.getElementById('payoutButton').onclick = () => {
    // 1. Сначала закрываем модальное окно
    document.getElementById('caseModal').style.display = 'none';
    
    // 2. Ждем немного чтобы анимация закрытия завершилась
    setTimeout(() => {
        // 3. Открываем форму
        tg.openLink("https://docs.google.com/forms/d/e/1FAIpQLSd-T5JG8bylYHv4p1pT3RuwlnwCZ6pEt9DYHx_mqUmJpsaC_g/viewform");
        
        // 4. Показываем уведомление
        tg.showPopup({
            title: "📝 Заполните форму",
            message: "Для получения кейса заполните форму!\n\nПосле проверки зачислим кейс в течение 24 часов!"
        });
    }, 300); // Ждем 300ms
};
    };
    
    modal.style.display = 'flex';
}

document.getElementById('closeModal').onclick = () => {
    document.getElementById('caseModal').style.display = 'none';
};

document.addEventListener('DOMContentLoaded', main);
