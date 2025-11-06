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

// ОЖИДАЕМ ПОЛНОЙ ЗАГРУЗКИ СТРАНИЦЫ
function initApp() {
    console.log("🚀 Starting app...");
    
    // Проверяем что элементы существуют
    const grid = document.getElementById('cases-grid');
    if (!grid) {
        console.error("❌ Cannot find cases-grid element!");
        return;
    }
    
    console.log("✅ DOM loaded successfully");
    
    // Инициализируем Telegram Web App
    tg.ready();
    tg.expand();
    
    // Показываем кейсы
    renderCases();
}

// ПОКАЗЫВАЕМ КЕЙСЫ С ПРОВЕРКОЙ ОШИБОК
function renderCases() {
    try {
        const grid = document.getElementById('cases-grid');
        console.log("🔄 Rendering cases...");
        
        grid.innerHTML = '';
        
        cases.forEach((caseItem, index) => {
            const card = document.createElement('div');
            card.className = 'case-card';
            card.innerHTML = `
                <img src="${caseItem.image}" alt="${caseItem.name}" class="case-image">
                <div class="case-name">${caseItem.name}</div>
                <div>Мин. депозит: ${caseItem.minDeposit}₽</div>
            `;
            
            card.addEventListener('click', () => {
                console.log(`🎯 Case clicked: ${caseItem.name}`);
                openCaseModal(caseItem);
            });
            
            grid.appendChild(card);
        });
        
        console.log("✅ Cases rendered successfully");
        
    } catch (error) {
        console.error("❌ Error rendering cases:", error);
    }
}

// ОТКРЫВАЕМ МОДАЛЬНОЕ ОКНО
function openCaseModal(caseItem) {
    try {
        console.log("🔄 Opening modal for:", caseItem.name);
        
        const modal = document.getElementById('caseModal');
        const modalImage = document.getElementById('modalImage');
        const modalDescription = document.getElementById('modalDescription');
        
        if (!modal || !modalImage || !modalDescription) {
            console.error("❌ Modal elements not found!");
            return;
        }
        
        modalImage.src = caseItem.image;
        modalDescription.textContent = caseItem.description;
        
        // Кнопка ПОПОЛНИТЬ
        document.getElementById('depositButton').onclick = () => {
            console.log("💰 Deposit clicked for:", caseItem.name);
            tg.openLink(caseItem.refLink);
        };
        
        // Кнопка ВЫВОД
        document.getElementById('payoutButton').onclick = () => {
            console.log("📝 Payout clicked for:", caseItem.name);
            
            // Закрываем модальное окно
            modal.style.display = 'none';
            
            // Ждем и открываем форму
            setTimeout(() => {
                tg.openLink("https://docs.google.com/forms/d/e/1FAIpQLSd-T5JG8bylYHv4p1pT3RuwlnwCZ6pEt9DYHx_mqUmJpsaC_g/viewform");
                
                tg.showPopup({
                    title: "📝 Заполните форму",
                    message: "Для получения кейса заполните форму!\n\nПосле проверки зачислим кейс в течение 24 часов!"
                });
            }, 300);
        };
        
        // Показываем модальное окно
        modal.style.display = 'flex';
        console.log("✅ Modal opened successfully");
        
    } catch (error) {
        console.error("❌ Error opening modal:", error);
    }
}

// ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА
document.getElementById('closeModal').onclick = () => {
    document.getElementById('caseModal').style.display = 'none';
    console.log("🔒 Modal closed");
};

// ЗАПУСКАЕМ ПРИЛОЖЕНИЕ ПОСЛЕ ЗАГРУЗКИ DOM
document.addEventListener('DOMContentLoaded', initApp);

// ДОПОЛНИТЕЛЬНАЯ ПРОВЕРКА - ЕСЛИ DOM УЖЕ ЗАГРУЖЕН
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
