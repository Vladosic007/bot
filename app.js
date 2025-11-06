[file name]: app.js
[file content begin]
let tg = window.Telegram.WebApp;

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

// ОСНОВНАЯ ИНИЦИАЛИЗАЦИЯ ПРИЛОЖЕНИЯ
function initApp() {
    console.log("🚀 #GGSTANDOFF App Starting...");
    
    // Проверяем что все элементы существуют
    const grid = document.getElementById('cases-grid');
    if (!grid) {
        console.error("❌ Cannot find cases-grid element!");
        showError("Ошибка загрузки интерфейса");
        return;
    }
    
    console.log("✅ DOM loaded successfully");
    
    // Инициализируем Telegram Web App
    try {
        tg.ready();
        tg.expand();
        tg.enableClosingConfirmation(); // Подтверждение закрытия
        console.log("✅ Telegram WebApp initialized");
    } catch (error) {
        console.warn("⚠️ Telegram WebApp not available, running in browser mode");
    }
    
    // Показываем кейсы
    renderCases();
    
    // Добавляем анимацию появления
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
}

// РЕНДЕРИМ КЕЙСЫ С СТИЛИЗАЦИЕЙ
function renderCases() {
    try {
        const grid = document.getElementById('cases-grid');
        console.log("🔄 Rendering cases...");
        
        grid.innerHTML = '';
        
        cases.forEach((caseItem, index) => {
            const card = document.createElement('div');
            card.className = 'case-card';
            card.style.animationDelay = `${index * 0.1}s`;
            card.innerHTML = `
                <img src="${caseItem.image}" alt="${caseItem.name}" class="case-image" onerror="this.src='https://placehold.co/300x200/1a1a2e/00ffff/png?text=Кейс+${caseItem.id}'">
                <div class="case-name">${caseItem.name}</div>
                <div class="case-deposit">Мин. депозит: ${caseItem.minDeposit}₽</div>
                <div class="promo-badge">Промокод: ${caseItem.promoCode}</div>
            `;
            
            // Добавляем анимацию клика
            card.addEventListener('click', () => {
                card.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    card.style.transform = '';
                    openCaseModal(caseItem);
                }, 150);
            });
            
            grid.appendChild(card);
        });
        
        console.log(`✅ ${cases.length} cases rendered successfully`);
        
    } catch (error) {
        console.error("❌ Error rendering cases:", error);
        showError("Ошибка загрузки кейсов");
    }
}

// ОТКРЫВАЕМ МОДАЛЬНОЕ ОКНО С ДЕТАЛЯМИ КЕЙСА
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
        
        // Устанавливаем контент
        modalImage.src = caseItem.image;
        modalImage.alt = caseItem.name;
        modalDescription.innerHTML = caseItem.description;
        
        // Обработчик кнопки ПОПОЛНИТЬ
        document.getElementById('depositButton').onclick = () => {
            console.log("💰 Deposit clicked for:", caseItem.name);
            showNotification(`Открываем страницу пополнения с промокодом ${caseItem.promoCode}...`);
            
            // Открываем ссылку пополнения
            if (tg && tg.openLink) {
                tg.openLink(caseItem.refLink);
            } else {
                window.open(caseItem.refLink, '_blank');
            }
        };
        
        // Обработчик кнопки ВЫВОД
        document.getElementById('payoutButton').onclick = () => {
            console.log("🎁 Payout clicked for:", caseItem.name);
            showNotification(`Открываем форму для кейса ${caseItem.name}...`);
            
            // Закрываем модальное окно с анимацией
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.style.display = 'none';
                modal.style.opacity = '1';
                
                // Открываем форму вывода
                openPayoutForm(caseItem);
            }, 300);
        };
        
        // Показываем модальное окно с анимацией
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
        
        console.log("✅ Modal opened successfully");
        
    } catch (error) {
        console.error("❌ Error opening modal:", error);
        showError("Ошибка открытия кейса");
    }
}

// ОТКРЫВАЕМ ФОРМУ ВЫВОДА
function openPayoutForm(caseItem) {
    const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSd-T5JG8bylYHv4p1pT3RuwlnwCZ6pEt9DYHx_mqUmJpsaC_g/viewform";
    
    // Открываем форму
    if (tg && tg.openLink) {
        tg.openLink(formUrl);
    } else {
        window.open(formUrl, '_blank');
    }
    
    // Показываем всплывающее уведомление
    setTimeout(() => {
        if (tg && tg.showPopup) {
            tg.showPopup({
                title: "📝 Заполните форму для вывода",
                message: `Кейс: ${caseItem.name}\nПромокод: ${caseItem.promoCode}\n\nПосле проверки зачислим кейс в течение 24 часов! 🎁`,
                buttons: [{ type: "ok", text: "Понятно" }]
            });
        } else {
            alert(`📝 Заполните форму для кейса: ${caseItem.name}\nПромокод: ${caseItem.promoCode}\n\nПосле проверки зачислим кейс в течение 24 часов!`);
        }
    }, 1000);
}

// ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА
document.getElementById('closeModal').onclick = closeModal;

function closeModal() {
    const modal = document.getElementById('caseModal');
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.display = 'none';
        modal.style.opacity = '1';
    }, 300);
    console.log("🔒 Modal closed");
}

// Закрытие модального окна по клику на фон
document.getElementById('caseModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// ПОКАЗАТЬ УВЕДОМЛЕНИЕ
function showNotification(message) {
    console.log("📢 Notification:", message);
    // Можно добавить красивые toast-уведомления
}

// ПОКАЗАТЬ ОШИБКУ
function showError(message) {
    console.error("🚨 Error:", message);
    if (tg && tg.showPopup) {
        tg.showPopup({
            title: "Ошибка",
            message: message,
            buttons: [{ type: "ok", text: "OK" }]
        });
    } else {
        alert(message);
    }
}

// ЗАПУСКАЕМ ПРИЛОЖЕНИЕ ПОСЛЕ ЗАГРУЗКИ DOM
document.addEventListener('DOMContentLoaded', function() {
    // Устанавливаем начальную прозрачность для анимации
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    initApp();
});

// РЕЗЕРВНАЯ ПРОВЕРКА ДЛЯ ЗАГРУЗКИ
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    setTimeout(initApp, 100);
}

// ОБРАБОТКА ОШИБОК ИЗОБРАЖЕНИЙ
window.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        console.warn('⚠️ Image failed to load:', e.target.src);
        e.target.src = 'https://placehold.co/300x200/1a1a2e/00ffff/png?text=Изображение+не+загружено';
    }
}, true);
[file content end]
