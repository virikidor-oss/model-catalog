export interface CarModel {
  id: string;
  brand: string;
  name: string;
  year: number;
  scale: string;
  type: string;
  manufacturer: string;
  description: string;
  history: string;
  imageUrl?: string;
  images?: string[];
  coverIndex?: number;
  category: "civil" | "military";
  subcategory: "passenger" | "truck";
}

export const carModels: CarModel[] = [
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
