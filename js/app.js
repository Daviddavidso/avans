/* ==========================================================================
   АВАНС — витрина финансовых продуктов.

   Каталог объявлен глобальными const в data.js. На адресе index.html?draft=1
   вместо боевого файла подставляется черновик из панели (localStorage).
   Фреймворков нет: обычный скрипт, работает на любом хостинге.
   ========================================================================== */
(function () {
  'use strict';

  var DRAFT_KEY = 'avans_admin_draft:file';

  /* ---------- данные: боевой файл или черновик панели ---------- */
  function readData() {
    var base = {
      SITE: typeof SITE !== 'undefined' ? SITE : {},
      CATEGORIES: typeof CATEGORIES !== 'undefined' ? CATEGORIES : [],
      OFFERS: typeof OFFERS !== 'undefined' ? OFFERS : []
    };
    if (!/[?&]draft/.test(location.search)) return base;
    try {
      var file = localStorage.getItem(DRAFT_KEY);
      if (!file) return base;
      var d = new Function(file + '\n;return { SITE: SITE, CATEGORIES: CATEGORIES, OFFERS: OFFERS };')();
      if (d && d.OFFERS) return d;
    } catch (e) {
      console.warn('Черновик панели не прочитался, показываю боевой каталог.', e);
    }
    return base;
  }

  var DATA = readData();
  var site = DATA.SITE || {};
  var cats = DATA.CATEGORIES || [];
  var offers = (DATA.OFFERS || []).filter(function (o) { return o && o.partner; });

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function catById(id) {
    for (var i = 0; i < cats.length; i++) if (cats[i].id === id) return cats[i];
    return null;
  }

  function plural(n, one, few, many) {
    var n10 = n % 10, n100 = n % 100;
    if (n10 === 1 && n100 !== 11) return one;
    if (n10 >= 2 && n10 <= 4 && (n100 < 10 || n100 >= 20)) return few;
    return many;
  }

  /* ==========================================================================
     Липкая шапка: её высота — не константа (переносы строк, крупный шрифт,
     масштаб 200%). Меряем и держим в переменной, из неё считаются отступы
     прокрутки, иначе фокус и якоря уезжают под шапку.
     ========================================================================== */
  var head = $('.head');

  function measureHead() {
    if (!head) return;
    var sticky = getComputedStyle(head).position === 'sticky';
    var h = sticky ? Math.round(head.getBoundingClientRect().height) : 0;
    document.documentElement.style.setProperty('--head-h', h + 'px');
  }

  function headOffset() {
    var v = getComputedStyle(document.documentElement).getPropertyValue('--head-h');
    return (parseFloat(v) || 0) + 12;
  }

  /* Safari не учитывает scroll-padding при переходе по Tab — подстраховываем. */
  function ensureVisible(node) {
    if (!node || !node.getBoundingClientRect) return;
    var menu = $('#mobile-menu');
    if (menu && !menu.hidden) return;
    var r = node.getBoundingClientRect(), top = headOffset();
    if (r.top < top) window.scrollBy({ top: r.top - top, behavior: 'instant' });
    else if (r.bottom > window.innerHeight) window.scrollBy({ top: r.bottom - window.innerHeight + 12, behavior: 'instant' });
  }

  /* ==========================================================================
     Живая область. Видимая строка «Показано N из M» обновляется сразу,
     а читалке текст уходит с задержкой: иначе при наборе она тараторит
     на каждую букву. Это два разных узла — иначе картинка отстаёт от списка.
     ========================================================================== */
  var liveBox = $('#live');
  var sayTimer = null, echoTimer = null, lastSaid = '', booted = false;

  function say(text, opts) {
    opts = opts || {};
    if (!liveBox || !booted) return;
    if (!opts.force && text === lastSaid) return;
    clearTimeout(sayTimer); clearTimeout(echoTimer);
    sayTimer = setTimeout(function () {
      lastSaid = text;
      liveBox.textContent = '';                       /* пустой такт: тот же */
      echoTimer = setTimeout(function () {            /* текст подряд иначе  */
        liveBox.textContent = text;                   /* не объявится        */
      }, 60);
    }, opts.delay == null ? 250 : opts.delay);
  }

  /* ---------- тексты сайта из data.js ---------- */
  function applySite() {
    if (site.brand) {
      $$('[data-brand], [data-brand-inline]').forEach(function (n) { n.textContent = site.brand; });
      document.title = site.brand + ' — займы, карты и счёт для бизнеса в одном списке';
    }
    if (site.tagline) { var t = $('[data-tagline]'); if (t) t.textContent = site.tagline; }
    if (site.lead) { var l = $('[data-lead]'); if (l) l.textContent = site.lead; }
    if (site.updated) { var u = $('[data-updated]'); if (u) u.textContent = site.updated; }
    var y = $('[data-year]'); if (y) y.textContent = String(new Date().getFullYear());

    var tg = $('#tg-link');
    if (tg && site.telegram) {
      var nick = String(site.telegram).replace(/^@+/, '').replace(/^https?:\/\/t\.me\//i, '');
      if (/^[A-Za-z0-9_]{3,64}$/.test(nick)) {
        tg.href = 'https://t.me/' + nick;
        tg.target = '_blank';
        tg.rel = 'noopener';
        tg.appendChild(el('span', 'vh', ' (откроется в новой вкладке)'));
        tg.hidden = false;
      }
    }
  }

  /* ---------- цифры первого экрана ---------- */
  function renderStats() {
    var box = $('#hero-stats');
    if (!box) return;
    var items = [
      [String(offers.length), plural(offers.length, 'предложение банков и МФО', 'предложения банков и МФО', 'предложений банков и МФО')],
      [String(cats.length), plural(cats.length, 'раздел каталога', 'раздела каталога', 'разделов каталога')],
      ['0 ₽', 'стоимость подбора для вас'],
      ['Онлайн', 'заявка без визита в офис']
    ];
    box.textContent = '';
    items.forEach(function (it) {
      var li = el('li', 'stat');
      li.appendChild(el('span', 'stat__num', it[0]));
      li.appendChild(el('span', 'stat__label', it[1]));
      box.appendChild(li);
    });
  }


  /* ==========================================================================
     Логотипы приходят разные: у одних прозрачный фон, у других белый, а
     третьи — готовая цветная плашка (иконка приложения). Если всё подряд
     класть на белый квадрат, плашки выглядят «картинкой в картинке».
     Поэтому определяем вид логотипа прямо в браузере по углам картинки:
     сплошная плашка ложится в плитку целиком, знак — по центру с полями.
     Ничего не хардкодим: клиент меняет логотипы в панели, и разбор
     подстроится сам.
     ========================================================================== */
  function classifyLogo(img, done) {
    function decide() {
      var kind = 'white', tone = '';
      try {
        var nw = img.naturalWidth, nh = img.naturalHeight;
        if (!nw || !nh) { done(kind, tone); return; }
        /* Мельчить нельзя: при сильном уменьшении тонкая белая рамка
           замешивается в угловой пиксель, и цветная плашка определяется
           как белый фон. Берём натуральный размер (с потолком) и щупаем
           точки по рамке, отступив внутрь. */
        var scale = Math.min(1, 128 / Math.max(nw, nh));
        var w = Math.max(8, Math.round(nw * scale));
        var h = Math.max(8, Math.round(nh * scale));
        var c = document.createElement('canvas');
        c.width = w; c.height = h;
        var ctx = c.getContext('2d', { willReadFrequently: true });
        ctx.drawImage(img, 0, 0, w, h);

        var inx = Math.max(1, Math.round(w * 0.06));
        var iny = Math.max(1, Math.round(h * 0.06));
        var xs = [inx, Math.round(w / 2), w - 1 - inx];
        var ys = [iny, Math.round(h / 2), h - 1 - iny];
        var pts = [];
        xs.forEach(function (x) { pts.push([x, ys[0]], [x, ys[2]]); });
        ys.forEach(function (y) { pts.push([xs[0], y], [xs[2], y]); });

        var clear = 0, white = 0, colors = [];
        pts.forEach(function (pt) {
          var d = ctx.getImageData(pt[0], pt[1], 1, 1).data;
          if (d[3] < 40) { clear++; return; }
          if (d[0] > 238 && d[1] > 238 && d[2] > 238) { white++; return; }
          colors.push([d[0], d[1], d[2]]);
        });

        var n = pts.length;
        if (clear / n >= 0.6) kind = 'mark';
        else if (white / n >= 0.6) kind = 'white';
        else if (colors.length) {
          /* Самый частый цвет рамки: если он занимает её почти всю —
             это готовая цветная плашка, и плитку красим в него же. */
          var best = null, bestN = 0;
          colors.forEach(function (a) {
            var k = colors.filter(function (b) {
              return Math.abs(a[0] - b[0]) < 18 && Math.abs(a[1] - b[1]) < 18 && Math.abs(a[2] - b[2]) < 18;
            }).length;
            if (k > bestN) { bestN = k; best = a; }
          });
          if (best && bestN >= n * 0.6) {
            kind = 'tile';
            tone = 'rgb(' + best[0] + ',' + best[1] + ',' + best[2] + ')';
          }
        }
      } catch (e) {
        /* Картинка с чужого домена «пачкает» холст — оставляем белую плитку. */
        kind = 'white';
      }
      done(kind, tone);
    }
    if (img.complete && img.naturalWidth) decide();
    else img.addEventListener('load', decide, { once: true });
  }

  /* ---------- лента логотипов (украшение, скрыта от читалки) ---------- */
  function renderTicker() {
    var track = $('#ticker-track');
    var pause = $('#ticker-pause');
    if (!track) return;

    var seen = {}, logos = [];
    offers.forEach(function (o) {
      if (o.logo && !seen[o.logo]) { seen[o.logo] = 1; logos.push(o.logo); }
    });
    var section = track.closest('.ticker');
    if (!logos.length) { if (section) section.hidden = true; return; }

    track.textContent = '';
    function fill() {
      logos.forEach(function (src) {
        var li = el('li', 'ticker__item');
        var img = new Image();
        img.src = src;
        img.alt = '';
        /* Не lazy: лента двигается трансформом, а от него ленивые картинки
           не подгружаются — плитки оставались пустыми. */
        img.decoding = 'async';
        classifyLogo(img, function (kind, tone) {
          li.setAttribute('data-logo', kind);
          if (tone) li.style.background = tone;
        });
        li.appendChild(img);
        track.appendChild(li);
      });
    }
    fill();
    fill();   /* вторая копия — для бесшовной прокрутки */

    if (pause) {
      if (reduced) { pause.hidden = true; return; }   /* нечего останавливать */
      pause.addEventListener('click', function () {
        var paused = track.classList.toggle('is-paused');
        pause.textContent = paused ? 'Продолжить движение' : 'Остановить движение';
      });
    }
  }

  /* ---------- фильтры ---------- */
  var state = { cat: 'all', q: '' };

  function renderFilters() {
    var box = $('#filters');
    if (!box) return;
    var list = [{ id: 'all', label: 'Все' }].concat(cats);
    box.textContent = '';
    list.forEach(function (c, i) {
      var n = c.id === 'all' ? offers.length : offers.filter(function (o) { return o.cat === c.id; }).length;
      var id = 'cat-' + c.id;

      /* Обёртка — настоящий <label>: подпись читалке и клик по всей плашке
         достаются от браузера, без aria-label и лишних обработчиков. */
      var wrap = document.createElement('label');
      wrap.className = 'chip';

      var input = document.createElement('input');
      input.type = 'radio';
      input.name = 'cat';
      input.id = id;
      input.value = c.id;
      input.checked = i === 0;

      var face = el('span', 'chip__face');
      face.appendChild(document.createTextNode(c.label));
      var count = el('span', 'chip__count', String(n));
      count.setAttribute('aria-hidden', 'true');   /* цифру читалке даём словами */
      face.appendChild(count);
      face.appendChild(el('span', 'vh', ', ' + n + ' ' + plural(n, 'продукт', 'продукта', 'продуктов')));

      wrap.appendChild(input);
      wrap.appendChild(face);
      box.appendChild(wrap);

      input.addEventListener('change', function () {
        if (!input.checked) return;
        state.cat = input.value;
        renderOffers({ delay: 250 });
      });
    });
  }

  /* ---------- карточки ---------- */
  function eridOf(url) {
    var m = String(url || '').match(/[?&]erid=([^&#]+)/);
    if (!m) return null;
    var v = m[1];
    return /^[A-Za-z0-9]+$/.test(v) ? v : null;
  }

  function safeUrl(url) {
    var u = String(url || '').trim();
    return /^https?:\/\//i.test(u) ? u : '';
  }

  function initials(name) {
    return String(name || '').trim().split(/[\s-]+/).slice(0, 2).map(function (w) {
      return w.charAt(0).toUpperCase();
    }).join('');
  }

  function plaque(o) {
    var node = el('span', 'card__plaque', initials(o.partner));
    var tone = o.tone || {};
    node.style.background = tone.bg || '#2563eb';
    node.style.color = tone.ink || '#fff';
    node.setAttribute('aria-hidden', 'true');   /* имя компании рядом в заголовке */
    return node;
  }

  /* Картинка не загрузилась (клиент указал путь с опечаткой) — вместо
     битого значка рисуем плашку с инициалами. Событие error у <img> не
     всплывает, поэтому слушаем на фазе перехвата. */
  document.addEventListener('error', function (e) {
    var img = e.target;
    if (!img || img.tagName !== 'IMG' || !img.closest) return;
    var box = img.closest('.card__logo');
    if (!box || box.dataset.fallback === '1') return;
    box.dataset.fallback = '1';
    box.textContent = '';
    box.appendChild(plaque({ partner: box.dataset.partner || '', tone: { bg: box.dataset.tone || '#2563eb', ink: '#fff' } }));
  }, true);

  function buildCard(o) {
    var li = el('li');
    var card = el('article', 'card');
    card.setAttribute('data-offer', '');

    var top = el('div', 'card__top');
    var logo = el('span', 'card__logo');
    logo.dataset.partner = o.partner || '';
    if (o.tone && o.tone.bg) logo.dataset.tone = o.tone.bg;
    if (o.logo) {
      var img = new Image();
      img.src = o.logo;
      img.alt = '';          /* название компании стоит рядом заголовком */
      img.loading = 'lazy';
      img.decoding = 'async';
      classifyLogo(img, function (kind, tone) {
        logo.setAttribute('data-logo', kind);
        if (tone) logo.style.background = tone;
      });
      logo.appendChild(img);
    } else {
      logo.appendChild(plaque(o));
    }
    top.appendChild(logo);

    /* Тип продукта — внутри заголовка: у одного банка бывает несколько
       карточек, и в списке заголовков они не должны совпасть. */
    var h3 = el('h3', 'card__name');
    h3.appendChild(el('span', 'card__partner', o.partner));
    /* Пробел между строками заголовка обязателен: без него доступное имя
       склеивается в «Займермикрозайм». */
    if (o.tag) { h3.appendChild(document.createTextNode(' ')); h3.appendChild(el('span', 'card__tag', o.tag)); }
    top.appendChild(h3);
    card.appendChild(top);

    var body = el('div');
    if (o.headline) body.appendChild(el('p', 'card__headline', o.headline));
    if (o.note) body.appendChild(el('p', 'card__note', o.note));
    card.appendChild(body);

    var specs = (o.specs || []).filter(function (s) { return s && s[0]; });
    if (specs.length) {
      var dl = el('dl', 'card__specs');
      specs.forEach(function (s) {
        var row = el('div', 'card__spec');
        row.appendChild(el('dt', null, s[0]));
        row.appendChild(el('dd', null, s[1] || ''));
        dl.appendChild(row);
      });
      card.appendChild(dl);
    }

    var foot = el('div', 'card__foot');
    var url = safeUrl(o.url);
    var cat = catById(o.cat);
    if (url) {
      var a = el('a', 'btn btn--blue card__cta');
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer nofollow sponsored';
      a.appendChild(document.createTextNode((cat && cat.cta) || 'Перейти'));
      /* Видимый текст + скрытый хвост: доступное имя начинается с того,
         что написано на кнопке, — значит «Label in Name» не сломать. */
      a.appendChild(el('span', 'vh', ': ' + o.partner + (o.title ? ', ' + o.title : '') + ' (откроется в новой вкладке)'));
      var arrow = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      arrow.setAttribute('viewBox', '0 0 16 16');
      arrow.setAttribute('width', '14');
      arrow.setAttribute('height', '14');
      arrow.setAttribute('aria-hidden', 'true');
      arrow.setAttribute('focusable', 'false');
      arrow.setAttribute('class', 'btn__arrow');
      var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', 'M4.6 2h9.4v9.4h-2V5.4L3.4 14 2 12.6 10.6 4H4.6z');
      path.setAttribute('fill', 'currentColor');
      arrow.appendChild(path);
      a.appendChild(arrow);
      foot.appendChild(a);
    } else {
      var soon = el('p', 'card__soon', 'Скоро');
      soon.appendChild(el('span', 'vh', ': партнёрская ссылка на ' + o.partner + ' ещё не подключена, оформить здесь пока нельзя'));
      foot.appendChild(soon);
    }

    var erid = eridOf(url);
    if (erid) foot.appendChild(el('p', 'card__ad', 'Реклама. erid: ' + erid));
    card.appendChild(foot);

    li.appendChild(card);
    return li;
  }

  function matches(o) {
    if (state.cat !== 'all' && o.cat !== state.cat) return false;
    var q = state.q.trim().toLowerCase();
    if (!q) return true;
    var cat = catById(o.cat);
    var hay = [o.partner, o.title, o.tag, o.headline, o.note, cat && cat.label]
      .concat((o.specs || []).map(function (s) { return (s[0] || '') + ' ' + (s[1] || ''); }))
      .join(' ').toLowerCase();
    return q.split(/\s+/).every(function (word) { return hay.indexOf(word) !== -1; });
  }

  var renderedKeys = null;

  function renderOffers(opts) {
    opts = opts || {};
    var grid = $('#offers');
    var empty = $('#empty');
    var emptyText = $('#empty-text');
    var countBox = $('#results');
    if (!grid) return;

    var list = offers.filter(matches);
    var keys = list.map(function (o) { return o.partner + '|' + o.title; }).join(',');
    var sameSet = keys === renderedKeys;

    /* Куда вернуть фокус, если он был на кнопке внутри списка. */
    var act = document.activeElement;
    var inList = !!(act && grid.contains(act));
    var prevPos = -1, prevKey = null;
    if (inList) {
      var li = act.closest('li');
      prevPos = li ? Array.prototype.indexOf.call(grid.children, li) : -1;
      prevKey = li ? li.getAttribute('data-key') : null;
    }

    if (!sameSet) {
      renderedKeys = keys;
      grid.textContent = '';
      list.forEach(function (o) {
        var node = buildCard(o);
        node.setAttribute('data-key', o.partner + '|' + o.title);
        grid.appendChild(node);
      });
    }
    if (empty) empty.hidden = list.length !== 0;

    var cat = state.cat === 'all' ? null : catById(state.cat);
    var word = plural(list.length, 'продукт', 'продукта', 'продуктов');

    if (countBox) {
      countBox.textContent = list.length
        ? 'Показано ' + list.length + ' ' + word + ' из ' + offers.length + (cat ? ' · раздел «' + cat.label + '»' : '')
        : '';
    }
    if (emptyText) {
      var what = [];
      if (cat) what.push('раздел «' + cat.label + '»');
      if (state.q.trim()) what.push('поиск «' + state.q.trim() + '»');
      emptyText.textContent = what.length
        ? 'По этим условиям ничего не нашлось. Сейчас выбрано: ' + what.join(', ') + '.'
        : 'По этому запросу ничего не нашлось.';
    }

    /* Фокус трогаем только если он был внутри списка и его карточку снесли. */
    if (inList && !sameSet) {
      var back = prevKey && grid.querySelector('[data-key="' + prevKey.replace(/"/g, '\\"') + '"] a, [data-key="' + prevKey.replace(/"/g, '\\"') + '"] button');
      if (!back && prevPos > -1 && grid.children.length) {
        var near = grid.children[Math.min(prevPos, grid.children.length - 1)];
        back = near && near.querySelector('a, button');
      }
      if (!back) back = countBox;
      if (back) { back.focus({ preventScroll: true }); ensureVisible(back); }
    }

    var text = list.length
      ? 'Найдено ' + list.length + ' ' + word + (list.length === offers.length ? '' : ' из ' + offers.length) + '.'
      : 'Ничего не найдено. Измените запрос или сбросьте фильтры.';
    if (opts.initial) lastSaid = text;
    else say(text, opts);
  }

  /* ---------- поиск ---------- */
  function bindSearch() {
    var form = $('#search-form');
    var input = $('#q');
    var clear = $('#q-clear');
    var reset = $('#reset');

    function toggleClear() { if (clear) clear.hidden = !input || input.value === ''; }

    if (input) {
      input.addEventListener('input', function () {
        state.q = input.value;
        toggleClear();
        renderOffers({ delay: 500 });
      });
    }
    if (form) {
      /* Перезагрузка страницы стёрла бы выбранный раздел, поэтому отправку
         перехватываем и просто уводим к результатам. */
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var head2 = $('#catalog-title');
        if (head2) { head2.focus({ preventScroll: true }); ensureVisible(head2); }
        renderOffers({ delay: 0, force: true });
      });
    }
    if (clear) {
      clear.addEventListener('click', function () {
        state.q = '';
        if (input) { input.value = ''; input.focus(); }
        toggleClear();
        renderOffers({ delay: 0, force: true });
      });
    }
    if (reset) {
      reset.addEventListener('click', function () {
        state.q = '';
        state.cat = 'all';
        if (input) input.value = '';
        var all = $('#cat-all');
        if (all) all.checked = true;
        toggleClear();
        renderOffers({ delay: 0, force: true });
        /* Кнопка живёт внутри блока «ничего не нашлось» и сейчас исчезнет —
           фокус нужно увести заранее, иначе он свалится на body. */
        if (input) input.focus();
      });
    }
    toggleClear();
  }

  /* ---------- мобильное меню ---------- */
  var menuApi = { close: function () {} };

  function bindMenu() {
    var burger = $('#burger');
    var menu = $('#mobile-menu');
    var closeBtn = $('#menu-close');
    var panel = menu && $('.menu__panel', menu);
    if (!burger || !menu || !panel) return;
    var lastFocus = null;

    function focusables() {
      return $$('a[href], button:not([disabled])', panel).filter(function (n) { return n.offsetParent !== null; });
    }
    function open() {
      lastFocus = document.activeElement;
      menu.hidden = false;
      burger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      var main = $('#main');
      if (main) main.inert = true;
      var f = focusables();
      (f[0] || panel).focus();
    }
    function close(restoreFocus) {
      if (menu.hidden) return;
      menu.hidden = true;
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      var main = $('#main');
      if (main) main.inert = false;
      if (restoreFocus !== false && lastFocus && lastFocus.focus) lastFocus.focus();
    }
    menuApi.close = close;
    menuApi.isOpen = function () { return !menu.hidden; };
    menuApi.has = function (node) { return menu.contains(node); };

    burger.addEventListener('click', function () { menu.hidden ? open() : close(); });
    if (closeBtn) closeBtn.addEventListener('click', function () { close(); });
    menu.addEventListener('click', function (e) { if (e.target === menu) close(); });
    document.addEventListener('keydown', function (e) {
      if (menu.hidden) return;
      if (e.key === 'Escape') { e.preventDefault(); close(); return; }
      if (e.key !== 'Tab') return;
      var f = focusables();
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }

  /* ---------- переходы по якорям ---------- */
  function goTo(section) {
    if (!section) return;
    /* Плавная прокрутка держится на requestAnimationFrame, а он замирает,
       пока вкладка скрыта (встроенная превью-панель — как раз такой случай):
       страница осталась бы на месте. */
    var smooth = !reduced && document.visibilityState !== 'hidden';
    section.scrollIntoView({ behavior: smooth ? 'smooth' : 'instant', block: 'start' });
    var target = section.matches('h1, h2, h3, p') ? section : (section.querySelector('h1, h2, h3') || section);
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    /* Без переноса фокуса следующий Tab возвращает человека в шапку. */
    target.focus({ preventScroll: true });
    ensureVisible(target);
  }

  function bindAnchors() {
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a) return;
      var href = a.getAttribute('href');
      if (!href || href === '#') return;
      var section = document.getElementById(href.slice(1));
      if (!section) return;
      e.preventDefault();
      /* Меню закрываем ДО переноса фокуса: у открытого меню main — inert,
         и фокус на цель просто не встанет. */
      if (menuApi.isOpen && menuApi.isOpen() && menuApi.has(a)) menuApi.close(false);
      if (history.pushState) history.pushState(null, '', href);
      goTo(section);
    });

    if (location.hash.length > 1) {
      var start = document.getElementById(location.hash.slice(1));
      if (start) setTimeout(function () { goTo(start); }, 0);
    }
  }

  /* ---------- подсветка текущего раздела в шапке ---------- */
  function bindSpy() {
    var links = $$('.head__nav .pill');
    if (!links.length || !('IntersectionObserver' in window)) return;
    var map = {};
    links.forEach(function (a) {
      var id = (a.getAttribute('href') || '').replace('#', '');
      var sec = id && document.getElementById(id);
      if (sec) map[id] = a;
    });
    var ids = Object.keys(map);
    if (!ids.length) return;

    var visible = {};
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { visible[en.target.id] = en.isIntersecting ? en.intersectionRatio : 0; });
      var best = null, bestVal = 0;
      ids.forEach(function (id) { if ((visible[id] || 0) > bestVal) { bestVal = visible[id]; best = id; } });
      links.forEach(function (a) { a.removeAttribute('aria-current'); });
      if (best) map[best].setAttribute('aria-current', 'location');
    }, { rootMargin: '-96px 0px -55% 0px', threshold: [0, .25, .5, 1] });

    ids.forEach(function (id) { io.observe(document.getElementById(id)); });
  }

  /* Браузер восстанавливает состояние полей при перезагрузке и возврате
     «назад», а событие change при этом не гарантировано. */
  function syncFromForm() {
    var checked = $('input[name="cat"]:checked');
    if (checked) state.cat = checked.value;
    var input = $('#q');
    if (input) state.q = input.value;
  }

  /* ---------- запуск ---------- */
  function init() {
    document.documentElement.classList.add('js');
    measureHead();
    if ('ResizeObserver' in window && head) new ResizeObserver(measureHead).observe(head);
    window.addEventListener('orientationchange', measureHead);
    window.addEventListener('resize', measureHead);

    applySite();
    renderStats();
    renderTicker();
    renderFilters();
    bindSearch();
    syncFromForm();
    renderOffers({ initial: true });
    bindMenu();
    bindAnchors();
    bindSpy();
    booted = true;

    /* Фокус не должен оказываться под липкой шапкой. */
    document.addEventListener('focusin', function (e) {
      if (!e.target || e.target === document.body) return;
      if (e.target.closest && e.target.closest('.head')) return;
      ensureVisible(e.target);
    });
    /* Раскрытый вопрос выталкивает кнопку наверх — возвращаем её в поле зрения. */
    $$('.qa__item').forEach(function (d) {
      d.addEventListener('toggle', function () { if (d.open) ensureVisible(d.querySelector('summary')); });
    });

    window.addEventListener('pageshow', function (e) {
      if (!e.persisted) return;
      syncFromForm();
      renderedKeys = null;
      renderOffers({ initial: true });
    });

    if (/[?&]draft/.test(location.search)) document.documentElement.setAttribute('data-draft', '1');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
