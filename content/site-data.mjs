import { mapLocations } from './places.mjs';

// Shared content for static pages and homepage interactions.
export const copy = {
  "bg": {
    "skip": "Към съдържанието",
    "always": "На линия 24/7. Включително в празнични дни.",
    "regionTop": "Ботевград · Правец · Мездра · АМ Хемус",
    "brandSub": "ПЪТНА ПОМОЩ",
    "navServices": "Услуги",
    "navCoverage": "Покритие",
    "navAbout": "За нас",
    "navFaq": "Въпроси",
    "navContact": "Контакти",
    "quoteNav": "Безплатна оферта",
    "heroEyebrow": "ПЪТНА ПОМОЩ. ПО ВСЯКО ВРЕМЕ.",
    "heroLine1": "Пътна помощ.",
    "usefulPages": "Полезни страници",
    "locationDirectory": "Търси населено място или район",
    "brandHome": "Бетина 97 — начало",
    "areasNavigation": "Услуги и райони",
    "heroLine2": "Не сте ",
    "heroAccent": "сами.",
    "heroDescription": "Повреда, спукана гума или изтощен акумулатор? Един разговор е първата стъпка обратно на пътя.",
    "callNow": "Обадете се сега",
    "freeQuote": "Безплатна оферта",
    "showLocation": "Покажете локацията си",
    "discover": "Как можем да помогнем",
    "trust1": "24 часа. 7 дни.",
    "trust1Sub": "Помощта не чака работно време.",
    "trust2": "Грижа за автомобила ви",
    "trust2Sub": "От мястото на повредата до сервиза.",
    "trust3": "Цена преди тръгване",
    "trust3Sub": "Безплатна консултация и ясна оферта.",
    "servicesEyebrow": "КАК МОЖЕМ ДА ПОМОГНЕМ",
    "servicesTitle": "Малка повреда.<br>Голяма подкрепа.",
    "servicesIntro": "Изберете от какво имате нужда. Ще обсъдим ситуацията и ще намерим подходящото решение за вас.",
    "notSure": "Не сте сигурни какъв е проблемът?",
    "notSureSub": "Разкажете ни — ще ви насочим.",
    "consultation": "Безплатна консултация",
    "processEyebrow": "БЕЗ ИЗЛИШНО УСЛОЖНЯВАНЕ",
    "processTitle": "Три стъпки.<br>Един по-спокоен път.",
    "startRequest": "Подгответе заявка",
    "step1Title": "Свържете се с нас",
    "step1Text": "Обадете се или подгответе SMS заявка. Кажете ни какво се е случило.",
    "step2Title": "Уточняваме място и цена",
    "step2Text": "Споделете локация. Потвърждаваме услугата, цената и възможното време за пристигане.",
    "step3Title": "Поемаме оттук",
    "step3Text": "Помощ на място или превоз до избран от вас сервиз. Оставате в течение по телефона.",
    "coverageEyebrow": "БЛИЗО ДО ВАС",
    "coverageTitle": "Нашият район.<br>Вашето спокойствие.",
    "coverageIntro": "Базирани в Ботевград. Обслужваме района на Правец, Мездра и автомагистрала „Хемус“. За превоз извън района се обадете за уточнение.",
    "coverageLabel": "ОСНОВЕН РАЙОН НА ОБСЛУЖВАНЕ",
    "whereAreYou": "Къде се намирате?",
    "locationExplanation": "Използвайте GPS или отбележете място на картата, за да го включите в заявката.",
    "findMe": "Моето местоположение",
    "mapUnavailable": "Картата не е достъпна. Въведете мястото в заявката или ни се обадете.",
    "externalMap": "Отвори карта",
    "mapHint": "Изберете точка · Enter за центъра",
    "useLocation": "Използвай в заявка",
    "mapNote": "Картата показва ориентировъчно основния район, а не местоположение на екип в реално време. Наличността се потвърждава по телефон.",
    "quoteEyebrow": "НЕКА НАМЕРИМ РЕШЕНИЕ",
    "quoteTitle": "Кажете ни<br>от какво имате<br><em>нужда.</em>",
    "quoteIntro": "Подгответе кратка заявка за безплатна оферта. Изпратете я като SMS или се обадете с готовите детайли.",
    "quoteBenefit1": "Без задължение за поръчка",
    "quoteBenefit2": "Уточняваме цената предварително",
    "quoteBenefit3": "Леки и лекотоварни автомобили",
    "urgent": "Спешно е? Най-бързо е по телефона.",
    "requestTitle": "Вашата заявка",
    "free": "Безплатна оферта",
    "formStep1": "Услуга",
    "formStep2": "Детайли",
    "formStep3": "Преглед",
    "chooseService": "Как можем да помогнем?",
    "serviceAvailability": "Услугите на място и експресното посещение са според случая и наличността. Потвърждаваме ги по телефон.",
    "continue": "Продължи",
    "tellUsMore": "Няколко детайла за ситуацията",
    "locationField": "Къде е автомобилът? *",
    "vehicleField": "Вид автомобил",
    "phoneField": "Телефон за връзка *",
    "destinationField": "До къде да го транспортираме?",
    "notesField": "Още нещо, което трябва да знаем?",
    "expressOption": "Приоритетно посещение",
    "expressNote": "Заявете експресна помощ. Потвърждаваме възможността и цената по телефон.",
    "back": "Назад",
    "reviewRequest": "Преглед на заявката",
    "readyTitle": "Готови за връзка.",
    "reviewIntro": "Проверете детайлите и изберете как да ги споделите.",
    "sendNote": "Бутонът отваря SMS приложението с готов текст. Заявката се изпраща от вас. Цената и посещението се потвърждават по телефон.",
    "openSms": "Отвори SMS заявка",
    "copyDetails": "Копирай детайлите",
    "callInstead": "Обади се",
    "editDetails": "Редактирай детайлите",
    "formPrivacy": "Данните остават на устройството ви до изпращане.",
    "aboutVisual": "Местен екип.<br>На вашата страна.",
    "aboutEyebrow": "ХОРАТА ЗАД ПОМОЩТА",
    "aboutTitle": "Познаваме района.<br>Разбираме ситуацията.",
    "aboutText": "Бетина 97 ООД е компания за пътна помощ от Ботевград. Помагаме на шофьори с аварирали леки и лекотоварни автомобили — денонощно, през делници, почивни и празнични дни.",
    "aboutText2": "Знаем, че повредата никога не идва в удобен момент. Затова започваме с ясен разговор: къде сте, какво е нужно и как можем да ви помогнем.",
    "aboutPoint1": "Платформа и лебедка",
    "aboutPoint2": "Превоз до избрано място",
    "aboutPoint3": "Човешко отношение",
    "faqEyebrow": "ДОБРЕ Е ДА ЗНАЕТЕ",
    "faqTitle": "Преди да<br>ни се обадите.",
    "faqIntro": "Отговори на най-честите въпроси. За всичко останало сме на един разговор разстояние.",
    "contactEyebrow": "ЗАПАЗЕТЕ НОМЕРА. ПЪТУВАЙТЕ СПОКОЙНО.",
    "contactTitle": "Тук сме, когато<br>ви потрябваме.",
    "mainPhone": "ОСНОВЕН ТЕЛЕФОН · 24/7",
    "secondPhone": "ДОПЪЛНИТЕЛЕН ТЕЛЕФОН · 24/7",
    "saveContact": "Запазете контакта",
    "callCost": "Консултацията и офертата са безплатни. Разговорите и SMS се таксуват според мобилния ви план.",
    "footerTagline": "Повече спокойствие.<br>На всеки километър.",
    "privacy": "Поверителност",
    "company": "Бетина 97 ООД. Всички права запазени.",
    "footerLocation": "Ботевград, България",
    "backToTop": "Обратно нагоре ↑",
    "myLocation": "Локация",
    "navigation": "Основна навигация",
    "menu": "Отвори меню",
    "heroAlt": "Жълт репатрак на планински път — илюстративно изображение",
    "mapLabel": "Интерактивна карта. Стрелките преместват картата, Enter избира центъра.",
    "requestSteps": "Стъпки на заявката",
    "locationPlaceholder": "Град, път, километър или ориентир",
    "useGps": "Използвай GPS",
    "destinationPlaceholder": "Сервиз или населено място (по желание)",
    "notesPlaceholder": "Марка, модел, повреда… (по желание)",
    "close": "Затвори",
    "details": "Вижте услугата",
    "cardDetails": "Детайли",
    "cardRequest": "Заяви",
    "service24": "24/7",
    "onSite": "НА МЯСТО",
    "onRequest": "ПО ЗАЯВКА",
    "availableNote": "Наличността, конкретната услуга и цената се потвърждават по телефон преди посещение.",
    "requestService": "Заяви тази услуга",
    "vehicleCar": "Лек автомобил",
    "vehicleSuv": "Джип / SUV",
    "vehicleVan": "Бус / лекотоварен",
    "vehicleOther": "Друго — уточнете в бележките",
    "locationRequired": "Въведете местоположение или използвайте GPS.",
    "phoneRequired": "Въведете валиден телефон (7–15 цифри, с код на държавата при нужда).",
    "serviceLabel": "Услуга",
    "locationLabel": "Място",
    "vehicleLabel": "Автомобил",
    "phoneLabel": "Телефон",
    "destinationLabel": "До",
    "notesLabel": "Бележки",
    "expressLabel": "Приоритет",
    "expressValue": "Заявено експресно посещение — според наличността",
    "messageHeading": "Заявка за безплатна оферта до Бетина 97",
    "copied": "Детайлите са копирани.",
    "copyFailed": "Копирайте текста от полето по-долу.",
    "copyTitle": "Текстът на вашата заявка",
    "finding": "Определяме местоположението…",
    "findingText": "Разрешете достъп до GPS, ако браузърът ви попита. Локацията се споделя само когато изпратите съобщението.",
    "locationReady": "Ето къде се намирате.",
    "locationMapLabel": "Карта на избраното местоположение",
    "locationCoordinates": "GPS координати",
    "locationMapUnavailable": "Прегледът на картата не е достъпен. Можете да копирате или изпратите локацията.",
    "locationAdded": "Местоположението е добавено към заявката.",
    "locationTitle": "Споделете вашето място",
    "locationError": "GPS не е достъпен.",
    "locationDenied": "Достъпът до местоположение е отказан. Можете да въведете адрес или да изберете точка на картата.",
    "locationTimeout": "Не успяхме да определим местоположението навреме. Опитайте отново на открито или въведете адрес.",
    "locationOther": "Не успяхме да определим местоположението. Въведете град, път или ориентир, или изберете точка на картата.",
    "manualLocation": "Град, път, километър или ориентир",
    "addLocation": "Добави в заявката",
    "chooseOnMap": "Избери на картата",
    "viewOnMap": "Провери на карта",
    "copyLocation": "Копирай локация",
    "sendLocation": "Отвори SMS с локацията",
    "useForQuote": "Използвай за оферта",
    "retryGps": "Опитай GPS отново",
    "locationMessage": "Здравейте, имам нужда от пътна помощ. Моето местоположение:",
    "locationPoint": "GPS",
    "mapPoint": "Избрана точка",
    "locationSmsNote": "SMS се изпраща от вас. За спешна помощ се обадете директно.",
    "privacyTitle": "Вашите данни",
    "privacyIntro": "Сайтът не изпраща формуляра към сървър и не запазва личните ви данни в база данни.",
    "privacyPoints": [
      "Детайлите за заявката са в паметта на текущата страница. Изчистват се при презареждане.",
      "GPS се използва само след ваше действие и разрешение. Координатите се добавят към SMS само ако го изберете.",
      "SMS и телефонните разговори се извършват през приложенията на устройството ви. Сайтът не ги изпраща автоматично.",
      "Изборът на език се запазва локално на вашето устройство. Не използваме аналитични или рекламни бисквитки.",
      "Картата зарежда изображения от OpenStreetMap, когато е видима или отворите преглед на локацията. Доставчикът получава обичайните мрежови данни, включително IP адреса ви."
    ],
    "privacyContact": "За въпроси към Бетина 97: 0878 558 152 или 0887 558 150.",
    "privacyMapLink": "Поверителност на OpenStreetMap",
    "savedContact": "Отворете контактния файл, за да го добавите в телефона си.",
    "gpsAccuracy": "Точност приблизително",
    "meters": "м",
    "servicesIndex": "Всички услуги",
    "coverageIndex": "Райони на обслужване",
    "allDetails": "Пълна информация",
    "home": "Начало",
    "regionDetails": "Помощ в района",
    "aboutIndex": "За Бетина 97",
    "faqIndex": "Често задавани въпроси",
    "contactIndex": "Телефони и контакти"
  },
  "en": {
    "skip": "Skip to content",
    "always": "Here 24/7. Weekends and holidays included.",
    "regionTop": "Botevgrad · Pravets · Mezdra · Hemus motorway",
    "brandSub": "ROADSIDE ASSISTANCE",
    "navigation": "Main navigation",
    "navServices": "Services",
    "navCoverage": "Coverage",
    "navAbout": "About us",
    "navFaq": "FAQs",
    "navContact": "Contact",
    "menu": "Open menu",
    "quoteNav": "Free quote",
    "heroEyebrow": "ROADSIDE ASSISTANCE. AROUND THE CLOCK.",
    "heroLine1": "Roadside help.",
    "usefulPages": "Useful pages",
    "locationDirectory": "Find a place or area",
    "brandHome": "Betina 97 — home",
    "areasNavigation": "Services and areas",
    "heroLine2": "By your ",
    "heroAccent": "side.",
    "heroDescription": "A breakdown, flat tire or dead battery? One call is the first step back on the road.",
    "heroAlt": "Yellow recovery truck on a mountain road — illustrative image",
    "callNow": "Call us now",
    "freeQuote": "Get a free quote",
    "showLocation": "Show your location",
    "discover": "Explore our services",
    "trust1": "24 hours. 7 days.",
    "trust1Sub": "Help does not keep office hours.",
    "trust2": "Care for your vehicle",
    "trust2Sub": "From the roadside to the workshop.",
    "trust3": "Agree the price first",
    "trust3Sub": "Free advice and a clear quote.",
    "servicesEyebrow": "HOW WE CAN HELP",
    "servicesTitle": "A small setback.<br>A helping hand.",
    "servicesIntro": "Choose what you need. We will talk through the situation and find a suitable solution together.",
    "notSure": "Not sure what went wrong?",
    "notSureSub": "Tell us what happened — we will guide you.",
    "consultation": "Free consultation",
    "processEyebrow": "KEEPING THINGS SIMPLE",
    "processTitle": "Three steps.<br>A calmer journey.",
    "startRequest": "Prepare a request",
    "step1Title": "Get in touch",
    "step1Text": "Call us or prepare an SMS request. Let us know what happened.",
    "step2Title": "Confirm the place and price",
    "step2Text": "Share your location. We confirm the service, price and possible arrival time.",
    "step3Title": "We take it from here",
    "step3Text": "Roadside help or transport to your chosen workshop. We keep you informed by phone.",
    "coverageEyebrow": "CLOSE TO YOU",
    "coverageTitle": "Our local roads.<br>Your peace of mind.",
    "coverageIntro": "Based in Botevgrad. Serving Pravets, Mezdra and the Hemus motorway. Call to discuss transport beyond the local area.",
    "coverageLabel": "PRIMARY SERVICE AREA",
    "whereAreYou": "Where are you?",
    "locationExplanation": "Use GPS or pick a point on the map to include it in your request.",
    "findMe": "Find my location",
    "mapLabel": "Interactive map. Arrow keys move the map; Enter selects its center.",
    "mapUnavailable": "The map is unavailable. Enter your location in the request or give us a call.",
    "externalMap": "Open map",
    "mapHint": "Choose a point · Enter for center",
    "useLocation": "Use in request",
    "mapNote": "The map shows the approximate main service area, not a live team location. Availability is confirmed by phone.",
    "quoteEyebrow": "LET’S FIND A SOLUTION",
    "quoteTitle": "Tell us<br>what you<br><em>need.</em>",
    "quoteIntro": "Prepare a short request for a free quote. Send it by SMS or call us with the details ready.",
    "quoteBenefit1": "No obligation to book",
    "quoteBenefit2": "Price agreed in advance",
    "quoteBenefit3": "Passenger cars and light vans",
    "urgent": "Urgent? Calling is the quickest way.",
    "requestTitle": "Your request",
    "free": "Free quote",
    "requestSteps": "Request steps",
    "formStep1": "Service",
    "formStep2": "Details",
    "formStep3": "Review",
    "chooseService": "How can we help?",
    "serviceAvailability": "Roadside services and priority visits depend on the situation and availability. We confirm them by phone.",
    "continue": "Continue",
    "tellUsMore": "A few details about the situation",
    "locationField": "Where is the vehicle? *",
    "locationPlaceholder": "Town, road, kilometer or landmark",
    "useGps": "Use GPS location",
    "vehicleField": "Vehicle type",
    "phoneField": "Contact phone *",
    "destinationField": "Where should we take it?",
    "destinationPlaceholder": "Workshop or town (optional)",
    "notesField": "Anything else we should know?",
    "notesPlaceholder": "Make, model, problem… (optional)",
    "expressOption": "Priority visit",
    "expressNote": "Request express help. We confirm availability and price by phone.",
    "back": "Back",
    "reviewRequest": "Review request",
    "readyTitle": "Ready to get in touch.",
    "reviewIntro": "Check the details and choose how to share them.",
    "sendNote": "The button opens your SMS app with a prepared message. You send it yourself. The price and visit are confirmed by phone.",
    "openSms": "Open SMS request",
    "copyDetails": "Copy details",
    "callInstead": "Call us",
    "editDetails": "Edit details",
    "formPrivacy": "Your details stay on your device until you send them.",
    "aboutVisual": "A local team.<br>On your side.",
    "aboutEyebrow": "THE PEOPLE BEHIND THE HELP",
    "aboutTitle": "We know the roads.<br>We understand the moment.",
    "aboutText": "Betina 97 OOD is a roadside assistance company based in Botevgrad. We help drivers with stranded passenger cars and light vans — around the clock, on weekdays, weekends and holidays.",
    "aboutText2": "A breakdown never comes at a convenient time. So we start with a clear conversation: where you are, what you need and how we can help.",
    "aboutPoint1": "Flatbed and winch",
    "aboutPoint2": "Your chosen destination",
    "aboutPoint3": "A personal approach",
    "faqEyebrow": "GOOD TO KNOW",
    "faqTitle": "Before you<br>give us a call.",
    "faqIntro": "Answers to common questions. For anything else, we are one phone call away.",
    "contactEyebrow": "SAVE OUR NUMBER. TRAVEL WITH PEACE OF MIND.",
    "contactTitle": "Here when<br>you need us.",
    "mainPhone": "MAIN NUMBER · 24/7",
    "secondPhone": "SECOND NUMBER · 24/7",
    "saveContact": "Save our contact",
    "callCost": "Advice and quotes are free. Calls and SMS are charged according to your mobile plan.",
    "footerTagline": "A little more peace of mind.<br>Every kilometer.",
    "privacy": "Privacy",
    "company": "Betina 97 OOD. All rights reserved.",
    "footerLocation": "Botevgrad, Bulgaria",
    "backToTop": "Back to top ↑",
    "myLocation": "Location",
    "details": "View service",
    "cardDetails": "Details",
    "cardRequest": "Request",
    "service24": "24/7",
    "onSite": "AT YOUR LOCATION",
    "onRequest": "ON REQUEST",
    "availableNote": "Availability, the specific service and price are confirmed by phone before a visit.",
    "requestService": "Request this service",
    "close": "Close",
    "vehicleCar": "Passenger car",
    "vehicleSuv": "SUV / 4×4",
    "vehicleVan": "Van / light commercial",
    "vehicleOther": "Other — describe in notes",
    "locationRequired": "Enter your location or use GPS.",
    "phoneRequired": "Enter a valid phone number (7–15 digits, with a country code if needed).",
    "serviceLabel": "Service",
    "locationLabel": "Location",
    "vehicleLabel": "Vehicle",
    "phoneLabel": "Phone",
    "destinationLabel": "Destination",
    "notesLabel": "Notes",
    "expressLabel": "Priority",
    "expressValue": "Express visit requested — subject to availability",
    "messageHeading": "Free quote request for Betina 97",
    "copied": "Details copied.",
    "copyFailed": "Copy the text from the field below.",
    "copyTitle": "Your request text",
    "finding": "Finding your location…",
    "findingText": "Allow GPS access if your browser asks. Your location is shared only when you send the message.",
    "locationReady": "Here is your location.",
    "locationMapLabel": "Map of your selected location",
    "locationCoordinates": "GPS coordinates",
    "locationMapUnavailable": "Map preview unavailable. You can still copy or send your location.",
    "locationAdded": "Location added to your request.",
    "locationTitle": "Share your location",
    "locationError": "GPS is unavailable.",
    "locationDenied": "Location access was denied. Enter an address or choose a point on the map.",
    "locationTimeout": "We could not find your location in time. Try again outdoors or enter an address.",
    "locationOther": "We could not find your location. Enter a town, road or landmark, or choose a point on the map.",
    "manualLocation": "Town, road, kilometer or landmark",
    "addLocation": "Add to request",
    "chooseOnMap": "Choose on map",
    "viewOnMap": "Check on map",
    "copyLocation": "Copy location",
    "sendLocation": "Open SMS with location",
    "useForQuote": "Use for quote",
    "retryGps": "Try GPS again",
    "locationMessage": "Hello, I need roadside assistance. My location:",
    "locationPoint": "GPS",
    "mapPoint": "Selected point",
    "locationSmsNote": "You send the SMS yourself. For urgent assistance, call us directly.",
    "privacyTitle": "Your details",
    "privacyIntro": "The website does not send the form to a server or save personal details in a database.",
    "privacyPoints": [
      "Request details stay in the memory of the current page and are cleared when it reloads.",
      "GPS is used only after your action and permission. Coordinates are included in an SMS only when you choose to do so.",
      "SMS and calls use the apps on your device. The website does not send them automatically.",
      "Your language choice is saved locally on your device. We do not use analytics or advertising cookies.",
      "The map loads images from OpenStreetMap when it is visible or you open a location preview. The provider receives normal network information, including your IP address."
    ],
    "privacyContact": "For questions, contact Betina 97: +359 878 558 152 or +359 887 558 150.",
    "privacyMapLink": "OpenStreetMap privacy policy",
    "savedContact": "Open the contact file to add it to your phone.",
    "gpsAccuracy": "Approximate accuracy",
    "meters": "m",
    "servicesIndex": "All services",
    "coverageIndex": "Service areas",
    "allDetails": "Full service details",
    "home": "Home",
    "regionDetails": "Local assistance",
    "aboutIndex": "About Betina 97",
    "faqIndex": "Frequently asked questions",
    "contactIndex": "Phone numbers & contact"
  }
};

