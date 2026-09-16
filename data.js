/* ═════════════════════════════════════════════════════════════════════════
   КАТАЛОГ «АВАНС» — единственный файл с предложениями.

   Правится через panel.html (раздел «Каталог»). Руками тоже можно,
   но при следующем сохранении из панели правки будут перезаписаны.

   url      — партнёрская ссылка целиком. Пусто — вместо кнопки «Скоро».
   headline — крупная строка выгоды на карточке.
   specs    — условия парами «Название: значение».
   logo     — файл из img/logos либо своя картинка, загруженная в панели.

   ВАЖНО ПРО ЦИФРЫ: ставки, лимиты и сроки пишите только те, что
   подтверждены вашей партнёркой или сайтом банка. Цифра «на глаз» —
   недостоверная реклама: оффер снимут, а за рекламу отвечает владелец сайта.
   ═════════════════════════════════════════════════════════════════════════ */

const SITE = {
  "brand": "АВАНС",
  "tagline": "19 предложений банков и МФО в одном списке",
  "lead": "Займы, дебетовые и кредитные карты, счёт для бизнеса. Выбираете подходящее — и оформляете онлайн на сайте банка или МФО. Подбор бесплатный.",
  "telegram": "",
  "updated": "16.09.2026"
};

/* cta — надпись на кнопке карточек этого раздела. */
const CATEGORIES = [
  {
    "id": "zaimy",
    "label": "Займы",
    "cta": "Оформить займ"
  },
  {
    "id": "debit",
    "label": "Дебетовые карты",
    "cta": "Оформить карту"
  },
  {
    "id": "credit",
    "label": "Кредитные карты",
    "cta": "Оформить карту"
  },
  {
    "id": "rko",
    "label": "Счёт для бизнеса",
    "cta": "Открыть счёт"
  }
];

