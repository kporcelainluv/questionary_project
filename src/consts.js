const Name = {
  name: "name",
  type: "text",
  question: `Пожалуйста, представьтесь:`,
  description: ""
};

const Age = {
  name: "age",
  type: "radio",
  question: `Укажите ваш возраст:`,
  options: ["до 18", "18-25", "25-35", "35-45", "45+"],
  description: "Возраст"
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
    "Жирная"
  ],
  description: "Тип кожи"
};

const SkincareProducts = {
  name: "skincareProducts",
  type: "text",
  question: `Какими уходовыми средствами вы пользуетесь до макияжа?`,
  description: "До макияжа использует"
};
const SkincareCleanser = {
  name: "skincareCleanser",
  type: "text",
  question: `Какими средствами вы очищаете кожу от макияжа?`,
  description: "Очищает кожу от макияжа"
};

const MakeupBase = {
  name: "base",
  type: "radio",
  question: `Используете ли вы базу до макияжа?`,
  options: ["Да", "Нет"],
  description: "Использует базу до макияжа"
};

const Foundation = {
  name: "foundation",
  type: "radio",
  question: `Используете ли вы тональный крем?`,
  options: ["Да", "Нет"],
  description: "Использует тональный крем"
};

const FoundationPreference = {
  name: "foundationPreference",
  type: "checkbox",
  question: `Какое тональное средство вы предпочитаете?`,
  options: ["легкое", "среднее", "плотное"],
  description: "Предпочитаемая плотность тонального крема"
};

const FoundationNotUsed = {
  name: "foundationNotUsed",
  type: "text",
  question: `Расскажите, пожалуйста, почему`,
  description: "Причина"
};

const FoundationTest = {
  type: "test",
  name: "foundation",
  true: FoundationPreference,
  false: FoundationNotUsed
};

const Concealer = {
  name: "concealerUsage",
  type: "radio",
  question: `Используете ли вы консилер?`,
  options: ["Да", "Нет"],
  description: "Использует консилер"
};

const concealerNotUsed = {
  name: "concealerNotUsed",
  type: "text",
  question: `Расскажите, пожалуйста, почему?`,
  description: "Причина"
};

const ConcealerTest = {
  type: "test",
  name: "concealerUsage",
  true: {},
  false: concealerNotUsed
};

const Powder = {
  name: "powderUsage",
  type: "radio",
  question: `Используете ли вы пудру?`,
  options: ["Да", "Нет"],
  description: "Использует пудру"
};

const PowderPreference = {
  name: "powderPreference",
  type: "checkbox",
  question: `Какую пудру вы используете?`,
  options: ["компактная", "рассыпчатая"],
  description: "Предпочитаемая пудра"
};

const PowderNotUsed = {
  name: "powderNotUsed",
  type: "text",
  question: `Расскажите, пожалуйста, почему?`,
  description: "Причина"
};

const PowderTest = {
  type: "test",
  name: "powderUsage",
  yes: PowderPreference,
  false: PowderNotUsed
};

const Blush = {
  name: "blush",
  type: "radio",
  question: `Используете ли вы румяна?`,
  options: ["Да", "Нет"],
  description: "Использует румяна"
};

const BlushPreference = {
  name: "blushPreference",
  type: "checkbox",
  question: `Какие румяна вам нравятся?`,
  options: ["кремовые", "сухие"],
  description: "Предпочитаемые румяна"
};

const BlushNotUsed = {
  name: "blushNotUsed",
  type: "text",
  question: `Расскажите, пожалуйста, почему?`,
  description: "Причина"
};

const BlushTest = {
  type: "test",
  name: "blush",
  true: BlushPreference,
  false: BlushNotUsed
};

const Contour = {
  name: "contour",
  type: "radio",
  question: `Используете ли вы средства для контурирования лица?`,
  options: ["Да", "Нет"],
  description: "Использует контуринг"
};

const contourNotUsed = {
  name: "contourNotUsed",
  type: "text",
  question: `Расскажите, пожалуйста, почему?`,
  description: "Причина"
};

const contourPreference = {
  name: "contourPreference",
  type: "text",
  question: `Какими контурирующими средствами вы пользуетесь?`,
  description: "Предпочитаемые продукты для контуринга"
};

const ContourTest = {
  type: "test",
  name: "contour",
  true: contourPreference,
  false: contourNotUsed
};