export const services = [
  {
    "id": "tow",
    "image": {
      "src": "/assets/services/tow.jpg",
      "small": "/assets/services/tow-small.jpg",
      "height": 480,
      "alt": {
        "bg": "Илюстрация: жълт репатрак превозва автомобил на планински път.",
        "en": "Illustration: a yellow tow truck carrying a car on a mountain road."
      }
    },
    "icon": "truck",
    "tag": "service24",
    "featured": true,
    "bg": {
      "title": "Пътна помощ и репатрак",
      "cardTitle": "Репатрак",
      "short": "Безопасен превоз на аварирал автомобил до избрано от вас място.",
      "text": "Когато автомобилът не може да продължи, организираме транспортирането му с платформа. Уточняваме мястото, състоянието на автомобила и крайната точка по телефон.",
      "points": [
        "Леки и лекотоварни автомобили",
        "Товарене с платформа и лебедка според ситуацията",
        "Превоз до сервиз, адрес или друго уговорено място"
      ]
    },
    "en": {
      "title": "Roadside help & towing",
      "cardTitle": "Tow truck",
      "short": "Careful transport of your stranded vehicle to your chosen destination.",
      "text": "When your vehicle cannot continue, we arrange transport on a flatbed. We confirm the location, condition of the vehicle and destination by phone.",
      "points": [
        "Passenger cars and light vans",
        "Flatbed loading and winch assistance as appropriate",
        "Transport to a workshop, address or agreed destination"
      ]
    },
    "paths": {
      "bg": "/uslugi/patna-pomosht-i-repatrak/",
      "en": "/en/services/towing/"
    }
  },
  {
    "id": "tire",
    "image": {
      "src": "/assets/services/tire.jpg",
      "small": "/assets/services/tire-small.jpg",
      "height": 640,
      "alt": {
        "bg": "Илюстрация: смяна на автомобилна гума край пътя.",
        "en": "Illustration: a roadside tire change."
      }
    },
    "icon": "tire",
    "tag": "onSite",
    "bg": {
      "title": "Ремонт и смяна на гуми",
      "cardTitle": "Помощ за гуми",
      "short": "Смяна с резервна гума или съдействие за ремонт в сервиз.",
      "text": "Спукана гума не означава край на пътуването. Обсъждаме дали може да се постави изправна резервна гума на място или е необходим превоз до сервиз за гуми.",
      "points": [
        "Смяна с налична, подходяща резервна гума",
        "Преценка за възможна помощ на място",
        "Съдействие за ремонт или транспорт до сервиз"
      ]
    },
    "en": {
      "title": "Tire repair & replacement",
      "cardTitle": "Tire help",
      "short": "Help fitting your spare or arranging a repair at a tire workshop.",
      "text": "A flat tire does not have to end your journey. We discuss whether a suitable spare can be fitted at your location or transport to a tire workshop is needed.",
      "points": [
        "Fitting a suitable spare if available",
        "Assessing what can be done at the roadside",
        "Help arranging a repair or workshop transport"
      ]
    },
    "paths": {
      "bg": "/uslugi/remont-i-smyana-na-gumi/",
      "en": "/en/services/tire-assistance/"
    }
  },
  {
    "id": "battery",
    "image": {
      "src": "/assets/services/battery.jpg",
      "small": "/assets/services/battery-small.jpg",
      "height": 640,
      "alt": {
        "bg": "Илюстрация: преносимо стартово устройство и автомобилен акумулатор.",
        "en": "Illustration: a portable jump starter and car battery."
      }
    },
    "icon": "battery",
    "tag": "onSite",
    "bg": {
      "title": "Подаване на ток",
      "cardTitle": "Подаване на ток",
      "short": "Съдействие при изтощен акумулатор и проблем със стартирането.",
      "text": "Ако автомобилът не пали, опишете симптомите и модела по телефона. Уточняваме дали подаването на ток е подходящо, или е необходима друга помощ.",
      "points": [
        "Уточняване на симптомите по телефон",
        "Помощ при стартиране, когато е подходящо",
        "При друг проблем — обсъждаме транспорт до сервиз"
      ]
    },
    "en": {
      "title": "Battery & starting help",
      "cardTitle": "Jump start",
      "short": "Assistance with a flat battery or a vehicle that will not start.",
      "text": "Tell us the symptoms and your vehicle model by phone. We discuss whether a jump-start is appropriate or another type of assistance is needed.",
      "points": [
        "Talk through the symptoms by phone",
        "Starting assistance where suitable",
        "Discuss workshop transport for other faults"
      ]
    },
    "paths": {
      "bg": "/uslugi/podavane-na-tok/",
      "en": "/en/services/battery-assistance/"
    }
  },
  {
    "id": "express",
    "image": {
      "src": "/assets/services/express.jpg",
      "small": "/assets/services/express-small.jpg",
      "height": 480,
      "alt": {
        "bg": "Илюстрация: автомобил за пътна помощ до аварирал автомобил.",
        "en": "Illustration: a roadside assistance vehicle beside a stranded car."
      }
    },
    "icon": "bolt",
    "tag": "onRequest",
    "bg": {
      "title": "Експресна помощ",
      "cardTitle": "Експресна помощ",
      "short": "Заявете приоритетно посещение, когато времето е от значение.",
      "text": "Когато ситуацията е спешна, обадете се директно. Ще проверим възможността за приоритетно посещение и ще уточним време и цена преди тръгване.",
      "points": [
        "Директна връзка по телефон",
        "Приоритетно посещение според наличността",
        "Време и цена се потвърждават за конкретния случай"
      ]
    },
    "en": {
      "title": "Express assistance",
      "cardTitle": "Express help",
      "short": "Request a priority visit when time is especially important.",
      "text": "For an urgent situation, call us directly. We check the possibility of a priority visit and discuss timing and price before setting out.",
      "points": [
        "Direct contact by phone",
        "Priority visit subject to availability",
        "Timing and price confirmed for your situation"
      ]
    },
    "paths": {
      "bg": "/uslugi/ekspresna-pomosht/",
      "en": "/en/services/express-assistance/"
    }
  },
  {
    "id": "fuel",
    "image": {
      "src": "/assets/services/fuel.jpg",
      "small": "/assets/services/fuel-small.jpg",
      "height": 640,
      "alt": {
        "bg": "Илюстрация: зареждане на автомобил с преносима туба за гориво.",
        "en": "Illustration: refuelling a car with a portable fuel can."
      }
    },
    "icon": "fuel",
    "tag": "onRequest",
    "bg": {
      "title": "Доставка на гориво",
      "cardTitle": "Доставка на гориво",
      "short": "Обсъдете съдействие, ако сте останали без гориво на пътя.",
      "text": "Кажете ни точното място, вида гориво и автомобила. Проверяваме дали можем да съдействаме с доставка, или е нужно друго решение за ситуацията.",
      "points": [
        "Уточняване на бензин или дизел",
        "Наличност и количество се потвърждават по телефон",
        "Горивото и услугата се уточняват отделно в офертата"
      ]
    },
    "en": {
      "title": "Fuel delivery",
      "cardTitle": "Fuel delivery",
      "short": "Discuss assistance if you have run out of fuel on the road.",
      "text": "Tell us your exact location, fuel type and vehicle. We check whether delivery is available or a different solution is needed.",
      "points": [
        "Confirm petrol or diesel",
        "Availability and quantity confirmed by phone",
        "Fuel and service costs explained in the quote"
      ]
    },
    "paths": {
      "bg": "/uslugi/dostavka-na-gorivo/",
      "en": "/en/services/fuel-delivery/"
    }
  },
  {
    "id": "recovery",
    "image": {
      "src": "/assets/services/recovery.jpg",
      "small": "/assets/services/recovery-small.jpg",
      "height": 480,
      "alt": {
        "bg": "Илюстрация: извличане на автомобил с лебедка и платформа.",
        "en": "Illustration: vehicle recovery with a winch and flatbed."
      }
    },
    "icon": "recovery",
    "tag": "onRequest",
    "bg": {
      "title": "Извличане и транспорт",
      "cardTitle": "Извличане",
      "short": "Съдействие за заседнали автомобили и специализиран превоз.",
      "text": "При заседнал или блокирал автомобил описанието на мястото е особено важно. По телефон уточняваме достъпа, състоянието и подходящото оборудване.",
      "points": [
        "Извличане с лебедка според условията",
        "Автомобили с повреди или блокирали колела",
        "Предварително уговорен транспорт на автомобил"
      ]
    },
    "en": {
      "title": "Recovery & transport",
      "cardTitle": "Vehicle recovery",
      "short": "Assistance with stuck vehicles and arranged vehicle transport.",
      "text": "For a stuck or immobilized vehicle, the location and access matter. We discuss the conditions, vehicle state and appropriate equipment by phone.",
      "points": [
        "Winch recovery where conditions allow",
        "Damaged vehicles or locked wheels",
        "Pre-arranged vehicle transport"
      ]
    },
    "paths": {
      "bg": "/uslugi/izvlichane-i-transport/",
      "en": "/en/services/vehicle-recovery/"
    }
  }
];

