(function () {
  'use strict';

  const STORAGE_KEY = 'html-lesson-02-progress-v14';
  const SCORE_STEP_COUNT = 13;
  const TOTAL_STEP_COUNT = 15;
  const MAX_SCORE = 15;
  const MISSION_MAX_POINTS = { 8: 5, 12: 4, 13: 6 };

  const steps = [
    {
      id: 1,
      section: 'Часть 1 · Связываем сайт',
      eyebrow: 'Учебный шаг · без баллов',
      title: 'Первая настоящая ссылка',
      image: 'assets/images/01.jpg',
      alt: 'Обычный текст превращается в ссылку на страницу правил.',
      lead: 'Начинаем с одного маленького действия: текст «Правила турнира» должен стать переходом.',
      theory: `<p>Для переходов между страницами используется элемент <span class="inline-code">&lt;a&gt;</span>. Пользователь видит текст внутри элемента, а браузер берёт адрес из атрибута <span class="inline-code">href</span>.</p><pre class="code-sample"><code>&lt;a href="rules.html"&gt;Правила турнира&lt;/a&gt;</code></pre><div class="memory">Видимый текст отвечает за смысл ссылки, href — за адрес перехода.</div>`,
      task: {
        type: 'code',
        prompt: 'Превратите существующий текст «Правила турнира» в ссылку на rules.html.',
        initial: `<p>Правила турнира</p>`,
        validator: 'linkBasic',
        solution: `<p>
  <a href="rules.html">Правила турнира</a>
</p>`
      },
      hints: ['Нужен элемент <a>.', 'Адрес страницы записывается в href.', 'Используйте href="rules.html".']
    },
    {
      id: 2,
      section: 'Часть 1 · Связываем сайт',
      eyebrow: 'Учебный шаг · без баллов',
      title: 'Путешествие по проекту',
      image: 'assets/images/02.jpg',
      alt: 'Структура проекта показывает index.html и папку pages со страницами rules.html и teams.html.',
      lead: 'Файл существует, но одна ссылка всё равно не работает: браузер ищет его не в той папке.',
      theory: `<p>Относительный путь читается от текущего файла. Если <span class="inline-code">index.html</span> лежит рядом с папкой <span class="inline-code">pages</span>, путь к правилам начинается с имени этой папки.</p><pre class="code-sample"><code>pages/rules.html</code></pre><p>Сначала браузер входит в <span class="inline-code">pages</span>, затем открывает файл.</p><div class="memory">Не запоминайте путь как строку — сначала найдите текущий файл в структуре проекта.</div>`,
      task: {
        type: 'code',
        prompt: 'Ссылка «Команды» уже работает. Исправьте только ссылку «Правила», чтобы она корректно открывала страницу rules.html.',
        initial: `<nav>
  <a href="rules.html">Правила</a>
  <a href="pages/teams.html">Команды</a>
</nav>`,
        validator: 'projectPathOne',
        solution: `<nav>
  <a href="pages/rules.html">Правила</a>
  <a href="pages/teams.html">Команды</a>
</nav>`
      },
      hints: ['rules.html находится в папке pages.', 'Путь должен начинаться с pages/.', 'Нужен href="pages/rules.html".']
    },
    {
      id: 3,
      section: 'Часть 1 · Связываем сайт',
      eyebrow: 'Учебный шаг · без баллов',
      title: 'Теперь мы внутри папки',
      image: 'assets/images/03.jpg',
      alt: 'Из pages/rules.html путь ../index.html ведёт на главную, а teams.html — к соседнему файлу.',
      lead: 'Страница «Правила» находится внутри папки pages. Теперь настройте переходы с неё: обратно на главную и на соседнюю страницу «Команды».',
      theory: `<p>Путь всегда считается от файла, который вы сейчас редактируете.</p><p><span class="inline-code">../</span> означает «подняться на один уровень выше». А файл, лежащий рядом, можно указать просто по имени.</p><pre class="code-sample"><code>../index.html
teams.html</code></pre><div class="memory">../ — выйти из текущей папки. Имя файла без папки — искать рядом.</div>`,
      task: {
        type: 'code',
        prompt: 'Вы редактируете pages/rules.html. Сделайте рабочими обе ссылки: «Главная» должна вести на index.html, «Команды» — на соседний teams.html.',
        initial: `<nav>
  <a href="index.html">Главная</a>
  <a href="pages/teams.html">Команды</a>
</nav>`,
        validator: 'nestedPaths',
        solution: `<nav>
  <a href="../index.html">Главная</a>
  <a href="teams.html">Команды</a>
</nav>`
      },
      hints: ['Главная лежит уровнем выше.', 'teams.html находится рядом с rules.html.', 'Нужны ../index.html и teams.html.']
    },
    {
      id: 4,
      section: 'Часть 1 · Связываем сайт',
      eyebrow: 'Учебный шаг · без баллов',
      title: 'Быстрая навигация по длинной странице',
      image: 'assets/images/04.jpg',
      alt: 'Ссылки с # ведут к разделам О турнире, Арена и Расписание на одной длинной странице.',
      lead: 'Не каждая ссылка должна открывать новый файл. Иногда нужно быстро попасть в другой раздел этой же страницы.',
      theory: `<p>Разделу дают уникальный <span class="inline-code">id</span>, а ссылка указывает на него через символ <span class="inline-code">#</span>.</p><pre class="code-sample"><code>&lt;section id="schedule"&gt;...&lt;/section&gt;
&lt;a href="#schedule"&gt;Расписание&lt;/a&gt;</code></pre><div class="memory"># + id = переход к месту внутри текущей страницы.</div>`,
      task: {
        type: 'code',
        prompt: 'Сделайте три пункта навигации рабочими: #about, #arena и #schedule. После этого обязательно покликайте по ним в мини-браузере.',
        initial: `<nav>
  О турнире
  Арена
  Расписание
</nav>

<section id="about">
  <h2>О турнире</h2>
  <p>КиберGO собирает команды на учебный турнир.</p>
  <p>Участники проходят несколько этапов и играют финальные матчи.</p>
  <p>Ниже находятся арена и расписание.</p>
</section>

<section id="arena">
  <h2>Арена</h2>
  <p>Игровая зона подготовлена для двух команд.</p>
  <p>Организаторы проверили компьютеры, сеть и оборудование.</p>
  <p>Добавим ещё немного текста, чтобы переход по странице был заметен.</p>
</section>

<section id="schedule">
  <h2>Расписание</h2>
  <p>19:00 — BYTE против NOVA.</p>
  <p>20:00 — LOOP против ZERO.</p>
  <p>21:00 — PIXEL против BYTE.</p>
</section>`,
        validator: 'anchorNav',
        solution: `<nav>
  <a href="#about">О турнире</a>
  <a href="#arena">Арена</a>
  <a href="#schedule">Расписание</a>
</nav>

<section id="about">
  <h2>О турнире</h2>
  <p>КиберGO собирает команды на учебный турнир.</p>
  <p>Участники проходят несколько этапов и играют финальные матчи.</p>
  <p>Ниже находятся арена и расписание.</p>
</section>

<section id="arena">
  <h2>Арена</h2>
  <p>Игровая зона подготовлена для двух команд.</p>
  <p>Организаторы проверили компьютеры, сеть и оборудование.</p>
  <p>Добавим ещё немного текста, чтобы переход по странице был заметен.</p>
</section>

<section id="schedule">
  <h2>Расписание</h2>
  <p>19:00 — BYTE против NOVA.</p>
  <p>20:00 — LOOP против ZERO.</p>
  <p>21:00 — PIXEL против BYTE.</p>
</section>`
      },
      hints: ['У секций уже есть id.', 'В href нужен символ #.', 'Нужны #about, #arena и #schedule.']
    },
    {
      id: 5,
      section: 'Часть 1 · Ресурсы страницы',
      eyebrow: 'Учебный шаг · без баллов',
      title: 'Картинка не появилась',
      image: 'assets/images/05.jpg',
      alt: 'Исправление пути к arena.jpg и добавление alt, width и height.',
      lead: 'Браузер показывает значок битого изображения. Файл есть — значит, сначала ищем ошибку в пути.',
      theory: `<p>В <span class="inline-code">src</span> хранится путь к файлу изображения. Для содержательной картинки нужен <span class="inline-code">alt</span> — осмысленное текстовое описание.</p><p>Если известны размеры файла, полезно указать <span class="inline-code">width</span> и <span class="inline-code">height</span>.</p><pre class="code-sample"><code>&lt;img
  src="assets/images/arena.jpg"
  alt="Игровая арена перед турниром"
  width="960"
  height="540"
&gt;</code></pre><div class="memory">Сначала исправляем путь, затем проверяем описание и размеры.</div>`,
      task: {
        type: 'code',
        prompt: 'Файл лежит в assets/images/arena.jpg и имеет размер 960 × 540. Исправьте src, напишите осмысленный alt и добавьте размеры.',
        initial: `<h2>Арена</h2>
<img src="images/arena.jpg" alt="арена">`,
        validator: 'imageComplete',
        solution: `<h2>Арена</h2>
<img
  src="assets/images/arena.jpg"
  alt="Игровая арена КиберGO перед турниром"
  width="960"
  height="540"
>`
      },
      hints: ['Файл лежит внутри assets/images.', 'alt должен передавать смысл изображения.', 'Размер: 960 × 540.']
    },
    {
      id: 6,
      section: 'Часть 1 · Ресурсы страницы',
      eyebrow: 'Учебный шаг · без баллов',
      title: 'Картинка и подпись — одно целое',
      image: 'assets/images/06.jpg',
      alt: 'figure объединяет изображение арены и подпись через figcaption, а обычный абзац остаётся отдельно.',
      lead: 'На странице два текста рядом с изображением. Только один из них является подписью к фотографии.',
      theory: `<p>Когда изображение и его видимая подпись образуют один смысловой материал, их объединяют в <span class="inline-code">figure</span>. Подпись оформляется через <span class="inline-code">figcaption</span>.</p><p>Обычный текст страницы остаётся обычным абзацем и не должен попадать в figure только потому, что стоит рядом.</p><div class="memory">figure объединяет картинку с её подписью, а не со всем соседним текстом.</div>`,
      task: {
        type: 'code',
        prompt: 'Объедините изображение и строку «Арена КиберGO перед финалом.» в figure. Второй абзац «Зрители уже занимают свои места.» оставьте обычным p вне figure.',
        initial: `<img
  src="assets/images/arena.jpg"
  alt="Игровая арена КиберGO перед финалом"
>
<p>Арена КиберGO перед финалом.</p>
<p>Зрители уже занимают свои места.</p>`,
        validator: 'figureCaptionText',
        solution: `<figure>
  <img
    src="assets/images/arena.jpg"
    alt="Игровая арена КиберGO перед финалом"
  >
  <figcaption>Арена КиберGO перед финалом.</figcaption>
</figure>
<p>Зрители уже занимают свои места.</p>`
      },
      hints: ['В figure должны войти только картинка и её подпись.', 'Подпись заменяет первый p.', 'Второй p оставьте после </figure>.']
    },
    {
      id: 7,
      section: 'Часть 1 · Ресурсы страницы',
      eyebrow: 'Учебный шаг · без баллов',
      title: 'Медиапульт турнира',
      image: 'assets/images/07.jpg',
      alt: 'Аудио, видео с poster и внешняя ссылка на медиастранице турнира.',
      lead: 'Последний учебный шаг перед миссией: страница получит звук, видео и внешнюю ссылку.',
      theory: `<p><span class="inline-code">audio</span> и <span class="inline-code">video</span> получают путь через <span class="inline-code">src</span>. Атрибут <span class="inline-code">controls</span> показывает управление.</p><p>Для видео <span class="inline-code">poster</span> задаёт обложку до запуска. Внешняя ссылка использует полный адрес <span class="inline-code">https://...</span>.</p><div class="memory">src подключает файл, controls даёт управление, poster показывает обложку.</div>`,
      task: {
        type: 'code',
        prompt: 'Подключите captain.mp3 и final.mp4 из assets/media, добавьте controls, для видео добавьте poster="assets/media/final-cover.jpg". Текст «Полная трансляция» сделайте внешней ссылкой на https://ya.ru/.',
        initial: `<h2>Комментарий капитана</h2>

<h2>Лучший момент финала</h2>

<p>Полная трансляция</p>`,
        validator: 'mediaExternalYa',
        solution: `<h2>Комментарий капитана</h2>
<audio
  src="assets/media/captain.mp3"
  controls
></audio>

<h2>Лучший момент финала</h2>
<video
  src="assets/media/final.mp4"
  poster="assets/media/final-cover.jpg"
  controls
></video>

<p>
  <a href="https://ya.ru/">Полная трансляция</a>
</p>`
      },
      hints: ['У audio и video нужен controls.', 'poster относится к video.', 'Внешний href начинается с https://.']
    },
    {
      id: 8,
      section: 'Миссия 1 · Запускаем сайт',
      eyebrow: 'Оцениваемая миссия · 5 баллов',
      title: 'Запустите сайт КиберGO',
      image: 'assets/images/08.jpg',
      alt: 'Миссия с тремя HTML-файлами и пятью требованиями к работающему сайту.',
      lead: 'Новых тегов здесь нет. Перед вами маленький сайт из трёх файлов — переключайтесь между ними и доведите проект до рабочего состояния.',
      theory: `<p>В этой миссии нет пошаговой инструкции по каждой строке. Используйте уже знакомые вещи: относительные пути, <span class="inline-code">img</span>, <span class="inline-code">audio</span>, <span class="inline-code">video</span>.</p><p>Проверка оценивает пять независимых требований. После диагностики можно продолжать исправления и запускать её снова.</p><div class="memory">Сначала добейтесь работающих переходов, затем ресурсов. Проверяйте результат в мини-браузере.</div>`,
      task: {
        type: 'multifile',
        validator: 'missionOne',
        prompt: 'Исправьте проект по пунктам:',
        instructions: [
          'В index.html исправьте две ссылки: «Правила» должна вести на страницу rules.html, «Команды» — на страницу teams.html.',
          'На странице rules.html исправьте ссылку «На главную»: из папки pages нужно вернуться на страницу index.html.',
          'В index.html исправьте изображение арены: правильный путь — assets/images/arena.jpg. Напишите нормальный alt, а не слово «арена».',
          'В index.html добавьте controls к audio и video. Для video дополнительно укажите poster="assets/media/final-cover.jpg".',
          'Проверьте сайт в мини-браузере: откройте Правила, Команды, вернитесь назад, убедитесь, что картинка видна, а аудио и видео запускаются.'
        ],
        startFile: 'index.html',
        files: {
          'index.html': `<nav>
  <a href="rules.html">Правила</a>
  <a href="teams.html">Команды</a>
</nav>

<h1>КиберGO</h1>

<section id="arena">
  <h2>Арена</h2>
  <img src="images/arena.jpg" alt="арена">
</section>

<section id="media">
  <h2>Медиацентр</h2>
  <audio src="assets/media/captain.mp3"></audio>
  <video src="assets/media/final.mp4"></video>
</section>`,
          'pages/rules.html': `<h1>Правила турнира</h1>
<p>Уважайте соперников и соблюдайте расписание.</p>
<a href="index.html">На главную</a>`,
          'pages/teams.html': `<h1>Команды</h1>
<p>BYTE · NOVA · LOOP · ZERO</p>
<a href="../index.html">На главную</a>`
        },
        solutionFiles: {
          'index.html': `<nav>
  <a href="pages/rules.html">Правила</a>
  <a href="pages/teams.html">Команды</a>
</nav>

<h1>КиберGO</h1>

<section id="arena">
  <h2>Арена</h2>
  <img
    src="assets/images/arena.jpg"
    alt="Игровая арена КиберGO перед турниром"
  >
</section>

<section id="media">
  <h2>Медиацентр</h2>
  <audio
    src="assets/media/captain.mp3"
    controls
  ></audio>
  <video
    src="assets/media/final.mp4"
    poster="assets/media/final-cover.jpg"
    controls
  ></video>
</section>`,
          'pages/rules.html': `<h1>Правила турнира</h1>
<p>Уважайте соперников и соблюдайте расписание.</p>
<a href="../index.html">На главную</a>`,
          'pages/teams.html': `<h1>Команды</h1>
<p>BYTE · NOVA · LOOP · ZERO</p>
<a href="../index.html">На главную</a>`
        },
        criteria: [
          'Главная связана с правилами',
          'Со страницы правил можно вернуться',
          'Страница команд доступна',
          'Арена загружается и описана',
          'Медиацентр работает'
        ]
      },
      hints: ['Начните с двух ссылок в index.html.', 'Затем проверьте путь «На главную» в rules.html.', 'После навигации исправьте изображение и медиа.']
    },
    {
      id: 9,
      section: 'Часть 2 · Расписание турнира',
      eyebrow: 'Учебный шаг · без баллов',
      title: 'Из текста в строки и ячейки',
      image: 'assets/images/09.jpg',
      alt: 'Строка текста с данными матча превращается в tr с четырьмя td.',
      lead: 'Организаторы прислали одинаково устроенные данные. Начнём превращать их в таблицу.',
      theory: `<p>В таблице <span class="inline-code">table</span> содержит строки <span class="inline-code">tr</span>, а каждая строка — ячейки данных <span class="inline-code">td</span>.</p><p>Один матч удобно представить одной строкой, где каждая характеристика занимает свою ячейку.</p><div class="memory">table → tr → td. Сначала понимаем структуру данных, затем пишем теги.</div>`,
      task: {
        type: 'code',
        prompt: 'Первая строка почти готова. Добавьте недостающие ячейки «NOVA» и «Арена A», чтобы в строке было четыре td.',
        initial: `<table>
  <tr>
    <td>19:00</td>
    <td>BYTE</td>
  </tr>
</table>`,
        validator: 'tableOneRow',
        solution: `<table>
  <tr>
    <td>19:00</td>
    <td>BYTE</td>
    <td>NOVA</td>
    <td>Арена A</td>
  </tr>
</table>`
      },
      hints: ['Новая информация добавляется новыми td внутри той же tr.', 'Нужны две ячейки.', 'Добавьте NOVA и Арена A.']
    },
    {
      id: 10,
      section: 'Часть 2 · Расписание турнира',
      eyebrow: 'Учебный шаг · без баллов',
      title: 'Расписание растёт',
      image: 'assets/images/10.jpg',
      alt: 'К одной строке таблицы добавляются ещё два матча как новые строки.',
      lead: 'Новых тегов нет. Просто применяем уже понятную структуру ещё два раза.',
      theory: `<p>Если структура данных повторяется, таблица растёт новыми строками <span class="inline-code">tr</span>. В каждой строке сохраняется одинаковый порядок ячеек.</p><div class="memory">Новая запись того же типа = новая строка с тем же порядком столбцов.</div>`,
      task: {
        type: 'code',
        prompt: 'Добавьте ещё два матча, не меняя первую строку: 20:00 | LOOP | ZERO | Арена B и 21:00 | PIXEL | BYTE | Арена A.',
        initial: `<table>
  <tr>
    <td>19:00</td>
    <td>BYTE</td>
    <td>NOVA</td>
    <td>Арена A</td>
  </tr>
</table>`,
        validator: 'tableThreeRows',
        solution: `<table>
  <tr>
    <td>19:00</td>
    <td>BYTE</td>
    <td>NOVA</td>
    <td>Арена A</td>
  </tr>
  <tr>
    <td>20:00</td>
    <td>LOOP</td>
    <td>ZERO</td>
    <td>Арена B</td>
  </tr>
  <tr>
    <td>21:00</td>
    <td>PIXEL</td>
    <td>BYTE</td>
    <td>Арена A</td>
  </tr>
</table>`
      },
      hints: ['Каждый новый матч — отдельная tr.', 'В каждой tr должно быть четыре td.', 'Сохраните порядок: время, команда 1, команда 2, арена.']
    },
    {
      id: 11,
      section: 'Часть 2 · Расписание турнира',
      eyebrow: 'Учебный шаг · без баллов',
      title: 'Что означает каждый столбец?',
      image: 'assets/images/11.jpg',
      alt: 'Таблица получает заголовочную строку с th scope col.',
      lead: 'Таблица уже показывает данные, но новому посетителю непонятно, что означает каждый столбец.',
      theory: `<p>Заголовочные ячейки оформляются через <span class="inline-code">th</span>. Для заголовка столбца используем <span class="inline-code">scope="col"</span>.</p><pre class="code-sample"><code>&lt;th scope="col"&gt;Время&lt;/th&gt;</code></pre><p>Это не декоративное выделение: разметка сообщает смысл ячейки браузеру и вспомогательным технологиям.</p><div class="memory">td хранит данные, th объясняет, что означают данные.</div>`,
      task: {
        type: 'code',
        prompt: 'Добавьте перед тремя строками матчей одну заголовочную строку: «Время», «Команда 1», «Команда 2», «Арена». Все четыре ячейки — th с scope="col". Сами матчи не меняйте.',
        initial: `<table>
  <tr>
    <td>19:00</td>
    <td>BYTE</td>
    <td>NOVA</td>
    <td>Арена A</td>
  </tr>
  <tr>
    <td>20:00</td>
    <td>LOOP</td>
    <td>ZERO</td>
    <td>Арена B</td>
  </tr>
  <tr>
    <td>21:00</td>
    <td>PIXEL</td>
    <td>BYTE</td>
    <td>Арена A</td>
  </tr>
</table>`,
        validator: 'tableHeadersThreeRows',
        solution: `<table>
  <tr>
    <th scope="col">Время</th>
    <th scope="col">Команда 1</th>
    <th scope="col">Команда 2</th>
    <th scope="col">Арена</th>
  </tr>
  <tr>
    <td>19:00</td>
    <td>BYTE</td>
    <td>NOVA</td>
    <td>Арена A</td>
  </tr>
  <tr>
    <td>20:00</td>
    <td>LOOP</td>
    <td>ZERO</td>
    <td>Арена B</td>
  </tr>
  <tr>
    <td>21:00</td>
    <td>PIXEL</td>
    <td>BYTE</td>
    <td>Арена A</td>
  </tr>
</table>`
      },
      hints: ['Новая строка должна быть первой в table.', 'В ней четыре th, не td.', 'У каждого th нужен scope="col".']
    },
    {
      id: 12,
      section: 'Миссия 2 · Структурируем таблицу',
      eyebrow: 'Оцениваемая миссия · 4 балла',
      title: 'Сделайте таблицу законченной',
      image: 'assets/images/12.jpg',
      alt: 'Миссия по добавлению caption, thead и tbody к готовой таблице.',
      lead: 'Таблица уже понятна. Теперь оформим её как законченный блок данных и ничего не потеряем.',
      theory: `<p><span class="inline-code">caption</span> даёт таблице название. <span class="inline-code">thead</span> объединяет заголовочную часть, <span class="inline-code">tbody</span> — основные строки.</p><p>Простая таблица может работать и без <span class="inline-code">thead</span>/<span class="inline-code">tbody</span>. В этой миссии они обязательны, потому что это и есть новый навык.</p><div class="memory">Структура должна стать яснее, а данные — остаться теми же.</div>`,
      task: {
        type: 'missionCode',
        validator: 'missionTwo',
        prompt: 'Добавьте caption с точным текстом «Расписание матчей на 14 сентября», поместите заголовочную строку в thead, три строки матчей — в tbody. Не меняйте данные.',
        initial: `<table>
  <tr>
    <th scope="col">Время</th>
    <th scope="col">Команда 1</th>
    <th scope="col">Команда 2</th>
    <th scope="col">Арена</th>
  </tr>
  <tr>
    <td>19:00</td>
    <td>BYTE</td>
    <td>NOVA</td>
    <td>Арена A</td>
  </tr>
  <tr>
    <td>20:00</td>
    <td>LOOP</td>
    <td>ZERO</td>
    <td>Арена B</td>
  </tr>
  <tr>
    <td>21:00</td>
    <td>PIXEL</td>
    <td>BYTE</td>
    <td>Арена A</td>
  </tr>
</table>`,
        solution: `<table>
  <caption>Расписание матчей на 14 сентября</caption>
  <thead>
    <tr>
      <th scope="col">Время</th>
      <th scope="col">Команда 1</th>
      <th scope="col">Команда 2</th>
      <th scope="col">Арена</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>19:00</td>
      <td>BYTE</td>
      <td>NOVA</td>
      <td>Арена A</td>
    </tr>
    <tr>
      <td>20:00</td>
      <td>LOOP</td>
      <td>ZERO</td>
      <td>Арена B</td>
    </tr>
    <tr>
      <td>21:00</td>
      <td>PIXEL</td>
      <td>BYTE</td>
      <td>Арена A</td>
    </tr>
  </tbody>
</table>`,
        criteria: ['caption с названием таблицы', 'thead для заголовочной части', 'tbody для основных строк', 'Все исходные данные сохранены']
      },
      hints: ['Сначала добавьте caption сразу внутри table.', 'Затем оберните только первую строку в thead.', 'Оставшиеся три строки должны оказаться в tbody.']
    },
    {
      id: 13,
      section: 'Финальная миссия',
      eyebrow: 'Оцениваемая миссия · 6 баллов',
      title: 'До открытия — 7 минут',
      image: 'assets/images/13.jpg',
      alt: 'Финальная миссия с тремя файлами и шестью симптомами неисправностей сайта.',
      lead: 'Сайт почти готов. После последнего обновления сломались разные части проекта — ищите причины по симптомам.',
      theory: `<p>Это итоговая диагностика. Здесь специально нет подсказки «исправьте строку 8». Сравнивайте симптом с тем, что уже знаете о путях, якорях, изображениях, медиа и таблицах.</p><p><span class="inline-code">thead</span> и <span class="inline-code">tbody</span> для зачёта таблицы здесь не обязательны: финальная проверка смотрит именно на заголовочные ячейки <span class="inline-code">th scope="col"</span>.</p><div class="memory">Ищите ошибку по результату в браузере, а не по номеру строки.</div>`,
      task: {
        type: 'multifile',
        validator: 'finalMission',
        prompt: 'Исправьте шесть проблем. После каждой серии правок запускайте диагностику и проверяйте сайт в мини-браузере.',
        startFile: 'index.html',
        files: {
          'index.html': `<nav>
  <a href="rules.html">Правила</a>
  <a href="pages/teams.html">Команды</a>
  <a href="schedule">Расписание</a>
</nav>

<h1>КиберGO</h1>

<section id="arena">
  <h2>Арена</h2>
  <img src="images/arena.jpg" alt="">
</section>

<video src="assets/media/final.mp4"></video>

<section id="schedule">
  <h2>Расписание</h2>
  <table>
    <tr>
      <td>Время</td><td>Команда 1</td><td>Команда 2</td><td>Арена</td>
    </tr>
    <tr>
      <td>19:00</td><td>BYTE</td><td>NOVA</td><td>Арена A</td>
    </tr>
  </table>
</section>`,
          'pages/rules.html': `<h1>Правила</h1>
<p>Соблюдайте расписание турнира.</p>
<a href="../index.html">На главную</a>`,
          'pages/teams.html': `<h1>Команды</h1>
<p>BYTE и NOVA готовы к матчу.</p>
<a href="index.html">На главную</a>`
        },
        solutionFiles: {
          'index.html': `<nav>
  <a href="pages/rules.html">Правила</a>
  <a href="pages/teams.html">Команды</a>
  <a href="#schedule">Расписание</a>
</nav>

<h1>КиберGO</h1>

<section id="arena">
  <h2>Арена</h2>
  <img
    src="assets/images/arena.jpg"
    alt="Игровая арена КиберGO перед турниром"
  >
</section>

<video
  src="assets/media/final.mp4"
  poster="assets/media/final-cover.jpg"
  controls
></video>

<section id="schedule">
  <h2>Расписание</h2>
  <table>
    <tr>
      <th scope="col">Время</th>
      <th scope="col">Команда 1</th>
      <th scope="col">Команда 2</th>
      <th scope="col">Арена</th>
    </tr>
    <tr>
      <td>19:00</td><td>BYTE</td><td>NOVA</td><td>Арена A</td>
    </tr>
  </table>
</section>`,
          'pages/rules.html': `<h1>Правила</h1>
<p>Соблюдайте расписание турнира.</p>
<a href="../index.html">На главную</a>`,
          'pages/teams.html': `<h1>Команды</h1>
<p>BYTE и NOVA готовы к матчу.</p>
<a href="../index.html">На главную</a>`
        },
        criteria: [
          'Правила открываются',
          'Со страницы команд можно вернуться',
          'Ссылка «Расписание» работает',
          'Фото арены загружается и имеет alt',
          'У видео есть controls и poster',
          'Заголовки таблицы размечены через th scope="col"'
        ]
      },
      hints: ['Начните с переходов: rules.html, teams.html и #schedule.', 'Затем проверьте src/alt изображения и атрибуты video.', 'В таблице меняйте только заголовочную строку: данные матча уже корректны.']
    }
  ];

  const finalWork = {
    href: 'downloads/museum-night-starter.zip',
    filename: 'museum-night-starter.zip',
    image: 'assets/images/15.svg',
    alt: 'Итоговая самостоятельная работа: небольшой сайт городской акции «Ночь музеев».',
    sourceText: `В архиве находится новый проект, не связанный с КиберGO:

museum-night-starter/
├── index.html
├── pages/
│   ├── exhibits.html
│   └── visit.html
└── assets/
    ├── images/
    │   ├── hall.svg
    │   └── tram.svg
    └── media/
        ├── audio-guide.mp3
        ├── teaser.mp4
        └── teaser-cover.jpg

В HTML-файлах уже есть каркас документа, тексты и комментарии. Готовых ссылок, figure, медиаблока и таблицы нет — их нужно собрать самостоятельно.`,
    brief: [
      'Скачайте архив, распакуйте его и откройте папку museum-night-starter в VS Code или WebStorm. Работайте только с HTML — CSS и JavaScript не нужны.',
      'На главной странице index.html соберите навигацию: «Экспонаты» должна открывать pages/exhibits.html, «Как добраться» — pages/visit.html, а «Программа» — переходить к разделу с id="program" на этой же странице.',
      'В разделе «Главный зал» подключите assets/images/hall.svg. Добавьте осмысленный alt и оформите изображение вместе с подписью «Главный зал музея перед открытием.» через figure и figcaption.',
      'В разделе «Послушать и посмотреть» подключите assets/media/audio-guide.mp3 через audio с controls. Ниже подключите assets/media/teaser.mp4 через video с controls и poster="assets/media/teaser-cover.jpg".',
      'В разделе с id="program" соберите таблицу программы. Caption: «Программа «Ночи музеев»». Столбцы: «Время», «Событие», «Место». Используйте th с scope="col", thead и tbody. Внесите три события, которые уже записаны обычным текстом в index.html.',
      'На pages/exhibits.html подключите ../assets/images/tram.svg, добавьте осмысленный alt и подпись «Макет городского трамвая 1930-х годов.» через figure и figcaption. На этой странице и на pages/visit.html добавьте ссылку «На главную» с адресом ../index.html.',
      'Перед сдачей откройте index.html в браузере и вручную проверьте всё: обе вложенные страницы и возврат с них, якорь «Программа», оба изображения, аудио, видео, poster и таблицу. Работа проверяется очно у преподавателя.'
    ],
    checklist: [
      'ссылки между index.html, exhibits.html и visit.html работают в обе стороны',
      'ссылка «Программа» переводит к разделу #program на главной странице',
      'hall.svg и tram.svg имеют осмысленные alt и оформлены через figure + figcaption',
      'audio-guide.mp3 и teaser.mp4 воспроизводятся; у видео есть poster',
      'таблица программы содержит caption, th scope="col", thead и tbody и все три события',
      'HTML аккуратно отформатирован, вложенность тегов читается с первого взгляда'
    ]
  };

  const refs = {
    appShell: document.getElementById('appShell'),
    startScreen: document.getElementById('startScreen'),
    studentForm: document.getElementById('studentForm'),
    studentCode: document.getElementById('studentCode'),
    startButton: document.getElementById('startButton'),
    startError: document.getElementById('startError'),
    studentChip: document.getElementById('studentChip'),
    theoryToggleButton: document.getElementById('theoryToggleButton'),
    theoryToggleLabel: document.getElementById('theoryToggleLabel'),
    printReport: document.getElementById('printReport'),
    lesson: document.getElementById('lesson'),
    lessonNav: document.getElementById('lessonNav'),
    contentPanel: document.querySelector('.content-panel'),
    stepCounter: document.getElementById('stepCounter'),
    sectionLabel: document.getElementById('sectionLabel'),
    progressPercent: document.getElementById('progressPercent'),
    progressBar: document.getElementById('progressBar'),
    stepImage: document.getElementById('stepImage'),
    modalImage: document.getElementById('modalImage'),
    stepEyebrow: document.getElementById('stepEyebrow'),
    stepTitle: document.getElementById('stepTitle'),
    stepLead: document.getElementById('stepLead'),
    theoryCard: document.getElementById('theoryCard'),
    taskTitle: document.getElementById('taskTitle'),
    taskBody: document.getElementById('taskBody'),
    taskStatus: document.getElementById('taskStatus'),
    feedbackRow: document.getElementById('feedbackRow'),
    feedback: document.getElementById('feedback'),
    feedbackAction: document.getElementById('feedbackAction'),
    taskCard: document.getElementById('taskCard'),
    helpRow: document.getElementById('helpRow'),
    hintButton: document.getElementById('hintButton'),
    helpBox: document.getElementById('helpBox'),
    previewCard: document.getElementById('previewCard'),
    previewAddress: document.getElementById('previewAddress'),
    previewFrame: document.getElementById('previewFrame'),
    previewStage: document.getElementById('previewStage'),
    semanticPreviewControls: document.getElementById('semanticPreviewControls'),
    previewModeBrowser: document.getElementById('previewModeBrowser'),
    previewModeStructure: document.getElementById('previewModeStructure'),
    previewArticleButton: document.getElementById('previewArticleButton'),
    prevButton: document.getElementById('prevButton'),
    nextButton: document.getElementById('nextButton'),
    stepsButton: document.getElementById('stepsButton'),
    stepsDrawer: document.getElementById('stepsDrawer'),
    drawerBackdrop: document.getElementById('drawerBackdrop'),
    closeDrawerButton: document.getElementById('closeDrawerButton'),
    stepsList: document.getElementById('stepsList'),
    imageModal: document.getElementById('imageModal'),
    imageCloseButton: document.getElementById('imageCloseButton'),
    resetButton: document.getElementById('resetButton')
  };

  let currentIndex = 0;
  let currentView = 'lesson';
  let statuses = {};
  let stepMeta = {};
  let participant = null;
  let startedAt = null;
  let finishedAt = null;
  let currentPreviewSource = '';
  let missionPreviewPages = null;
  let missionPreviewStartPath = null;
  let previewCurrentPath = 'index.html';
  let previewInitialPath = 'index.html';
  let previewInitialSource = '';
  let semanticPreviewMode = 'browser';
  let semanticArticleOnly = false;
  const theoryCollapsedSteps = new Set();
  let theoryTransitionTimer = 0;

  const specificHints = {
    1: 'Нужны <a> и href="rules.html".',
    2: 'rules.html находится внутри pages.',
    3: 'Из pages/rules.html: ../index.html ведёт наверх, teams.html — к соседнему файлу.',
    4: 'Свяжите nav с id через #about, #arena и #schedule.',
    5: 'Проверьте src, осмысленный alt, width="960" и height="540".',
    6: 'В figure должны попасть только img и подпись; обычный абзац остаётся снаружи.',
    7: 'audio/video получают controls; video ещё poster; внешняя ссылка — полный https:// адрес.',
    8: 'Сначала исправьте навигацию в трёх файлах, затем изображение и медиаблок.',
    9: 'Внутри одной tr должно быть четыре td.',
    10: 'Добавьте ещё два tr, в каждом по четыре td в том же порядке.',
    11: 'Добавьте одну первую строку из четырёх th scope="col".',
    12: 'caption внутри table, заголовочная строка в thead, три матча в tbody.',
    13: 'Разделите проверку на пути, якорь, изображение, video и заголовки таблицы.'
  };

  function emptyMeta() {
    return { hintsUsed: 0, solutionShown: false, attemptBeforeSolution: '', draft: '', filesDraft: {}, missionScore: 0, activeFile: '' };
  }

  function ensureMeta(stepId) {
    if (!stepMeta[stepId] || typeof stepMeta[stepId] !== 'object') stepMeta[stepId] = emptyMeta();
    stepMeta[stepId].hintsUsed = clamp(Number(stepMeta[stepId].hintsUsed) || 0, 0, 3);
    stepMeta[stepId].solutionShown = Boolean(stepMeta[stepId].solutionShown || statuses[stepId] === 'revealed');
    if (typeof stepMeta[stepId].attemptBeforeSolution !== 'string') stepMeta[stepId].attemptBeforeSolution = '';
    if (typeof stepMeta[stepId].draft !== 'string') stepMeta[stepId].draft = '';
    if (!stepMeta[stepId].filesDraft || typeof stepMeta[stepId].filesDraft !== 'object' || Array.isArray(stepMeta[stepId].filesDraft)) stepMeta[stepId].filesDraft = {};
    stepMeta[stepId].missionScore = Math.max(0, Number(stepMeta[stepId].missionScore) || 0);
    if (typeof stepMeta[stepId].activeFile !== 'string') stepMeta[stepId].activeFile = '';
    return stepMeta[stepId];
  }

  function safeLoad() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (Number.isInteger(parsed.currentIndex)) currentIndex = clamp(parsed.currentIndex, 0, TOTAL_STEP_COUNT - 1);
      if (parsed.statuses && typeof parsed.statuses === 'object') statuses = parsed.statuses;
      if (parsed.stepMeta && typeof parsed.stepMeta === 'object') stepMeta = parsed.stepMeta;
      if (parsed.participant && typeof parsed.participant === 'object') participant = parsed.participant;
      if (typeof parsed.startedAt === 'string') startedAt = parsed.startedAt;
      if (typeof parsed.finishedAt === 'string') finishedAt = parsed.finishedAt;
    } catch (_) {
      currentIndex = 0;
      currentView = 'lesson';
      statuses = {};
      stepMeta = {};
      participant = null;
      startedAt = null;
      finishedAt = null;
    }
    for (let i = 1; i <= SCORE_STEP_COUNT; i += 1) ensureMeta(i);
    if (currentIndex === SCORE_STEP_COUNT && !allScoredStepsComplete()) currentIndex = SCORE_STEP_COUNT - 1;
    currentView = 'lesson';
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        currentIndex,
        statuses,
        stepMeta,
        participant,
        startedAt,
        finishedAt
      }));
    } catch (_) {}
  }

  function cleanField(value) {
    return String(value || '').replace(/\s+/g, ' ').trim();
  }

  function participantIsValid() {
    return Boolean(participant && cleanField(participant.personalCode));
  }

  function isMissionStep(stepId) {
    return Object.prototype.hasOwnProperty.call(MISSION_MAX_POINTS, stepId);
  }

  function getStepPoints(stepId) {
    if (!isMissionStep(stepId)) return 0;
    const meta = ensureMeta(stepId);
    const raw = Math.max(0, Math.min(MISSION_MAX_POINTS[stepId], Number(meta.missionScore) || 0));
    return statuses[stepId] === 'revealed' ? raw / 2 : raw;
  }

  function allScoredStepsComplete() {
    for (let id = 1; id <= SCORE_STEP_COUNT; id += 1) {
      if (!statuses[id]) return false;
    }
    return true;
  }

  function getScoreSummary() {
    let score = 0;
    let incomplete = 0;
    const missions = {};
    for (let id = 1; id <= SCORE_STEP_COUNT; id += 1) {
      if (!statuses[id]) incomplete += 1;
      if (isMissionStep(id)) {
        const points = getStepPoints(id);
        score += points;
        missions[id] = { points, max: MISSION_MAX_POINTS[id] };
      }
    }
    const percent = Math.round((score / MAX_SCORE) * 100);
    const grade = score >= 11 ? 4 : score >= 8 ? 3 : 2;
    return { score, percent, grade, incomplete, missions };
  }

  function formatScore(value) {
    return Number.isInteger(value) ? String(value) : String(value).replace('.', ',');
  }

  function pointLabel(value) {
    return value === 1 ? '1 балл' : formatScore(value) + ' балла';
  }

  function formatDateTime(value) {
    if (!value) return '—';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '—';
    try {
      return new Intl.DateTimeFormat('ru-RU', { dateStyle: 'short', timeStyle: 'short' }).format(date);
    } catch (_) {
      return date.toLocaleString('ru-RU');
    }
  }

  function updateStudentChip() {
    if (!participantIsValid()) {
      refs.studentChip.textContent = '';
      return;
    }
    refs.studentChip.textContent = participant.personalCode;
    refs.studentChip.title = 'Личный код: ' + participant.personalCode;
  }

  function showStartScreen() {
    refs.startScreen.hidden = false;
    refs.appShell.hidden = true;
    refs.studentCode.value = '';
    refs.startButton.disabled = true;
    refs.startError.textContent = '';
    window.setTimeout(() => refs.studentCode.focus(), 0);
  }

  function showLesson() {
    refs.startScreen.hidden = true;
    refs.appShell.hidden = false;
    updateStudentChip();
    renderCurrentView();
  }

  function validateStartForm() {
    const valid = cleanField(refs.studentCode.value);
    refs.startButton.disabled = !valid;
    if (valid) refs.startError.textContent = '';
    return Boolean(valid);
  }

  function startSession(event) {
    event.preventDefault();
    if (!validateStartForm()) {
      refs.startError.textContent = 'Введите личный код.';
      return;
    }
    participant = {
      personalCode: cleanField(refs.studentCode.value)
    };
    currentIndex = 0;
    currentView = 'lesson';
    statuses = {};
    stepMeta = {};
    for (let i = 1; i <= SCORE_STEP_COUNT; i += 1) ensureMeta(i);
    startedAt = new Date().toISOString();
    finishedAt = null;
    save();
    showLesson();
  }

  function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function highlightHtml(source) {
    const text = String(source);
    const parts = text.split(/(<!--[\s\S]*?-->|<!DOCTYPE[^>]*>|<\/?[A-Za-z][^>]*>)/gi);
    return parts.map(part => {
      if (!part) return '';
      if (!part.startsWith('<')) return escapeHtml(part);
      if (/^<!--/.test(part)) return '<span class="syn-comment">' + escapeHtml(part) + '</span>';
      if (/^<!doctype/i.test(part)) return '<span class="syn-doctype">' + escapeHtml(part) + '</span>';

      const match = part.match(/^(<\/?)([A-Za-z][\w:-]*)([\s\S]*?)(\/?>)$/);
      if (!match) return escapeHtml(part);

      let result = '<span class="syn-punct">' + escapeHtml(match[1]) + '</span>' +
        '<span class="syn-tag">' + escapeHtml(match[2]) + '</span>';
      const attrs = match[3];
      const attrRe = /(\s+)([A-Za-z_:][\w:.-]*)(\s*=\s*)("[^"]*"|'[^']*'|[^\s>]+)/g;
      let last = 0;
      let attrMatch;
      while ((attrMatch = attrRe.exec(attrs))) {
        result += escapeHtml(attrs.slice(last, attrMatch.index));
        result += escapeHtml(attrMatch[1]);
        result += '<span class="syn-attr">' + escapeHtml(attrMatch[2]) + '</span>';
        result += '<span class="syn-punct">' + escapeHtml(attrMatch[3]) + '</span>';
        result += '<span class="syn-value">' + escapeHtml(attrMatch[4]) + '</span>';
        last = attrRe.lastIndex;
      }
      result += escapeHtml(attrs.slice(last));
      result += '<span class="syn-punct">' + escapeHtml(match[4]) + '</span>';
      return result;
    }).join('');
  }

  function sanitizePreviewDocument(source) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(String(source || ''), 'text/html');

    doc.querySelectorAll('script, iframe, object, embed, meta[http-equiv="refresh"]').forEach(node => node.remove());
    doc.querySelectorAll('*').forEach(node => {
      [...node.attributes].forEach(attr => {
        if (/^on/i.test(attr.name)) node.removeAttribute(attr.name);
      });
    });
    return doc;
  }

  function getPreviewStartPath(stepId) {
    if (missionPreviewStartPath) return missionPreviewStartPath;
    return stepId === 3 ? 'pages/rules.html' : 'index.html';
  }

  function getAllowedPreviewPages(stepId) {
    if (missionPreviewPages) return Object.keys(missionPreviewPages);
    const allowed = {
      1: ['index.html', 'rules.html'],
      2: ['index.html', 'pages/rules.html', 'pages/teams.html'],
      3: ['pages/rules.html', 'index.html', 'pages/teams.html']
    };
    return allowed[stepId] || [];
  }

  function normalizePreviewPath(href, fromPath) {
    const clean = String(href || '').split('#')[0].split('?')[0];
    const base = String(fromPath || 'index.html').split('/');
    base.pop();
    const stack = base;
    clean.split('/').forEach(part => {
      if (!part || part === '.') return;
      if (part === '..') stack.pop();
      else stack.push(part);
    });
    return stack.join('/');
  }

  function previewResourceKey(raw, fromPath) {
    const value = String(raw || '').trim();
    if (!value || value.startsWith('data:') || value.startsWith('blob:') || value.startsWith('http://') || value.startsWith('https://')) return value;
    return normalizePreviewPath(value, fromPath);
  }

  function rewritePreviewResources(doc, fromPath) {
    const assets = window.HTML2_PREVIEW_ASSETS || {};
    const targets = [
      ['img[src]', 'src'],
      ['audio[src]', 'src'],
      ['video[src]', 'src'],
      ['video[poster]', 'poster'],
      ['source[src]', 'src']
    ];
    targets.forEach(([selector, attr]) => {
      doc.querySelectorAll(selector).forEach(node => {
        const raw = String(node.getAttribute(attr) || '').trim();
        const key = previewResourceKey(raw, fromPath);
        if (assets[key]) node.setAttribute(attr, assets[key]);
      });
    });
  }

  function addPreviewStyles(doc, stepId) {
    const style = doc.createElement('style');
    style.textContent = `
      html { scroll-behavior: smooth; }
      body { overflow-wrap: anywhere; }
      img, video { max-width: 100%; height: auto; }
      audio { max-width: 100%; }
      table { max-width: 100%; }
      a { cursor: pointer; }
      .trainer-preview-notice { position: sticky; top: 8px; z-index: 50; margin: 8px; padding: 12px 14px; border: 1px solid #cfd9ff; border-radius: 12px; background: #f5f7ff; color: #25345f; box-shadow: 0 10px 30px rgba(28,44,92,.12); font: 14px/1.5 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
      .trainer-preview-notice strong { display: block; margin-bottom: 4px; font-size: 16px; }
      .trainer-preview-notice code { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
      .trainer-preview-close { margin-top: 8px; min-height: 34px; padding: 6px 10px; border: 1px solid #b7c5f7; border-radius: 9px; background: #fff; color: #2448ad; font: 700 13px/1 system-ui, sans-serif; cursor: pointer; }
      .trainer-anchor-target { outline: 3px solid #7c8cff !important; outline-offset: 4px; border-radius: 6px; }
      ${stepId === 4 ? 'nav { position: sticky; top: 0; z-index: 2; padding: 10px; background: rgba(255,255,255,.97); border-bottom: 1px solid #dfe5f5; } nav a { display: inline-block; margin-right: 12px; padding: 5px 0; } section { min-height: 70vh; padding: 18px 10px 72px; border-bottom: 1px solid #e5e9f4; }' : ''}
    `;
    doc.head.appendChild(style);
  }

  function buildPreviewDocument(source, path) {
    const doc = sanitizePreviewDocument(source);
    const step = steps[currentIndex];
    rewritePreviewResources(doc, path || getPreviewStartPath(step ? step.id : 0));
    doc.querySelectorAll('a[href^="http://"], a[href^="https://"]').forEach(link => {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    });
    addPreviewStyles(doc, step ? step.id : 0);
    return '<!DOCTYPE html>\n' + doc.documentElement.outerHTML;
  }

  function getPreviewPageSource(path) {
    if (path === previewInitialPath) return previewInitialSource;
    if (missionPreviewPages && Object.prototype.hasOwnProperty.call(missionPreviewPages, path)) return missionPreviewPages[path];
    const pages = window.HTML2_PREVIEW_PAGES || {};
    return Object.prototype.hasOwnProperty.call(pages, path) ? pages[path] : '';
  }

  function showPreviewNotice(doc, title, message, code) {
    const old = doc.querySelector('.trainer-preview-notice');
    if (old) old.remove();
    const box = doc.createElement('div');
    box.className = 'trainer-preview-notice';
    const strong = doc.createElement('strong');
    strong.textContent = title;
    const text = doc.createElement('div');
    text.textContent = message;
    box.appendChild(strong);
    box.appendChild(text);
    if (code) {
      const p = doc.createElement('p');
      const c = doc.createElement('code');
      c.textContent = code;
      p.appendChild(c);
      box.appendChild(p);
    }
    const close = doc.createElement('button');
    close.type = 'button';
    close.className = 'trainer-preview-close';
    close.textContent = 'Закрыть';
    close.addEventListener('click', () => box.remove());
    box.appendChild(close);
    doc.body.insertBefore(box, doc.body.firstChild);
  }

  function renderPreviewPath(path, source) {
    if (!refs.previewFrame || refs.previewCard.hidden) return;
    previewCurrentPath = path;
    const step = steps[currentIndex];
    const html = buildPreviewDocument(source, path);
    refs.previewAddress.textContent = 'Результат в браузере · ' + path;
    refs.previewFrame.onload = () => attachPreviewHandlers(step ? step.id : 0);
    if ('srcdoc' in refs.previewFrame) {
      refs.previewFrame.srcdoc = html;
    } else {
      refs.previewFrame.src = 'data:text/html;charset=utf-8,' + encodeURIComponent(html);
    }
  }

  function attachPreviewHandlers(stepId) {
    let doc;
    try {
      doc = refs.previewFrame.contentDocument;
    } catch (error) {
      return;
    }
    if (!doc || !doc.body) return;

    doc.addEventListener('click', event => {
      const link = event.target.closest && event.target.closest('a[href]');
      if (!link) return;
      const href = String(link.getAttribute('href') || '').trim();
      if (!href) return;

      if (href.startsWith('#')) {
        event.preventDefault();
        const target = doc.getElementById(href.slice(1));
        if (!target) {
          showPreviewNotice(doc, 'Раздел не найден', 'На странице нет элемента с таким id.', href);
          return;
        }
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        target.classList.add('trainer-anchor-target');
        window.setTimeout(() => target.classList.remove('trainer-anchor-target'), 900);
        return;
      }

      if (/^https?:\/\//i.test(href)) {
        event.preventDefault();
        const opened = window.open(href, '_blank', 'noopener,noreferrer');
        if (!opened) {
          showPreviewNotice(doc, 'Внешняя ссылка', 'Браузер заблокировал новую вкладку. Разрешите всплывающие окна для этой страницы.', href);
        }
        return;
      }

      event.preventDefault();
      const forcedTarget = String(link.getAttribute('data-preview-target') || '').trim();
      const nextPath = forcedTarget || normalizePreviewPath(href, previewCurrentPath);
      const allowed = new Set(getAllowedPreviewPages(stepId));
      if (!allowed.has(nextPath)) {
        showPreviewNotice(doc, 'Файл не найден', 'По этому пути мини-браузер не нашёл страницу. Проверьте расположение файла и значение href.', nextPath);
        return;
      }
      const nextSource = getPreviewPageSource(nextPath);
      if (!nextSource) {
        showPreviewNotice(doc, 'Файл не найден', 'Страница существует в структуре, но её содержимое недоступно мини-браузеру.', nextPath);
        return;
      }
      renderPreviewPath(nextPath, nextSource);
    });
  }

  function buildSemanticPreviewDocument(source, articleOnly) {
    const doc = sanitizePreviewDocument(source);
    if (articleOnly) {
      const article = doc.querySelector('article');
      if (article) {
        const clone = article.cloneNode(true);
        doc.body.innerHTML = '';
        const note = doc.createElement('div');
        note.className = 'trainer-semantic-note';
        note.textContent = 'article показан отдельно от исходной страницы';
        doc.body.appendChild(note);
        doc.body.appendChild(clone);
      }
    } else {
      const note = doc.createElement('div');
      note.className = 'trainer-semantic-note';
      note.textContent = 'Режим структуры — учебная подсветка. Обычный браузер эти рамки не рисует.';
      doc.body.insertBefore(note, doc.body.firstChild);
    }

    const style = doc.createElement('style');
    style.textContent = `
      * { box-sizing: border-box; }
      body { margin: 0; padding: 14px; font: 15px/1.45 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; color: #17203a; background: #fff; }
      .trainer-semantic-note { margin: 0 0 12px; padding: 8px 10px; border: 1px solid #cfd9ff; border-radius: 9px; background: #f3f6ff; color: #3e4d7a; font-size: 12px; font-weight: 700; }
      header, main, footer, section, article, nav, aside { position: relative; margin: 10px 0; padding: 24px 12px 12px; border: 2px solid; border-radius: 10px; }
      header::before, main::before, footer::before, section::before, article::before, nav::before, aside::before { position: absolute; top: 4px; left: 8px; padding: 1px 6px; border-radius: 999px; font: 700 10px/1.5 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
      header { border-color: #8b7cf6; background: #f6f3ff; } header::before { content: "header"; color: #5f4ed1; background: #e9e3ff; }
      main { border-color: #4f78ff; background: #f3f6ff; } main::before { content: "main"; color: #3156cc; background: #dfe7ff; }
      footer { border-color: #7f8aa7; background: #f7f8fb; } footer::before { content: "footer"; color: #59647f; background: #e9edf4; }
      section { border-color: #36a7c9; background: #f1fbfe; } section::before { content: "section"; color: #167895; background: #d9f4fb; }
      article { border-color: #39a86b; background: #f2fbf6; } article::before { content: "article"; color: #227a4a; background: #dbf4e5; }
      nav { border-color: #e39a38; background: #fff9ed; } nav::before { content: "nav"; color: #9b6318; background: #ffedc9; }
      aside { border-color: #d7ae28; background: #fffbed; } aside::before { content: "aside"; color: #8d6c0d; background: #fff0ae; }
      h1, h2, h3, p, ul, ol { margin-top: 6px; margin-bottom: 7px; }
      h1 { font-size: 1.7em; } h2 { font-size: 1.3em; } h3 { font-size: 1.1em; }
    `;
    doc.head.appendChild(style);
    return '<!DOCTYPE html>\n' + doc.documentElement.outerHTML;
  }

  function isSemanticPreviewStep(step) {
    return false;
  }

  function updateSemanticControls(step) {
    const semantic = isSemanticPreviewStep(step);
    refs.semanticPreviewControls.hidden = !semantic;
    refs.previewCard.classList.toggle('semantic-preview-active', semantic);
    refs.previewArticleButton.hidden = true;
    if (!semantic) {
      semanticPreviewMode = 'browser';
      semanticArticleOnly = false;
    }

    [
      [refs.previewModeBrowser, 'browser'],
      [refs.previewModeStructure, 'structure']
    ].forEach(([button, mode]) => {
      button.classList.toggle('is-active', semanticPreviewMode === mode);
      button.setAttribute('aria-pressed', semanticPreviewMode === mode ? 'true' : 'false');
    });

    const doc = sanitizePreviewDocument(currentPreviewSource);
    const hasArticle = Boolean(doc.querySelector('article'));
    if (semantic && (step.id === 17 || step.id === 19) && hasArticle) {
      refs.previewArticleButton.hidden = false;
      refs.previewArticleButton.textContent = semanticArticleOnly ? 'Вернуть всю страницу' : 'Показать article отдельно';
      refs.previewArticleButton.classList.toggle('is-active', semanticArticleOnly);
    } else {
      semanticArticleOnly = false;
    }
  }

  function setSemanticPreviewMode(mode) {
    const step = steps[currentIndex];
    if (!isSemanticPreviewStep(step)) return;
    semanticPreviewMode = mode;
    semanticArticleOnly = false;
    updateSemanticControls(step);
    updatePreview(currentPreviewSource);
  }

  function updatePreview(source) {
    if (!refs.previewFrame || refs.previewCard.hidden) return;
    currentPreviewSource = String(source || '');
    const step = steps[currentIndex];
    const semantic = isSemanticPreviewStep(step);
    updateSemanticControls(step);

    refs.previewFrame.hidden = false;
    if (semantic && semanticPreviewMode === 'structure') {
      const html = buildSemanticPreviewDocument(currentPreviewSource, semanticArticleOnly);
      refs.previewAddress.textContent = semanticArticleOnly
        ? 'article отдельно — проверяем самостоятельность материала'
        : 'Структура — учебная подсветка смысловых зон';
      refs.previewFrame.onload = null;
      if ('srcdoc' in refs.previewFrame) refs.previewFrame.srcdoc = html;
      else refs.previewFrame.src = 'data:text/html;charset=utf-8,' + encodeURIComponent(html);
      return;
    }

    previewInitialPath = getPreviewStartPath(step ? step.id : 0);
    previewInitialSource = currentPreviewSource;
    renderPreviewPath(previewInitialPath, previewInitialSource);
  }

  function showHelp(content) {
    refs.helpBox.innerHTML = content;
    refs.helpBox.classList.add('is-visible');
    refs.helpBox.setAttribute('aria-hidden', 'false');
  }

  function formatHtmlForDisplay(source) {
    return String(source || '').trim();
  }

  function codeWithComparison(studentAttempt, correctSolution) {
    const attempt = String(studentAttempt || '').trim() || '(код не был изменён)';
    const safeAttempt = attempt.replace(/--/g, '- -');
    return '<!-- ПРАВИЛЬНЫЙ ВАРИАНТ -->\n' + formatHtmlForDisplay(correctSolution) +
      '\n\n<!-- ВАШ ВАРИАНТ\n' + safeAttempt + '\n-->';
  }

  function normalize(str) {
    return String(str).replace(/\r/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
  }

  function tagCount(str, tag) {
    const re = new RegExp('<\\s*' + tag + '\\b', 'gi');
    const m = String(str).match(re);
    return m ? m.length : 0;
  }

  function hasPair(str, tag, textPart) {
    const re = new RegExp('<\\s*' + tag + '\\b[^>]*>[\\s\\S]*?' + textPart + '[\\s\\S]*?<\\s*\\/\\s*' + tag + '\\s*>', 'i');
    return re.test(str);
  }

  function hasBasicDocument(value) {
    return /<!doctype html>/i.test(value) && /<html\b[^>]*lang\s*=\s*["']ru["'][^>]*>/i.test(value) && /<head>[\s\S]*<\/head>[\s\S]*<body>[\s\S]*<\/body>[\s\S]*<\/html>/i.test(value);
  }

  function hasModernDocument(value, titleText) {
    if (!hasBasicDocument(value)) return false;
    if (!/<head>[\s\S]*<meta\b[^>]*charset\s*=\s*["']?utf-8["']?[^>]*>[\s\S]*<\/head>/i.test(value)) return false;
    if (titleText) {
      const escaped = titleText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const re = new RegExp('<title>\\s*' + escaped + '\\s*<\\/title>', 'i');
      if (!re.test(value)) return false;
    }
    return true;
  }


  function headerContainsH1(value) {
    const match = String(value).match(/<header\b[^>]*>([\s\S]*?)<\/header>/i);
    return Boolean(match && /<h1\b/i.test(match[1]));
  }

  const validators = {
    linkBasic(value) {
      return /<a\b[^>]*href\s*=\s*["']rules\.html["'][^>]*>\s*Правила турнира\s*<\/a>/i.test(value);
    },
    projectPathOne(value) {
      const d = new DOMParser().parseFromString(value, 'text/html');
      return Boolean(d.querySelector('a[href="pages/rules.html"]') && d.querySelector('a[href="pages/teams.html"]'));
    },
    figureCaptionText(value) {
      const d = new DOMParser().parseFromString(value, 'text/html');
      const figure = d.querySelector('figure');
      if (!figure) return false;
      const img = figure.querySelector('img[src="assets/images/arena.jpg"]');
      const caption = figure.querySelector('figcaption');
      if (!img || !caption || caption.textContent.trim() !== 'Арена КиберGO перед финалом.') return false;
      const paragraphs = [...d.body.children].filter(el => el.tagName === 'P');
      return paragraphs.some(p => p.textContent.trim() === 'Зрители уже занимают свои места.');
    },
    mediaExternalYa(value) {
      const d = new DOMParser().parseFromString(value, 'text/html');
      const audio = d.querySelector('audio[src="assets/media/captain.mp3"]');
      const video = d.querySelector('video[src="assets/media/final.mp4"]');
      const external = d.querySelector('a[href="https://ya.ru/"]') || d.querySelector('a[href="https://ya.ru"]');
      return Boolean(audio && audio.hasAttribute('controls') && video && video.hasAttribute('controls') && video.getAttribute('poster') === 'assets/media/final-cover.jpg' && external && external.textContent.trim() === 'Полная трансляция');
    },
    tableHeadersThreeRows(value) {
      const d = new DOMParser().parseFromString(value, 'text/html');
      const table = d.querySelector('table');
      if (!table) return false;
      const rows = [...table.querySelectorAll('tr')];
      if (rows.length !== 4) return false;
      const headers = [...rows[0].children].filter(c => c.tagName === 'TH');
      if (headers.length !== 4 || !headers.every(th => th.getAttribute('scope') === 'col')) return false;
      if (headers.map(th => th.textContent.trim()).join('|') !== 'Время|Команда 1|Команда 2|Арена') return false;
      const expected = [
        '19:00|BYTE|NOVA|Арена A',
        '20:00|LOOP|ZERO|Арена B',
        '21:00|PIXEL|BYTE|Арена A'
      ];
      return rows.slice(1).every((row, index) => [...row.children].filter(c => c.tagName === 'TD').map(c => c.textContent.trim()).join('|') === expected[index]);
    },
    projectPaths(value) {
      const d = new DOMParser().parseFromString(value, 'text/html');
      return Boolean(d.querySelector('a[href="pages/rules.html"]') && d.querySelector('a[href="pages/teams.html"]'));
    },
    nestedPaths(value) {
      const d = new DOMParser().parseFromString(value, 'text/html');
      return Boolean(d.querySelector('a[href="../index.html"]') && d.querySelector('a[href="teams.html"]'));
    },
    anchorNav(value) {
      const d = new DOMParser().parseFromString(value, 'text/html');
      return ['#about', '#arena', '#schedule'].every(href => d.querySelector(`nav a[href="${href}"]`));
    },
    imageComplete(value) {
      const d = new DOMParser().parseFromString(value, 'text/html');
      const img = d.querySelector('img[src="assets/images/arena.jpg"]');
      if (!img) return false;
      const alt = String(img.getAttribute('alt') || '').trim().toLowerCase();
      return alt.length >= 8 && alt !== 'картинка' && alt !== 'арена' && img.getAttribute('width') === '960' && img.getAttribute('height') === '540';
    },
    figureCaption(value) {
      const d = new DOMParser().parseFromString(value, 'text/html');
      const figure = d.querySelector('figure');
      const img = figure && figure.querySelector('img[src="assets/images/arena.jpg"]');
      const caption = figure && figure.querySelector('figcaption');
      return Boolean(img && String(img.getAttribute('alt') || '').trim() && caption && caption.textContent.trim());
    },
    mediaExternal(value) {
      const d = new DOMParser().parseFromString(value, 'text/html');
      const audio = d.querySelector('audio[src="assets/media/captain.mp3"]');
      const video = d.querySelector('video[src="assets/media/final.mp4"]');
      const external = d.querySelector('a[href="https://www.google.com/"]') || d.querySelector('a[href="https://www.google.com"]');
      return Boolean(audio && audio.hasAttribute('controls') && video && video.hasAttribute('controls') && video.getAttribute('poster') === 'assets/media/final-cover.jpg' && external);
    },
    miniSiteDebug(value) {
      const d = new DOMParser().parseFromString(value, 'text/html');
      const video = d.querySelector('video[src="assets/media/final.mp4"]');
      const img = d.querySelector('img[src="assets/images/arena.jpg"]');
      return Boolean(
        d.querySelector('a[href="pages/rules.html"]') &&
        d.querySelector('a[href="pages/teams.html"]') &&
        d.querySelector('a[href="#schedule"]') &&
        img && String(img.getAttribute('alt') || '').trim() &&
        video && video.hasAttribute('controls')
      );
    },
    tableOneRow(value) {
      const d = new DOMParser().parseFromString(value, 'text/html');
      const rows = [...d.querySelectorAll('table tr')];
      if (rows.length !== 1) return false;
      const cells = [...rows[0].children].filter(c => c.tagName === 'TD').map(c => c.textContent.trim());
      return cells.join('|') === '19:00|BYTE|NOVA|Арена A';
    },
    tableThreeRows(value) {
      const d = new DOMParser().parseFromString(value, 'text/html');
      const rows = [...d.querySelectorAll('table tr')];
      if (rows.length !== 3) return false;
      const expected = [
        '19:00|BYTE|NOVA|Арена A',
        '20:00|LOOP|ZERO|Арена B',
        '21:00|PIXEL|BYTE|Арена A'
      ];
      return rows.every((row, index) => [...row.children].filter(c => c.tagName === 'TD').map(c => c.textContent.trim()).join('|') === expected[index]);
    },
    tableHeaders(value) {
      const d = new DOMParser().parseFromString(value, 'text/html');
      const table = d.querySelector('table');
      if (!table) return false;
      const rows = [...table.querySelectorAll('tr')];
      if (rows.length !== 3) return false;
      const headers = [...rows[0].children].filter(c => c.tagName === 'TH');
      const headerText = headers.map(th => th.textContent.trim()).join('|');
      if (headers.length !== 4 || !headers.every(th => th.getAttribute('scope') === 'col') || headerText !== 'Время|Команда 1|Команда 2|Арена') return false;
      const expected = [
        '19:00|BYTE|NOVA|Арена A',
        '20:00|LOOP|ZERO|Арена B'
      ];
      return rows.slice(1).every((row, index) => {
        const cells = [...row.children].filter(c => c.tagName === 'TD').map(c => c.textContent.trim());
        return cells.join('|') === expected[index];
      });
    },
    tableStructure(value) {
      if (!/<thead\b/i.test(value) || !/<tbody\b/i.test(value)) return false;
      const d = new DOMParser().parseFromString(value, 'text/html');
      const table = d.querySelector('table');
      if (!table) return false;
      const caption = table.querySelector('caption');
      const thead = table.querySelector('thead');
      const tbody = table.querySelector('tbody');
      if (!caption || caption.textContent.trim() !== 'Расписание матчей на 14 сентября' || !thead || !tbody) return false;
      const headRows = [...thead.querySelectorAll('tr')];
      if (headRows.length !== 1) return false;
      const headers = [...headRows[0].children].filter(c => c.tagName === 'TH');
      if (headers.length !== 4 || !headers.every(th => th.getAttribute('scope') === 'col')) return false;
      if (headers.map(th => th.textContent.trim()).join('|') !== 'Время|Команда 1|Команда 2|Арена') return false;
      const dataRows = [...tbody.querySelectorAll('tr')];
      const expected = [
        '19:00|BYTE|NOVA|Арена A',
        '20:00|LOOP|ZERO|Арена B'
      ];
      if (dataRows.length !== expected.length) return false;
      return dataRows.every((row, index) => [...row.children].filter(c => c.tagName === 'TD').map(c => c.textContent.trim()).join('|') === expected[index]);
    },
    tableDebug(value) {
      const d = new DOMParser().parseFromString(value, 'text/html');
      const table = d.querySelector('table');
      const h2 = d.querySelector('h2');
      if (!table || !h2 || h2.textContent.trim() !== 'Результаты матчей') return false;
      const caption = table.querySelector('caption');
      if (!caption || caption.textContent.trim() !== 'Результаты матчей') return false;
      const rows = [...table.querySelectorAll('tr')];
      const headerRows = rows.filter(row => [...row.children].some(c => c.tagName === 'TH'));
      if (headerRows.length !== 1) return false;
      const headers = [...headerRows[0].children].filter(c => c.tagName === 'TH');
      if (headers.length !== 4 || !headers.every(th => th.getAttribute('scope') === 'col')) return false;
      if (headers.map(th => th.textContent.trim()).join('|') !== 'Команда 1|Команда 2|Счёт|Арена') return false;
      const dataRows = rows.filter(row => [...row.children].some(c => c.tagName === 'TD'));
      const expected = [
        'Львы|Волки|2:1|Арена A',
        'BYTE|NOVA|3:2|Арена B'
      ];
      if (dataRows.length !== expected.length) return false;
      if (!dataRows.every((row, index) => [...row.children].filter(c => c.tagName === 'TD').map(c => c.textContent.trim()).join('|') === expected[index])) return false;
      const explicitThead = /<thead\b/i.test(value);
      const explicitTbody = /<tbody\b/i.test(value);
      const thead = table.querySelector('thead');
      const tbody = table.querySelector('tbody');
      if (explicitThead && (!thead || thead.querySelectorAll('tr').length !== 1 || thead.querySelectorAll('th[scope="col"]').length !== 4)) return false;
      if (explicitTbody && (!tbody || tbody.querySelectorAll('tr').length !== 2)) return false;
      return true;
    },
    matchCenterFull(value) {
      const d = new DOMParser().parseFromString(value, 'text/html');
      const hrefs = ['#about', '#arena', '#schedule', 'pages/rules.html'];
      if (!hrefs.every(href => d.querySelector(`nav a[href="${href}"]`))) return false;
      const logo = d.querySelector('a[href="index.html"] img[src="assets/images/logo.svg"]');
      const figure = d.querySelector('#arena figure');
      const img = figure && figure.querySelector('img[src="assets/images/arena.jpg"]');
      const figcaption = figure && figure.querySelector('figcaption');
      const audio = d.querySelector('audio[src="assets/media/captain.mp3"]');
      const video = d.querySelector('video[src="assets/media/final.mp4"]');
      const table = d.querySelector('#schedule table');
      if (!table) return false;
      const caption = table.querySelector('caption');
      const rows = [...table.querySelectorAll('tr')];
      const headerRows = rows.filter(row => [...row.children].some(c => c.tagName === 'TH'));
      const dataRows = rows.filter(row => [...row.children].some(c => c.tagName === 'TD'));
      if (headerRows.length !== 1 || dataRows.length !== 1) return false;
      const headers = [...headerRows[0].children].filter(c => c.tagName === 'TH');
      const data = [...dataRows[0].children].filter(c => c.tagName === 'TD').map(c => c.textContent.trim()).join('|');
      if (headers.length !== 4 || !headers.every(th => th.getAttribute('scope') === 'col')) return false;
      if (headers.map(th => th.textContent.trim()).join('|') !== 'Время|Команда 1|Команда 2|Арена') return false;
      if (!caption || caption.textContent.trim() !== 'Ближайший матч' || data !== '19:00|BYTE|NOVA|Арена A') return false;
      const explicitThead = /<thead\b/i.test(value);
      const explicitTbody = /<tbody\b/i.test(value);
      if (explicitThead) {
        const thead = table.querySelector('thead');
        if (!thead || thead.querySelectorAll('tr').length !== 1 || thead.querySelectorAll('th[scope="col"]').length !== 4) return false;
      }
      if (explicitTbody) {
        const tbody = table.querySelector('tbody');
        if (!tbody || tbody.querySelectorAll('tr').length !== 1) return false;
      }
      return Boolean(
        logo && figure && img && String(img.getAttribute('alt') || '').trim() &&
        figcaption && figcaption.textContent.trim() === 'Арена КиберGO за несколько минут до финала.' &&
        audio && audio.hasAttribute('controls') &&
        video && video.hasAttribute('controls') && video.getAttribute('poster') === 'assets/media/final-cover.jpg'
      );
    },
    finalAudit(value) {
      const d = new DOMParser().parseFromString(value, 'text/html');
      const figure = d.querySelector('figure');
      const img = figure && figure.querySelector('img[src="assets/images/arena.jpg"]');
      const alt = img ? String(img.getAttribute('alt') || '').trim().toLowerCase() : '';
      const figcaption = figure && figure.querySelector('figcaption');
      const video = d.querySelector('video[src="assets/media/final.mp4"]');
      const table = d.querySelector('#schedule table');
      if (!table) return false;
      const rows = [...table.querySelectorAll('tr')];
      const headerRows = rows.filter(row => [...row.children].some(c => c.tagName === 'TH'));
      const dataRows = rows.filter(row => [...row.children].some(c => c.tagName === 'TD'));
      if (headerRows.length !== 1 || dataRows.length !== 1) return false;
      const headers = [...headerRows[0].children].filter(c => c.tagName === 'TH');
      if (headers.length !== 4 || !headers.every(th => th.getAttribute('scope') === 'col')) return false;
      if (headers.map(th => th.textContent.trim()).join('|') !== 'Время|Команда 1|Команда 2|Арена') return false;
      if ([...dataRows[0].children].filter(c => c.tagName === 'TD').map(c => c.textContent.trim()).join('|') !== '19:00|BYTE|NOVA|Арена A') return false;
      const explicitThead = /<thead\b/i.test(value);
      const explicitTbody = /<tbody\b/i.test(value);
      if (explicitThead) {
        const thead = table.querySelector('thead');
        if (!thead || thead.querySelectorAll('tr').length !== 1 || thead.querySelectorAll('th[scope="col"]').length !== 4) return false;
      }
      if (explicitTbody) {
        const tbody = table.querySelector('tbody');
        if (!tbody || tbody.querySelectorAll('tr').length !== 1) return false;
      }
      return Boolean(
        d.querySelector('a[href="pages/rules.html"]') &&
        d.querySelector('a[href="pages/teams.html"]') &&
        d.querySelector('a[href="#schedule"]') &&
        figure && img && alt.length >= 12 && alt !== 'арена' &&
        figcaption && figcaption.textContent.trim() === 'Арена финала' &&
        video && video.hasAttribute('controls')
      );
    }
  };

  function parseHtml(value) {
    return new DOMParser().parseFromString(String(value || ''), 'text/html');
  }

  function meaningfulAlt(img) {
    if (!img) return false;
    const alt = String(img.getAttribute('alt') || '').trim().toLowerCase();
    return alt.length >= 8 && !['арена', 'картинка', 'фото', 'изображение'].includes(alt);
  }

  const missionValidators = {
    missionOne(files) {
      const index = parseHtml(files['index.html']);
      const rules = parseHtml(files['pages/rules.html']);
      const teams = parseHtml(files['pages/teams.html']);
      const img = index.querySelector('img[src="assets/images/arena.jpg"]');
      const audio = index.querySelector('audio[src="assets/media/captain.mp3"]');
      const video = index.querySelector('video[src="assets/media/final.mp4"]');
      return [
        Boolean(index.querySelector('a[href="pages/rules.html"]')),
        Boolean(rules.querySelector('a[href="../index.html"]')),
        Boolean(index.querySelector('a[href="pages/teams.html"]') && teams.querySelector('h1')),
        Boolean(img && meaningfulAlt(img)),
        Boolean(audio && audio.hasAttribute('controls') && video && video.hasAttribute('controls') && video.getAttribute('poster') === 'assets/media/final-cover.jpg')
      ];
    },
    missionTwo(value) {
      const source = String(value || '');
      const d = parseHtml(source);
      const table = d.querySelector('table');
      if (!table) return [false, false, false, false];

      // DOMParser сам может вставить <tbody> в таблицу, поэтому для этой миссии
      // отдельно проверяем, что студент действительно написал теги в исходном коде.
      const explicitThead = /<thead\b[^>]*>/i.test(source) && /<\/thead>/i.test(source);
      const explicitTbody = /<tbody\b[^>]*>/i.test(source) && /<\/tbody>/i.test(source);

      const caption = table.querySelector('caption');
      const thead = table.querySelector('thead');
      const tbody = table.querySelector('tbody');
      const captionOk = Boolean(caption && caption.textContent.trim() === 'Расписание матчей на 14 сентября');

      let theadOk = false;
      if (explicitThead && thead) {
        const rows = [...thead.children].filter(el => el.tagName === 'TR');
        if (rows.length === 1) {
          const hs = [...rows[0].children].filter(el => el.tagName === 'TH');
          theadOk = hs.length === 4 && hs.every(th => th.getAttribute('scope') === 'col') && hs.map(th => th.textContent.trim()).join('|') === 'Время|Команда 1|Команда 2|Арена';
        }
      }

      let tbodyOk = false;
      let dataOk = false;
      const expected = [
        '19:00|BYTE|NOVA|Арена A',
        '20:00|LOOP|ZERO|Арена B',
        '21:00|PIXEL|BYTE|Арена A'
      ];
      if (explicitTbody && tbody) {
        const rows = [...tbody.children].filter(el => el.tagName === 'TR');
        tbodyOk = rows.length === 3;
        dataOk = rows.length === expected.length && rows.every((row, i) => [...row.children].filter(el => el.tagName === 'TD').map(td => td.textContent.trim()).join('|') === expected[i]);
      }
      return [captionOk, theadOk, tbodyOk, dataOk];
    },
    finalMission(files) {
      const index = parseHtml(files['index.html']);
      const teams = parseHtml(files['pages/teams.html']);
      const img = index.querySelector('img[src="assets/images/arena.jpg"]');
      const video = index.querySelector('video[src="assets/media/final.mp4"]');
      const scheduleLink = index.querySelector('a[href="#schedule"]');
      const schedule = index.querySelector('#schedule');
      const table = index.querySelector('#schedule table');
      let tableOk = false;
      if (table) {
        const headerRow = [...table.querySelectorAll('tr')].find(row => row.querySelector('th'));
        if (headerRow) {
          const hs = [...headerRow.children].filter(el => el.tagName === 'TH');
          tableOk = hs.length === 4 && hs.every(th => th.getAttribute('scope') === 'col') && hs.map(th => th.textContent.trim()).join('|') === 'Время|Команда 1|Команда 2|Арена';
        }
      }
      return [
        Boolean(index.querySelector('a[href="pages/rules.html"]')),
        Boolean(teams.querySelector('a[href="../index.html"]')),
        Boolean(scheduleLink && schedule),
        Boolean(img && meaningfulAlt(img)),
        Boolean(video && video.hasAttribute('controls') && video.getAttribute('poster') === 'assets/media/final-cover.jpg'),
        tableOk
      ];
    }
  };


  function finalDebugFeedback(value) {
    const misses = [];
    if (!/<html\b[^>]*lang\s*=\s*["']ru["']/i.test(value)) misses.push('укажите язык документа');
    if (!/<head>[\s\S]*<meta\b[^>]*charset/i.test(value) || !/<title>\s*Сигнал потерян\s*<\/title>/i.test(value)) misses.push('проверьте служебную часть head');
    if (headerContainsH1(value) || !/<main>[\s\S]*<h1>\s*Сигнал потерян\s*<\/h1>/i.test(value)) misses.push('проверьте место главного заголовка');
    if (!/<section>[\s\S]*Порядок проверки[\s\S]*<ol\b/i.test(value)) misses.push('проверьте тематический блок с последовательностью действий');
    if (!/<article>[\s\S]*Памятка оператора[\s\S]*<\/article>/i.test(value)) misses.push('проверьте самостоятельный материал');
    if (!/<aside>[\s\S]*Совет: сначала проверьте индикатор питания\.[\s\S]*<\/aside>/i.test(value)) misses.push('проверьте дополнительный совет');
    if (!/<strong[^>]*>\s*Не отключайте питание во время диагностики\.\s*<\/strong>/i.test(value)) misses.push('проверьте важное предупреждение и вложенность');
    return misses.length ? 'Проверьте: ' + misses.slice(0, 3).join('; ') + '.' : 'Код почти готов, но одно из условий ещё не выполнено. Сверьтесь с условием задачи.';
  }



  function applyTheoryLayout(collapsed) {
    refs.lesson.classList.toggle('theory-collapsed', collapsed);
    refs.lesson.classList.toggle('theory-no-preview', refs.previewCard.hidden);
    refs.theoryToggleButton.setAttribute('aria-pressed', String(collapsed));
    refs.theoryToggleButton.classList.toggle('is-active', collapsed);
    refs.theoryToggleLabel.textContent = collapsed ? 'Показать теорию' : 'Скрыть теорию';
  }

  function stopTheoryTransition() {
    if (theoryTransitionTimer) {
      window.clearTimeout(theoryTransitionTimer);
      theoryTransitionTimer = 0;
    }
    refs.lesson.classList.remove('theory-layout-switching', 'theory-layout-fade');
    refs.theoryToggleButton.disabled = false;
  }

  function setTheoryCollapsed(collapsed, animate = true) {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const desktop = window.matchMedia('(min-width: 861px)').matches;
    if (!animate || reducedMotion || !desktop) {
      stopTheoryTransition();
      applyTheoryLayout(collapsed);
      return;
    }

    stopTheoryTransition();
    refs.theoryToggleButton.disabled = true;
    refs.lesson.classList.add('theory-layout-switching');
    requestAnimationFrame(() => refs.lesson.classList.add('theory-layout-fade'));

    theoryTransitionTimer = window.setTimeout(() => {
      applyTheoryLayout(collapsed);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => refs.lesson.classList.remove('theory-layout-fade'));
      });
      theoryTransitionTimer = window.setTimeout(() => {
        refs.lesson.classList.remove('theory-layout-switching');
        refs.theoryToggleButton.disabled = false;
        theoryTransitionTimer = 0;
      }, 210);
    }, 145);
  }

  function toggleTheory() {
    if (currentView !== 'lesson' || currentIndex >= SCORE_STEP_COUNT || refs.theoryToggleButton.disabled) return;
    const step = steps[currentIndex];
    const collapsed = !refs.lesson.classList.contains('theory-collapsed');
    if (collapsed) theoryCollapsedSteps.add(step.id);
    else theoryCollapsedSteps.delete(step.id);
    setTheoryCollapsed(collapsed, true);
  }

  function handleTabInTextarea(event) {
    if (event.key !== 'Tab') return;
    event.preventDefault();
    const el = event.currentTarget;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    el.value = el.value.slice(0, start) + '  ' + el.value.slice(end);
    el.selectionStart = el.selectionEnd = start + 2;
    if (typeof el._syncHighlight === 'function') el._syncHighlight();
  }

  function prepareSpecialPage() {
    stopTheoryTransition();
    refs.theoryToggleButton.hidden = true;
    applyTheoryLayout(false);
    refs.taskBody.innerHTML = '';
    refs.feedback.className = 'feedback';
    refs.feedback.textContent = '';
    refs.feedback.setAttribute('aria-hidden', 'true');
    refs.feedbackAction.innerHTML = '';
    refs.feedbackRow.hidden = true;
    refs.helpRow.hidden = true;
    refs.previewCard.hidden = true;
    refs.semanticPreviewControls.hidden = true;
    refs.previewArticleButton.hidden = true;
    refs.previewFrame.removeAttribute('src');
    refs.previewFrame.removeAttribute('srcdoc');
    currentPreviewSource = '';
    missionPreviewPages = null;
    missionPreviewStartPath = null;
    semanticArticleOnly = false;
    refs.taskCard.classList.add('final-task');
    refs.contentPanel.classList.remove('final-mode');
    refs.lessonNav.hidden = false;
    refs.appShell.classList.remove('no-nav');
    refs.lesson.classList.remove('long-step-scroll');
    if (refs.contentPanel) refs.contentPanel.scrollTop = 0;
  }

  function renderResultPage() {
    if (!allScoredStepsComplete()) {
      currentIndex = SCORE_STEP_COUNT - 1;
      renderStep();
      openDrawer();
      return;
    }
    currentView = 'lesson';
    currentIndex = SCORE_STEP_COUNT;
    if (!finishedAt) finishedAt = new Date().toISOString();
    const summary = getScoreSummary();
    prepareSpecialPage();
    refs.stepCounter.textContent = `Шаг 14 из ${TOTAL_STEP_COUNT}`;
    refs.sectionLabel.textContent = 'Результат';
    refs.stepEyebrow.textContent = 'Итоговая оценка';
    refs.stepTitle.textContent = 'Результат';
    refs.stepLead.textContent = 'Готово — вы завершили тему «Связи, ресурсы и табличные данные».';
    refs.stepImage.src = 'assets/images/14.jpg';
    refs.stepImage.alt = 'Итог HTML: ссылки и пути, изображения и медиа, таблицы.';
    refs.modalImage.src = refs.stepImage.src;
    refs.modalImage.alt = refs.stepImage.alt;
    refs.theoryCard.innerHTML = buildResultTheory();
    refs.taskTitle.textContent = 'Ваш результат';
    refs.taskStatus.className = 'task-status done';
    refs.taskStatus.textContent = 'Оценка ' + summary.grade;

    const body = document.createElement('div');
    body.className = 'final-workspace';
    const scoreCard = document.createElement('section');
    scoreCard.className = 'result-card';
    scoreCard.innerHTML = `
      <div class="result-main">
        <div>
          <span class="result-label">Результат интерактива</span>
          <strong>${formatScore(summary.score)} / ${MAX_SCORE}</strong>
          <span>${summary.percent}% · оценка <b>${summary.grade}</b></span>
        </div>
        <div class="result-grade" aria-label="Оценка ${summary.grade}">${summary.grade}</div>
      </div>
      <div class="result-stats mission-stats">
        <span>Миссия 1 <b>${formatScore((summary.missions[8] || {points:0}).points)} / 5</b></span>
        <span>Миссия 2 <b>${formatScore((summary.missions[12] || {points:0}).points)} / 4</b></span>
        <span>Финальная <b>${formatScore((summary.missions[13] || {points:0}).points)} / 6</b></span>
      </div>
      <p>Максимальная оценка за интерактив — <strong>4</strong>. Учебные шаги баллов не дают; работа в IDE может повысить итоговую оценку до 5.</p>`;
    body.appendChild(scoreCard);

    const actions = document.createElement('div');
    actions.className = 'final-actions single-action';
    const printButton = document.createElement('button');
    printButton.type = 'button';
    printButton.className = 'report-button';
    printButton.textContent = 'Сохранить отчёт в PDF';
    printButton.addEventListener('click', printProgressReport);
    actions.appendChild(printButton);
    body.appendChild(actions);
    refs.taskBody.appendChild(body);

    refs.prevButton.hidden = false;
    refs.prevButton.disabled = false;
    refs.nextButton.hidden = false;
    refs.nextButton.disabled = false;
    refs.nextButton.textContent = 'Далее →';
    updateProgress();
    renderStepsList();
    save();
  }

  function renderFinalWorkPage() {
    currentView = 'lesson';
    currentIndex = SCORE_STEP_COUNT + 1;
    prepareSpecialPage();
    refs.contentPanel.classList.add('final-mode');
    refs.stepCounter.textContent = `Шаг 15 из ${TOTAL_STEP_COUNT}`;
    refs.sectionLabel.textContent = 'Работа на 5';
    refs.stepEyebrow.textContent = 'Самостоятельный проект';
    refs.stepTitle.textContent = 'Итоговая работа · Ночь музеев';
    refs.stepLead.textContent = 'Соберите небольшой сайт городской акции «Ночь музеев». Здесь нет КиберGO и нет поиска заранее сломанных строк: вы переносите изученные приёмы в новую предметную область.';
    refs.stepImage.src = finalWork.image;
    refs.stepImage.alt = finalWork.alt;
    refs.modalImage.src = finalWork.image;
    refs.modalImage.alt = finalWork.alt;
    refs.theoryCard.innerHTML = `
      <p><strong>Этой работой можно повысить оценку до 5.</strong> Она выполняется в обычных HTML-файлах и проверяется очно у преподавателя.</p>
      <p>Предметная область новая: городская акция «Ночь музеев». Все тексты и ресурсы уже лежат в архиве — вам нужно самостоятельно собрать из них работающий небольшой сайт.</p>`;
    refs.taskTitle.textContent = 'Условие задания';
    refs.taskStatus.className = 'task-status';
    refs.taskStatus.textContent = 'Работа в IDE';

    const body = document.createElement('div');
    body.className = 'final-workspace';

    const actions = document.createElement('div');
    actions.className = 'final-actions single-action';
    const download = document.createElement('a');
    download.className = 'download-button';
    download.href = finalWork.href;
    download.download = finalWork.filename;
    download.textContent = 'Скачать стартовый проект (.zip)';
    actions.appendChild(download);
    body.appendChild(actions);

    const brief = document.createElement('section');
    brief.className = 'brief-card';
    const briefTitle = document.createElement('div');
    briefTitle.className = 'brief-heading';
    briefTitle.innerHTML = '<span>Итоговая работа</span><strong>Городская афиша · Ночь музеев</strong>';
    brief.appendChild(briefTitle);

    const sourceBlock = document.createElement('div');
    sourceBlock.className = 'brief-section';
    const sourceHeading = document.createElement('h3');
    sourceHeading.textContent = 'Что уже есть в архиве';
    const pre = document.createElement('pre');
    pre.className = 'source-text';
    pre.textContent = finalWork.sourceText;
    sourceBlock.appendChild(sourceHeading);
    sourceBlock.appendChild(pre);

    const reqBlock = document.createElement('div');
    reqBlock.className = 'brief-section';
    const reqHeading = document.createElement('h3');
    reqHeading.textContent = 'Порядок работы';
    const briefCopy = document.createElement('div');
    briefCopy.className = 'brief-copy';
    const intro = document.createElement('p');
    intro.className = 'brief-intro';
    intro.textContent = finalWork.brief[0];
    briefCopy.appendChild(intro);
    const ordered = document.createElement('ol');
    ordered.className = 'final-steps-list';
    finalWork.brief.slice(1).forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      ordered.appendChild(li);
    });
    briefCopy.appendChild(ordered);
    reqBlock.appendChild(reqHeading);
    reqBlock.appendChild(briefCopy);
    brief.appendChild(sourceBlock);
    brief.appendChild(reqBlock);

    const checkBlock = document.createElement('div');
    checkBlock.className = 'brief-section brief-check';
    const checkHeading = document.createElement('h3');
    checkHeading.textContent = 'Перед сдачей проверьте';
    const checklist = document.createElement('ul');
    checklist.className = 'submission-checklist';
    finalWork.checklist.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      checklist.appendChild(li);
    });
    checkBlock.appendChild(checkHeading);
    checkBlock.appendChild(checklist);
    brief.appendChild(checkBlock);
    body.appendChild(brief);
    refs.taskBody.appendChild(body);

    refs.prevButton.hidden = false;
    refs.prevButton.disabled = false;
    refs.nextButton.hidden = true;
    refs.nextButton.disabled = true;
    updateProgress();
    renderStepsList();
    save();
  }

  function renderCurrentView() {
    renderStep();
  }

  function buildMissionPageMap(files) {
    const map = {};
    Object.entries(files || {}).forEach(([path, source]) => {
      const doc = sanitizePreviewDocument(source);
      map[path] = doc.body.innerHTML;
    });
    return map;
  }

  function createCodeEditor(value, ariaLabel) {
    const editorShell = document.createElement('div');
    editorShell.className = 'code-editor-shell';
    const lines = String(value || '').split('\n').length;
    editorShell.style.height = Math.min(310, Math.max(185, 48 + lines * 13)) + 'px';
    const highlight = document.createElement('pre');
    highlight.className = 'code-highlight';
    highlight.setAttribute('aria-hidden', 'true');
    const highlightCode = document.createElement('code');
    highlight.appendChild(highlightCode);
    const textarea = document.createElement('textarea');
    textarea.className = 'code-editor';
    textarea.spellcheck = false;
    textarea.autocapitalize = 'off';
    textarea.autocomplete = 'off';
    textarea.value = String(value || '');
    textarea.setAttribute('aria-label', ariaLabel || 'Редактор HTML-кода');
    const sync = () => {
      highlightCode.innerHTML = highlightHtml(textarea.value) + '\n';
      highlight.scrollTop = textarea.scrollTop;
      highlight.scrollLeft = textarea.scrollLeft;
    };
    textarea._syncHighlight = sync;
    textarea.addEventListener('scroll', () => {
      highlight.scrollTop = textarea.scrollTop;
      highlight.scrollLeft = textarea.scrollLeft;
    });
    textarea.addEventListener('keydown', handleTabInTextarea);
    editorShell.appendChild(highlight);
    editorShell.appendChild(textarea);
    sync();
    return { editorShell, textarea, sync };
  }

  function renderCriteriaList(task, results) {
    const list = document.createElement('div');
    list.className = 'mission-criteria';
    (task.criteria || []).forEach((label, index) => {
      const item = document.createElement('div');
      const state = Array.isArray(results) ? results[index] : null;
      item.className = 'mission-criterion' + (state === true ? ' is-ok' : state === false ? ' is-miss' : '');
      const icon = document.createElement('span');
      icon.className = 'mission-criterion-icon';
      icon.textContent = state === true ? '✓' : state === false ? '×' : '○';
      const text = document.createElement('span');
      text.textContent = label;
      item.append(icon, text);
      list.appendChild(item);
    });
    return list;
  }

  function missionResultMessage(step, results) {
    const score = results.filter(Boolean).length;
    const max = MISSION_MAX_POINTS[step.id] || results.length;
    if (score === max) return `Все требования выполнены: ${score} из ${max}.`;
    return `Диагностика: выполнено ${score} из ${max}. Исправьте отмеченные пункты и запустите проверку снова.`;
  }

  function renderTask(step) {
    const task = step.task;
    refs.taskBody.innerHTML = '';
    refs.feedback.className = 'feedback';
    refs.feedback.textContent = '';
    refs.feedback.setAttribute('aria-hidden', 'true');
    refs.feedbackAction.innerHTML = '';
    refs.feedbackRow.hidden = false;
    refs.helpBox.classList.remove('is-visible');
    refs.helpBox.setAttribute('aria-hidden', 'true');
    refs.helpBox.innerHTML = '';
    refs.previewCard.hidden = true;
    refs.previewFrame.hidden = false;
    refs.semanticPreviewControls.hidden = true;
    refs.previewArticleButton.hidden = true;
    refs.previewFrame.removeAttribute('src');
    refs.previewFrame.removeAttribute('srcdoc');
    currentPreviewSource = '';
    semanticArticleOnly = false;
    refs.taskCard.classList.remove('final-task');
    refs.contentPanel.classList.remove('final-mode');
    refs.taskTitle.textContent = isMissionStep(step.id) ? 'Миссия' : 'Мини-задача';


    const meta = ensureMeta(step.id);
    refs.helpRow.hidden = false;
    refs.hintButton.classList.remove('solution-ready');
    refs.hintButton.disabled = false;
    if (meta.solutionShown) {
      refs.hintButton.textContent = 'Решение показано';
      refs.hintButton.disabled = true;
    } else if (meta.hintsUsed >= 3) {
      refs.hintButton.textContent = isMissionStep(step.id) ? 'Показать решение · половина баллов' : 'Показать решение';
      refs.hintButton.classList.add('solution-ready');
    } else if (meta.hintsUsed > 0) {
      refs.hintButton.textContent = 'Ещё подсказка';
    } else {
      refs.hintButton.textContent = 'Показать подсказку';
    }

    const prompt = document.createElement('p');
    prompt.className = 'task-prompt';
    prompt.textContent = task.prompt;
    refs.taskBody.appendChild(prompt);

    if (Array.isArray(task.instructions) && task.instructions.length) {
      const instructions = document.createElement('ol');
      instructions.className = 'task-instructions';
      task.instructions.forEach(text => {
        const li = document.createElement('li');
        li.textContent = text;
        instructions.appendChild(li);
      });
      refs.taskBody.appendChild(instructions);
    }

    if (task.type === 'choice') {
      const wrap = document.createElement('div');
      wrap.className = 'choice-grid';
      task.choices.forEach((text, index) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'choice-button';
        btn.textContent = text;
        btn.addEventListener('click', () => {
          [...wrap.children].forEach(el => el.classList.remove('selected', 'correct', 'wrong'));
          btn.classList.add('selected');
          if (index === task.correct) {
            btn.classList.add('correct');
            setDone(step, 'Верно. Можно двигаться дальше.');
          } else {
            btn.classList.add('wrong');
            showFeedback('Пока не так. Сопоставьте ответ с основной мыслью шага.', 'error');
          }
        });
        wrap.appendChild(btn);
      });
      refs.taskBody.appendChild(wrap);
      if (meta.solutionShown) showHelp('<strong>Решение:</strong><br>' + escapeHtml(step.solution || solutionForTask(task)));
    }

    if (task.type === 'code') {
      const wrap = document.createElement('div');
      wrap.className = 'code-editor-wrap';
      const editorShell = document.createElement('div');
      editorShell.className = 'code-editor-shell';
      const lines = String(task.initial).split('\n').length;
      editorShell.style.height = Math.min(235, Math.max(175, 42 + lines * 14)) + 'px';
      const highlight = document.createElement('pre');
      highlight.className = 'code-highlight';
      highlight.setAttribute('aria-hidden', 'true');
      const highlightCode = document.createElement('code');
      highlight.appendChild(highlightCode);
      const textarea = document.createElement('textarea');
      textarea.className = 'code-editor';
      textarea.spellcheck = false;
      textarea.autocapitalize = 'off';
      textarea.autocomplete = 'off';
      textarea.value = meta.draft || (statuses[step.id] ? task.solution : task.initial);
      textarea.setAttribute('aria-label', 'Редактор HTML-кода');
      refs.previewCard.hidden = false;
      if (isSemanticPreviewStep(step)) {
        semanticPreviewMode = statuses[step.id] ? 'structure' : 'browser';
      } else {
        semanticPreviewMode = 'browser';
      }
      const syncHighlight = () => {
        highlightCode.innerHTML = highlightHtml(textarea.value) + '\n';
        highlight.scrollTop = textarea.scrollTop;
        highlight.scrollLeft = textarea.scrollLeft;
        updatePreview(textarea.value);
      };
      textarea._syncHighlight = syncHighlight;
      textarea.addEventListener('input', () => {
        meta.draft = textarea.value;
        save();
        syncHighlight();
      });
      textarea.addEventListener('scroll', () => {
        highlight.scrollTop = textarea.scrollTop;
        highlight.scrollLeft = textarea.scrollLeft;
      });
      textarea.addEventListener('keydown', handleTabInTextarea);
      editorShell.appendChild(highlight);
      editorShell.appendChild(textarea);
      wrap.appendChild(editorShell);
      syncHighlight();
      const check = document.createElement('button');
      check.type = 'button';
      check.className = 'check-button';
      check.textContent = 'Проверить код';
      check.addEventListener('click', () => {
        const fn = validators[task.validator];
        if (fn && fn(textarea.value)) {
          let successMessage = step.id === 15 ? 'Готово. Все пять проблем устранены.' : 'Отлично. Код соответствует условиям задачи.';
          setDone(step, successMessage);
        } else {
          showFeedback('В коде пока есть неточность. Ещё раз проверьте условие или воспользуйтесь подсказкой.', 'error');
        }
      });
      refs.feedbackAction.appendChild(check);
      refs.taskBody.appendChild(wrap);
      if (meta.solutionShown) {
        textarea.value = codeWithComparison(meta.attemptBeforeSolution || task.initial, task.solution);
        syncHighlight();
        check.remove();
        showHelp('<strong>Решение уже было показано.</strong><br>Правильный вариант находится сверху, ваша сохранённая попытка — ниже в комментарии.');
      }
    }

    if (task.type === 'missionCode') {
      refs.previewCard.hidden = false;
      const wrap = document.createElement('div');
      wrap.className = 'code-editor-wrap mission-editor-wrap';
      const initialValue = meta.draft || (meta.solutionShown ? task.solution : task.initial);
      const editor = createCodeEditor(initialValue, 'Редактор HTML-кода миссии');
      const textarea = editor.textarea;
      const syncAll = () => {
        editor.sync();
        meta.draft = textarea.value;
        save();
        updatePreview(textarea.value);
      };
      /* mission input listener attached after criteria renderer */
      wrap.appendChild(editor.editorShell);
      const criteriaHost = document.createElement('div');
      criteriaHost.className = 'mission-criteria-host';
      const redrawCriteria = () => {
        criteriaHost.innerHTML = '';
        criteriaHost.appendChild(renderCriteriaList(task, Array.isArray(meta.missionResults) ? meta.missionResults : null));
      };
      textarea.addEventListener('input', () => {
        meta.missionResults = null;
        meta.missionScore = 0;
        delete statuses[step.id];
        redrawCriteria();
        updateStatusUI(step);
        renderStepsList();
        syncAll();
      });
      redrawCriteria();
      refs.taskBody.append(wrap, criteriaHost);
      syncAll();

      const check = document.createElement('button');
      check.type = 'button';
      check.className = 'check-button';
      check.textContent = 'Запустить проверку';
      check.addEventListener('click', () => {
        const fn = missionValidators[task.validator];
        const results = fn ? fn(textarea.value) : [];
        meta.missionResults = results;
        meta.missionScore = results.filter(Boolean).length;
        statuses[step.id] = meta.solutionShown ? 'revealed' : 'done';
        save();
        redrawCriteria();
        showFeedback(missionResultMessage(step, results), meta.missionScore === MISSION_MAX_POINTS[step.id] ? 'success' : 'info');
        updateStatusUI(step);
        renderStepsList();
      });
      refs.feedbackAction.appendChild(check);
      if (meta.solutionShown) {
        textarea.value = task.solution;
        syncAll();
        meta.missionResults = new Array(task.criteria.length).fill(true);
        meta.missionScore = task.criteria.length;
        redrawCriteria();
        check.remove();
        showHelp('<strong>Готовое решение показано.</strong><br>За оцениваемую миссию будет начислена половина набранных баллов.');
      }
    }

    if (task.type === 'multifile') {
      refs.previewCard.hidden = false;
      const files = {};
      Object.entries(task.files || {}).forEach(([path, source]) => {
        files[path] = Object.prototype.hasOwnProperty.call(meta.filesDraft, path) ? meta.filesDraft[path] : source;
      });
      if (meta.solutionShown && task.solutionFiles) {
        Object.assign(files, task.solutionFiles);
        meta.filesDraft = { ...files };
      }
      let activePath = meta.activeFile && files[meta.activeFile] != null ? meta.activeFile : (task.startFile || Object.keys(files)[0]);
      meta.activeFile = activePath;
      let missionPreviewTimer = 0;

      const tabs = document.createElement('div');
      tabs.className = 'file-tabs';
      const editorWrap = document.createElement('div');
      editorWrap.className = 'code-editor-wrap mission-editor-wrap';
      let editor = null;

      const refreshMissionPreview = () => {
        if (missionPreviewTimer) {
          window.clearTimeout(missionPreviewTimer);
          missionPreviewTimer = 0;
        }
        missionPreviewPages = buildMissionPageMap(files);
        missionPreviewStartPath = activePath;
        if (editor) updatePreview(editor.textarea.value);
      };
      const scheduleMissionPreview = () => {
        if (missionPreviewTimer) window.clearTimeout(missionPreviewTimer);
        missionPreviewTimer = window.setTimeout(refreshMissionPreview, 180);
      };

      const openFile = path => {
        if (editor) {
          files[activePath] = editor.textarea.value;
          meta.filesDraft = { ...files };
        }
        activePath = path;
        meta.activeFile = activePath;
        editorWrap.innerHTML = '';
        editor = createCodeEditor(files[activePath], 'Редактор файла ' + activePath);
        editor.textarea.addEventListener('input', () => {
          files[activePath] = editor.textarea.value;
          meta.filesDraft = { ...files };
          meta.missionResults = null;
          meta.missionScore = 0;
          delete statuses[step.id];
          redrawCriteria();
          updateStatusUI(step);
          renderStepsList();
          save();
          editor.sync();
          scheduleMissionPreview();
        });
        editorWrap.appendChild(editor.editorShell);
        [...tabs.querySelectorAll('button')].forEach(button => button.classList.toggle('is-active', button.dataset.path === activePath));
        save();
        refreshMissionPreview();
      };

      Object.keys(files).forEach(path => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'file-tab';
        btn.dataset.path = path;
        btn.textContent = path === 'index.html' ? 'index.html' : path.split('/').pop();
        btn.title = path;
        btn.addEventListener('click', () => openFile(path));
        tabs.appendChild(btn);
      });

      const criteriaHost = document.createElement('div');
      criteriaHost.className = 'mission-criteria-host';
      const redrawCriteria = () => {
        criteriaHost.innerHTML = '';
        criteriaHost.appendChild(renderCriteriaList(task, Array.isArray(meta.missionResults) ? meta.missionResults : null));
      };
      redrawCriteria();
      refs.taskBody.append(tabs, editorWrap, criteriaHost);
      openFile(activePath);

      const check = document.createElement('button');
      check.type = 'button';
      check.className = 'check-button';
      check.textContent = step.id === 13 ? 'Запустить диагностику' : 'Проверить миссию';
      check.addEventListener('click', () => {
        if (editor) files[activePath] = editor.textarea.value;
        meta.filesDraft = { ...files };
        const fn = missionValidators[task.validator];
        const results = fn ? fn(files) : [];
        meta.missionResults = results;
        meta.missionScore = results.filter(Boolean).length;
        statuses[step.id] = meta.solutionShown ? 'revealed' : 'done';
        save();
        redrawCriteria();
        showFeedback(missionResultMessage(step, results), meta.missionScore === MISSION_MAX_POINTS[step.id] ? 'success' : 'info');
        updateStatusUI(step);
        renderStepsList();
      });
      refs.feedbackAction.appendChild(check);
      if (meta.solutionShown) {
        meta.missionResults = new Array(task.criteria.length).fill(true);
        meta.missionScore = task.criteria.length;
        redrawCriteria();
        check.remove();
        showHelp('<strong>Готовые файлы показаны.</strong><br>За оцениваемую миссию будет начислена половина набранных баллов. Переключайтесь между вкладками, чтобы сравнить решения.');
      }
    }

    if (task.type === 'matrix') {
      const matrix = document.createElement('div');
      matrix.className = 'matrix';
      task.rows.forEach(row => {
        const item = document.createElement('label');
        item.className = 'matrix-row';
        const text = document.createElement('span');
        text.textContent = row[0];
        const select = document.createElement('select');
        select.dataset.correct = row[2];
        select.setAttribute('aria-label', row[0]);
        const placeholder = document.createElement('option');
        placeholder.value = '';
        placeholder.textContent = 'Выберите…';
        select.appendChild(placeholder);
        row[1].forEach(opt => {
          const option = document.createElement('option');
          option.value = opt;
          option.textContent = opt;
          select.appendChild(option);
        });
        item.appendChild(text);
        item.appendChild(select);
        matrix.appendChild(item);
      });
      const check = document.createElement('button');
      check.type = 'button';
      check.className = 'check-button';
      check.textContent = 'Проверить ответы';
      check.addEventListener('click', () => {
        const selects = [...matrix.querySelectorAll('select')];
        const filled = selects.every(s => s.value);
        const ok = filled && selects.every(s => s.value === s.dataset.correct);
        if (ok) setDone(step, 'Верно. Вы опирались на смысл, а не на внешний вид.');
        else showFeedback(filled ? 'Есть минимум один неверный выбор. Проверьте смысл каждого примера.' : 'Сначала выберите вариант в каждой строке.', 'error');
      });
      refs.taskBody.appendChild(matrix);
      refs.feedbackAction.appendChild(check);
    }

    restoreStatus(step);
  }

  function setDone(step, message) {
    const meta = ensureMeta(step.id);
    const state = meta.solutionShown ? 'revealed' : 'done';
    statuses[step.id] = state;
    save();
    showFeedback(message + (isMissionStep(step.id) ? ` +${pointLabel(getStepPoints(step.id))}.` : ''), state === 'done' ? 'success' : 'info');
    updateStatusUI(step);
    renderStepsList();
  }

  function restoreStatus(step) {
    updateStatusUI(step);
    const status = statuses[step.id];
    if (!status) return;
    const meta = ensureMeta(step.id);
    if (isMissionStep(step.id)) {
      const raw = Math.max(0, Math.min(MISSION_MAX_POINTS[step.id], Number(meta.missionScore) || 0));
      const points = getStepPoints(step.id);
      const prefix = status === 'revealed' ? 'Решение было показано. ' : '';
      showFeedback(`${prefix}Текущий результат миссии: ${formatScore(points)} из ${MISSION_MAX_POINTS[step.id]} баллов.`, points === MISSION_MAX_POINTS[step.id] ? 'success' : 'info');
    } else if (status === 'done') {
      showFeedback(meta.hintsUsed > 0 ? 'Учебный шаг выполнен с подсказками.' : 'Учебный шаг выполнен.', 'success');
    } else if (status === 'revealed') {
      showFeedback('Учебный шаг завершён с готовым решением. Баллы за учебные шаги не начисляются.', 'info');
    }
  }

  function updateStatusUI(step) {
    const status = statuses[step.id];
    refs.taskStatus.className = 'task-status';
    if (isMissionStep(step.id)) {
      const points = getStepPoints(step.id);
      if (status) refs.taskStatus.classList.add(status === 'revealed' ? 'revealed' : 'done');
      refs.taskStatus.textContent = status
        ? `Миссия проверена · ${formatScore(points)} / ${MISSION_MAX_POINTS[step.id]} баллов`
        : `Миссия · до ${MISSION_MAX_POINTS[step.id]} баллов`;
    } else if (status === 'done') {
      refs.taskStatus.classList.add('done');
      refs.taskStatus.textContent = 'Учебный шаг выполнен';
    } else if (status === 'revealed') {
      refs.taskStatus.classList.add('revealed');
      refs.taskStatus.textContent = 'Учебный шаг · решение показано';
    } else {
      refs.taskStatus.textContent = 'Учебный шаг · без баллов';
    }
    refs.nextButton.disabled = !status;
    updateProgress();
  }

  function showFeedback(text, type) {
    refs.feedback.className = 'feedback ' + type + ' is-visible';
    refs.feedback.textContent = text;
    refs.feedback.setAttribute('aria-hidden', 'false');
  }

  function buildResultTheory() {
    const personalCode = escapeHtml(participant.personalCode);
    return `
      <p><strong>Личный код:</strong> ${personalCode}</p>
      <p>Готово — тема завершена. Отличная работа: вы связали страницы, подключили ресурсы и разобрались с таблицами.</p>
      <div class="memory">Можно переходить к самостоятельной работе и показать, что вы умеете переносить эти навыки в новый проект.</div>`;
  }

  function renderStep() {
    currentView = 'lesson';
    if (currentIndex === SCORE_STEP_COUNT) {
      renderResultPage();
      return;
    }
    if (currentIndex === SCORE_STEP_COUNT + 1) {
      renderFinalWorkPage();
      return;
    }

    const step = steps[currentIndex];
    refs.lesson.classList.toggle('long-step-scroll', step.id === 8 || step.id === 13);
    refs.appShell.classList.remove('no-nav');
    refs.lessonNav.hidden = false;
    refs.stepCounter.textContent = `Шаг ${currentIndex + 1} из ${TOTAL_STEP_COUNT}`;
    refs.sectionLabel.textContent = step.section;
    refs.stepImage.src = step.image;
    refs.stepImage.alt = step.alt;
    refs.modalImage.src = step.image;
    refs.modalImage.alt = step.alt;
    refs.stepEyebrow.textContent = step.eyebrow;
    refs.stepTitle.textContent = step.title;
    refs.stepLead.textContent = step.lead;
    refs.theoryCard.innerHTML = step.theory;
    if (refs.contentPanel) refs.contentPanel.scrollTop = 0;
    refs.prevButton.hidden = false;
    refs.nextButton.hidden = false;
    refs.prevButton.disabled = currentIndex === 0;
    refs.nextButton.textContent = 'Далее →';
    refs.theoryToggleButton.hidden = false;
    renderTask(step);
    setTheoryCollapsed(theoryCollapsedSteps.has(step.id), false);
    updateProgress();
    renderStepsList();
    save();
    if (window.matchMedia('(max-width: 860px)').matches) window.scrollTo({ top: 0, behavior: 'smooth' });
    else refs.lesson.focus({ preventScroll: true });
  }

  function updateProgress() {
    const completed = Array.from({ length: SCORE_STEP_COUNT }, (_, i) => i + 1).filter(id => statuses[id]).length;
    const pct = Math.round((completed / SCORE_STEP_COUNT) * 100);
    refs.progressPercent.textContent = pct + '%';
    refs.progressBar.style.width = pct + '%';
  }

  function makeClosingStepButton(index, title, stateText, disabled) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'step-link special-link';
    if (currentIndex === index) btn.classList.add('current');
    if (disabled) {
      btn.disabled = true;
      btn.classList.add('locked');
    }
    btn.innerHTML = `<span class="step-index">${String(index + 1).padStart(2, '0')}</span><span class="step-link-title">${escapeHtml(title)}</span><span class="step-link-state">${escapeHtml(stateText)}</span>`;
    btn.addEventListener('click', () => {
      if (btn.disabled) return;
      currentIndex = index;
      currentView = 'lesson';
      closeDrawer();
      renderStep();
    });
    return btn;
  }

  function renderStepsList() {
    refs.stepsList.innerHTML = '';
    steps.forEach((step, index) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'step-link';
      if (index === currentIndex) btn.classList.add('current');
      if (statuses[step.id]) btn.classList.add(statuses[step.id]);
      const stateText = isMissionStep(step.id) ? (statuses[step.id] ? `${formatScore(getStepPoints(step.id))} / ${MISSION_MAX_POINTS[step.id]}` : `до ${MISSION_MAX_POINTS[step.id]} баллов`) : (statuses[step.id] ? 'учебный шаг ✓' : 'без баллов');
      btn.innerHTML = `<span class="step-index">${String(index + 1).padStart(2, '0')}</span><span class="step-link-title">${escapeHtml(step.title)}</span><span class="step-link-state">${stateText}</span>`;
      btn.addEventListener('click', () => {
        currentIndex = index;
        currentView = 'lesson';
        closeDrawer();
        renderStep();
      });
      refs.stepsList.appendChild(btn);
    });

    const divider = document.createElement('div');
    divider.className = 'steps-special-separator';
    divider.innerHTML = '<span>Завершение</span>';
    refs.stepsList.appendChild(divider);

    const resultUnlocked = allScoredStepsComplete();
    refs.stepsList.appendChild(makeClosingStepButton(SCORE_STEP_COUNT, 'Результат', resultUnlocked ? 'готово' : 'сначала завершите шаги 1–13', !resultUnlocked));
    refs.stepsList.appendChild(makeClosingStepButton(SCORE_STEP_COUNT + 1, 'Повышаем оценку до 5', 'работа в IDE', false));
  }

  function getHintTriplet(step) {
    const first = step.hints && step.hints[0] ? step.hints[0] : 'Вернитесь к основной мысли шага и определите, какую роль играет содержимое.';
    const second = step.hints && step.hints[1] ? step.hints[1] : 'Сравните условие задачи с примером в теории и визуализации.';
    const third = specificHints[step.id] || 'Проверьте структуру и названия элементов ещё раз.';
    return [first, second, third];
  }

  function advanceHelp() {
    const step = steps[currentIndex];
    const meta = ensureMeta(step.id);
    if (meta.solutionShown) return;
    const hints = getHintTriplet(step);
    if (meta.hintsUsed < 3) {
      const index = meta.hintsUsed;
      meta.hintsUsed += 1;
      showHelp('<strong>Подсказка ' + meta.hintsUsed + ' из 3:</strong><br>' + escapeHtml(hints[index]));
      if (meta.hintsUsed >= 3) {
        refs.hintButton.textContent = isMissionStep(step.id) ? 'Показать решение · половина баллов' : 'Показать решение';
        refs.hintButton.classList.add('solution-ready');
      } else {
        refs.hintButton.textContent = 'Ещё подсказка';
      }
      save();
      return;
    }
    showSolution();
  }

  function showSolution() {
    const step = steps[currentIndex];
    const task = step.task;
    const meta = ensureMeta(step.id);
    if (meta.solutionShown) return;
    if (isMissionStep(step.id) && statuses[step.id] === 'done') {
      const current = getStepPoints(step.id);
      const ok = window.confirm(`Миссия уже проверена на ${formatScore(current)} балла. После показа готового решения её результат будет учитываться с коэффициентом 0,5. Показать решение?`);
      if (!ok) return;
    }
    meta.solutionShown = true;
    statuses[step.id] = 'revealed';

    if (task.type === 'code') {
      const editor = refs.taskBody.querySelector('textarea');
      if (editor) {
        const studentAttempt = editor.value;
        meta.attemptBeforeSolution = studentAttempt;
        editor.value = codeWithComparison(studentAttempt, task.solution);
        meta.draft = editor.value;
        if (typeof editor._syncHighlight === 'function') editor._syncHighlight();
        const checkButton = refs.feedbackAction.querySelector('.check-button');
        if (checkButton) checkButton.remove();
      }
      showHelp('<strong>Правильный вариант показан сверху.</strong><br>Ваша попытка сохранена ниже в комментарии — можно сравнить построчно.');
    } else if (task.type === 'missionCode') {
      meta.draft = task.solution;
      meta.missionScore = (task.criteria || []).length;
      meta.missionResults = new Array(meta.missionScore).fill(true);
      save();
      renderTask(step);
    } else if (task.type === 'multifile') {
      meta.filesDraft = { ...(task.solutionFiles || task.files || {}) };
      meta.activeFile = task.startFile || Object.keys(meta.filesDraft)[0] || '';
      meta.missionScore = (task.criteria || []).length;
      meta.missionResults = new Array(meta.missionScore).fill(true);
      save();
      renderTask(step);
    } else {
      showHelp('<strong>Решение:</strong><br>' + escapeHtml(step.solution || solutionForTask(task)));
    }

    refs.hintButton.textContent = 'Решение показано';
    refs.hintButton.disabled = true;
    save();
    showFeedback(isMissionStep(step.id)
      ? 'Готовое решение показано. Баллы этой миссии учитываются наполовину.'
      : 'Готовое решение показано. Это учебный шаг, поэтому на итоговые баллы он не влияет.', 'info');
    updateStatusUI(step);
    renderStepsList();
  }

  function solutionForTask(task) {
    if (task.type === 'choice') return task.choices[task.correct];
    if (task.type === 'matrix') return task.rows.map(row => row[0] + ' → ' + row[2]).join('; ');
    return '';
  }

  function openDrawer() {
    refs.stepsDrawer.hidden = false;
    refs.drawerBackdrop.hidden = false;
    document.body.style.overflow = 'hidden';
    refs.closeDrawerButton.focus();
  }

  function closeDrawer() {
    refs.stepsDrawer.hidden = true;
    refs.drawerBackdrop.hidden = true;
    document.body.style.overflow = '';
    refs.stepsButton.focus({ preventScroll: true });
  }

  function openImage() {
    refs.imageModal.hidden = false;
    document.body.style.overflow = 'hidden';
    refs.imageCloseButton.focus();
  }

  function closeImage() {
    refs.imageModal.hidden = true;
    document.body.style.overflow = '';
    refs.stepImage.focus({ preventScroll: true });
  }

  function goNext() {
    if (currentView !== 'lesson') return;

    if (currentIndex < SCORE_STEP_COUNT) {
      const step = steps[currentIndex];
      if (!statuses[step.id]) return;
      if (currentIndex === SCORE_STEP_COUNT - 1 && !allScoredStepsComplete()) {
        showFeedback('Сначала завершите остальные учебные шаги и миссии. В списке видно, какие экраны ещё не пройдены.', 'error');
        openDrawer();
        return;
      }
      if (currentIndex === SCORE_STEP_COUNT - 1 && !finishedAt) finishedAt = new Date().toISOString();
      currentIndex += 1;
      renderStep();
      return;
    }

    if (currentIndex === SCORE_STEP_COUNT) {
      currentIndex = SCORE_STEP_COUNT + 1;
      renderStep();
    }
  }

  function goPrev() {
    if (currentView !== 'lesson' || currentIndex === 0) return;
    if (currentIndex === SCORE_STEP_COUNT + 1 && !allScoredStepsComplete()) {
      currentIndex = SCORE_STEP_COUNT - 1;
    } else {
      currentIndex -= 1;
    }
    renderStep();
  }

  function resetProgress() {
    const ok = window.confirm('Начать интерактив заново? Личный код, прогресс и все баллы будут удалены.');
    if (!ok) return;
    currentIndex = 0;
    currentView = 'lesson';
    statuses = {};
    stepMeta = {};
    theoryCollapsedSteps.clear();
    stopTheoryTransition();
    participant = null;
    startedAt = null;
    finishedAt = null;
    try { localStorage.removeItem(STORAGE_KEY); } catch (_) {}
    refs.appShell.hidden = true;
    showStartScreen();
  }

  function buildPrintReport() {
    const summary = getScoreSummary();
    const rows = steps.slice(0, SCORE_STEP_COUNT).map(step => {
      const status = statuses[step.id];
      const meta = ensureMeta(step.id);
      let result = 'Не выполнено';
      if (isMissionStep(step.id)) {
        if (status === 'revealed') result = 'Миссия · показано решение';
        else if (status) result = `Миссия · ${formatScore(getStepPoints(step.id))} из ${MISSION_MAX_POINTS[step.id]}`;
        else result = 'Миссия · не проверена';
      } else if (status === 'revealed') result = 'Учебный · после решения';
      else if (status === 'done' && meta.hintsUsed > 0) result = 'Учебный · с подсказками';
      else if (status === 'done') result = 'Учебный · выполнен';
      return `<tr><td>${step.id}</td><td>${escapeHtml(step.title)}</td><td>${result}</td><td>${meta.hintsUsed}</td><td>${formatScore(getStepPoints(step.id))}</td></tr>`;
    }).join('');
    refs.printReport.innerHTML = `
      <div class="print-report-page">
        <header>
          <span>Отчёт о прохождении</span>
          <h1>HTML</h1>
          <p><strong>Личный код:</strong> ${escapeHtml(participant.personalCode)}</p>
        </header>
        <section class="print-score">
          <div><span>Баллы</span><strong>${formatScore(summary.score)} / ${MAX_SCORE}</strong></div>
          <div><span>Результат</span><strong>${summary.percent}%</strong></div>
          <div><span>Оценка</span><strong>${summary.grade}</strong></div>
        </section>
        <section class="print-meta">
          <p><b>Начало:</b> ${formatDateTime(startedAt)}</p>
          <p><b>Завершение:</b> ${formatDateTime(finishedAt || new Date().toISOString())}</p>
          <p><b>Миссия 1:</b> ${formatScore((summary.missions[8] || {points:0}).points)}/5 · <b>Миссия 2:</b> ${formatScore((summary.missions[12] || {points:0}).points)}/4 · <b>Финальная:</b> ${formatScore((summary.missions[13] || {points:0}).points)}/6</p>
        </section>
        <table>
          <thead><tr><th>№</th><th>Шаг</th><th>Результат</th><th>Подсказки</th><th>Балл</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
        <footer>Максимальная оценка за интерактив — 4. Работа в IDE не входит в эти 15 баллов и может повысить итоговую оценку до 5.</footer>
      </div>`;
  }

  function printProgressReport() {
    buildPrintReport();
    window.print();
  }

  refs.studentForm.addEventListener('submit', startSession);
  refs.studentCode.addEventListener('input', validateStartForm);
  refs.previewModeBrowser.addEventListener('click', () => setSemanticPreviewMode('browser'));
  refs.previewModeStructure.addEventListener('click', () => setSemanticPreviewMode('structure'));
  refs.previewArticleButton.addEventListener('click', () => {
    const step = steps[currentIndex];
    if (!isSemanticPreviewStep(step) || refs.previewArticleButton.hidden) return;
    if (semanticPreviewMode === 'browser') semanticPreviewMode = 'structure';
    semanticArticleOnly = !semanticArticleOnly;
    updateSemanticControls(step);
    updatePreview(currentPreviewSource);
  });

  refs.hintButton.addEventListener('click', advanceHelp);
  refs.theoryToggleButton.addEventListener('click', toggleTheory);
  refs.prevButton.addEventListener('click', goPrev);
  refs.nextButton.addEventListener('click', goNext);
  refs.stepsButton.addEventListener('click', openDrawer);
  refs.closeDrawerButton.addEventListener('click', closeDrawer);
  refs.drawerBackdrop.addEventListener('click', closeDrawer);
  refs.stepImage.addEventListener('click', openImage);
  refs.stepImage.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openImage();
    }
  });
  refs.imageCloseButton.addEventListener('click', closeImage);
  refs.imageModal.addEventListener('click', e => { if (e.target === refs.imageModal) closeImage(); });
  refs.resetButton.addEventListener('click', resetProgress);

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      if (!refs.imageModal.hidden) closeImage();
      else if (!refs.stepsDrawer.hidden) closeDrawer();
      return;
    }
    const active = document.activeElement;
    const editing = active && (/^(TEXTAREA|INPUT|SELECT)$/.test(active.tagName) || active.isContentEditable);
    if (editing || !refs.imageModal.hidden || !refs.stepsDrawer.hidden || refs.appShell.hidden || currentView !== 'lesson') return;
    if (event.key === 'ArrowLeft') goPrev();
    if (event.key === 'ArrowRight' && statuses[steps[currentIndex].id]) goNext();
  });

  safeLoad();
  if (participantIsValid()) showLesson();
  else showStartScreen();
})();
