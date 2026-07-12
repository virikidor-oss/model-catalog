// Mock-данные для статического режима (без БД)
// Используются когда USE_DATABASE=false или БД недоступна

import type { CarModel } from "./data";
import type { Service, Review, BlogPost } from "./models";
import type { CarModelFilters } from "./models";

export const mockServices: Service[] = [
  {
    id: "mock-service-1",
    name: "API Gateway",
    description: "Шлюз для микросервисной архитектуры",
    status: "active",
    url: "https://api.example.com",
    createdAt: new Date("2024-01-15").toISOString(),
    updatedAt: new Date("2024-01-15").toISOString(),
  },
  {
    id: "mock-service-2",
    name: "Auth Service",
    description: "Сервис аутентификации и авторизации",
    status: "active",
    url: "https://auth.example.com",
    createdAt: new Date("2024-02-01").toISOString(),
    updatedAt: new Date("2024-02-01").toISOString(),
  },
  {
    id: "mock-service-3",
    name: "ML Pipeline",
    description: "Пайплайн для обработки данных с AI",
    status: "deploying",
    url: undefined,
    createdAt: new Date("2024-03-10").toISOString(),
    updatedAt: new Date("2024-03-10").toISOString(),
  },
];

export const mockCarModels: CarModel[] = [
  {
    id: "model-1",
    brand: "Ferrari",
    name: "F40",
    year: 1987,
    scale: "1:18",
    type: "Спорткар",
    manufacturer: "Bburago",
    imageUrl: "/images/model-1.svg",
    images: ["/images/model-1.svg"],
    coverIndex: 0,
    category: "civil",
    subcategory: "passenger",
    description:
      "Ferrari F40 — легендарный суперкар, выпущенный в честь 40-летия компании. Последняя модель, созданная при жизни Энцо Феррари. Модель от Bburago отличается высокой детализацией: проработанный двигатель V8 с турбинами, открывающиеся двери и капот, точная копия оригинальных колёсных дисков.",
    history:
      "Ferrari F40 была представлена в 1987 году как преемница GTO. Оснащалась 2.9-литровым twin-turbo V8 мощностью 478 л.с. и развивала 324 км/ч, став самым быстрым серийным автомобилем своего времени. Модель выпускалась до 1992 года, всего произведено 1 315 экземпляров. Эта модель в масштабе 1:18 от Bburago — одна из самых популярных среди коллекционеров, с отличной детализацией салона и моторного отсека.",
  },
  {
    id: "model-2",
    brand: "Porsche",
    name: "911 Turbo",
    year: 1975,
    scale: "1:18",
    type: "Спорткар",
    manufacturer: "Minichamps",
    imageUrl: "/images/model-2.svg",
    images: ["/images/model-2.svg"],
    coverIndex: 0,
    category: "civil",
    subcategory: "passenger",
    description:
      "Porsche 911 Turbo (930) — первый серийный спортивный автомобиль с турбонаддувом, установивший новые стандарты производительности. Модель от Minichamps славится безупречным качеством литья и точностью пропорций.",
    history:
      "Porsche 930 Turbo дебютировал в 1975 году на Франкфуртском автосалоне. 3.0-литровый оппозитный двигатель с турбонаддувом выдавал 260 л.с. Благодаря широким колёсным аркам и характерному антикрылу модель получила прозвище «Widebody». Minichamps воспроизводит каждую деталь: от характерных колёс «Fuchs» до текстуры сидений и приборной панели.",
  },
  {
    id: "model-3",
    brand: "Mercedes-Benz",
    name: "300 SL Gullwing",
    year: 1954,
    scale: "1:24",
    type: "Купе",
    manufacturer: "Revell",
    imageUrl: "/images/model-3.svg",
    images: ["/images/model-3.svg"],
    coverIndex: 0,
    category: "civil",
    subcategory: "passenger",
    description:
      "Mercedes-Benz 300 SL «Gullwing» с легендарными дверями-крыльями — икона автомобильного дизайна 1950-х годов. Сборная модель Revell позволяет оценить инженерную мысль эпохи.",
    history:
      "300 SL (W198) был представлен в 1954 году как гражданская версия гоночного спортпрототипа. Его «крылатые» двери были вынужденным решением из-за пространственной рамы. 3.0-литровый рядный шестицилиндровый двигатель с прямым впрыском развивал 215 л.с. Revell воспроизводит эту легенду в масштабе 1:24 с высокой детализацией и возможностью сборки.",
  },
  {
    id: "model-4",
    brand: "Lamborghini",
    name: "Countach LP400",
    year: 1974,
    scale: "1:18",
    type: "Спорткар",
    manufacturer: "Autoart",
    imageUrl: "/images/model-4.svg",
    images: ["/images/model-4.svg"],
    coverIndex: 0,
    category: "civil",
    subcategory: "passenger",
    description:
      "Lamborghini Countach — дерзкий суперкар с клиновидным дизайном и распашными дверями, воплощение 80-х. Модель Autoart считается одной из лучших в коллекции.",
    history:
      "Countach LP400 был представлен в 1974 году как замена Miura. Дизайн Марчелло Гандини с острыми углами и плоскими панелями стал революционным. V12 объёмом 3.9 л выдавал 375 л.с. Название Countach происходит от восклицания на пьемонтском диалекте. Autoart выпустил эту модель с открытыми дверями, капотом и задним стеклом, демонстрируя двигатель и салон.",
  },
  {
    id: "model-5",
    brand: "Ford",
    name: "Mustang Shelby GT500",
    year: 1967,
    scale: "1:18",
    type: "Маслкар",
    manufacturer: "Maisto",
    imageUrl: "/images/model-5.svg",
    images: ["/images/model-5.svg"],
    coverIndex: 0,
    category: "civil",
    subcategory: "passenger",
    description:
      "Ford Mustang Shelby GT500 — заряженная версия легендарного пони-кара с двигателем V8 и агрессивным стайлингом. Модель Maisto привлекает соотношением цены и качества.",
    history:
      "Shelby GT500 1967 года оснащался 7.0-литровым V8 (428 Cobra Jet) мощностью 355 л.с. От стандартного Mustang отличался расширенными колёсными арками, капотом с воздухозаборником и улучшенной подвеской. Тираж составил около 2 050 экземпляров. Модель Maisto воспроизводит характерные синие полосы и агрессивный облик оригинала.",
  },
  {
    id: "model-6",
    brand: "Volkswagen",
    name: "Beetle (Typ 1)",
    year: 1965,
    scale: "1:24",
    type: "Легковой",
    manufacturer: "Norev",
    imageUrl: "/images/model-6.svg",
    images: ["/images/model-6.svg"],
    coverIndex: 0,
    category: "civil",
    subcategory: "passenger",
    description:
      "Volkswagen Beetle — самый узнаваемый автомобиль в мире и символ немецкого экономического чуда. Модель Norev точно передаёт округлые формы легендарного «Жука».",
    history:
      "«Жук» (Typ 1) выпускался с 1938 по 2003 год, став самым долго производимым автомобилем одной платформы. Заднемоторная компоновка, оппозитный двигатель воздушного охлаждения и характерный дизайн сделали его иконой. Всего было выпущено более 21 миллиона экземпляров. Norev воспроизводит модель 1965 года — один из самых узнаваемых периодов производства.",
  },
  {
    id: "model-7",
    brand: "Scania",
    name: "R500",
    year: 2020,
    scale: "1:50",
    type: "Грузовик",
    manufacturer: "Tekno",
    imageUrl: "/images/model-7.svg",
    images: ["/images/model-7.svg"],
    coverIndex: 0,
    category: "civil",
    subcategory: "truck",
    description:
      "Scania R500 — современный магистральный тягач с кабиной Topline, флагман шведского автопрома. Модель Tekno высоко ценится за точность и внимание к деталям.",
    history:
      "Scania серии R — это серия тяжёлых грузовиков, выпускаемых с 2004 года. R500 оснащается 16.4-литровым рядным шестицилиндровым дизелем V8 мощностью 500 л.с. и 12-ступенчатой роботизированной коробкой Opticruise. Модель Tekno в масштабе 1:50 отличается высокой детализацией: проработанная ходовая часть, открывающиеся двери кабины и зеркала заднего вида. Используется для пополнения коллекции грузовой техники.",
  },
  {
    id: "model-8",
    brand: "Chevrolet",
    name: "Corvette Stingray",
    year: 1963,
    scale: "1:24",
    type: "Спорткар",
    manufacturer: "Maisto",
    imageUrl: "/images/model-8.svg",
    images: ["/images/model-8.svg"],
    coverIndex: 0,
    category: "civil",
    subcategory: "passenger",
    description:
      "Chevrolet Corvette Stingray 1963 года — первое поколение «Стингрея» с уникальным раздельным задним стеклом. Яркий представитель американской автомобильной культуры.",
    history:
      "Corvette Stingray (C2) дебютировал в 1963 году с новым кузовом от Ларри Шиноды. Раздельное заднее стекло (split window) было уникальной чертой только 1963 модельного года. 5.4-литровый V8 мощностью до 360 л.с. в версии L84 с впрыском. Модель Maisto передаёт элегантные линии и спортивный характер легендарного американского спорткара.",
  },
  {
    id: "model-9",
    brand: "Caterpillar",
    name: "D9",
    year: 1970,
    scale: "1:50",
    type: "Спецтехника",
    manufacturer: "NZG",
    imageUrl: "/images/model-9.svg",
    images: ["/images/model-9.svg"],
    coverIndex: 0,
    category: "civil",
    subcategory: "truck",
    description:
      "Caterpillar D9 — мощный гусеничный бульдозер, легенда горнодобывающей промышленности и строительства. Модель NZG — образец немецкого качества.",
    history:
      "Caterpillar D9 — один из самых известных гусеничных бульдозеров в мире. Первая модель D9 была представлена в 1955 году. Машина оснащается дизельным двигателем мощностью свыше 400 л.с. и гидравлической системой управления отвалом. Модель NZG в масштабе 1:50 отличается высокой детализацией: подвижный отвал, рыхлитель сзади, реалистичные гусеницы и окраска в фирменный жёлтый цвет Caterpillar.",
  },
  {
    id: "model-10",
    brand: "BMW",
    name: "M3 E30",
    year: 1986,
    scale: "1:18",
    type: "Седан",
    manufacturer: "Kyosho",
    imageUrl: "/images/model-10.svg",
    images: ["/images/model-10.svg"],
    coverIndex: 0,
    category: "civil",
    subcategory: "passenger",
    description:
      "BMW M3 E30 — первый M3, созданный для омологации в DTM и завоевавший сердца поклонников по всему миру. Модель Kyosho — жемчужина коллекции.",
    history:
      "M3 E30 был представлен в 1986 году как омологационная версия купе 3-series. 2.3-литровая рядная «четвёрка» S14 с 16 клапанами выдавала 200 л.с. (европейская версия). Успех в DTM и WTCC сделал модель легендой. Всего выпущено 17 970 экземпляров. Kyosho воспроизводит каждую деталь: характерные расширенные колёсные арки, спойлер на багажнике и знаменитые колёса BBS.",
  },
];

