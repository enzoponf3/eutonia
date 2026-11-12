export const SITE = {
  name: "Eutonia y meditación",
  short_name: "Eutonia",
  description:
    "Acompañamiento en eutonía en Buenos Aires para recuperar el equilibrio del cuerpo y la mente.",
  location: "Buenos Aires",
  audience:
    "Personas de Buenos Aires en búsqueda de un tratamiento integral de cuerpo y mente.",
} as const;

export const ACTIONS = {
  primary: { label: "Reservar", href: "/#reservar" },
  secondary: { label: "Contacto", href: "#contacto" },
} as const;

export const HERO = {
  image: "/photos/start.jpg",
  image_alt: "Persona durante una sesión de eutonía",
  text:
    "Tu cuerpo habla en un idioma suave. La eutonía te invita a detenerte, respirar y escuchar esa voz que sostiene tu equilibrio. A través del movimiento consciente y el contacto atento, recuperás la calma, la presencia y el tono justo para habitar tu cuerpo y tu mente con bienestar.",
} as const;

export const DESCRIPTION = {
  eyebrow: "La práctica",
  title: "Tres preguntas para acercarte a la eutonía",
  items: [
    {
      icon: "/selflove.svg",
      title: "¿Qué es?",
      text:
        "Eutonía es una disciplina de trabajo corporal consciente. Creada por Gerda Alexander.",
    },
    {
      icon: "/grow.svg",
      title: "¿Cuál es su objetivo?",
      text:
        "Que aprendas a regular tu tono corporal para que sea adecuado a la actividad que estás realizando." + "A través de la sensación y la observación de tu propio cuerpo.",
    },
    {
      icon: "/mind.svg",
      title: "¿Qué efectos tiene?",
      text:
      "Regulación del tono corporal, mental y emocional: " +
"El cuerpo descansa y se regenera, la mente se centra en el momento presente, la regulación del estado de alerta da lugar a la emoción"
    },
  ],
} as const;

export const GERDA = {
  image: "/photos/gerda.webp",
  image_alt: "Retrato de Gerda Alexander, creadora de la eutonía",
  eyebrow: "La creadora",
  text: "Sobre sus alumnos: ",
  quote:
"No quiero dar recetas (…) " + 
"Quiero estimularlos para que ellos mismos " + "realicen sus propias investigaciones en sus propios cuerpos y " + "desarrollen su propia creatividad",
  author: "Gerda Alexander",
  role: "Creadora de la eutonía",
} as const;

export const LOCATION = {
  eyebrow: "El espacio",
  title: "¿Dónde nos encontramos?",
  place: "Gymdance",
  address: "Gral. Lavalle 2993, Victoria, Provincia de Buenos Aires",
  map_url:
    "https://www.google.com/maps?q=Gral.+Lavalle+2993,+Victoria,+Provincia+de+Buenos+Aires&output=embed",
  directions_url:
    "https://www.google.com/maps/dir/?api=1&destination=Gral.+Lavalle+2993,+Victoria,+Provincia+de+Buenos+Aires",
} as const;

export const CONTACT = {
  eyebrow: "Contacto",
  title: "Hablemos",
  text:
    "Las dudas también son parte del proceso. Escribime y te acompaño " +
    "a encontrar la forma de empezar a escucharte.",
  phone: "+54 9 11 4060-9024",
  whatsapp_url: build_whatsapp_url("+54 9 11 4060-9024"),
} as const;

