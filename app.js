[file name]: app.js
[file content begin]
let tg = window.Telegram.WebApp;

// ДИАГНОСТИКА - выводим информацию о устройстве
console.log("📱 Device Info:", {
    userAgent: navigator.userAgent,
    viewport: {
        width: window.innerWidth,
        height: window.innerHeight
    },
    telegram: typeof tg !== 'undefined',
    screen: {
        width: screen.width,
        height: screen.height
    }
});

const cases = [
    {
        id: 1,
        name: "Сектор 42",
        image: "https://placehold.co/300x200/1a1a2e/00ffff/png?text=Сектор+42",
        description: "🎯 Пополните счет на 150₽ с промокодом <strong>001</strong> и получите кейс 'Сектор 42' + 5% к депозиту!",
        promoCode: "001",
        refLink: "https://ggstandoff.me/deposit?promo_code=001",
        minDeposit: 150
    },
    {
        id: 2,
        name: "Биоопасность", 
        image: "https://placehold.co/300x200/1a1a2e/00ffff/png?text=Биоопасность",
        description: "🎯 Пополните счет на 160₽ с промокодом <strong>002</strong> и получите кейс 'Биоопасность' + 5% к депозиту!",
        promoCode: "002",
        refLink: "https://ggstandoff.me/deposit?promo_code=002", 
        minDeposit: 160
    },
    {
        id: 3,
        name: "Похищение",
        image: "https://placehold.co/300x200/1a1a2e/00ffff/png?text=Похищение",
        description: "🎯 Пополните счет на 350₽ с промокодом <strong>003</strong> и получите кейс 'Похищение' + 5% к депозиту!",
        promoCode: "003",
        refLink: "https://ggstandoff.me/deposit?promo_code=003",
        minDeposit: 350
    },
    {
        id: 4, 
        name: "Обломки НЛО",
        image: "https://placehold.co/300x200/1a1a2e/00ffff/png?text=Обломки+НЛО",
        description: "🎯 Пополните счет на 3800₽ с промокодом <strong>004</strong> и получите кейс 'Обломки НЛО' + 5% к депозиту!",
        promoCode: "004",
        refLink: "https://ggstandoff.me/deposit?promo_code=004", 
        minDeposit: 3800
    }
];

// УПРОЩЕННАЯ ИНИЦИАЛИЗАЦИЯ ДЛЯ МОБИЛЬНЫХ
function initApp() {
    console.log("🚀 Mobile App Initialization...");
    
    // Показываем что приложение запустилось
    showLoading("Загружаем кейсы...");
    
    // Даем время на инициализацию Telegram
    setTimeout(() => {
        try {
            if (tg && tg.ready) {
                tg.ready();
                tg.expand();
                console.log("✅ Telegram WebApp ready");
            }
        } catch (error) {
            console.warn("⚠️ Telegram WebApp error:", error);
        }
        
        renderCases();
    }, 500);
}

// УПРОЩЕННЫЙ РЕНДЕРИНГ КЕЙСОВ
function renderCases() {
    const grid = document.getElementById('cases-grid');
    
    if (!grid) {
        console.error("❌ cases-grid not found!");
        showError("Ошибка загрузки интерфейса");
        return;
    }
    
    console.log("🔄 Rendering cases for mobile...");
    
    // Очищаем контейнер
    grid.innerHTML = '';
    
    // Простой рендеринг без сложных анимаций
    cases.forEach((caseItem) => {
        const card = document.createElement('div');
        card.className = 'case-card';
        card.innerHTML = `
            <img src="${caseItem.image}" alt="${caseItem.name}" class="case-image" 
                 onerror="this.src='https://placehold.co/300x200/1a1a2e/ffffff/png?text=Кейс+${caseItem.id}'">
            <div class="case-name">${caseItem.name}</div>
            <div class="case-deposit">Мин. депозит: ${caseItem.minDeposit}₽</div>
            <div class="promo-badge">Промокод: ${caseItem.promoCode}</div>
        `;
        
        card.onclick = () => openCaseModal(caseItem);
        grid.appendChild(card);
    });
    
    hideLoading();
    console.log(`✅ ${cases.length} cases rendered`);
}

// ОТКРЫТИЕ МОДАЛЬНОГО ОКНА
function openCaseModal(caseItem) {
    console.log("📱 Opening modal:", caseItem.name);
    
    const modal = document.getElementById('caseModal');
    const modalImage = document.getElementById('modalImage');
    const modalDescription = document.getElementById('modalDescription');
    
    modalImage.src = caseItem.image;
    modalDescription.innerHTML = caseItem.description;
    
    // Обновляем обработчики
    document.getElementById('depositButton').onclick = () => {
        if (tg && tg.openLink) {
            tg.openLink(caseItem.refLink);
        } else {
            window.open(caseItem.refLink, '_blank');
        }
    };
    
    document.getElementById('payoutButton').onclick = () => {
        modal.style.display = 'none';
        setTimeout(() => {
            const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSd-T5JG8bylYHv4p1pT3RuwlnwCZ6pEt9DYHx_mqUmJpsaC_g/viewform";
            if (tg && tg.openLink) {
                tg.openLink(formUrl);
            } else {
                window.open(formUrl, '_blank');
            }
        }, 300);
    };
    
    modal.style.display = 'flex';
}

// ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА
document.getElementById('closeModal').onclick = function() {
    document.getElementById('caseModal').style.display = 'none';
};

// ПОКАЗАТЬ ЗАГРУЗКУ
function showLoading(message) {
    const grid = document.getElementById('cases-grid');
    if (grid) {
        grid.innerHTML = `<div style="color: #00ffff; padding: 20px;">${message}</div>`;
    }
}

// СКРЫТЬ ЗАГРУЗКУ
function hideLoading() {
    // Автоматически скрывается когда кейсы отрендерятся
}

// ПОКАЗАТЬ ОШИБКУ
function showError(message) {
    const grid = document.getElementById('cases-grid');
    if (grid) {
        grid.innerHTML = `<div style="color: #ff4444; padding: 20px; border: 1px solid #ff4444; border-radius: 10px;">${message}</div>`;
    }
}

// ЗАПУСК ПРИ ЗАГРУЗКЕ ДОКУМЕНТА
document.addEventListener('DOMContentLoaded', initApp);

// РЕЗЕРВНЫЙ ЗАПУСК
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(initApp, 100);
}

// ОБРАБОТКА ОШИБОК
window.addEventListener('error', function(e) {
    console.error('🚨 Global error:', e.error);
    showError('Произошла ошибка загрузки');
});
[file content end]
