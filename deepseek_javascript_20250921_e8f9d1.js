// Объект для работы с Telegram Web App
let tg = window.Telegram.WebApp;

// Массив с нашими кейсами (ВАШИ ДАННЫЕ)
const cases = [
    {
        id: 1,
        name: "Сектор 42 (19₽)",
        image: "https://placehold.co/300x200/2a3a48/FFFFFF/png?text=Сектор+42",
        description: "Пополните счет на 147₽ с промокодом 001 и получите кейс 'Сектор 42' (19₽) + 5% к депозиту!",
        promoCode: "001",
        refLink: "https://ggstandoff.com/?promo=001", // ЭТУ ССЫЛКУ НУЖНО ПОПРАВИТЬ
        minDeposit: 147
    },
    {
        id: 2,
        name: "Биоопасность (29₽)",
        image: "https://placehold.co/300x200/2a3a48/FFFFFF/png?text=Биоопасность",
        description: "Пополните счет на 153₽ с промокодом 002 и получите кейс 'Биоопасность' (29₽) + 5% к депозиту!",
        promoCode: "002",
        refLink: "https://ggstandoff.com/?promo=002", // ЭТУ ССЫЛКУ НУЖНО ПОПРАВИТЬ
        minDeposit: 153
    },
    {
        id: 3,
        name: "Похищение (49₽)",
        image: "https://placehold.co/300x200/2a3a48/FFFFFF/png?text=Похищение",
        description: "Пополните счет на 350₽ с промокодом 003 и получите кейс 'Похищение' (49₽) + 5% к депозиту!",
        promoCode: "003",
        refLink: "https://ggstandoff.com/?promo=003", // ЭТУ ССЫЛКУ НУЖНО ПОПРАВИТЬ
        minDeposit: 350
    },
    {
        id: 4,
        name: "Обломки НЛО (799₽)",
        image: "https://placehold.co/300x200/2a3a48/FFFFFF/png?text=Обломки+НЛО",
        description: "Пополните счет на 3800₽ с промокодом 004 и получите кейс 'Обломки НЛО' (799₽) + 5% к депозиту!",
        promoCode: "004",
        refLink: "https://ggstandoff.com/?promo=004", // ЭТУ ССЫЛКУ НУЖНО ПОПРАВИТЬ
        minDeposit: 3800
    }
];

// Основная функция, которая запускается после загрузки страницы
function main() {
    tg.ready(); // Говорим Telegram, что приложение готово
    tg.expand(); // Расширяем на весь экран
    tg.enableClosingConfirmation(); // Спросит при закрытии, точно ли выйти

    // Показываем кейсы на странице
    renderCases();
}

// Функция для отрисовки всех кейсов на странице
function renderCases() {
    const grid = document.getElementById('cases-grid');
    const loader = document.getElementById('loader');
    
    // Убираем loader
    if (loader) {
        loader.style.display = 'none';
    }

    // Очищаем сетку перед добавлением
    grid.innerHTML = '';

    cases.forEach(caseItem => {
        // Создаем HTML-элемент для карточки кейса
        const card = document.createElement('div');
        card.className = 'case-card';
        card.innerHTML = `
            <img src="${caseItem.image}" alt="${caseItem.name}" class="case-image">
            <div class="case-name">${caseItem.name}</div>
            <div>Мин. депозит: ${caseItem.minDeposit}₽</div>
        `;

        // Добавляем обработчик клика на карточку
        card.addEventListener('click', () => {
            openCaseModal(caseItem);
        });

        // Добавляем карточку в сетку
        grid.appendChild(card);
    });
}

// Функция для открытия модального окна с информацией о кейсе
function openCaseModal(caseItem) {
    const modal = document.getElementById('caseModal');
    const modalImage = document.getElementById('modalImage');
    const modalDescription = document.getElementById('modalDescription');
    const depositButton = document.getElementById('depositButton');
    const payoutButton = document.getElementById('payoutButton');

    // Заполняем модальное окно данными выбранного кейса
    modalImage.src = caseItem.image;
    modalDescription.textContent = caseItem.description;

    // Настраиваем кнопку "Пополнить"
    depositButton.onclick = () => {
        tg.openLink(caseItem.refLink); // Открываем ссылку в браузере
    };

    // Настраиваем кнопку "Запросить вывод" (пока просто заглушка)
    payoutButton.onclick = () => {
        tg.showPopup({
            title: "Запрос отправлен!",
            message: `Администратор проверит твой депозит с промокодом ${caseItem.promoCode} и зачислит кейс. Ожидай уведомления.`
        });
        // ЗДЕСЬ БУДЕТ ОТПРАВКА ЗАПРОСА НА СЕРВЕР
    };

    // Показываем модальное окно
    modal.style.display = 'flex';
}

// Закрытие модального окна
document.getElementById('closeModal').onclick = () => {
    document.getElementById('caseModal').style.display = 'none';
};

// Запускаем наше приложение когда страница полностью загрузится
document.addEventListener('DOMContentLoaded', main);