export const EUTONIA = {
  eyebrow: "La disciplina",
  title: "Eutonía",
  subtitle:
    "Una práctica corporal que enseña a escuchar el cuerpo y a encontrar " +
    "el tono justo para habitarlo con calma.",
  hero_image: "/full-tree.svg",
  hero_image_alt:
    "Ilustración de un árbol de raíces profundas, símbolo del cuerpo " +
    "que se sostiene y se expande.",
  intro:
    "La eutonía es una disciplina de educación corporal consciente que " +
    "trabaja con la percepción, el tono muscular y la respiración. No busca " +
    "corregir el cuerpo desde afuera, sino despertar la escucha desde " +
    "adentro para recuperar el equilibrio entre cuerpo, mente y emoción.",
  statement: "El tono justo no se fuerza: se descubre.",
  sections: [
    {
      eyebrow: "El nombre",
      title: "¿Qué significa eutonía?",
      paragraphs: [
        "La palabra reúne dos términos griegos: eu, que habla de lo bueno, " +
          "armónico o justo, y tonos, que refiere al tono o la tensión del " +
          "cuerpo. Eutonía es, entonces, la búsqueda de una tensión armoniosa: " +
          "ni rígida ni ausente.",
        "En la práctica se observa cómo el tono cambia con la respiración, " +
          "el contacto, la postura y el estado emocional. Aprender a regularlo " +
          "es aprender a regular la manera en que el cuerpo responde al mundo.",
      ],
      image: HERO.image,
      image_alt: HERO.image_alt,
      image_caption: "Un cuerpo disponible, atento y sin esfuerzo innecesario.",
      image_width: 1600,
      image_height: 1067,
      image_aspect: "aspect-[4/3]",
    },
    {
      eyebrow: "El origen",
      title: "Cómo nació",
      paragraphs: [
        "Gerda Alexander nació en Wuppertal, Alemania, en 1908 y desarrolló " +
          "su trabajo en Dinamarca. A partir de su propia experiencia corporal " +
          "y de años de observación, sistematizó una práctica que unía la " +
          "conciencia del movimiento con el cuidado de la salud.",
        "A mediados del siglo XX dio forma a la eutonía como una disciplina " +
          "abierta: se enseña y se practica en grupos y sesiones individuales, " +
          "y dialoga con la educación, el arte, la salud y la vida cotidiana.",
        "Su legado no es una técnica rígida, sino una invitación a investigar " +
          "el propio cuerpo con curiosidad y respeto, sin comparaciones ni " +
          "exigencias de rendimiento.",
      ],
      image: GERDA.image,
      image_alt: GERDA.image_alt,
      image_caption: "Gerda Alexander, creadora de la eutonía.",
      image_width: 330,
      image_height: 330,
      image_aspect: "aspect-square",
    },
  ],
  principles: {
    eyebrow: "La práctica",
    title: "Tres gestos que sostienen el trabajo",
    items: [
      {
        icon: "/meditation.svg",
        title: "Escuchar",
        text:
          "La atención se posa en las sensaciones sin juzgarlas. " +
          "Aparece un mapa del cuerpo más fino y más amable.",
      },
      {
        icon: "/grow.svg",
        title: "Regular el tono",
        text:
          "Con movimientos lentos y contacto consciente se ajusta la " +
          "tensión justa para cada gesto, sin forzar ni abandonar.",
      },
      {
        icon: "/mind.svg",
        title: "Volver al presente",
        text:
          "La respiración y la percepción anclan la atención en el aquí. " +
          "Cuerpo, mente y emoción vuelven a encontrarse.",
      },
    ],
  },
  cta: {
    eyebrow: "El primer paso",
    title: "¿Querés conocer la práctica?",
    text:
      "Podés empezar con una clase suelta o escribirme para encontrar " +
      "juntas el mejor modo de acercarte a la eutonía.",
  },
} as const;

