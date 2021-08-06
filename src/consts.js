const Name = {
  name: "name",
  type: "text",
  question: `Пожалуйста, представьтесь`,
  heading: ""
};

const Age = {
  name: "age",
  type: "text",
  question: `Укажите ваш возраст`,
  heading: "Возраст"
};
const Occupation = {
  name: "occupation",
  type: "text",
  question: `Если ваша цель - макияж для работы, укажите профессию`,
  heading: ""
};
const SkinType = {
  name: "skinType",
  type: "radio",
  question: `Какой у вас тип кожи?`,
  options: [
    "Сухая",
    "Чувствительная",
    "Нормальная",
    "Комбинированная",
    "Жирная"
  ],
  heading: "Тип кожи"
};

const SkincareProducts = {
  name: "skincareProducts",
  type: "text",
  question: `Какими уходовыми средствами вы пользуетесь до макияжа?`,

  heading: "До макияжа использует"
};
const SkincareCleanser = {
  name: "skincareCleanser",
  type: "text",
  question: `Какими средствами вы очищаете кожу от макияжа?`,

  heading: "Очищает кожу от макияжа"
};

const MakeupBase = {
  name: "base",
  type: "radio",
  question: `Используете ли вы базу до макияжа?`,
  options: ["Да", "Нет"],
  heading: "Использует базу до макияжа"
};

const MakeupBaseType = {
  name: "baseType",
  type: "text",
  question: `Какую базу вы используете? (бренд, название, назначение)`,
  heading: "База"
};

const MakeupBaseTest = {
  type: "test",
  name: "base",
  true: [MakeupBaseType]
};

const Foundation = {
  name: "foundation",
  type: "radio",
  question: `Используете ли вы тональный крем?`,
  options: ["Да", "Нет"],
  heading: "Использует тональный крем"
};

const FoundationPreference = {
  name: "foundationPreference",
  type: "checkbox",
  question: `Какое покрытие вам нравится?`,
  options: ["легкое", "среднее", "плотное"],
  heading: "Предпочитаемая плотность"
};

const foundationBrand = {
  name: "foundationBrand",
  type: "text",
  question: `Какой тональный крем вы используете? (бренд, название)`,
  heading: "Тональный крем"
};

const foundationExperience = {
  name: "foundationExperience",
  type: "text",
  question: `Что вам не нравится в вашем тональном креме?`,
  heading: "Не нравится"
};

const FoundationResult = {
  name: "foundationResult",
  type: "checkbox",
  question: `Какой эффект от тона на лице вам нравится?`,
  options: [
    "интенсивное сияние",
    "умеренное сияние",
    "полуматовая кожа",
    "матовая кожа"
  ],
  heading: "Нравится"
};

const FoundationNotUsed = {
  name: "foundationNotUsed",
  type: "text",
  question: `Расскажите, пожалуйста, почему`,
  heading: "Причина"
};

const FoundationTest = {
  type: "test",
  name: "foundation",
  true: [
    foundationBrand,
    FoundationResult,
    foundationExperience,
    FoundationPreference
  ],
  false: FoundationNotUsed
};

const Concealer = {
  name: "concealerUsage",
  type: "radio",
  question: `Используете ли вы консилер?`,
  options: ["Да", "Нет"],
  heading: "Использует консилер"
};
const concealerBrand = {
  name: "concealerBrand",
  type: "text",
  question: `Какой консилер вы используете? (бренд, название)`,
  heading: "Бренд"
};
const concealerExperience = {
  name: "concealerExperience",
  type: "text",
  question: `Что вам не нравится в вашем консилере?`,
  heading: "Не нравится"
};

const concealerNotUsed = {
  name: "concealerNotUsed",
  type: "text",
  question: `Расскажите, пожалуйста, почему?`,
  heading: "Причина"
};

const ConcealerTest = {
  type: "test",
  name: "concealerUsage",
  true: [concealerBrand, concealerExperience],
  false: concealerNotUsed
};

const Powder = {
  name: "powderUsage",
  type: "radio",
  question: `Используете ли вы пудру?`,
  options: ["Да", "Нет"],
  heading: "Использует пудру"
};
const PowderBrand = {
  name: "powderBrand",
  type: "text",
  question: `Какую пудру вы используете? (бренд, название)`,
  heading: "Бренд"
};
const PowderExperience = {
  name: "powderExperience",
  type: "text",
  question: "Что вам не нравится в вашей пудре?",
  heading: "Не нравится"
};

const PowderPreference = {
  name: "powderPreference",
  type: "checkbox",
  question: `Какую пудру вы предпочитаете?`,
  options: ["компактная", "рассыпчатая"],
  heading: "Предпочитаемая пудра"
};

const PowderNotUsed = {
  name: "powderNotUsed",
  type: "text",
  question: `Расскажите, пожалуйста, почему?`,
  heading: "Причина"
};

const PowderTest = {
  type: "test",
  name: "powderUsage",
  true: [PowderBrand, PowderPreference, PowderExperience],
  false: PowderNotUsed
};

const Blush = {
  name: "blush",
  type: "radio",
  question: `Используете ли вы румяна?`,
  options: ["Да", "Нет"],
  heading: "Использует румяна"
};