export const regions = [
  {
    "bg": "Ботевград",
    "en": "Botevgrad",
    "point": [
      42.907,
      23.793
    ],
    "zoom": 12,
    "id": "botevgrad",
    "paths": {
      "bg": "/rayoni/botevgrad/",
      "en": "/en/coverage/botevgrad/"
    }
  },
  {
    "bg": "Правец",
    "en": "Pravets",
    "point": [
      42.896,
      23.917
    ],
    "zoom": 12,
    "id": "pravets",
    "paths": {
      "bg": "/rayoni/pravets/",
      "en": "/en/coverage/pravets/"
    }
  },
  {
    "bg": "Мездра",
    "en": "Mezdra",
    "point": [
      43.145,
      23.713
    ],
    "zoom": 12,
    "id": "mezdra",
    "paths": {
      "bg": "/rayoni/mezdra/",
      "en": "/en/coverage/mezdra/"
    }
  },
  {
    "bg": "АМ „Хемус“",
    "en": "Hemus motorway",
    "point": [
      42.861,
      23.743
    ],
    "zoom": 11,
    "id": "hemus",
    "paths": {
      "bg": "/rayoni/hemus/",
      "en": "/en/coverage/hemus/"
    }
  }
];

// Named places extracted from the same approximate polygon as the coverage map.
export const locations = mapLocations;