export const ABOUT = {
  eyebrow: "Sobre mí",
  title: "Acompañar el cuerpo, sostener la escucha",
  image: "/photos/facilitator.svg",
  image_alt: "Ilustración de la facilitadora de eutonía",
  image_caption: "Facilitadora de eutonía en Buenos Aires",
  intro:
    "Soy facilitadora de eutonía y acompaño a personas que quieren habitar " +
    "su cuerpo con más calma, atención y libertad. Mi trabajo nace de una " +
    "convicción simple: cuando el cuerpo se escucha, la vida cotidiana " +
    "encuentra otro ritmo.",
  journey: {
    eyebrow: "Mi recorrido",
    paragraphs: [
      "Llegué a la eutonía después de un camino por distintas disciplinas " +
        "del movimiento y del cuidado corporal. En cada una fui buscando lo " +
        "mismo: una forma de estar presente sin forzar, de habitar el cuerpo " +
        "sin pelear con él.",
      "La eutonía apareció como una síntesis posible. Me ofreció un lenguaje " +
        "para entender el tono, la respiración y la percepción, y también una " +
        "manera de acompañar a otras personas sin imponer un modelo.",
      "Desde entonces me formo y practico con la idea de que cada proceso es " +
        "único. Acompaño sesiones individuales y encuentros grupales en " +
        "Buenos Aires, integrando la escucha corporal con recursos simples " +
        "para el día a día.",
    ],
  },
  approach: {
    eyebrow: "Cómo trabajo",
    title: "Un espacio para volver a habitarse",
    paragraphs: [
      "Propongo encuentros donde el tiempo se vuelve más lento. A través de " +
        "movimientos suaves, contacto consciente y atención a la respiración, " +
        "buscamos soltar los excesos de tensión y recuperar la disponibilidad " +
        "del cuerpo.",
      "No hace falta experiencia previa ni una condición física especial. " +
        "Cada persona llega con su historia y encuentra su propio ritmo.",
    ],
    image: HERO.image,
    image_alt: "Sala preparada para una práctica de eutonía",
    image_caption: "Un espacio cuidado para la práctica.",
  },
  values: {
    eyebrow: "La mirada",
    title: "Lo que sostiene cada encuentro",
    items: [
      {
        icon: "/selflove.svg",
        title: "Escucha",
        text:
          "Cada cuerpo trae su propio lenguaje. Acompaño sin anticipar " +
          "respuestas ni comparar procesos.",
      },
      {
        icon: "/grow.svg",
        title: "Presencia",
        text:
          "El trabajo sucede en el aquí. La respiración y la percepción " +
          "abren la puerta a un estado más disponible.",
      },
      {
        icon: "/meditation.svg",
        title: "Cuidado",
        text:
          "Sin exigencias de rendimiento. El ritmo lo marca cada persona, " +
          "y el espacio está preparado para sostenerlo.",
      },
    ],
  },
  statement: "No se trata de corregir el cuerpo, sino de aprender a escucharlo.",
  cta: {
    eyebrow: "El próximo encuentro",
    title: "¿Querés empezar?",
    text:
      "Reservá tu lugar o escribime para conversar sobre la práctica y " +
      "encontrar el mejor modo de comenzar.",
  },
} as const;

export const NAV_LINKS = [
  { label: "Inicio", href: "/#inicio", external: false },
  { label: "Eutonía", href: "/eutonia", external: false },
  { label: "Sobre mí", href: "/sobre-mi", external: false },
  { label: "Contacto", href: CONTACT.whatsapp_url, external: true },
  { label: "Reservar", href: ACTIONS.primary.href, external: false },
] as const;

export const PLANS = {
  title: "Lugar",
  subtitle: "Horario y frecuencias",
  items: [
    {
      label: "Online",
      description: "Accede desde cualquier lugar",
      frequency: "Ilimitado por mes",
    },
    {
      label: "Mensual",
      description: "Práctica presencial mensual",
      frequency: "8 sesiones por mes",
    },
    {
      label: "1 Clase",
      description: "Una sola sesión suelta",
      frequency: "1 clase",
    },
  ],
  reservarHref: "#reservar",
} as const;

export function build_whatsapp_url(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 10) {
    throw new Error(`Invalid phone number: ${phone}`);
  }
  return `https://wa.me/${digits}`;
}

export function build_title(page_title: string): string {
  const trimmed = page_title.trim();
  return trimmed.length === 0 ? SITE.name : `${trimmed} | ${SITE.name}`;
}
