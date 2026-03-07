/* ═══════════════════════════════════════════════════
   InterioRossi — Quiz Calculator
   Steps · Price calc · Telegram lead
═══════════════════════════════════════════════════ */
'use strict';

// ─── Config ────────────────────────────────────────
const QUIZ_TG_TOKEN = ''; // set in deploy env
const QUIZ_TG_CHAT  = ''; // set in deploy env

// ─── Data ──────────────────────────────────────────
const FURNITURE_TYPES = [
  { id:'kitchen',  name:'Кухня',       desc:'Кухонные гарнитуры',              icon:'kitchen'   },
  { id:'wardrobe', name:'Шкафы',       desc:'Купе, распашные, гардеробные',    icon:'wardrobe'  },
  { id:'bathroom', name:'Ванная',      desc:'Мебель для ванной комнаты',       icon:'bathroom'  },
  { id:'living',   name:'Гостиная',    desc:'ТВ-зоны, стеллажи, комоды',      icon:'living'    },
  { id:'bedroom',  name:'Спальня',     desc:'Кровати, тумбы, столики',         icon:'bedroom'   },
  { id:'kids',     name:'Детская',     desc:'Детские комнаты под ключ',        icon:'kids'      },
  { id:'office',   name:'Кабинет',     desc:'Рабочие столы, полки, шкафы',    icon:'office'    },
  { id:'hallway',  name:'Прихожая',    desc:'Прихожие, обувницы, вешалки',    icon:'hallway'   },
  { id:'custom',   name:'Нестандарт',  desc:'Подоконники, ниши, встройка',    icon:'custom'    },
];

const KITCHEN_LAYOUTS = [
  { id:'straight',  name:'Прямая',       walls:1 },
  { id:'l_shape',   name:'Угловая',      walls:2 },
  { id:'u_shape',   name:'П-образная',   walls:3 },
  { id:'parallel',  name:'Параллельная', walls:2 },
  { id:'island',    name:'С островом',   walls:2, island:true },
];

const WARDROBE_TYPES = [
  { id:'sliding',  name:'Шкаф-купе',    desc:'Раздвижные двери'       },
  { id:'hinged',   name:'Распашной',    desc:'Классические двери'     },
  { id:'walkin',   name:'Гардеробная',  desc:'Отдельная комната'      },
  { id:'builtin',  name:'Встроенный',   desc:'В нишу / стена до стены'},
];

const BATHROOM_TYPES = [
  { id:'vanity',     name:'Тумба с раковиной', desc:'Подвесная или напольная' },
  { id:'mirror_cab', name:'Зеркальный шкаф',   desc:'С подсветкой'           },
  { id:'tall_cab',   name:'Пенал',             desc:'Высокий шкаф хранения'  },
  { id:'full_set',   name:'Комплект',          desc:'Полная меблировка'       },
];

const STYLES = [
  { id:'modern',    name:'Современный', desc:'Минимализм, чистые линии' },
  { id:'classic',   name:'Классика',    desc:'Фрезеровка, молдинги'     },
  { id:'scandi',    name:'Скандинавский',desc:'Светлое дерево, простота'},
  { id:'loft',      name:'Лофт',        desc:'Дерево, металл, фактура'  },
  { id:'neoclassic',name:'Неоклассика', desc:'Элегантность без избытка' },
  { id:'provence',  name:'Прованс',     desc:'Пастель, состаренность'   },
  { id:'artdeco',   name:'Ар-деко',     desc:'Роскошь, геометрия, золото'},
  { id:'hitech',    name:'Хай-тек',     desc:'Глянец, технологии, стекло'},
];

const BODY_MATERIALS = [
  { id:'ldsp_std',  name:'ЛДСП Стандарт', desc:'Egger/Kronospan 16мм',     coeff:1.0,  badge:null    },
  { id:'ldsp_prem', name:'ЛДСП Премиум',  desc:'Egger 22мм, влагостойкая', coeff:1.15, badge:'+15%'  },
  { id:'mdf',       name:'МДФ',           desc:'Плотный, прочный',          coeff:1.3,  badge:'+30%'  },
  { id:'plywood',   name:'Фанера берёзовая',desc:'18мм, экологичная',       coeff:1.5,  badge:'+50%'  },
];

const FACADE_MATERIALS = [
  { id:'ldsp_facade', name:'ЛДСП',         desc:'Бюджетно, практично',      coeff:1.0,  badge:null    },
  { id:'mdf_film',    name:'МДФ плёнка',   desc:'Разнообразие декоров',     coeff:1.2,  badge:'+20%'  },
  { id:'mdf_enamel',  name:'МДФ эмаль',    desc:'Любой цвет по RAL',        coeff:1.6,  badge:'+60%'  },
  { id:'mdf_veneer',  name:'МДФ шпон',     desc:'Натуральное дерево',       coeff:1.8,  badge:'+80%'  },
  { id:'acrylic',     name:'Акрил/Пластик',desc:'Глянец, суперматт',        coeff:1.5,  badge:'+50%'  },
  { id:'massiv',      name:'Массив дерева',desc:'Дуб, ясень, бук',          coeff:2.5,  badge:'+150%' },
];