const BlushPreference = {
  name: "blushPreference",
  type: "checkbox",
  question: `Какие румяна вам нравятся?`,
  options: ["кремовые", "сухие"],
  heading: "Предпочитаемые румяна"
};
const BlushBrand = {
  name: "blushBrand",
  type: "text",
  question: `Какие румяна вы используете? (бренд, название)`,
  heading: "Бренд"
};
const BlushExperience = {
  name: "blushExperience",
  type: "text",
  question: `Что вам не нравится в ваших румянах?`,

  heading: "Не нравится"
};

const BlushNotUsed = {
  name: "blushNotUsed",
  type: "text",
  question: `Расскажите, пожалуйста, почему?`,

  heading: "Причина"
};

const BlushTest = {
  type: "test",
  name: "blush",
  true: [BlushPreference, BlushBrand, BlushExperience],
  false: BlushNotUsed
};

const Contour = {
  name: "contour",
  type: "radio",
  question: `Используете ли вы средства для контурирования лица?`,
  options: ["Да", "Нет"],

  heading: "Использует контуринг"
};

const contourNotUsed = {
  name: "contourNotUsed",
  type: "text",
  question: `Расскажите, пожалуйста, почему?`,

  heading: "Причина"
};

const ContourBrand = {
  name: "contourBrand",
  type: "text",
  question: `Какие продукты для контуринга вы используете? (бренд, название)`,
  heading: "Бренд"
};
const ContourExperience = {
  name: "contourExperience",
  type: "text",
  question: `Что вам не нравится в вашем контуринге?`,
  heading: "Не нравится"
};

const ContourTest = {
  type: "test",
  name: "contour",
  true: [ContourBrand, ContourExperience],
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

  heading: "Использует помады"
};

const Highlighter = {
  name: "highlighterUsage",
  type: "radio",
  question: `Используете ли вы хайлайтер?`,
  options: ["Да", "Нет"],

  heading: "Использует хайлайтер"
};

const highlighterNotUsed = {
  name: "highlighterNotUsed",
  type: "text",
  question: `Расскажите, пожалуйста, почему?`,

  heading: "Причина"
};
const highlighterPreference = {
  name: "highlighterPreference",
  type: "checkbox",
  question: `Какой хайлайтер вы любите?`,
  options: ["Сухой", "Кремовый"],

  heading: "Предпочитает хайлайтеры"
};

const HighlighterTest = {
  type: "test",
  name: "highlighterUsage",
  true: [highlighterPreference],
  false: highlighterNotUsed
};

const BrowsPreference = {
  name: "browsPreference",
  type: "checkbox",
  question: `Какие продукты для бровей вы используете?`,
  options: ["Карандаш", "Тени", "Гель для бровей", "Ничего"],

  heading: "Использует продукты для бровей"
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
  heading: "Использует продукты для глаз"
};

const EyesBrand = {
  name: "eyesBrand",
  type: "text",
  question: `Какие продукты для макияжа глаз вы используете? (бренд, название)`,
  heading: "Бренд"
};
const EyesExperience = {
  name: "eyesExperience",
  type: "text",
  question: `Что вам не нравится в ваших продуктах для глаз?`,
  heading: "Не нравится"
};

const EyesChange = {
  name: "eyesChange",
  type: "text",
  question: `Что хотелось бы изменить в макияже глаз?`,
  heading: "Не нравится"
};

const ToolsPreference = {
  name: "toolsPreference",
  type: "checkbox",
  question: `Какие инструменты для макияжа вы используете?`,
  options: ["Кисти", "Спонж", "Керлер", "Ничего не использую"],

  heading: "Использует инструменты"
};

const PricePreference = {
  name: "userOwnedProducts",
  type: "text",
  question: `В каком сегменте вы приобретаете косметику? Можно перечислить 3-5 брендов вашей косметички.`,

  heading: "В косметичке уже есть"
};
const Frequency = {
  name: "frequency",
  type: "text",
  question: `Как часто вы делаете макияж?`,

  heading: "Как часто делает макияж"
};
const Expectations = {
  name: "expectations",
  type: "text",
  question: `Какие проблемы вы хотите решить с помощью урока?`,
  heading: "От занятия ожидает"
};

export const Sections = [
  {
    name: "",
    questions: [Name, Age, Occupation]
  },
  {
    name: "Уход за кожей: ",
    questions: [SkinType, SkincareProducts, SkincareCleanser]
  },
  {
    name: "Тональный крем: ",
    questions: [MakeupBase, MakeupBaseTest, Foundation, FoundationTest]
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
    questions: [EyesPreference, EyesBrand, EyesExperience, EyesChange]
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
    questions: [SkinType, SkincareProducts, SkincareCleanser]
  },
  {
    name: "Основа",
    questions: [
      MakeupBase,
      MakeupBaseType,
      Foundation,
      FoundationPreference,
      foundationBrand,
      foundationExperience,
      FoundationResult,
      FoundationNotUsed
    ]
  },
  {
    name: "Консилер",
    questions: [
      Concealer,
      concealerBrand,
      concealerExperience,
      concealerNotUsed
    ]
  },
  {
    name: "Пудра",
    questions: [
      Powder,
      PowderPreference,
      PowderBrand,
      PowderExperience,
      PowderNotUsed
    ]
  },
  {
    name: "Румяна",
    questions: [
      Blush,
      BlushPreference,
      BlushBrand,
      BlushExperience,
      BlushNotUsed
    ]
  },
  {
    name: "Контуринг",
    questions: [Contour, ContourBrand, ContourExperience, contourNotUsed]
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
    questions: [EyesPreference, EyesBrand, EyesExperience, EyesChange]
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