const Lipstick = {
  name: "lipstick",
  type: "radio",
  question: `Какие вам нравятся помады?`,
  options: [
    "Яркие",
    "По случаю",
    "Всегда нюдовые оттенки",
    "Не использую помаду"
  ],
  description: "Использует помады"
};

const Highlighter = {
  name: "highlighterUsage",
  type: "radio",
  question: `Используете ли вы хайлайтер?`,
  options: ["Да", "Нет"],
  description: "Использует хайлайтер"
};

const highlighterNotUsed = {
  name: "highlighterNotUsed",
  type: "text",
  question: `Расскажите, пожалуйста, почему?`,
  description: "Причина"
};
const highlighterPreference = {
  name: "highlighterPreference",
  type: "checkbox",
  question: `Какой хайлайтер вы любите?`,
  options: ["Сухой", "Кремовый"],
  description: "Предпочитает хайлайтеры"
};

const HighlighterTest = {
  type: "test",
  name: "highlighterUsage",
  true: highlighterPreference,
  false: highlighterNotUsed
};

const BrowsPreference = {
  name: "browsPreference",
  type: "checkbox",
  question: `Какие продукты для бровей вы используете?`,
  options: ["Карандаш", "Тени", "Гель для бровей", "Ничего"],
  description: "Использует продукты для бровей"
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
    "Не использую ничего"
  ],
  description: "Использует продукты для глаз"
};

const ToolsPreference = {
  name: "toolsPreference",
  type: "checkbox",
  question: `Какие инструменты для макияжа вы используете?`,
  options: ["Кисти", "Спонж", "Керлер", "Ничего не использую"],
  description: "Использует инструменты"
};

const PricePreference = {
  name: "userOwnedProducts",
  type: "text",
  question: `В каком сегменте вы приобретаете косметику? Можно перечислить 3-5 брендов вашей косметички.`,
  description: "В косметичке уже есть"
};
const Frequency = {
  name: "frequency",
  type: "text",
  question: `Как часто вы делаете макияж?`,
  description: "Как часто делает макияж"
};
const Expectations = {
  name: "expectations",
  type: "text",
  question: `Какой результат вы ожидаете от занятия?`,
  description: "От занятия ожидает"
};

export const Questionary = [
  {
    name: "",
    questions: [Name, Age]
  },
  {
    name: "Уход за кожей: ",
    questions: [SkincareType, SkincareProducts, SkincareCleanser]
  },
  {
    name: "Тональный крем: ",
    questions: [MakeupBase, Foundation, FoundationTest]
  },
  {
    name: "Консилер: ",
    questions: [Concealer, ConcealerTest]
  },
  {
    name: "Пудра: ",
    questions: [Powder, PowderTest]
  },
  {
    name: "Румяна: ",
    questions: [Blush, BlushTest]
  },
  {
    name: "Контуринг: ",
    questions: [Contour, ContourTest]
  },
  {
    name: "Помада: ",
    questions: [Lipstick]
  },
  {
    name: "Хайлайтер: ",
    questions: [Highlighter, HighlighterTest]
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

export const MediaWidth = {
  MOBILE: `320px`,
  TABLET: `750px`,
  LAPTOP: `950px`
};

export const QuestionResponse = {
  TRUE: "Да",
  FALSE: "Нет"
};

export const QuestionType = {
  TEXT: "text",
  RADIO: "radio",
  CHECKBOX: "checkbox",
  TEST: "test"
};

export const UserProfile = [
  {
    name: "Уход за кожей",
    questions: [SkincareType, SkincareProducts, SkincareCleanser]
  },
  {
    name: "Основа",
    questions: [MakeupBase, Foundation, FoundationNotUsed, FoundationPreference]
  },
  {
    name: "Консилер",
    questions: [Concealer, concealerNotUsed]
  },
  {
    name: "Пудра",
    questions: [Powder, PowderNotUsed, PowderPreference]
  },
  {
    name: "Румяна",
    questions: [Blush, BlushPreference, BlushNotUsed]
  },
  {
    name: "Контуринг",
    questions: [Contour, contourNotUsed, contourPreference]
  },
  {
    name: "Помада",
    questions: [Lipstick]
  },
  {
    name: "Хайлайтер",
    questions: [Highlighter, highlighterNotUsed, highlighterPreference]
  },
  {
    name: "Брови",
    questions: [BrowsPreference]
  },
  {
    name: "Глаза",
    questions: [EyesPreference]
  },
  {
    name: "Инструменты",
    questions: [ToolsPreference]
  },
  {
    name: "Прочее",
    questions: [PricePreference, Frequency, Expectations]
  }
];