const HARDWARE_LEVELS = [
  {
    id:'standard',
    name:'Стандарт',
    brand:'Boyard, GTV — надёжная фурнитура',
    coeff:1.0, badge:null,
    tags:['Петли с доводчиком','Шариковые направляющие','Стандартные ручки'],
  },
  {
    id:'pro',
    name:'Про',
    brand:'Hettich, Grass — европейское качество',
    coeff:1.4, badge:'+40%',
    tags:['Петли Hettich','Выдвижение 100%','Aventos HK','Врезные ручки'],
  },
  {
    id:'premium',
    name:'Премиум',
    brand:'Blum — лучшая мировая фурнитура',
    coeff:1.9, badge:'+90%',
    tags:['Blum Clip Top','Tandembox Antaro','Servo-Drive электро','Tip-On безручечный','Orga-Line органайзеры'],
  },
];

const COUNTERTOPS = [
  { id:'hpl',          name:'Пластик HPL',       desc:'Бюджетно, износостойко',    price:4500  },
  { id:'acrylic_stone',name:'Акриловый камень',   desc:'Бесшовные стыки',           price:18000 },
  { id:'quartz',       name:'Кварцевый агломерат',desc:'Caesarstone, Samsung',      price:28000 },
  { id:'granite',      name:'Натуральный камень', desc:'Гранит, мрамор',            price:35000 },
  { id:'compact',      name:'Компакт-плита',      desc:'Fenix, Dekton',             price:40000 },
];

const BASE_PRICES = {
  kitchen:55000, wardrobe:40000, bathroom:65000, living:35000,
  bedroom:38000, kids:36000, office:32000, hallway:28000, custom:45000,
};

// ─── Price calculator ───────────────────────────────
function calcPrice(d) {
  const dims = d.dimensions || {};
  let lm = Object.values(dims).reduce((s,v)=>s+(parseFloat(v)||0),0) / 1000;
  if (lm < 0.3) lm = 3;

  const base   = BASE_PRICES[d.furnitureType] || 40000;
  const bCoeff = (BODY_MATERIALS.find(x=>x.id===d.bodyMaterial)||{coeff:1}).coeff;
  const fCoeff = (FACADE_MATERIALS.find(x=>x.id===d.facadeMaterial)||{coeff:1}).coeff;
  const hCoeff = (HARDWARE_LEVELS.find(x=>x.id===d.hardware)||{coeff:1}).coeff;

  let total = lm * base * bCoeff * fCoeff * hCoeff;

  if (d.furnitureType==='kitchen' && d.countertop) {
    const ct = COUNTERTOPS.find(x=>x.id===d.countertop);
    if (ct) total += lm * ct.price;
  }

  return {
    standard: Math.round(total/1000)*1000,
    pro:      Math.round(total*1.25/1000)*1000,
    premium:  Math.round(total*1.6/1000)*1000,
    lm:       lm.toFixed(1),
  };
}

function fmt(n) { return n.toLocaleString('ru-RU'); }

// ─── SVG icons ─────────────────────────────────────
const ICONS = {
  kitchen: `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="8" width="28" height="20" rx="2"/><line x1="4" y1="16" x2="32" y2="16"/><circle cx="11" cy="12" r="2"/><circle cx="18" cy="12" r="2"/><circle cx="25" cy="12" r="1.5"/><line x1="10" y1="22" x2="10" y2="26"/><line x1="18" y1="22" x2="18" y2="26"/><line x1="26" y1="22" x2="26" y2="26"/></svg>`,
  wardrobe:`<svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="28" height="28" rx="2"/><line x1="18" y1="4" x2="18" y2="32"/><circle cx="14" cy="18" r="1.5"/><circle cx="22" cy="18" r="1.5"/><line x1="4" y1="30" x2="8" y2="32"/><line x1="32" y1="30" x2="28" y2="32"/></svg>`,
  bathroom:`<svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="14" width="28" height="14" rx="3"/><path d="M8 14V9a4 4 0 0 1 4-4h2"/><path d="M4 28v3"/><path d="M32 28v3"/><path d="M12 22h12"/></svg>`,
  living:  `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="16" width="30" height="12" rx="3"/><path d="M6 16v-4a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v4"/><path d="M3 22h30"/><rect x="10" y="4" width="16" height="10" rx="1"/><path d="M6 28v4"/><path d="M30 28v4"/></svg>`,
  bedroom: `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="18" width="30" height="12" rx="2"/><path d="M3 18v-4a2 2 0 0 1 2-2h26a2 2 0 0 1 2 2v4"/><rect x="8" y="6" width="8" height="6" rx="2"/><rect x="20" y="6" width="8" height="6" rx="2"/><path d="M3 30v2"/><path d="M33 30v2"/></svg>`,
  kids:    `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 4l2.5 7.5H28l-6.5 4.7 2.5 7.5L18 19l-6 4.7 2.5-7.5L8 11.5h7.5z"/><rect x="8" y="26" width="20" height="6" rx="2"/></svg>`,
  office:  `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="22" width="30" height="4" rx="1"/><rect x="6" y="10" width="12" height="12" rx="1"/><rect x="21" y="6" width="11" height="16" rx="1"/><path d="M12 26v6"/><path d="M24 26v6"/></svg>`,
  hallway: `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 4v28"/><path d="M10 10l8-6 8 6"/><circle cx="10" cy="14" r="1.5"/><circle cx="18" cy="16" r="1.5"/><circle cx="26" cy="12" r="1.5"/><rect x="6" y="28" width="24" height="4" rx="1"/></svg>`,
  custom:  `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4H6a2 2 0 0 0-2 2v24a2 2 0 0 0 2 2h24a2 2 0 0 0 2-2V20"/><path d="M20 4l12 12-8 2-2 8z"/><path d="M24 8l4 4"/></svg>`,
};

