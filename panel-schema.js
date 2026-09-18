/* ==========================================================================
   СХЕМА ПРОЕКТА «MFE» ДЛЯ ЯДРА ПАНЕЛИ (panel-core.js).

   Ядро одинаковое во всех витринах и про формат data.js ничего не знает.
   Здесь сказано только: какие у карточки поля и как разложить общий вид
   обратно в файл, который читает сайт: SITE / CATEGORIES / OFFERS.
   ========================================================================== */

window.ADMIN = {
  brand: 'MFE',
  dataFile: 'data.js',
  draftKey: 'avans_admin_draft',
  preview: 'index.html?draft=1',

  /* Ссылки партнёрок приходят без erid — маркировку печатаем только если
     она реально есть в ссылке, выдумывать её нельзя. */
  requireErid: false,

  /* Включает блок «Логотип»: либо файл банка, либо цветная плашка.
     Цвет плашки заодно задаёт цвет крупной цифры — сайт сам затемнит его
     до читаемого, так что испортить контраст через панель невозможно. */
  logo: true,

  /* Логотип на сайте лежит на белом квадрате — к нему ядро считает
     контраст плашки. Без этой строки ядро берёт свой тёмный фон
     и бракует нормальные цвета. */
  surface: '#FFFFFF',

  /* Цвета новой плашки по умолчанию — синий акцент сайта. Плашка нужна
     только тем карточкам, у которых нет файла логотипа. */
  defaultTone: { bg: '#2563EB', ink: '#FFFFFF' },

  /* Готовые логотипы — файлы лежат в img/logos/. Список шире каталога:
     логотип нового оффера не нужно искать по интернету. Своя картинка
     грузится кнопкой «Выбрать файл…» в карточке. */
  presets: [
    { label: 'МФО и займы', items: [
      { name: 'А-Деньги', value: 'img/logos/adengi.png' },
      { name: 'Альфа-Деньги', value: 'img/logos/alfa-dengi.jpg' },
      { name: 'Быстроденьги', value: 'img/logos/bistrodengi.png' },
      { name: 'Деньги на дом', value: 'img/logos/denginadom.png' },
      { name: 'Деньги сразу', value: 'img/logos/dengisrazu.png' },
      { name: 'До зарплаты', value: 'img/logos/dozarplati.png' },
      { name: 'Займер', value: 'img/logos/zaymer.png' },
      { name: 'Лайм-Займ', value: 'img/logos/limezaim.png' },
      { name: 'МигКредит', value: 'img/logos/migcredit.png' },
      { name: 'Надо денег', value: 'img/logos/nadodeneg.svg' },
      { name: 'Привет, сосед', value: 'img/logos/privet-sosed.png' },
      { name: 'Свои люди', value: 'img/logos/svoiludi.png' },
      { name: 'СМС Финанс', value: 'img/logos/smsfinance.png' },
      { name: 'Срочно деньги', value: 'img/logos/srochnodengi.png' },
      { name: 'Турбозайм', value: 'img/logos/turbozaim.png' },
      { name: 'Умные наличные', value: 'img/logos/umnye-nalichnye.png' },
      { name: 'Центрофинанс', value: 'img/logos/centrofinans.png' },
      { name: 'JoyMoney', value: 'img/logos/joymoney.png' },
      { name: 'Max.Credit', value: 'img/logos/maxcredit.png' },
      { name: 'MoneyMan', value: 'img/logos/moneyman.png' },
      { name: 'OneClickMoney', value: 'img/logos/oneclickmoney.png' },
      { name: 'Platiza', value: 'img/logos/platiza.png' },
      { name: 'RocketMan', value: 'img/logos/rocketman.png' },
      { name: 'Webbankir', value: 'img/logos/webbankir.png' },
      { name: 'Zaymigo', value: 'img/logos/zaymigo.png' }
    ] },
    { label: 'Банки — карты и счета', items: [
      { name: 'АК Барс Банк', value: 'img/logos/akbars.png' },
      { name: 'Альфа-Банк', value: 'img/logos/alfabank.png' },
      { name: 'Банк Санкт-Петербург', value: 'img/logos/bspb.png' },
      { name: 'ВТБ', value: 'img/logos/vtb.png' },
      { name: 'Газпромбанк', value: 'img/logos/gazprombank.png' },
      { name: 'Зенит Банк', value: 'img/logos/zenit.png' },
      { name: 'Кредит Европа Банк', value: 'img/logos/crediteurope.svg' },
      { name: 'МТС Банк', value: 'img/logos/mtsbank.png' },
      { name: 'Модульбанк', value: 'img/logos/modulbank.png' },
      { name: 'ОТП Банк', value: 'img/logos/otp.png' },
      { name: 'Почта Банк', value: 'img/logos/pochtabank.png' },
      { name: 'ПСБ', value: 'img/logos/psb.png' },
      { name: 'Райффайзен Банк', value: 'img/logos/raiffeisen.png' },
      { name: 'Ренессанс Банк', value: 'img/logos/rencredit.png' },
      { name: 'Россельхозбанк', value: 'img/logos/rshb.png' },
      { name: 'Русский Стандарт', value: 'img/logos/rsb.png' },
      { name: 'Сбербанк', value: 'img/logos/sberbank.png' },
      { name: 'Совкомбанк', value: 'img/logos/sovcombank.png' },
      { name: 'Совкомбанк Халва', value: 'img/logos/halva.png' },
      { name: 'Т-Банк', value: 'img/logos/tbank.png' },
      { name: 'УБРиР', value: 'img/logos/ubrir.png' },
      { name: 'Уралсиб', value: 'img/logos/uralsib.png' },
      { name: 'Фора-Банк', value: 'img/logos/forabank.svg' },
      { name: 'Хоум Банк', value: 'img/logos/homecredit.png' },
      { name: 'Kviku', value: 'img/logos/kviku.png' },
      { name: 'Ozon Банк', value: 'img/logos/ozon.png' }
    ] }
  ],

  /* Только то, что сайт действительно показывает. */
  site: [
    { key: 'brand',    label: 'Название сайта', required: true,
      hint: 'Стоит в шапке, в подвале и в заголовке вкладки браузера.' },
    { key: 'tagline',  label: 'Строка над главным заголовком',
      hint: 'Мелкая строка с точкой на первом экране: «19 предложений банков и МФО в одном списке».' },
    { key: 'lead',     label: 'Абзац под заголовком', type: 'textarea',
      hint: 'Два-три предложения о том, что человек найдёт на сайте.' },
    { key: 'updated',  label: 'Дата проверки условий',
      hint: 'Печатается в подвале: «Условия проверены 16.09.2026».' },
    { key: 'telegram', label: 'Ник в Telegram (без @)',
      hint: 'Пока пусто — кнопки «Написать в Telegram» на сайте скрыты (на первом экране, у формы и в конце). Впишете ник — появятся.' }
  ],

  groups: [
    { key: 'title', label: 'Название раздела', required: true, hint: 'Видно на кнопке-фильтре над каталогом.' },
    { key: 'cta',   label: 'Надпись на кнопках', required: true,
      hint: 'Одна на все карточки раздела: «Оформить», «Открыть вклад».' }
  ],

  card: [
    { key: 'partner',  label: 'Компания', required: true, hint: 'Крупная надпись рядом с логотипом: «Займер», «ВТБ».' },
    { key: 'tag',      label: 'Тип продукта', hint: 'Мелкая подпись под названием: «микрозайм», «дебетовая карта», «расчётный счёт».' },
    { key: 'title',    label: 'Название продукта', required: true, hint: 'Например «Займ на карту», «ОТП Premium», «РКО для бизнеса».' },
    { key: 'headline', label: 'Крупная строка выгоды', required: true,
      hint: 'Главное преимущество: «до 5%», «120 дней без процентов», «Деньги на карту». Цифры ставьте только те, что подтверждены партнёркой.' },
    { key: 'note',     label: 'Подпись под крупной строкой', hint: 'Например «кэшбэк в выбранных категориях».' },
    { key: 'specs',    label: 'Условия', type: 'pairs',
      hint: 'По строке на условие, через двоеточие: «Обслуживание: 0 ₽». Пишите только подтверждённые партнёркой цифры.' },
    { key: 'url',      label: 'Партнёрская ссылка', type: 'url',
      hint: 'Вставьте ссылку из партнёрки целиком, вместе с erid и метками. Пока пусто — вместо кнопки на карточке стоит надпись «Скоро».' }
  ],

  /* ---------------------------------------------- чтение --------------- */

  load: function () {
    var groups = CATEGORIES.map(function (c) {
      return { key: c.id, title: c.label, cta: c.cta };
    });

    var seen = {};
    var cards = OFFERS.map(function (o, i) {
      /* Устойчивый ключ: в файле его нет, а ядру он нужен, чтобы не путать
         карточки при перестановке. Считаем от банка и названия продукта. */
      var base = ((o.partner || '') + '-' + (o.title || '')).toLowerCase()
        .replace(/[^a-zа-я0-9]+/gi, '-').replace(/^-|-$/g, '').slice(0, 40) || ('c' + i);
      var uid = base, n = 2;
      while (seen[uid]) uid = base + '-' + (n++);
      seen[uid] = true;

      return {
        uid: uid,
        group: o.cat,
        hidden: !!o.hidden,
        partner: o.partner || '',
        tag: o.tag || '',
        title: o.title || '',
        headline: o.headline || '',
        note: o.note || '',
        specs: (o.specs || []).map(function (p) { return [p[0], p[1]]; }),
        url: o.url || '',
        logo: o.logo || '',
        /* Цвета плашки читаем всегда: у карточки с логотипом от них
           считается цвет крупной цифры. Не прочитать — значит затереть
           выбор клиента дефолтом при следующем сохранении. */
        tone: { bg: (o.tone && o.tone.bg) || '#2563EB', ink: (o.tone && o.tone.ink) || '#FFFFFF' },
        /* Векторный знак банка из index.html. В панели не показывается, но
           переживает круговорот, пока у карточки есть логотип. */
        mark: o.mark || ''
      };
    });

    return {
      SITE: JSON.parse(JSON.stringify(SITE)),
      GROUPS: groups,
      CARDS: cards
    };
  },

  /* ---------------------------------------------- сборка файла --------- */

  build: function (m) {
    function js(v) { return JSON.stringify(v, null, 2); }
    function t(v) { return String(v == null ? '' : v).trim(); }

    var categories = m.GROUPS.map(function (g) {
      return { id: g.key, label: t(g.title), cta: t(g.cta) || 'Оформить' };
    });

    var offers = m.CARDS.map(function (c) {
      var logo = t(c.logo);
      var o = {
        cat: c.group,
        partner: t(c.partner),
        tag: t(c.tag),
        title: t(c.title),
        /* Без логотипа сайт рисует плашку с инициалами — как и панель.
           Старый векторный знак тут только мешал бы: он перебил бы плашку. */
        mark: logo ? t(c.mark) : '',
        logo: logo,
        tone: { bg: t(c.tone && c.tone.bg) || '#2563EB', ink: t(c.tone && c.tone.ink) || '#FFFFFF' },
        headline: t(c.headline),
        note: t(c.note),
        specs: (c.specs || [])
          .map(function (p) { return [t(p[0]), t(p[1])]; })
          .filter(function (p) { return p[0] || p[1]; }),
        url: t(c.url)
      };
      if (c.hidden) o.hidden = true;
      return o;
    });

    return [
      '/* ═════════════════════════════════════════════════════════════════════════',
      '   КАТАЛОГ «MFE» — единственный файл с предложениями.',
      '   Собран панелью ' + new Date().toLocaleString('ru-RU') + '.',
      '',
      '   Правится через panel.html. Руками тоже можно, но при следующем',
      '   сохранении из панели правки будут перезаписаны.',
      '',
      '   url      — партнёрская ссылка целиком. Пусто — вместо кнопки «Скоро».',
      '   tone.bg  — цвет плашки с логотипом. От него же считается цвет крупной',
      '              надписи: сайт сам затемняет его, пока не станет читаемым.',
      '   logo     — файл логотипа или встроенная картинка. Пусто — плашка',
      '              с инициалами банка в цветах tone.',
      '   mark     — id векторного знака из index.html (lg-alfa и т.д.), запас.',
      '',
      '   ВАЖНО ПРО ЦИФРЫ: ставки, лимиты и сроки ставьте только те, что',
      '   подтверждены партнёркой. Цифра «на глаз» — недостоверная реклама.',
      '   ═════════════════════════════════════════════════════════════════════════ */',
      '',
      'const SITE = ' + js(m.SITE) + ';',
      '',
      '/* cta — надпись на кнопке карточек этого раздела. */',
      'const CATEGORIES = ' + js(categories) + ';',
      '',
      'const OFFERS = ' + js(offers) + ';',
      ''
    ].join('\n');
  }
};