const OFFERS = [
  {
    "cat": "zaimy",
    "partner": "Займер",
    "tag": "микрозайм",
    "title": "Займ на карту",
    "logo": "img/logos/zaymer.png",
    "tone": {
      "bg": "#E2231A",
      "ink": "#FFFFFF"
    },
    "headline": "Решение без звонков",
    "note": "анкету проверяет автоматика, круглосуточно",
    "specs": [
      [
        "Оформление",
        "онлайн, без визита в офис"
      ],
      [
        "Проверка",
        "автоматическая, без звонков"
      ],
      [
        "Получение",
        "на карту или счёт"
      ]
    ],
    "url": "https://rko-group.ru/s/NbuVaqRH"
  },
  {
    "cat": "zaimy",
    "partner": "MoneyMan",
    "tag": "микрозайм",
    "title": "Займ онлайн",
    "logo": "img/logos/moneyman.png",
    "tone": {
      "bg": "#0B7BE5",
      "ink": "#FFFFFF"
    },
    "headline": "Займ онлайн на карту",
    "note": "заявка заполняется с телефона",
    "specs": [
      [
        "Оформление",
        "онлайн, с телефона"
      ],
      [
        "Документы",
        "паспорт"
      ],
      [
        "Получение",
        "на карту или счёт"
      ]
    ],
    "url": "https://u-cpa.ru/offer/rs/2f7m19w2gnnli/11mb8h60kmi7v/?partner=249201&erid=2SDnjdpnedr&platform_id=75"
  },
  {
    "cat": "zaimy",
    "partner": "Умные наличные",
    "tag": "микрозайм",
    "title": "Займ на карту",
    "logo": "img/logos/umnye-nalichnye.png",
    "tone": {
      "bg": "#1F6F45",
      "ink": "#FFFFFF"
    },
    "headline": "Короткая анкета",
    "note": "без справок и поручителей",
    "specs": [
      [
        "Оформление",
        "онлайн, без визита в офис"
      ],
      [
        "Документы",
        "паспорт"
      ],
      [
        "Получение",
        "на карту"
      ]
    ],
    "url": "https://u-cpa.ru/offer/rs/cw7ayux4qnjd/58scaykftfru/?partner=249201&erid=2SDnjePNNUs&platform_id=75"
  },
  {
    "cat": "zaimy",
    "partner": "Max.Credit",
    "tag": "микрозайм",
    "title": "Займ онлайн",
    "logo": "img/logos/maxcredit.png",
    "tone": {
      "bg": "#123E8C",
      "ink": "#FFFFFF"
    },
    "headline": "Займ без визита в офис",
    "note": "всё оформление на сайте компании",
    "specs": [
      [
        "Оформление",
        "онлайн, без визита в офис"
      ],
      [
        "Решение",
        "по анкете"
      ],
      [
        "Получение",
        "на карту или счёт"
      ]
    ],
    "url": "https://u-cpa.ru/offer/rs/21yd3v7kmakrn/3djmgjlb309em/?partner=249201&erid=2SDnje5MAdY&platform_id=75"
  },
  {
    "cat": "zaimy",
    "partner": "OneClickMoney",
    "tag": "микрозайм",
    "title": "Займ на карту",
    "logo": "img/logos/oneclickmoney.png",
    "tone": {
      "bg": "#1B4FA0",
      "ink": "#FFFFFF"
    },
    "headline": "Заявка в один шаг",
    "note": "данные вводятся один раз",
    "specs": [
      [
        "Оформление",
        "онлайн, в одну анкету"
      ],
      [
        "Документы",
        "паспорт"
      ],
      [
        "Получение",
        "на карту"
      ]
    ],
    "url": "https://u-cpa.ru/offer/rs/2slk99btrrpda/fd9flid0508a/?partner=249201&erid=2SDnjeyTk2N&platform_id=75"
  },
  {
    "cat": "zaimy",
    "partner": "JoyMoney",
    "tag": "микрозайм",
    "title": "Займ онлайн",
    "logo": "img/logos/joymoney.png",
    "tone": {
      "bg": "#7A2EA8",
      "ink": "#FFFFFF"
    },
    "headline": "Деньги на карту онлайн",
    "note": "анкета занимает несколько минут",
    "specs": [
      [
        "Оформление",
        "онлайн, без визита в офис"
      ],
      [
        "Решение",
        "по анкете"
      ],
      [
        "Получение",
        "на карту"
      ]
    ],
    "url": "https://u-cpa.ru/offer/rs/3jmoqsu44hfmh/guucy3iihi7o/?partner=249201&erid=Kra241DJN&platform_id=75"
  },
  {
    "cat": "zaimy",
    "partner": "Свои люди",
    "tag": "микрозайм",
    "title": "Займ на карту",
    "logo": "img/logos/svoiludi.png",
    "tone": {
      "bg": "#C8102E",
      "ink": "#FFFFFF"
    },
    "headline": "Онлайн и в отделениях",
    "note": "можно оформить дистанционно или прийти в офис",
    "specs": [
      [
        "Оформление",
        "онлайн или в офисе компании"
      ],
      [
        "Документы",
        "паспорт"
      ],
      [
        "Получение",
        "на карту или наличными"
      ]
    ],
    "url": "https://u-cpa.ru/offer/rs/3pr00khamfq6b/s2wumkrxjey2/?partner=249201&erid=2SDnjcGctGr&platform_id=75"
  },
  {
    "cat": "zaimy",
    "partner": "RocketMan",
    "tag": "микрозайм",
    "title": "Займ онлайн",
    "logo": "img/logos/rocketman.png",
    "tone": {
      "bg": "#12294D",
      "ink": "#FFFFFF"
    },
    "headline": "Быстрая онлайн-заявка",
    "note": "ответ по заявке приходит на сайте компании",
    "specs": [
      [
        "Оформление",
        "онлайн, с телефона"
      ],
      [
        "Решение",
        "по анкете"
      ],
      [
        "Получение",
        "на карту"
      ]
    ],
    "url": "https://u-cpa.ru/offer/rs/37w9lgyzircb6/3b998fb956kzs/?partner=249201&erid=2SDnjbxYcjJ&platform_id=75"
  },
  {
    "cat": "zaimy",
    "partner": "Деньги на дом",
    "tag": "микрозайм",
    "title": "Займ с доставкой",
    "logo": "img/logos/denginadom.png",
    "tone": {
      "bg": "#0E7A4B",
      "ink": "#FFFFFF"
    },
    "headline": "Наличными или на карту",
    "note": "компания работает и с доставкой денег",
    "specs": [
      [
        "Оформление",
        "онлайн-заявка"
      ],
      [
        "Документы",
        "паспорт"
      ],
      [
        "Получение",
        "наличными или на карту"
      ]
    ],
    "url": "https://u-cpa.ru/offer/rs/2ainv19neaafo/b3bhb8kl1ocw/?partner=249201&erid=2SDnjdr8aMy&platform_id=75"
  },
  {
    "cat": "zaimy",
    "partner": "МигКредит",
    "tag": "микрозайм",
    "title": "Займ онлайн",
    "logo": "img/logos/migcredit.png",
    "tone": {
      "bg": "#D62027",
      "ink": "#FFFFFF"
    },
    "headline": "Компания из реестра Банка России",
    "note": "работает по всей России",
    "specs": [
      [
        "Оформление",
        "онлайн, без визита в офис"
      ],
      [
        "Решение",
        "по анкете"
      ],
      [
        "Получение",
        "на карту или счёт"
      ]
    ],
    "url": "https://u-cpa.ru/offer/rs/1taevajyjg4qi/1ty2zfygzv33d/?partner=249201&erid=2SDnjeR39cC&platform_id=75"
  },
  {
    "cat": "zaimy",
    "partner": "Platiza",
    "tag": "микрозайм",
    "title": "Займ на карту",
    "logo": "img/logos/platiza.png",
    "tone": {
      "bg": "#1FA05A",
      "ink": "#FFFFFF"
    },
    "headline": "Полностью онлайн",
    "note": "от анкеты до перевода — на сайте компании",
    "specs": [
      [
        "Оформление",
        "онлайн, без визита в офис"
      ],
      [
        "Документы",
        "паспорт"
      ],
      [
        "Получение",
        "на карту"
      ]
    ],
    "url": "https://u-cpa.ru/offer/rs/393eei9i10zbi/31tn3t15ssz4r/?partner=249201&erid=2SDnje8UqRM&platform_id=75"
  },
  {
    "cat": "zaimy",
    "partner": "Альфа-Деньги",
    "tag": "микрозайм",
    "title": "Займ онлайн",
    "logo": "img/logos/alfa-dengi.jpg",
    "tone": {
      "bg": "#EF3124",
      "ink": "#FFFFFF"
    },
    "headline": "Займ на карту онлайн",
    "note": "заявка заполняется на сайте компании",
    "specs": [
      [
        "Оформление",
        "онлайн-заявка"
      ],
      [
        "Решение",
        "по анкете"
      ],
      [
        "Получение",
        "на карту"
      ]
    ],
    "url": "https://u-cpa.ru/offer/rs/qfpshi6yiciu/a0tatlvfxe3/?partner=249201&erid=2SDnjdgCCpg&platform_id=75"
  },
  {
    "cat": "debit",
    "partner": "ВТБ",
    "tag": "дебетовая карта",
    "title": "Дебетовая карта МИР",
    "logo": "img/logos/vtb.png",
    "tone": {
      "bg": "#0A2896",
      "ink": "#FFFFFF"
    },
    "headline": "Карта платёжной системы МИР",
    "note": "работает по всей России",
    "specs": [
      [
        "Платёжная система",
        "МИР"
      ],
      [
        "Оформление",
        "онлайн-заявка"
      ],
      [
        "Получение",
        "курьером или в отделении"
      ]
    ],
    "url": "https://u-cpa.ru/offer/rs/2kktqbn0vhg02/38ynycdkfpvoc/?partner=249201&erid=Kra23hiMc&platform_id=75"
  },
  {
    "cat": "debit",
    "partner": "ОТП Банк",
    "tag": "дебетовая карта",
    "title": "ОТП Premium",
    "logo": "img/logos/otp.png",
    "tone": {
      "bg": "#0C7A3E",
      "ink": "#FFFFFF"
    },
    "headline": "Премиальная дебетовая карта",
    "note": "пакет услуг уровня Premium",
    "specs": [
      [
        "Уровень",
        "премиальная"
      ],
      [
        "Оформление",
        "онлайн-заявка"
      ],
      [
        "Получение",
        "курьером или в отделении"
      ]
    ],
    "url": "https://u-cpa.ru/offer/rs/2bdnzcmeswwr4/2c1oe3lctm5a2/?partner=249201&erid=2SDnjeQa1rz&platform_id=75"
  },
  {
    "cat": "debit",
    "partner": "Ак Барс Банк",
    "tag": "дебетовая карта",
    "title": "Дебетовая карта МИР",
    "logo": "img/logos/akbars.png",
    "tone": {
      "bg": "#0E6B3D",
      "ink": "#FFFFFF"
    },
    "headline": "Дебетовая карта МИР",
    "note": "заявка занимает пару минут",
    "specs": [
      [
        "Платёжная система",
        "МИР"
      ],
      [
        "Оформление",
        "онлайн-заявка"
      ],
      [
        "Получение",
        "курьером или в отделении"
      ]
    ],
    "url": "https://u-cpa.ru/offer/rs/1lj1jrvc3jywi/7nx1fw2phahb/?partner=249201&erid=2SDnjdk3DDX&platform_id=75"
  },
  {
    "cat": "credit",
    "partner": "Т-Банк",
    "tag": "кредитная карта",
    "title": "Платинум",
    "logo": "img/logos/tbank.png",
    "tone": {
      "bg": "#1C1C1C",
      "ink": "#FFFFFF"
    },
    "headline": "Кредитная карта Платинум",
    "note": "доставка курьером, без визита в банк",
    "specs": [
      [
        "Оформление",
        "онлайн-заявка"
      ],
      [
        "Решение",
        "по анкете"
      ],
      [
        "Доставка",
        "курьером"
      ]
    ],
    "url": "https://rko-group.ru/s/E8MbQgjY"
  },
  {
    "cat": "credit",
    "partner": "Уралсиб",
    "tag": "кредитная карта",
    "title": "Кредитная карта 120 дней",
    "logo": "img/logos/uralsib.png",
    "tone": {
      "bg": "#0F5FA8",
      "ink": "#FFFFFF"
    },
    "headline": "120 дней без процентов",
    "note": "длинный льготный период по условиям банка",
    "specs": [
      [
        "Льготный период",
        "120 дней"
      ],
      [
        "Оформление",
        "онлайн-заявка"
      ],
      [
        "Решение",
        "по анкете"
      ]
    ],
    "url": "https://rko-group.ru/s/FXZRrtfy"
  },
  {
    "cat": "rko",
    "partner": "Альфа-Банк",
    "tag": "расчётный счёт",
    "title": "РКО для бизнеса",
    "logo": "img/logos/alfabank.png",
    "tone": {
      "bg": "#EF3124",
      "ink": "#FFFFFF"
    },
    "headline": "Счёт для ИП и ООО",
    "note": "открытие по заявке на сайте банка",
    "specs": [
      [
        "Для кого",
        "ИП и ООО"
      ],
      [
        "Открытие",
        "онлайн-заявка"
      ],
      [
        "Документы",
        "паспорт и данные компании"
      ]
    ],
    "url": "https://rko-group.ru/s/SDueL5kf"
  },
  {
    "cat": "rko",
    "partner": "Ozon Банк",
    "tag": "расчётный счёт",
    "title": "РКО для бизнеса",
    "logo": "img/logos/ozon.png",
    "tone": {
      "bg": "#005BFF",
      "ink": "#FFFFFF"
    },
    "headline": "Счёт для бизнеса и продавцов",
    "note": "удобно, если торгуете на маркетплейсе",
    "specs": [
      [
        "Для кого",
        "ИП и ООО"
      ],
      [
        "Открытие",
        "онлайн-заявка"
      ],
      [
        "Документы",
        "паспорт и данные компании"
      ]
    ],
    "url": "https://rko-group.ru/s/kv5FAMC8"
  }
];
