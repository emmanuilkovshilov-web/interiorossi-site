# InterioRossi

Премиальная студия мебели на заказ — Москва.
Корпоративный сайт: 7 страниц, статический HTML/CSS/JS, Cloud Dancer 2026.

---

## О проекте

InterioRossi проектирует и изготавливает корпусную мебель по индивидуальным проектам.
Сайт — конверсионный инструмент: от первого касания до заявки.

**Ключевые задачи сайта:**
- Представить студию и портфолио (847+ проектов)
- Провести пользователя к заявке через квиз или контактную форму
- Поддержать доверие: кейсы, отзывы, процесс, гарантии

---

## Стек

- Чистый HTML5 / CSS3 / ES6+ без фреймворков и сборщиков
- Google Fonts: EB Garamond + Manrope
- Деплой: GitHub Pages (push to main)
- Дизайн-система: Cloud Dancer 2026 (Material Design 3, sage #4e614e)

---

## Страницы

| Файл | Назначение |
|---|---|
| `Index.html` | Главная: hero, кейсы, материалы, квиз, отзывы |
| `catalog.html` | Каталог продукции |
| `projects.html` | Портфолио проектов |
| `materials.html` | Материалы и покрытия |
| `about.html` | О студии |
| `partners.html` | Для дизайнеров и архитекторов |
| `contacts.html` | Контакты, форма |

---

## Структура

```
site/
├── *.html          ← Страницы (header/footer inline в каждой)
├── css/
│   ├── style.css               ← Глобальная база
│   ├── pages.css               ← Внутренние страницы
│   ├── quiz.css                ← Квиз
│   └── theme-cloud-dancer.css  ← Активная тема (сюда все правки цветов)
├── js/
│   ├── main.js     ← Тема, карусели, формы, анимации
│   └── quiz.js     ← Квиз-мастер, отправка в Telegram
├── data/           ← JSON (товары, материалы)
├── img/            ← SVG логотипы брендов
├── assets/images/  ← Фото проектов
└── _docs/          ← Служебная документация
```

---

## Документация для агентов

| Файл | Аудитория | Содержание |
|---|---|---|
| `DESIGN.md` | Design agents (Stitch, Gemini) | Визуальная система: цвета, типографика, компоненты |
| `AGENTS.md` | Coding agents (Claude Code, Cursor) | Стек, файловая структура, правила разработки |
| `_docs/STRATEGY.md` | Команда | Workflow Stitch + Claude Code |
| `_docs/DESIGN_TOKENS_MAP.md` | Команда | Карта M3-токенов → CSS-переменные |

---

## Быстрый старт

```bash
# Открыть локально
# В VS Code: правой кнопкой на Index.html → Open with Live Server
# Адрес: http://127.0.0.1:5500/site/Index.html

# Деплой
git add .
git commit -m "update"
git push origin main
```

---

## Контакты проекта

Студия InterioRossi · Москва · [interior-rossi.ru](https://interior-rossi.ru)
