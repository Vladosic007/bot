<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GGStandoff | Бесплатные кейсы</title>
    <script src="https://telegram.org/js/telegram-web-app.js"></script>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            margin: 0;
            padding: 15px;
            background: #18222d;
            color: #ffffff;
            text-align: center;
        }
        .header {
            margin-bottom: 20px;
            font-size: 1.5rem;
            font-weight: bold;
            color: #50a8eb;
        }
        .cases-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
        }
        .case-card {
            background: #2a3a48;
            border-radius: 12px;
            padding: 10px;
            cursor: pointer;
        }
        .case-image {
            width: 100%;
            border-radius: 8px;
            margin-bottom: 8px;
        }
        .case-name {
            font-weight: bold;
            font-size: 0.9rem;
        }
        .modal {
            display: none;
            position: fixed;
            z-index: 100;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.8);
            justify-content: center;
            align-items: center;
        }
        .modal-content {
            background: #18222d;
            margin: 15px;
            padding: 20px;
            border-radius: 15px;
            text-align: center;
            max-width: 400px;
        }
        .modal-image {
            width: 100%;
            border-radius: 10px;
            margin-bottom: 15px;
        }
        .modal-buttons {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-top: 20px;
        }
        .modal-button {
            background: #50a8eb;
            color: #ffffff;
            border: none;
            padding: 12px 20px;
            border-radius: 8px;
            font-weight: bold;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div class="header">🎁 Выбери свой кейс</div>
    <div class="cases-grid" id="cases-grid"></div>

    <div class="modal" id="caseModal">
        <div class="modal-content">
            <img id="modalImage" class="modal-image" src="" alt="">
            <div id="modalDescription"></div>
            <div class="modal-buttons">
                <button id="depositButton" class="modal-button">Пополнить</button>
                <button id="payoutButton" class="modal-button">Запросить вывод</button>
                <button id="closeModal" class="modal-button">Закрыть</button>
            </div>
        </div>
    </div>

    <script src="app.js"></script>
</body>
</html>
