const InfoName = {
  name: "personalName",
  type: "text",
  question: `Пожалуйста, представьтесь:`
};

const InfoAge = {
  name: "personalAge",
  type: "radio",
  question: `Укажите ваш возраст:`,
  options: ["до 18", "18-25", "25-35", "35-45", "45+"]
};

const SkincareType = {
  name: "skincareType",
  type: "radio",
  question: `Какой у вас тип кожи?`,
  options: [
    "Сухая",
    "Чувствительная",
    "Нормальная",
    "Комбинированная",
    "Жирная",
    "Добавить свой вариант"
  ]
};
const SkincareProducts = {
  name: "skincareProducts",
  type: "text",
  question: `Какими уходовыми средствами вы пользуетесь?`
};
const SkincareCleanser = {
  name: "skincareCleanser",
  type: "text",
  question: `Какими средствами вы очищаете кожу от макияжа?`
};

////

const FoundationBase = {
  name: "foundationBase",
  type: "radio",
  question: `Используете ли вы базу до макияжа?`,
  options: ["Да", "Нет"]
};

const Foundation = {
  name: "foundationCream",
  type: "radio",
  question: `Используете ли вы тональный крем?`,
  options: ["Да", "Нет"]
};

const FoundationPreference = {
  type: "test",
  name: "foundationCream",
  yes: {
    name: "foundationPreference",
    type: "checkbox",
    question: `Какое тональное средство вы предпочитаете?`,
    options: ["легкое", "среднее", "плотное", "Добавить свой вариант"]
  },
  no: {
    name: "foundationNo",
    type: "text",
    question: `Расскажите, пожалуйста, почему`
  }
};

///

const Concealer = {
  name: "concealerUsage",
  type: "radio",
  question: `Используете ли вы консилер?`,
  options: ["Да", "Нет"]
};

const ConcealerUsage = {
  type: "test",
  name: "concealerUsage",
  no: {
    name: "noConcealer",
    type: "text",
    question: `Расскажите, пожалуйста, почему?`
  },
  yes: {}
};

///

const Powder = {
  name: "powder",
  type: "radio",
  question: `Используете ли вы пудру?`,
  options: ["Да", "Нет"]
};
const PowderUsage = {
  type: "test",
  name: "powder",
  no: {
    name: "noPowder",
    type: "text",
    question: `Расскажите, пожалуйста, почему?`
  },
  yes: {
    name: "powderPreference",
    type: "checkbox",
    question: `Какую пудру вы используете?`,
    options: ["компактная", "рассыпчатая", "Добавить свой вариант"]
  }
};

const Blush = {
  name: "blush",
  type: "radio",
  question: `Используете ли вы румяна?`,
  options: ["Да", "Нет"]
};

const BlushUsage = {
  type: "test",
  name: "blush",
  no: {
    name: "noBlush",
    type: "text",
    question: `Расскажите, пожалуйста, почему?`
  },
  yes: {
    name: "blushPreference",
    type: "checkbox",
    question: `Какие румяна вам нравятся?`,
    options: ["кремовые", "сухие", "Добавить свой вариант"]
  }
};

const Contour = {
  name: "contour",
  type: "radio",
  question: `Используете ли вы средства для контурирования лица?`,
  options: ["Да", "Нет"]
};

const ContourUsage = {
  type: "test",
  name: "contour",
  no: {
    name: "noContour",
    type: "text",
    question: `Расскажите, пожалуйста, почему?`
  },
  yes: {
    name: "contourPreference",
    type: "text",
    question: `Какими контурирующими средствами вы пользуетесь?`
  }
};

const Lipstick = {
  name: "lipstick",
  type: "radio",
  question: `Какую предпочитаете помаду?`,
  options: [
    "Яркие",
    "По случаю",
    "Всегда нюдовые оттенки",
    "Не использую помаду"
  ]
};

const Highlighter = {
  name: "highlighter",
  type: "radio",
  question: `Используете ли вы хайлайтер?`,
  options: ["Да", "Нет"]
};

const HighlighterUsage = {
  type: "test",
  name: "highlighter",
  no: {
    name: "noHighlighter",
    type: "text",
    question: `Расскажите, пожалуйста, почему?`
  },
  yes: {
    name: "highlighterPreference",
    type: "checkbox",
    question: `Какой хайлайтер вы любите?`,
    options: ["Сухой", "Кремовый", "Добавить свой вариант"]
  }
};

const BrowsPreference = {
  name: "browsPreference",
  type: "checkbox",
  question: `Какие продукты для бровей вы используете?`,
  options: [
    "Карандаш",
    "Тени",
    "Гель для бровей",
    "Ничего",
    "Добавить свой вариант"
  ]
};

const EyesPreference = {
  name: "eyesPreference",
  type: "checkbox",
  question: `Какие средства любите использовать в макияже глаз?`,
  options: [
    "Сухие тени",
    "Кремовые тени",
    "Тени-карандаш",
    "Карандаши для глаз",
    "Подводка",
    "Не использую ничего",
    "Добавить свой вариант"
  ]
};

const ToolsPreference = {
  name: "toolsPreference",
  type: "checkbox",
  question: `Какие инструменты для макияжа вы используете?`,
  options: [
    "Кисти",
    "Спонж",
    "Керлер",
    "Ничего не использую",
    "Добавить свой вариант"
  ]
};

const PricePreference = {
  name: "pricePreference",
  type: "text",
  question: `В каком сегменте вы приобретаете косметику? Можно перечислить 3-5 брендов вашей косметички.`
};
const Frequency = {
  name: "frequency",
  type: "text",
  question: `Как часто вы делаете макияж?`
};
const Expectations = {
  name: "expectations",
  type: "text",
  question: `Какой результат вы ожидаете от занятия?`
};

export const QuestionaryList = [
  {
    name: "Ваши данные: ",
    questions: [InfoName, InfoAge]
  },
  {
    name: "Уход за кожей: ",
    questions: [SkincareType, SkincareProducts, SkincareCleanser]
  },
  {
    name: "Тональный крем: ",
    questions: [FoundationBase, Foundation, FoundationPreference]
  },
  {
    name: "Консилер: ",
    questions: [Concealer, ConcealerUsage]
  },
  {
    name: "Пудра: ",
    questions: [Powder, PowderUsage]
  },
  {
    name: "Румяна: ",
    questions: [Blush, BlushUsage]
  },
  {
    name: "Контуринг: ",
    questions: [Contour, ContourUsage]
  },
  {
    name: "Помада: ",
    questions: [Lipstick]
  },
  {
    name: "Хайлайтер: ",
    questions: [Highlighter, HighlighterUsage]
  },
  {
    name: "Брови: ",
    questions: [BrowsPreference]
  },
  {
    name: "Тени: ",
    questions: [EyesPreference]
  },
  {
    name: "Инструменты: ",
    questions: [ToolsPreference]
  },
  {
    name: "Ваши предпочтения: ",
    questions: [PricePreference, Frequency, Expectations]
  }
];