// Kitchen layout SVGs
function layoutSvg(id) {
  const s = `stroke="#c8ff2e" stroke-width="2.5" stroke-linecap="round"`;
  const g = `stroke="rgba(255,255,255,.2)" stroke-width="1.5" fill="none"`;
  const m = { // map id → svg content
    straight: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none"><rect x="8" y="26" width="48" height="12" rx="2" ${g}/><rect x="8" y="26" width="48" height="8" ${s} fill="rgba(200,255,46,.06)" rx="1"/><text x="32" y="23" fill="rgba(255,255,255,.3)" font-size="9" text-anchor="middle" font-family="sans-serif">A</text></svg>`,
    l_shape:  `<svg width="64" height="64" viewBox="0 0 64 64" fill="none"><rect x="8" y="8" width="10" height="40" rx="1" ${s} fill="rgba(200,255,46,.06)"/><rect x="8" y="42" width="48" height="10" rx="1" ${s} fill="rgba(200,255,46,.06)"/><text x="13" y="28" fill="rgba(255,255,255,.3)" font-size="8" text-anchor="middle" font-family="sans-serif">A</text><text x="32" y="58" fill="rgba(255,255,255,.3)" font-size="8" text-anchor="middle" font-family="sans-serif">B</text></svg>`,
    u_shape:  `<svg width="64" height="64" viewBox="0 0 64 64" fill="none"><rect x="8" y="8" width="10" height="40" rx="1" ${s} fill="rgba(200,255,46,.06)"/><rect x="46" y="8" width="10" height="40" rx="1" ${s} fill="rgba(200,255,46,.06)"/><rect x="8" y="46" width="48" height="10" rx="1" ${s} fill="rgba(200,255,46,.06)"/><text x="13" y="28" fill="rgba(255,255,255,.3)" font-size="8" text-anchor="middle" font-family="sans-serif">A</text><text x="32" y="62" fill="rgba(255,255,255,.3)" font-size="8" text-anchor="middle" font-family="sans-serif">B</text><text x="51" y="28" fill="rgba(255,255,255,.3)" font-size="8" text-anchor="middle" font-family="sans-serif">C</text></svg>`,
    parallel: `<svg width="64" height="64" viewBox="0 0 64 64" fill="none"><rect x="8" y="12" width="48" height="8" rx="1" ${s} fill="rgba(200,255,46,.06)"/><rect x="8" y="44" width="48" height="8" rx="1" ${s} fill="rgba(200,255,46,.06)"/><text x="32" y="10" fill="rgba(255,255,255,.3)" font-size="8" text-anchor="middle" font-family="sans-serif">A</text><text x="32" y="60" fill="rgba(255,255,255,.3)" font-size="8" text-anchor="middle" font-family="sans-serif">B</text></svg>`,
    island:   `<svg width="64" height="64" viewBox="0 0 64 64" fill="none"><rect x="8" y="8" width="10" height="36" rx="1" ${s} fill="rgba(200,255,46,.06)"/><rect x="8" y="36" width="48" height="10" rx="1" ${s} fill="rgba(200,255,46,.06)"/><rect x="26" y="14" width="24" height="12" rx="1" stroke="rgba(200,255,46,.4)" stroke-width="1.5" fill="rgba(200,255,46,.04)"/><text x="13" y="24" fill="rgba(255,255,255,.3)" font-size="8" text-anchor="middle" font-family="sans-serif">A</text><text x="32" y="52" fill="rgba(255,255,255,.3)" font-size="8" text-anchor="middle" font-family="sans-serif">B</text></svg>`,
  };
  return m[id] || '';
}

// ─── Dimension fields helper ────────────────────────
function getDimFields(type, kitchenLayout) {
  if (type === 'kitchen') {
    switch(kitchenLayout) {
      case 'straight':  return [{key:'wallA', label:'Длина стены A, мм'}];
      case 'l_shape':   return [{key:'wallA', label:'Стена A (длинная), мм'},{key:'wallB', label:'Стена B (короткая), мм'}];
      case 'u_shape':   return [{key:'wallA', label:'Стена A (левая), мм'},{key:'wallB', label:'Стена B (центр), мм'},{key:'wallC', label:'Стена C (правая), мм'}];
      case 'parallel':  return [{key:'wallA', label:'Стена A, мм'},{key:'wallB', label:'Стена B, мм'}];
      case 'island':    return [{key:'wallA', label:'Стена A, мм'},{key:'wallB', label:'Стена B, мм'},{key:'island', label:'Длина острова, мм'}];
      default:          return [{key:'wallA', label:'Длина стены A, мм'}];
    }
  }
  if (type === 'wardrobe') {
    return [{key:'width', label:'Ширина, мм'},{key:'height', label:'Высота, мм'},{key:'depth', label:'Глубина, мм'}];
  }
  if (type === 'bathroom') return [{key:'wallA', label:'Длина стены, мм'}];
  return [{key:'wallA', label:'Длина стены / зоны, мм'}];
}