export function getModelByIdFromMock(id: string): CarModel | undefined {
  return mockCarModels.find((m) => m.id === id);
}

export function getModelsFromMock(filters?: CarModelFilters): CarModel[] {
  let result = [...mockCarModels];

  if (filters?.brand) {
    result = result.filter((m) => m.brand === filters.brand);
  }

  if (filters?.type) {
    result = result.filter((m) => m.type === filters.type);
  }

  if (filters?.year) {
    result = result.filter((m) => m.year === filters.year);
  }

  return result;
}

export const mockReviews: Review[] = [
  {
    id: "review-mock-1",
    modelId: "model-1",
    rating: 5,
    author: "Иван",
    comment: "Легендарная модель! Отличная детализация и качество сборки.",
    createdAt: new Date("2024-06-15").toISOString(),
  },
  {
    id: "review-mock-2",
    modelId: "model-1",
    rating: 4,
    author: "Алексей",
    comment: "Хорошая модель, но краска чуть тусклее, чем на фото.",
    createdAt: new Date("2024-07-20").toISOString(),
  },
  {
    id: "review-mock-3",
    modelId: "model-1",
    rating: 5,
    author: "Мария",
    comment: "Потрясающая детализация двигателя!",
    createdAt: new Date("2024-08-10").toISOString(),
  },
  {
    id: "review-mock-4",
    modelId: "model-2",
    rating: 4,
    author: "Дмитрий",
    comment: "Классика в хорошем исполнении. Рекомендую.",
    createdAt: new Date("2024-05-05").toISOString(),
  },
  {
    id: "review-mock-5",
    modelId: "model-2",
    rating: 5,
    author: "Сергей",
    comment: "Одна из лучших моделей в коллекции!",
    createdAt: new Date("2024-09-12").toISOString(),
  },
  {
    id: "review-mock-6",
    modelId: "model-3",
    rating: 3,
    author: "Елена",
    comment: "Неплохая модель, но есть небольшие дефекты окраски.",
    createdAt: new Date("2024-04-18").toISOString(),
  },
  {
    id: "review-mock-7",
    modelId: "model-4",
    rating: 5,
    author: "Михаил",
    comment: "Countach — мечта детства! Модель превзошла ожидания.",
    createdAt: new Date("2024-03-22").toISOString(),
  },
  {
    id: "review-mock-8",
    modelId: "model-7",
    rating: 4,
    author: "Анна",
    comment: "Элегантная модель, очень красивые линии кузова.",
    createdAt: new Date("2024-08-30").toISOString(),
  },
];

