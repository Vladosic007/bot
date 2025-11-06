[file name]: app.js
[file content begin]
console.log("🎮 GGSTANDOFF App Loading...");

// Простая проверка что скрипт загружен
document.addEventListener('DOMContentLoaded', function() {
    console.log("📄 DOM Ready - Starting app");
    initApp();
});

function initApp() {
    console.log("🚀 Initializing app...");
    
    // Сначала покажем что приложение запустилось
    showMessage("Приложение запускается...");
    
    // Даем время на отрисовку
    setTimeout(function() {
        loadCases();
    }, 100);
}

function showMessage(text) {
    const grid = document.getElementById('cases-grid');
    if (grid) {
        grid.innerHTML = '<div style="color: #00ffff; padding: 20px; text-align: center;">' + text + '</div>';
    }
}

function loadCases() {
    console.log("🔄 Loading cases...");
    
    const cases = [
        {
            id: 1,
            name: "Сектор 42",
            image: "https://placehold.co/300x200/1a1a2e/00ffff/png?text=Сектор+42",
            description: "Пополните на 150₽ с промокодом 001",
            promoCode: "001", 
            minDeposit: 150
        },
        {
            id: 2,
            name: "Биоопасность",
            image: "https://placehold.co/300x200/1a1a2e/00ffff/png?text=Биоопасность", 
            description: "Пополните на 160₽ с промокодом 002",
            promoCode: "002",
            minDeposit: 160
        },
        {
            id: 3, 
            name: "Похищение",
            image: "https://placehold.co/300x200/1a1a2e/00ffff/png?text=Похищение",
            description: "Пополните на 350₽ с промокодом 003", 
            promoCode: "003",
            minDeposit: 350
        },
        {
            id: 4,
            name: "Обломки НЛО", 
            image: "https://placehold.co/300x200/1a1a2e/00ffff/png?text=Обломки+НЛО",
            description: "Пополните на 3800₽ с промокодом 004",
            promoCode: "004",
            minDeposit: 3800
        }
    ];

    renderCases(cases);
}

function renderCases(cases) {
    console.log("🎨 Rendering cases:", cases.length);
    
    const grid = document.getElementById('cases-grid');
    if (!grid) {
        console.error("❌ cases-grid not found!");
        return;
    }
    
    // Очищаем контейнер
    grid.innerHTML = '';
    
    // Создаем карточки кейсов
    cases.forEach(function(caseItem) {
        const card = document.createElement('div');
        card.className = 'case-card';
        card.innerHTML = `
            <img src="${caseItem.image}" alt="${caseItem.name}" class="case-image">
            <div class="case-name">${caseItem.name}</div>
            <div class="case-deposit">Мин. депозит: ${caseItem.minDeposit}₽</div>
            <div class="promo-badge">Промокод: ${caseItem.promoCode}</div>
        `;
        
        // Обработчик клика
        card.addEventListener('click', function() {
            openCaseModal(caseItem);
        });
        
        grid.appendChild(card);
    });
    
    console.log("✅ Cases rendered successfully");
}

function openCaseModal(caseItem) {
    console.log("📱 Opening modal:", caseItem.name);
    
    const modal = document.getElementById('caseModal');
    const modalImage = document.getElementById('modalImage');
    const modalDescription = document.getElementById('modalDescription');
    
    if (!modal || !modalImage || !modalDescription) {
        console.error("❌ Modal elements not found");
        return;
    }
    
    // Заполняем модальное окно
    modalImage.src = caseItem.image;
    modalImage.alt = caseItem.name;
    modalDescription.textContent = caseItem.description;
    
    // Настраиваем кнопки
    document.getElementById('depositButton').onclick = function() {
        console.log("💳 Deposit:", caseItem.name);
        window.open('https://ggstandoff.me/deposit?promo_code=' + caseItem.promoCode, '_blank');
    };
    
    document.getElementById('payoutButton').onclick = function() {
        console.log("🎁 Payout:", caseItem.name);
        window.open('https://docs.google.com/forms/d/e/1FAIpQLSd-T5JG8bylYHv4p1pT3RuwlnwCZ6pEt9DYHx_mqUmJpsaC_g/viewform', '_blank');
    };
    
    // Показываем модальное окно
    modal.style.display = 'flex';
}

// Закрытие модального окна
document.getElementById('closeModal').addEventListener('click', function() {
    document.getElementById('caseModal').style.display = 'none';
});

// Закрытие по клику на фон
document.getElementById('caseModal').addEventListener('click', function(e) {
    if (e.target === this) {
        this.style.display = 'none';
    }
});

console.log("📝 App script loaded");
[file content end]