export const faqs = {
  "bg": [
    [
      "Работите ли през нощта и в празнични дни?",
      "Да. Пътната помощ е на разположение 24 часа, 7 дни в седмицата, включително през почивни и празнични дни. Обадете се за текуща наличност."
    ],
    [
      "Колко струва пътната помощ?",
      "Цената зависи от мястото, разстоянието, вида на автомобила и нужната помощ. Консултацията и офертата са безплатни. Конкретната цена се уточнява по телефон преди посещението."
    ],
    [
      "Колко бързо можете да пристигнете?",
      "Времето зависи от разстоянието, пътните условия и наличността на екипа. След като ни кажете къде сте, ще обсъдим възможното време за пристигане. Експресна помощ се заявява според наличността."
    ],
    [
      "Какви автомобили транспортирате?",
      "Леки и лекотоварни автомобили, включително джипове и бусове. За нестандартни размери, тегло или състояние се обадете предварително, за да потвърдим подходящата техника."
    ],
    [
      "Може ли автомобилът да отиде в избран от мен сервиз?",
      "Да, крайната точка се уговаря с вас. Може да е сервиз, адрес или друго подходящо място. За превоз извън основния район уточняваме маршрута и цената по телефон."
    ],
    [
      "Как да ви изпратя точното си местоположение?",
      "Натиснете „Покажете локацията си“ или използвайте картата. Сайтът подготвя координати и линк към карта, които можете да копирате или изпратите като SMS. При отказан GPS въведете град, път, километър или ориентир."
    ],
    [
      "Изпраща ли се заявката автоматично?",
      "Не. Формулярът подготвя текст за SMS. Вие го изпращате от телефона си, или се обаждате с готовите детайли. Посещението и цената се потвърждават след разговор."
    ]
  ],
  "en": [
    [
      "Do you work at night and on holidays?",
      "Yes. Roadside assistance is available 24 hours a day, 7 days a week, including weekends and holidays. Call to confirm current availability."
    ],
    [
      "How much does roadside assistance cost?",
      "The price depends on your location, distance, vehicle and the assistance required. Advice and quotes are free. The specific price is agreed by phone before a visit."
    ],
    [
      "How quickly can you arrive?",
      "Timing depends on distance, road conditions and team availability. Once we know your location, we discuss a possible arrival time. Express assistance can be requested subject to availability."
    ],
    [
      "What vehicles do you transport?",
      "Passenger cars and light commercial vehicles, including SUVs and vans. For unusual dimensions, weight or condition, call in advance so we can confirm suitable equipment."
    ],
    [
      "Can you take my vehicle to my chosen workshop?",
      "Yes, the destination is agreed with you. It can be a workshop, address or another suitable place. For transport outside the main area, we discuss the route and price by phone."
    ],
    [
      "How can I send my exact location?",
      "Use “Show your location” or select a point on the map. The website prepares coordinates and a map link to copy or send by SMS. If GPS is denied, enter a town, road, kilometer or landmark."
    ],
    [
      "Is the request sent automatically?",
      "No. The form prepares an SMS message. You send it from your phone or call with the details ready. A visit and price are confirmed after speaking with us."
    ]
  ]
};

export const paths = {
  "home": {
    "bg": "/",
    "en": "/en/"
  },
  "services": {
    "bg": "/uslugi/",
    "en": "/en/services/"
  },
  "coverage": {
    "bg": "/rayoni/",
    "en": "/en/coverage/"
  },
  "about": {
    "bg": "/za-nas/",
    "en": "/en/about/"
  },
  "faq": {
    "bg": "/vuprosi/",
    "en": "/en/faq/"
  },
  "contact": {
    "bg": "/kontakti/",
    "en": "/en/contact/"
  }
};

export const homeMeta = {
  "bg": {
    "title": "Пътна помощ Ботевград 24/7 | Репатрак Бетина 97",
    "description": "Пътна помощ и репатрак 24/7 в Ботевград, Правец, Мездра и АМ Хемус. Обадете се на 0878 558 152 за безплатна оферта и уточняване на помощта."
  },
  "en": {
    "title": "24/7 Roadside Assistance Botevgrad | Betina 97 Towing",
    "description": "24/7 roadside assistance and towing in Botevgrad, Pravets, Mezdra and on the Hemus motorway. Call +359 878 558 152 for a free quote."
  }
};
