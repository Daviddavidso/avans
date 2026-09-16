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

  /* ---------- лента логотипов ---------- */
  function renderTicker() {
    var track = $('#ticker-track');
    var pause = $('#ticker-pause');
    if (!track) return;

    var seen = {}, logos = [];
    offers.forEach(function (o) {
      if (o.logo && !seen[o.logo]) { seen[o.logo] = 1; logos.push({ src: o.logo, name: o.partner }); }
    });
    if (!logos.length) { var sec = track.closest('.ticker'); if (sec) sec.hidden = true; return; }

    track.textContent = '';
    function fill(hidden) {
      logos.forEach(function (l) {
        var li = el('li', 'ticker__item');
        if (hidden) li.setAttribute('aria-hidden', 'true');
        var img = new Image();
        img.src = l.src;
        img.alt = hidden ? '' : l.name;
        img.loading = 'lazy';
        img.decoding = 'async';
        li.appendChild(img);
        track.appendChild(li);
      });
    }
    fill(false);
    fill(true); /* вторая копия — только для бесшовной прокрутки */

    if (pause) {
      pause.addEventListener('click', function () {
        var paused = track.classList.toggle('is-paused');
        pause.textContent = paused ? 'Продолжить движение' : 'Остановить движение';
      });
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        pause.hidden = true;
      }
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
      var wrap = el('span', 'chip');
      var input = document.createElement('input');
      input.type = 'radio';
      input.name = 'cat';
      input.id = id;
      input.value = c.id;
      input.checked = i === 0;
      var face = el('span', 'chip__face');
      face.appendChild(document.createTextNode(c.label));
      var count = el('span', 'chip__count', String(n));
      count.setAttribute('aria-hidden', 'true');
      face.appendChild(count);
      var sr = el('span', 'vh', ', ' + n + ' ' + plural(n, 'продукт', 'продукта', 'продуктов'));
      face.appendChild(sr);
      var label = document.createElement('label');
      label.setAttribute('for', id);
      label.className = 'vh';
      label.textContent = c.label;
      wrap.appendChild(input);
      wrap.appendChild(face);
      box.appendChild(wrap);
      input.addEventListener('change', function () {
        if (!input.checked) return;
        state.cat = input.value;
        renderOffers();
      });
      /* подпись читалке даёт сам face, поэтому скрытый label не нужен */
      label.remove();
      input.setAttribute('aria-label', c.label + ', ' + n + ' ' + plural(n, 'продукт', 'продукта', 'продуктов'));
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

  function buildCard(o) {
    var li = el('li');
    var card = el('article', 'card');
    card.setAttribute('data-offer', '');

    var top = el('div', 'card__top');
    var logo = el('span', 'card__logo');
    if (o.logo) {
      var img = new Image();
      img.src = o.logo;
      img.alt = '';
      img.loading = 'lazy';
      img.decoding = 'async';
      logo.appendChild(img);
    } else {
      var plaque = el('span', 'card__plaque', initials(o.partner));
      var tone = o.tone || {};
      plaque.style.background = tone.bg || '#2563eb';
      plaque.style.color = tone.ink || '#fff';
      plaque.setAttribute('aria-hidden', 'true');
      logo.appendChild(plaque);
    }
    top.appendChild(logo);

    var names = el('div');
    names.appendChild(el('h3', 'card__name', o.partner));
    if (o.tag) names.appendChild(el('p', 'card__tag', o.tag));
    top.appendChild(names);
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
      a.appendChild(el('span', 'vh', ': ' + o.partner + (o.title ? ', ' + o.title : '') + ' (откроется в новой вкладке)'));
      foot.appendChild(a);
    } else {
      var soon = el('p', 'card__soon', 'Скоро');
      soon.appendChild(el('span', 'vh', ': ссылка на ' + o.partner + ' пока не подключена'));
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

  var sayTimer = null;
  function say(text) {
    var box = $('#results');
    if (!box) return;
    clearTimeout(sayTimer);
    sayTimer = setTimeout(function () { box.textContent = text; }, 450);
  }

  function renderOffers(initial) {
    var grid = $('#offers');
    var empty = $('#empty');
    if (!grid) return;
    var list = offers.filter(matches);

    grid.textContent = '';
    list.forEach(function (o) { grid.appendChild(buildCard(o)); });
    if (empty) empty.hidden = list.length !== 0;

    var cat = state.cat === 'all' ? null : catById(state.cat);
    var text = list.length
      ? 'Показано ' + list.length + ' ' + plural(list.length, 'продукт', 'продукта', 'продуктов') +
        ' из ' + offers.length + (cat ? ' · раздел «' + cat.label + '»' : '')
      : 'Ничего не нашлось. Измените запрос или выберите другой раздел.';
    if (initial) { var box = $('#results'); if (box) box.textContent = text; }
    else say(text);
  }

  /* ---------- поиск ---------- */
  function bindSearch() {
    var input = $('#q');
    var reset = $('#reset');
    if (input) {
      input.addEventListener('input', function () {
        state.q = input.value;
        renderOffers();
      });
    }
    if (reset) {
      reset.addEventListener('click', function () {
        state.q = '';
        state.cat = 'all';
        if (input) input.value = '';
        var all = $('#cat-all');
        if (all) all.checked = true;
        renderOffers();
        if (input) input.focus();
      });
    }
  }

  /* ---------- мобильное меню ---------- */
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
    function close() {
      menu.hidden = true;
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      var main = $('#main');
      if (main) main.inert = false;
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    burger.addEventListener('click', function () { menu.hidden ? open() : close(); });
    if (closeBtn) closeBtn.addEventListener('click', close);
    menu.addEventListener('click', function (e) { if (e.target === menu) close(); });
    $$('a', panel).forEach(function (a) { a.addEventListener('click', close); });
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
      if (best) map[best].setAttribute('aria-current', 'true');
    }, { rootMargin: '-96px 0px -55% 0px', threshold: [0, .25, .5, 1] });

    ids.forEach(function (id) { io.observe(document.getElementById(id)); });
  }

  /* ---------- запуск ---------- */
  function init() {
    applySite();
    renderStats();
    renderTicker();
    renderFilters();
    bindSearch();
    renderOffers(true);
    bindMenu();
    bindSpy();
    if (/[?&]draft/.test(location.search)) document.documentElement.setAttribute('data-draft', '1');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
