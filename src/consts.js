export const UtilQuestions = {
  comment: "Оставьте комментарий (при необходимости)"
};

export const FoundationQuestions = {
  base: "Используете ли вы базу до макияжа?",
  foundation: "Используете ли вы тональный крем?",
  preference: "Какое тональное средство вы предпочитаете?"
};

export const FoundationCoverage = {
  light: "легкое",
  medium: "среднее",
  thick: "плотное"
};

export const ConsealerQuestions = {
  usage: "Используете ли вы консилер?"
};
export const PowderQuestions = {
  usage: "Используете ли вы пудру?",
  preference: "Какую пудру вы используете?",
  nonUsage: ""
};

export const PowderType = {
  compact: "компактная",
  crispy: "рассыпчатая"
};
//////////

const InfoName = {
  name: "personalInfo-name",
  type: "text",
  question: `Пожалуйста, представьтесь:`
};

const InfoAge = {
  name: "personalInfo-age",
  type: "text",
  question: `Укажите ваш возраст:`
};

export const PersonalInfo = {
  name: "Ваши данные:",
  questions: [InfoName, InfoAge]
};
/////////

const SkincareType = {
  name: "skincare-type",
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
  name: "skincare-products",
  type: "text",
  question: `Какими уходовыми средствами вы пользуетесь?`
};
const SkincareCleanser = {
  name: "skincare-cleanser",
  type: "text",
  question: `Какими средствами вы очищаете кожу от макияжа (чем очищаете кожу)?`
};

export const SkincareInfo = {
  name: "Уход за кожей:",
  questions: [SkincareType, SkincareProducts, SkincareCleanser]
};

export const QuestionaryList = [
  {
    name: "Ваши данные:",
    questions: [InfoName, InfoAge]
  },
  {
    name: "Уход за кожей:",
    questions: [SkincareType, SkincareProducts, SkincareCleanser]
  }
];