export function getReviewsByModelIdFromMock(modelId: string): Review[] {
  return mockReviews.filter((r) => r.modelId === modelId);
}

export function getAllReviewsFromMock(): Review[] {
  return [...mockReviews];
}

export const mockBlogPosts: BlogPost[] = [
  {
    id: "blog-mock-1",
    title: "Новое поступление: Ferrari F40",
    type: "note",
    content:
      "Сегодня получил долгожданную модель Ferrari F40 от Bburago в масштабе 1:18. Детализация потрясающая — открываются двери, капот и заднее стекло, видно двигатель V8 с турбинами.",
    imageUrl: "/images/model-1.svg",
    createdAt: new Date("2025-06-28").toISOString(),
    updatedAt: new Date("2025-06-28").toISOString(),
  },
  {
    id: "blog-mock-2",
    title: "История восстановления Mercedes 300 SL",
    type: "article",
    content:
      "Решил поделиться историей восстановления модели Mercedes-Benz 300 SL «Gullwing» от Revell.\n\nКогда я получил эту модель, она была в плачевном состоянии: отсутствовали зеркала, краска была потёрта, а одно из крыльев-дверей было сломано.\n\nПроцесс восстановления занял около двух недель:\n- Полная разборка модели\n- Удаление старой краски\n- Шпаклёвка и шлифовка\n- Покраска в оригинальный серебристый цвет\n- Восстановление салона\n- Установка новых зеркал\n\nРезультат превзошёл ожидания — модель выглядит как новая!",
    imageUrl: "/images/model-3.svg",
    createdAt: new Date("2025-06-25").toISOString(),
    updatedAt: new Date("2025-06-25").toISOString(),
  },
  {
    id: "blog-mock-3",
    title: "Пополнение коллекции: Scania R500",
    type: "note",
    content:
      "Добавил в коллекцию магистральный тягач Scania R500 от Tekno в масштабе 1:50. Отличная детализация ходовой части, открываются двери кабины. Настоящая рабочая лошадка!",
    imageUrl: "/images/model-7.svg",
    createdAt: new Date("2025-06-22").toISOString(),
    updatedAt: new Date("2025-06-22").toISOString(),
  },
  {
    id: "blog-mock-4",
    title: "Как я собираю коллекцию: советы для начинающих",
    type: "article",
    content:
      "За годы коллекционирования моделей автомобилей я выработал несколько правил, которыми хочу поделиться.\n\n**Выбор масштаба**\nСамые популярные масштабы — 1:18, 1:24 и 1:43. Я предпочитаю 1:18 для легковых и 1:50 для грузовиков и спецтехники.\n\n**Где хранить**\nОбязательно используйте витрины с подсветкой. Модели на открытых полках быстро собирают пыль.\n\n**Бюджет**\nНе гонитесь за редкими моделями. Коллекция должна приносить удовольствие, а не разорять.\n\n**Уход**n- Протирайте модели мягкой кисточкой раз в месяц\n- Избегайте прямых солнечных лучей\n- Храните оригинальные коробки",
    imageUrl: "/images/model-5.svg",
    createdAt: new Date("2025-06-18").toISOString(),
    updatedAt: new Date("2025-06-18").toISOString(),
  },
  {
    id: "blog-mock-5",
    title: "Редкая находка: Caterpillar D9",
    type: "note",
    content:
      "Нашёл на блошином рынке модель Caterpillar D9 от NZG в масштабе 1:50. В отличном состоянии, с подвижным отвалом и рыхлителем. Отличное пополнение раздела спецтехники!",
    imageUrl: "/images/model-9.svg",
    createdAt: new Date("2025-06-15").toISOString(),
    updatedAt: new Date("2025-06-15").toISOString(),
  },
];

export function getBlogPostByIdFromMock(id: string): BlogPost | undefined {
  return mockBlogPosts.find((p) => p.id === id);
}