// ─── Build step sequence ────────────────────────────
function buildSteps(data) {
  const type = data.furnitureType;
  const steps = ['furnitureType'];
  if (type === 'kitchen')  steps.push('kitchenLayout');
  if (type === 'wardrobe') steps.push('wardrobeType');
  if (type === 'bathroom') steps.push('bathroomType');
  steps.push('dimensions','style','bodyMaterial','facadeMaterial','hardware');
  if (type === 'kitchen')  steps.push('countertop');
  steps.push('contact','result');
  return steps;
}

// ─── State ──────────────────────────────────────────
let quizState = {
  open: false,
  data: {},
  steps: ['furnitureType','dimensions','style','bodyMaterial','facadeMaterial','hardware','contact','result'],
  currentStep: 0,
  direction: 'forward',
};

function setState(patch) {
  Object.assign(quizState, patch);
  renderQuiz();
}

function setField(key, value) {
  quizState.data = { ...quizState.data, [key]: value };
  quizState.steps = buildSteps(quizState.data);
  renderQuiz();
}

function setDimField(key, value) {
  const dims = { ...(quizState.data.dimensions || {}), [key]: value };
  quizState.data = { ...quizState.data, dimensions: dims };
  renderFooter();
}

// ─── Open / close ───────────────────────────────────
function quizOpen() {
  quizState = {
    open: true, data: {}, direction: 'forward', currentStep: 0,
    steps: ['furnitureType','dimensions','style','bodyMaterial','facadeMaterial','hardware','contact','result'],
  };
  document.getElementById('quizOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  renderQuiz();
}

function quizClose() {
  document.getElementById('quizOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

// ─── Navigation ─────────────────────────────────────
function quizNext() {
  const cur = quizState.currentStep;
  if (cur >= quizState.steps.length - 1) return;
  quizState.direction = 'forward';
  quizState.currentStep = cur + 1;
  renderQuiz();
}

function quizBack() {
  const cur = quizState.currentStep;
  if (cur <= 0) return;
  quizState.direction = 'back';
  quizState.currentStep = cur - 1;
  renderQuiz();
}

function selectCard(field, value) {
  setField(field, value);
  setTimeout(() => {
    quizState.direction = 'forward';
    quizState.currentStep = Math.min(quizState.currentStep + 1, quizState.steps.length - 1);
    renderQuiz();
  }, 280);
}

// ─── Validate current step ──────────────────────────
function canProceed() {
  const step = quizState.steps[quizState.currentStep];
  const d = quizState.data;
  if (step === 'furnitureType')   return !!d.furnitureType;
  if (step === 'kitchenLayout')   return !!d.kitchenLayout;
  if (step === 'wardrobeType')    return !!d.wardrobeType;
  if (step === 'bathroomType')    return !!d.bathroomType;
  if (step === 'dimensions') {
    const dims = d.dimensions || {};
    return Object.values(dims).some(v => parseFloat(v) > 0);
  }
  if (step === 'style')           return !!d.style;
  if (step === 'bodyMaterial')    return !!d.bodyMaterial;
  if (step === 'facadeMaterial')  return !!d.facadeMaterial;
  if (step === 'hardware')        return !!d.hardware;
  if (step === 'countertop')      return !!d.countertop;
  if (step === 'contact') {
    const phone = (d.phone||'').replace(/\D/g,'');
    return !!(d.name && d.name.trim() && phone.length===11 && d.agree);
  }
  return true;
}

// ─── Render helpers ─────────────────────────────────
function renderQuiz() {
  renderProgress();
  renderDots();
  renderHead();
  renderBody();
  renderFooter();
}

function renderProgress() {
  const total = quizState.steps.length;
  const cur   = quizState.currentStep;
  const pct   = Math.round((cur / (total - 1)) * 100);
  const el    = document.getElementById('quizProgressFill');
  if (el) el.style.width = pct + '%';
}

function renderDots() {
  const wrap  = document.getElementById('quizDots');
  if (!wrap) return;
  const total = quizState.steps.length;
  const cur   = quizState.currentStep;
  wrap.innerHTML = '';
  for (let i = 0; i < total; i++) {
    const d = document.createElement('div');
    d.className = 'quiz-dot' + (i === cur ? ' active' : i < cur ? ' done' : '');
    wrap.appendChild(d);
  }
}

const STEP_META = {
  furnitureType:   { label:'Шаг 1', title:'Что будем делать?',              sub:'Выберите тип мебели' },
  kitchenLayout:   { label:'Шаг 2', title:'Планировка кухни',               sub:'Выберите конфигурацию' },
  wardrobeType:    { label:'Шаг 2', title:'Тип шкафа',                      sub:'Выберите вариант' },
  bathroomType:    { label:'Шаг 2', title:'Тип мебели для ванной',          sub:'Выберите вариант' },
  dimensions:      { label:'Размеры', title:'Укажите размеры',              sub:'Это основа для расчёта' },
  style:           { label:'Стиль', title:'Стиль интерьера',                sub:'Под какой стиль проектируем?' },
  bodyMaterial:    { label:'Корпус', title:'Материал корпуса',              sub:'Влияет на прочность и цену' },
  facadeMaterial:  { label:'Фасады', title:'Материал фасадов',              sub:'Это лицо вашей мебели' },
  hardware:        { label:'Фурнитура', title:'Уровень фурнитуры',          sub:'Петли, направляющие, подъёмники' },
  countertop:      { label:'Столешница', title:'Материал столешницы',       sub:'Только для кухни' },
  contact:         { label:'Почти готово', title:'Куда отправить расчёт?',  sub:'Свяжемся в течение 2 часов' },
  result:          { label:'Готово!', title:'Ваш расчёт',                   sub:'' },
};

function renderHead() {
  const step = quizState.steps[quizState.currentStep];
  const meta = STEP_META[step] || {};
  const labelEl = document.getElementById('quizStepLabel');
  const titleEl = document.getElementById('quizStepTitle');
  const subEl   = document.getElementById('quizStepSub');
  if (labelEl) labelEl.textContent = meta.label || '';
  if (titleEl) titleEl.textContent = meta.title || '';
  if (subEl)   subEl.textContent   = meta.sub || '';
}

function renderBody() {
  const bodyEl = document.getElementById('quizBody');
  if (!bodyEl) return;
  const step = quizState.steps[quizState.currentStep];
  const d    = quizState.data;
  const dir  = quizState.direction;

  const inner = document.createElement('div');
  inner.className = 'quiz-body-inner' + (dir === 'back' ? ' slide-back' : '');

  if (step === 'furnitureType')   inner.innerHTML = renderFurnitureType(d);
  if (step === 'kitchenLayout')   inner.innerHTML = renderKitchenLayout(d);
  if (step === 'wardrobeType')    inner.innerHTML = renderCardList('wardrobeType', WARDROBE_TYPES, d.wardrobeType, 'cols-2');
  if (step === 'bathroomType')    inner.innerHTML = renderCardList('bathroomType', BATHROOM_TYPES, d.bathroomType, 'cols-2');
  if (step === 'dimensions')      inner.innerHTML = renderDimensions(d);
  if (step === 'style')           inner.innerHTML = renderCardList('style', STYLES, d.style, 'cols-4');
  if (step === 'bodyMaterial')    inner.innerHTML = renderMaterialCards('bodyMaterial', BODY_MATERIALS, d.bodyMaterial);
  if (step === 'facadeMaterial')  inner.innerHTML = renderMaterialCards('facadeMaterial', FACADE_MATERIALS, d.facadeMaterial);
  if (step === 'hardware')        inner.innerHTML = renderHardware(d);
  if (step === 'countertop')      inner.innerHTML = renderCountertop(d);
  if (step === 'contact')         inner.innerHTML = renderContact(d);
  if (step === 'result')          inner.innerHTML = renderLoaderThenResult();

  bodyEl.innerHTML = '';
  bodyEl.appendChild(inner);

  // Bind dynamic events
  bindBodyEvents(step);
}

// ─── Step renderers ─────────────────────────────────
function renderFurnitureType(d) {
  return `<div class="quiz-cards">${FURNITURE_TYPES.map(t=>`
    <div class="quiz-card${d.furnitureType===t.id?' selected':''}" data-action="select" data-field="furnitureType" data-value="${t.id}">
      <div class="quiz-card-check"></div>
      <div class="quiz-card-icon">${ICONS[t.icon]||''}</div>
      <div class="quiz-card-name">${t.name}</div>
      <div class="quiz-card-desc">${t.desc}</div>
    </div>`).join('')}</div>`;
}

function renderKitchenLayout(d) {
  return `<div class="quiz-layout-cards">${KITCHEN_LAYOUTS.map(l=>`
    <div class="quiz-layout-card${d.kitchenLayout===l.id?' selected':''}" data-action="select" data-field="kitchenLayout" data-value="${l.id}">
      <div class="quiz-card-check"></div>
      ${layoutSvg(l.id)}
      <div class="quiz-layout-name">${l.name}</div>
    </div>`).join('')}</div>`;
}

function renderCardList(field, items, selected, cols='') {
  return `<div class="quiz-cards${cols?' '+cols:''}">${items.map(t=>`
    <div class="quiz-card${selected===t.id?' selected':''}" data-action="select" data-field="${field}" data-value="${t.id}">
      <div class="quiz-card-check"></div>
      <div class="quiz-card-name">${t.name}</div>
      ${t.desc?`<div class="quiz-card-desc">${t.desc}</div>`:''}
    </div>`).join('')}</div>`;
}

function renderMaterialCards(field, items, selected) {
  return `<div class="quiz-cards cols-2">${items.map(t=>`
    <div class="quiz-card${selected===t.id?' selected':''}" data-action="select" data-field="${field}" data-value="${t.id}">
      ${t.badge?`<div class="quiz-badge">${t.badge}</div>`:''}
      <div class="quiz-card-check"></div>
      <div class="quiz-card-name">${t.name}</div>
      <div class="quiz-card-desc">${t.desc}</div>
    </div>`).join('')}</div>`;
}

function renderHardware(d) {
  return `<div class="quiz-hw-cards">${HARDWARE_LEVELS.map(h=>`
    <div class="quiz-hw-card${d.hardware===h.id?' selected':''}" data-action="select" data-field="hardware" data-value="${h.id}">
      <div class="quiz-card-check"></div>
      <div class="quiz-hw-main">
        <div class="quiz-hw-name">${h.name}</div>
        <div class="quiz-hw-brand">${h.brand}</div>
        <div class="quiz-hw-tags">${h.tags.map(tag=>`<span class="quiz-hw-tag">${tag}</span>`).join('')}</div>
      </div>
      ${h.badge?`<div class="quiz-hw-badge">${h.badge}</div>`:''}
    </div>`).join('')}</div>`;
}

function renderCountertop(d) {
  return `<div class="quiz-cards cols-2">${COUNTERTOPS.map(t=>`
    <div class="quiz-card${d.countertop===t.id?' selected':''}" data-action="select" data-field="countertop" data-value="${t.id}">
      <div class="quiz-badge">от ${fmt(t.price)}₽/м</div>
      <div class="quiz-card-check"></div>
      <div class="quiz-card-name">${t.name}</div>
      <div class="quiz-card-desc">${t.desc}</div>
    </div>`).join('')}</div>`;
}

function renderDimensions(d) {
  const fields = getDimFields(d.furnitureType, d.kitchenLayout);
  const dims = d.dimensions || {};
  const quickVals = [1500,2000,2500,3000,3500,4000];

  const schemaHtml = d.furnitureType==='kitchen' && d.kitchenLayout
    ? `<div class="quiz-dims-schema">${layoutSvg(d.kitchenLayout)}</div>` : '';

  const fieldsHtml = fields.map(f=>{
    const val = dims[f.key]||'';
    const tooSmall = val && parseFloat(val) < 300;
    const tooBig   = val && parseFloat(val) > 15000;
    return `
      <div>
        <div class="quiz-dim-label">${f.label}</div>
        <div class="quiz-dim-wrap${tooSmall||tooBig?' warn':''}">
          <input class="quiz-dim-input" type="number" inputmode="numeric"
            placeholder="напр. 2400" value="${val}"
            data-dim-key="${f.key}" min="0" max="15000">
          <span class="quiz-dim-suffix">мм</span>
        </div>
        <div class="quiz-dim-warn${tooSmall?' show':''}">Слишком маленькое значение, проверьте</div>
        <div class="quiz-dim-warn${tooBig?' show':''}">Проверьте — это ${val?(parseFloat(val)/1000).toFixed(1):0} метра</div>
        <div class="quiz-dim-quick">${quickVals.map(v=>`<button class="quiz-dim-quick-btn" data-dim-key="${f.key}" data-dim-val="${v}" type="button">${v}</button>`).join('')}</div>
      </div>`;
  }).join('');

  return `
    ${schemaHtml}
    <div class="quiz-dims">${fieldsHtml}</div>
    <div class="quiz-dim-hint">
      <span class="quiz-dim-hint-icon">💡</span>
      Не знаете точных размеров? Укажите примерные — уточним на замере
    </div>`;
}

function renderContact(d) {
  return `
    <div class="quiz-contact-intro">
      Оставьте контакт — подготовим точный расчёт и свяжемся в течение 2 часов
    </div>
    <div class="quiz-fields">
      <div>
        <div class="quiz-field-label">Ваше имя <span class="req">*</span></div>
        <input class="quiz-input${d._nameErr?' error':''}" id="quizName" type="text" placeholder="Как вас зовут?" value="${d.name||''}">
      </div>
      <div>
        <div class="quiz-field-label">Телефон <span class="req">*</span></div>
        <input class="quiz-input${d._phoneErr?' error':''}" id="quizPhone" type="tel" placeholder="+7 (___) ___-__-__" value="${d.phone||''}" maxlength="18">
      </div>
      <div>
        <div class="quiz-field-label">Комментарий</div>
        <textarea class="quiz-textarea" id="quizComment" placeholder="Есть пожелания или ссылка на проект дизайнера?">${d.comment||''}</textarea>
      </div>
      <label class="quiz-checkbox-wrap">
        <input class="quiz-checkbox-inp" id="quizAgree" type="checkbox" ${d.agree?'checked':''}>
        <span class="quiz-checkbox-text">Согласен на обработку персональных данных</span>
      </label>
    </div>`;
}

function renderLoaderThenResult() {
  // Show loader, then swap to result after 2s
  setTimeout(() => {
    const bodyEl = document.getElementById('quizBody');
    if (!bodyEl) return;
    const inner = bodyEl.querySelector('.quiz-body-inner');
    if (inner) {
      inner.innerHTML = buildResultHtml();
      bindResultEvents();
    }
    // Show submit button in footer
    renderFooter();
  }, 2000);

  return `<div class="quiz-loader">
    <div class="quiz-loader-ring"></div>
    <div class="quiz-loader-text">Считаем стоимость вашей мебели...</div>
    <div class="quiz-loader-sub">Анализируем параметры и материалы</div>
  </div>`;
}

function buildResultHtml() {
  const d = quizState.data;
  const p = calcPrice(d);

  const typeLabel = (FURNITURE_TYPES.find(x=>x.id===d.furnitureType)||{name:d.furnitureType}).name;
  const styleLabel = (STYLES.find(x=>x.id===d.style)||{name:d.style||'—'}).name;
  const bodyLabel = (BODY_MATERIALS.find(x=>x.id===d.bodyMaterial)||{name:d.bodyMaterial||'—'}).name;
  const facLabel  = (FACADE_MATERIALS.find(x=>x.id===d.facadeMaterial)||{name:d.facadeMaterial||'—'}).name;
  const hwLabel   = (HARDWARE_LEVELS.find(x=>x.id===d.hardware)||{name:d.hardware||'—'}).name;
  const dims = d.dimensions || {};
  const dimsStr = Object.entries(dims).map(([k,v])=>`${k}: ${v} мм`).join(', ');

  return `<div class="quiz-result">
    <div class="quiz-result-icon">✓</div>

    <div class="quiz-prices">
      <div class="quiz-price-card">
        <div class="quiz-price-tier">Стандарт</div>
        <div class="quiz-price-val">от ${fmt(p.standard)}<span> ₽</span></div>
        <div class="quiz-price-sub">базовая комплектация</div>
      </div>
      <div class="quiz-price-card rec">
        <div class="quiz-price-rec-badge">Рекомендуем</div>
        <div class="quiz-price-tier">Про</div>
        <div class="quiz-price-val">от ${fmt(p.pro)}<span> ₽</span></div>
        <div class="quiz-price-sub">оптимальное решение</div>
      </div>
      <div class="quiz-price-card">
        <div class="quiz-price-tier">Премиум</div>
        <div class="quiz-price-val">от ${fmt(p.premium)}<span> ₽</span></div>
        <div class="quiz-price-sub">максимальное качество</div>
      </div>
    </div>

    <div class="quiz-summary">
      <div class="quiz-summary-row"><span class="quiz-summary-key">Тип мебели</span><span class="quiz-summary-val">${typeLabel}</span></div>
      <div class="quiz-summary-row"><span class="quiz-summary-key">Погонных метров</span><span class="quiz-summary-val">${p.lm} п.м.</span></div>
      ${dimsStr?`<div class="quiz-summary-row"><span class="quiz-summary-key">Размеры</span><span class="quiz-summary-val">${dimsStr}</span></div>`:''}
      <div class="quiz-summary-row"><span class="quiz-summary-key">Стиль</span><span class="quiz-summary-val">${styleLabel}</span></div>
      <div class="quiz-summary-row"><span class="quiz-summary-key">Корпус</span><span class="quiz-summary-val">${bodyLabel}</span></div>
      <div class="quiz-summary-row"><span class="quiz-summary-key">Фасады</span><span class="quiz-summary-val">${facLabel}</span></div>
      <div class="quiz-summary-row"><span class="quiz-summary-key">Фурнитура</span><span class="quiz-summary-val">${hwLabel}</span></div>
    </div>

    <div class="quiz-result-notes">
      <div class="quiz-result-note">Это ориентировочная стоимость. Точная — после замера и ТЗ</div>
      <div class="quiz-result-note">Замер — 3 500 ₽ (засчитывается при заказе)</div>
      <div class="quiz-result-note">Оплата: 70% предоплата, 30% при доставке</div>
      <div class="quiz-result-note">Гарантия — 3 года</div>
    </div>

    <div class="quiz-result-ctas">
      <button class="quiz-btn-primary" id="quizCallBtn">
        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.18 19.79 19.79 0 012 3.22 2 2 0 014 1.02h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
        Записаться на замер
      </button>
      <a href="https://wa.me/79991234567" target="_blank" class="quiz-btn-secondary">
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        Написать в WhatsApp
      </a>
    </div>

    <button class="quiz-result-restart" id="quizRestart">↺ Начать заново</button>
    <div class="quiz-result-disclaimer">* Расчёт носит ознакомительный характер и не является офертой</div>
  </div>`;
}

function renderFooter() {
  const step    = quizState.steps[quizState.currentStep];
  const cur     = quizState.currentStep;
  const isFirst = cur === 0;
  const isResult= step === 'result';
  const isContact=step === 'contact';
  const isLoader= isResult && !document.querySelector('.quiz-result');
  const ok      = canProceed();

  const backBtn = document.getElementById('quizBtnBack');
  const nextBtn = document.getElementById('quizBtnNext');
  const priceLive = document.getElementById('quizPriceLive');

  if (backBtn) {
    backBtn.disabled = isFirst;
    backBtn.style.visibility = (isFirst || isResult) ? 'hidden' : 'visible';
  }

  if (nextBtn) {
    if (isResult || isLoader) {
      nextBtn.style.display = 'none';
    } else if (isContact) {
      nextBtn.style.display = '';
      nextBtn.textContent   = 'Получить расчёт →';
      nextBtn.disabled = !ok;
    } else {
      nextBtn.style.display = '';
      nextBtn.textContent   = 'Далее →';
      nextBtn.disabled = !ok;
    }
  }

  // Live price preview
  const d = quizState.data;
  if (priceLive && d.furnitureType && d.bodyMaterial && d.facadeMaterial && d.hardware) {
    const p = calcPrice(d);
    priceLive.innerHTML = `от <strong>${fmt(p.standard)} ₽</strong>`;
  } else if (priceLive) {
    priceLive.innerHTML = '';
  }
}

// ─── Bind events ────────────────────────────────────
function bindBodyEvents(step) {
  const body = document.getElementById('quizBody');
  if (!body) return;

  // Selection cards
  body.querySelectorAll('[data-action="select"]').forEach(el => {
    el.addEventListener('click', () => {
      const field = el.dataset.field;
      const value = el.dataset.value;
      selectCard(field, value);
    });
  });

  // Dimension inputs
  body.querySelectorAll('.quiz-dim-input').forEach(inp => {
    inp.addEventListener('input', () => {
      setDimField(inp.dataset.dimKey, inp.value);
    });
  });

  // Quick-select buttons
  body.querySelectorAll('.quiz-dim-quick-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.dimKey;
      const val = btn.dataset.dimVal;
      const inp = body.querySelector(`.quiz-dim-input[data-dim-key="${key}"]`);
      if (inp) { inp.value = val; }
      setDimField(key, val);
    });
  });

  // Contact fields
  if (step === 'contact') {
    const nameInp  = document.getElementById('quizName');
    const phoneInp = document.getElementById('quizPhone');
    const comment  = document.getElementById('quizComment');
    const agree    = document.getElementById('quizAgree');

    if (nameInp) nameInp.addEventListener('input', () => {
      quizState.data.name = nameInp.value;
      renderFooter();
    });
    if (phoneInp) phoneInp.addEventListener('input', () => {
      quizState.data.phone = maskPhone(phoneInp.value);
      phoneInp.value = quizState.data.phone;
      renderFooter();
    });
    if (comment) comment.addEventListener('input', () => {
      quizState.data.comment = comment.value;
    });
    if (agree) agree.addEventListener('change', () => {
      quizState.data.agree = agree.checked;
      renderFooter();
    });
  }
}

