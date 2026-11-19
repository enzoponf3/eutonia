export const SITE = {
  name: "Eutonia y meditación",
  short_name: "Eutonia",
  description:
    "Acompañamiento en eutonía en Buenos Aires para recuperar el equilibrio del cuerpo y la mente.",
  location: "Buenos Aires",
  audience:
    "Personas de Buenos Aires en búsqueda de un tratamiento integral de cuerpo y mente.",
  phone: "+54 9 11 4060-9024",
} as const;

export const ACTIONS = {
  primary: { label: "Reservar", href: "/#reservar" },
  secondary: { label: "Contacto", href: "#contacto" },
} as const;

export const HERO = {
  image: "/photos/inicio-3.webp",
  image_alt: "Espacio de práctica de eutonía",
  text:
    "El cuerpo habla sutilmente... La eutonía y la meditación te invitan a detenerte; calmar tu mente y escuchar tu cuerpo. A través del movimiento consciente y el contacto atento recuperás la flexibilidad y el tono corporal que necesitas para tu vida diaria. Menos tensión, más bienestar.",
} as const;

export const DESCRIPTION = {
  eyebrow: "La práctica",
  title: "Tres preguntas para acercarte a la eutonía",
  items: [
    {
      icon: "/selflove.svg",
      title: "¿Qué es?",
      text:
        "Eutonía es una disciplina de conciencia corporal creada por Gerda Alexander.",
    },
    {
      icon: "/grow.svg",
      title: "¿Cuál es su objetivo?",
      text:
        "Que aprendas a regular tu tono corporal, sintiendo y observando tu propio cuerpo, " + "para realizar las actividades cotidianas con menos gasto de energía.",
    },
    {
      icon: "/mind.svg",
      title: "¿Qué efectos tiene?",
      text:
      "Al regularse el tono corporal, mental y emocional disminuye el estrés y la ansiedad. " +
"El movimiento se torna más liviano, sin dolor ni inflamación en los tejidos. " + "Mejora el descanso. Conectás con tu interior."
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
  place: "Clases Grupales.",
  address: "GymDance Gral. Lavalle 2993, Victoria, Provincia de Buenos Aires. " + 
  "Con reserva previa.",
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
  whatsapp_url: build_whatsapp_url(SITE.phone),
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
    "La eutonía disciplina de conciencia corporal, destinada a desarrollar la auto-observación a través de las sensaciones corporales reales. " +
    "No busca corregir el cuerpo desde afuera, sino despertar la escucha interna para lograr un movimiento flexible, integrado y orgánico, sin dolor.",
  statement:"La búsqueda de un tono corporal justo.",
  sections: [
    {
      eyebrow: "El nombre",
      title: "¿Qué significa eutonía?",
      paragraphs: [
        "La palabra reúne dos términos griegos: eu, que habla de lo bueno, " +
          "armónico o justo, y tonos, que refiere al tono o la tensión del " +
          "cuerpo. Eutonía es, entonces, la búsqueda de un tono corporal justo para la actividad que se realiza.",
        "Se logra con la observación de los Principios Eutónicos. Distintas conciencias que se exploran a través de actividades de sensopercepción: " +
          "Conciencia de la piel, del espacio interno, del tejido óseo entre otros. " +
          "El contacto conciente y la neutralidad son dos aspectos que invitan a observar sin juicios hacia uno mismo. " +
          "De la integración de los Principios surge el Movimiento Eutónico es orgánico, armonioso, propio de cada persona.",
      ],
      image: "/photos/espacio.webp",
      image_alt: HERO.image_alt,
      image_caption: "",
      image_width: 1600,
      image_height: 1067,
      image_aspect: "aspect-[4/3]",
    },
    {
      eyebrow: "El origen",
      title: "Cómo nació",
      paragraphs: [
        "Gerda Alexander nació en Wuppertal, Alemania, en 1908 y desarrolló su trabajo en Dinamarca. " +
        "A partir de su propia experiencia corporal y de años de observación, " + 
        "en la búsqueda del movimiento auténtico y propio para cada persona: orgáncio y armonioso.",
        "Hacia 1945 le pone el nombre de EUTONÍA a su método; es mucho más que una disciplina de conciencia corporal, es una filosofía de vida. " + 
        "Su práctica puede ser en modalidad grupal como clases o como tratamiento personalizado " +
        "donde el eutonista realiza distintos toques con el objetivo de facilitar el " + "contacto del alumno con su propio cuerpo y regular su tono. Eutonía dialoga con la educación, el arte, la salud.",
        "Su legado es una invitación a investigar el propio cuerpo con " + 
        "curiosidad y respeto, sin juicios ni exigencias.",
      ],
      image: "/photos/eutonia-gerda.jpg",
      image_alt: "Gerda en posición de meditación.",
      image_caption: "Gerda Alexander (1908-1994)",
      image_width: 330,
      image_height: 330,
      image_aspect: "aspect-square",
    },
  ],
  principles: {
    eyebrow: "La práctica",
    title: "Tres pilares que sostiene la vivencia",
    items: [
      {
        icon: "/meditation.svg",
        title: "Auto-observación",
        text:
          "de las sensaciones corporales reales; " + 
          "el cuerpo se presenta como un territorio a explorar y descubrir",
      },
      {
        icon: "/grow.svg",
        title: "Neutralidad",
        text:
          "para observar libremente sin juicios de valor; " + 
          "lo que surge de la vivencia es información que se integra",
      },
      {
        icon: "/mind.svg",
        title: "Presencia",
        text:
          "las actividades invitan a focalizar en el aquí y ahora; " + 
          "se aprecia un estado de calma y seguridad",
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
  title: "Acompañar en la búsqueda del bienestar",
  image: "/photos/sobre-mi.webp",
  image_alt: "Fotografía de la facilitadora de eutonía",
  image_caption: "Observar, escuchar y acompañar",
  intro:
    "Soy facilitadora de Eutonía y Meditación, acompaño a personas que buscan conectar " + 
    "con sí mismas y con su corporalidad. Estoy convenciada que el bienestar " + 
    "se encuentra en la integración cuerpo, mente y emoción. " + 
    "Alinear estos aspectos nos da consciencia y libertad.",
  journey: {
    eyebrow: "Mi recorrido",
    paragraphs: [
      "Mi nombre es Andrea Bello, soy kinesiología desde hace más de 20 años. " + 
      "Mi recorrido comienza en el Hospital Argerich en CABA, Argentina, mi lugar de formación. " + 
      "Allí me desempeñé en distintas áreas como internación, unidad de cuidados intensivos y consultorio.",
      "La Eutonía llegó a mi vida al buscar comprender y aliviar el dolor de mis pacientes, " + 
      "hace 14 años. Descubrí los inmumerables beneficios de su práctica... " + 
      "también me di cuenta que primero tenía que trabajar en mí. La Meditación vino " + "después, con la Pandemia, me ayudó a cultivar el estado de presencia y el silencio interno para escuchar mi interior. ",
      "Ambas disciplinas cambiaron mi manera de observar, escuchar y acompañar. " + 
      "Cada persona es única y su proceso de recuperación también.",
    ],
  },
  approach: {
    eyebrow: "Cómo trabajo",
    title: "Un espacio para volver a habitarse",
    paragraphs: [
      "Propongo encuentros para conectar y sentir, " + "donde el tiempo interno es el protagonista. A través de las actividades de sensopercepción, " + 
      "de movimientos suaves y en contacto consciente, buscamos soltar los excesos " + 
      "de tensión y recuperar flexibilidad y disponibilidad corporal.",
      "No se necesita tener experiencia previa ni una condición física especial. " + "Cada persona llega con su historia y encuentra su propio ritmo.",
    ],
    image: "/photos/espacio-2.jpg",
    image_alt: "Sala preparada para una práctica de eutonía",
    image_caption: "Un espacio cuidado para la práctica.",
  },
  values: {
    eyebrow: "La mirada",
    title: "En cada encuentro vas a encontrar",
    items: [
      {
        icon: "/selflove.svg",
        title: "Escucha atenta",
        text:
          "Cada persona tiene su propio tiempo. " + 
          "Te acompaño en el proceso de autoconocimiento.",
      },
      {
        icon: "/grow.svg",
        title: "Presencia",
        text:
          "El centramiento en el propio cuerpo trae a la persona al aquí y ahora. " + 
          "Mas disponibilidad, menos ansiedad.",
      },
      {
        icon: "/meditation.svg",
        title: "Cuidado",
        text:
          "Cada persona investiga como puede y hasta donde puede, " + 
          "respetanto sus propios tiempos.",
      },
    ],
  },
  statement: "Cada persona es única en su proceso de recuperación",
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
      label: "Presencial",
      description: "Práctica presencial grupal.",
      frequency: "4 encuentros por mes.",
      link: 
      {
        label: "Reservar",
        enlace: "#"
      }
    },
    {
      label: "Tratamiento",
      description: "Individual en consultorio.",
      frequency: "A convenir.",
      link: 
      {
        label: "Reservar",
        enlace: build_whatsapp_url(SITE.phone)
      }
    },
    {
      label: "Online",
      description: "Sincrónica grupal.",
      frequency: "4 encuentros por mes.",
      link: 
      {
        label: "Reservar",
        enlace: "#"
      }
    },
  ],
  reservarHref: "#reservar",
} as const;


export const REVIEWS = {
  eyebrow: "Testimonios",
  title: "Lo que cuentan quienes practican",
  items: [
    {
      name: "Mariana",
      rating: 5,
      comment:
        "Es un espacio donde nos reencontramos con nuestro cuerpo " + 
        "y en ese ratito nos dedicamos a escucharlo!" + 
        "Hace dos años que comencé con Andre y fue la mejor experiencia ❤️❤️",
    },
    {
      name: "Alejandra",
      rating: 5,
      comment:
        "Quiero compartir mí experiencia habiendo participado en los encuentros de Eutonia y Meditación, " +
        "a cargo de la Lic. Andrea Bello. Habitualmente llego al lugar muy cansada y estresada " + 
        "luego de una semana difícil. Al finalizar, me doy cuenta que puedo recuperar, no solo la percepción de mí propio cuerpo, sino también la regulación de mis emociones." +
        "Siendo una profesional de la salud mental, se lo importante que es equilibrarnos " + 
        "y en estos encuentros lo logro con mucha paz y satisfacción. " + 
        "Gracias por contenerme y mmarme en un espacio ideal y tan especial.",
    },
    {
      name: "Mercedes",
      rating: 5,
      comment:
        "La práctica de estonia me ayuda a regular el ánimo, la postura corporal, " + 
        "el descubrimiento de los espacios internos. Con curiosidad y sutileza, " + 
        "guiada por la sabiduría de Andrea.",
    },
  ],
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