function bindResultEvents() {
  const callBtn   = document.getElementById('quizCallBtn');
  const restartBtn= document.getElementById('quizRestart');
  if (callBtn)    callBtn.addEventListener('click', () => { quizClose(); document.querySelector('#contact')?.scrollIntoView({behavior:'smooth'}); });
  if (restartBtn) restartBtn.addEventListener('click', () => quizOpen());
}

// ─── Phone mask ─────────────────────────────────────
function maskPhone(val) {
  let d = val.replace(/\D/g,'');
  if (d.startsWith('8')) d = '7' + d.slice(1);
  if (!d.startsWith('7')) d = '7' + d;
  d = d.slice(0,11);
  let r = '+7';
  if (d.length > 1) r += ' (' + d.slice(1,4);
  if (d.length >= 4) r += ') ' + d.slice(4,7);
  if (d.length >= 7) r += '-' + d.slice(7,9);
  if (d.length >= 9) r += '-' + d.slice(9,11);
  return r;
}

// ─── Send lead to Telegram ──────────────────────────
async function sendLead() {
  if (!QUIZ_TG_TOKEN || !QUIZ_TG_CHAT) {
    console.log('[Quiz lead]', quizState.data, calcPrice(quizState.data));
    return true;
  }
  const d = quizState.data;
  const p = calcPrice(d);
  const typeLabel = (FURNITURE_TYPES.find(x=>x.id===d.furnitureType)||{name:d.furnitureType}).name;

  const text = [
    '🔔 Новая заявка с квиза InterioRossi',
    '',
    `👤 ${d.name}`,
    `📞 ${d.phone}`,
    `💬 ${d.comment||'—'}`,
    '',
    `🪑 Тип: ${typeLabel}`,
    `📐 Погонных метров: ${p.lm}`,
    `🎨 Стиль: ${(STYLES.find(x=>x.id===d.style)||{name:'—'}).name}`,
    `📦 Корпус: ${(BODY_MATERIALS.find(x=>x.id===d.bodyMaterial)||{name:'—'}).name}`,
    `🚪 Фасады: ${(FACADE_MATERIALS.find(x=>x.id===d.facadeMaterial)||{name:'—'}).name}`,
    `🔩 Фурнитура: ${(HARDWARE_LEVELS.find(x=>x.id===d.hardware)||{name:'—'}).name}`,
    '',
    `💰 Стандарт: от ${fmt(p.standard)} ₽`,
    `💰 Про: от ${fmt(p.pro)} ₽`,
    `💰 Премиум: от ${fmt(p.premium)} ₽`,
    '',
    `🔗 ${window.location.href}`,
  ].join('\n');

  try {
    await fetch(`https://api.telegram.org/bot${QUIZ_TG_TOKEN}/sendMessage`, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ chat_id: QUIZ_TG_CHAT, text }),
    });
    return true;
  } catch(e) {
    console.error('Telegram send error', e);
    return false;
  }
}

// ─── Submit contact step ────────────────────────────
async function submitContact() {
  const btn = document.getElementById('quizBtnNext');
  if (btn) { btn.disabled = true; btn.textContent = 'Отправляем...'; }
  await sendLead();
  if (btn) { btn.disabled = false; }
  quizState.direction = 'forward';
  quizState.currentStep = quizState.steps.indexOf('result');
  renderQuiz();
}

// ─── Sticky bar ─────────────────────────────────────
function initStickyBar() {
  const bar = document.getElementById('quizStickyBar');
  if (!bar) return;
  const show = () => bar.classList.toggle('visible', window.scrollY > 400);
  show();
  window.addEventListener('scroll', show, { passive:true });
}

// ─── Init ───────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const overlay  = document.getElementById('quizOverlay');
  const closeBtn = document.getElementById('quizClose');
  const backBtn  = document.getElementById('quizBtnBack');
  const nextBtn  = document.getElementById('quizBtnNext');

  if (!overlay) return;

  // Close handlers
  overlay.addEventListener('click', e => { if (e.target === overlay) quizClose(); });
  closeBtn?.addEventListener('click', quizClose);
  document.addEventListener('keydown', e => { if (e.key==='Escape') quizClose(); });

  // Navigation
  backBtn?.addEventListener('click', quizBack);
  nextBtn?.addEventListener('click', () => {
    const step = quizState.steps[quizState.currentStep];
    if (step === 'contact') submitContact();
    else quizNext();
  });

  // All "open quiz" triggers
  document.querySelectorAll('[data-quiz-open]').forEach(el => {
    el.addEventListener('click', e => { e.preventDefault(); quizOpen(); });
  });

  initStickyBar();
});
