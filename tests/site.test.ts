import { describe, expect, it } from "vitest";
import {
  ABOUT,
  ACTIONS,
  CONTACT,
  DESCRIPTION,
  EUTONIA,
  GERDA,
  HERO,
  LOCATION,
  NAV_LINKS,
  PLANS,
  REVIEWS,
  SITE,
  build_title,
  build_whatsapp_url,
} from "../src/lib/site";

describe("SITE", () => {
  it("uses the brand title", () => {
    expect(SITE.name).toBe("Eutonía y meditación");
  });

  it("uses a search-friendly home title", () => {
    expect(SITE.home_title).toBe(
      "Eutonía y meditación en Buenos Aires",
    );
    expect(SITE.home_title.length).toBeGreaterThanOrEqual(36);
    expect(SITE.home_title.length).toBeLessThanOrEqual(60);
  });

  it("keeps the home description between 140 and 160 characters", () => {
    expect(SITE.description.length).toBeGreaterThanOrEqual(140);
    expect(SITE.description.length).toBeLessThanOrEqual(160);
  });

  it("targets people from Buenos Aires", () => {
    expect(SITE.location).toBe("Buenos Aires");
  });

  it("ships a 1200x630 social preview image", () => {
    expect(SITE.og_image).toBe("/og/eutonia-meditacion.jpg");
    expect(SITE.og_image_alt.length).toBeGreaterThan(10);
  });
});

describe("ACTIONS", () => {
  it("makes Reservar the primary action", () => {
    expect(ACTIONS.primary.label).toBe("Reservar");
    expect(ACTIONS.primary.href).toBe("/#reservar");
  });

  it("makes Contacto the secondary action", () => {
    expect(ACTIONS.secondary.label).toBe("Contacto");
  });
});

describe("NAV_LINKS", () => {
  it("lists the header sections in order", () => {
    expect(NAV_LINKS.map((link) => link.label)).toEqual([
      "Inicio",
      "Eutonía",
      "Sobre mí",
      "Contacto",
      "Reservar",
    ]);
  });

  it("links internal sections to a root relative path", () => {
    for (const link of NAV_LINKS.filter((link) => !link.external)) {
      expect(link.href.startsWith("/")).toBe(true);
    }
  });

  it("sends Eutonía to its own page", () => {
    const eutonia = NAV_LINKS.find((link) => link.label === "Eutonía");
    expect(eutonia?.external).toBe(false);
    expect(eutonia?.href).toBe("/eutonia");
  });

  it("sends Sobre mí to its own page", () => {
    const about = NAV_LINKS.find((link) => link.label === "Sobre mí");
    expect(about?.external).toBe(false);
    expect(about?.href).toBe("/sobre-mi");
  });

  it("points the nav Reservar to the plans section", () => {
    const reservar = NAV_LINKS.find((link) => link.label === "Reservar");
    expect(reservar?.external).toBe(false);
    expect(reservar?.href).toBe(ACTIONS.primary.href);
  });

  it("sends Contacto to the WhatsApp chat", () => {
    const contact = NAV_LINKS.find((link) => link.label === "Contacto");
    expect(contact?.external).toBe(true);
    expect(contact?.href).toBe(CONTACT.whatsapp_url);
  });
});

describe("HERO", () => {
  it("points at the start photo", () => {
    expect(HERO.image).toBe("/photos/inicio-3.webp");
  });

  it("uses a local, descriptive heading", () => {
    expect(HERO.title).toBe("Eutonía y meditación");
  });

  it("keeps the intro text around fifty words", () => {
    const words = HERO.text.trim().split(/\s+/);
    expect(words.length).toBeGreaterThanOrEqual(40);
    expect(words.length).toBeLessThanOrEqual(60);
  });
});

describe("DESCRIPTION", () => {
  it("presents the practice in three cards", () => {
    expect(DESCRIPTION.items).toHaveLength(3);
  });

  it("uses the provided icons", () => {
    expect(DESCRIPTION.items.map((item) => item.icon)).toEqual([
      "/selflove.svg",
      "/grow.svg",
      "/mind.svg",
    ]);
  });

  it("asks the three questions in order", () => {
    expect(DESCRIPTION.items.map((item) => item.title)).toEqual([
      "¿Qué es?",
      "¿Cuál es su objetivo?",
      "¿Qué efectos tiene?",
    ]);
  });

  it("gives every card a short explanation", () => {
    for (const item of DESCRIPTION.items) {
      expect(item.text.trim().length).toBeGreaterThan(20);
    }
  });
});

describe("GERDA", () => {
  it("points at the Gerda Alexander photo", () => {
    expect(GERDA.image).toBe("/photos/gerda.webp");
  });

  it("keeps the exact quote from the discipline's creator", () => {
    expect(GERDA.quote).toBe(
      "No quiero dar recetas (…) Quiero estimularlos para que ellos mismos " +
        "realicen sus propias investigaciones en sus propios cuerpos y " +
        "desarrollen su propia creatividad",
    );
  });

  it("attributes the quote to Gerda Alexander", () => {
    expect(GERDA.author).toBe("Gerda Alexander");
  });
});

describe("PLANS", () => {
  it("lists the three plans in order", () => {
    expect(PLANS.items.map((item) => item.label)).toEqual([
      "Presencial",
      "Tratamiento individual",
      "Online",
    ]);
  });

  it("uses the location and frequency headings", () => {
    expect(PLANS.title).toBe("Lugar");
    expect(PLANS.subtitle).toBe("Horario y frecuencias");
  });

  it("describes the individual treatment and its San Isidro location", () => {
    const treatment = PLANS.items.find(
      (item) => item.label === "Tratamiento individual",
    );
    expect(treatment?.description.trim()).toBe("Alivio del dolor crónico.");
    expect(treatment?.place).toBe("San Isidro.");
  });

  it("gives every plan a place", () => {
    expect(PLANS.items.map((item) => item.place)).toEqual([
      "Victoria.",
      "San Isidro.",
      "Plataforma online",
    ]);
  });

  it("schedules both group plans", () => {
    expect(PLANS.items.map((item) => item.date)).toEqual([
      "Martes 19.30hs.",
      "",
      "Miércoles 19hs.",
    ]);
  });

  it("sends the group plans to the reservation form", () => {
    const form =
      "https://docs.google.com/forms/d/e/1FAIpQLScd7_wMQImM38RxWKZs40L9qIACyHyMwdRh4LYNIeg3H8SEiQ/" +
      "viewform?usp=header";
    for (const label of ["Presencial", "Online"]) {
      const plan = PLANS.items.find((item) => item.label === label);
      expect(plan?.link.enlace).toBe(form);
    }
  });

  it("sends the treatment booking to WhatsApp", () => {
    const treatment = PLANS.items.find(
      (item) => item.label === "Tratamiento individual",
    );
    expect(treatment?.link.enlace).toBe(CONTACT.whatsapp_url);
  });

  it("labels every plan action as Reservar", () => {
    for (const plan of PLANS.items) {
      expect(plan.link.label).toBe("Reservar");
    }
  });

  it("keeps a frequency for every plan", () => {
    for (const plan of PLANS.items) {
      expect(plan.frequency.trim().length).toBeGreaterThan(0);
    }
  });
});

describe("REVIEWS", () => {
  it("shows three reviews", () => {
    expect(REVIEWS.items).toHaveLength(3);
  });

  it("gives every review a name and a comment", () => {
    for (const item of REVIEWS.items) {
      expect(item.name.trim().length).toBeGreaterThan(0);
      expect(item.comment.trim().length).toBeGreaterThan(20);
    }
  });

  it("gives every review a five star rating", () => {
    for (const item of REVIEWS.items) {
      expect(item.rating).toBe(5);
    }
  });
});

describe("LOCATION", () => {
  it("uses the section title", () => {
    expect(LOCATION.title).toBe("¿Dónde nos encontramos?");
  });

  it("names the place and its full address", () => {
    expect(LOCATION.place).toBe("Clases Grupales.");
    expect(LOCATION.address).toBe(
      "GymDance Gral. Lavalle 2993, Victoria, Provincia de Buenos Aires. " +
        "Con reserva previa.",
    );
  });

  it("embeds a Google map for the address", () => {
    expect(LOCATION.map_url).toContain("google.com/maps");
    expect(LOCATION.map_url).toContain("Gral.+Lavalle+2993");
    expect(LOCATION.map_url).toContain("output=embed");
  });

  it("links to directions for the address", () => {
    expect(LOCATION.directions_url).toContain("google.com/maps/dir");
    expect(LOCATION.directions_url).toContain("Gral.+Lavalle+2993");
  });
});

describe("EUTONIA", () => {
  it("uses the full tree illustration as the page hero", () => {
    expect(EUTONIA.hero_image).toBe("/full-tree.svg");
  });

  it("has its own search metadata", () => {
    expect(EUTONIA.seo_title).toBe("Qué es la eutonía y cómo se practica");
    expect(EUTONIA.seo_description.length).toBeGreaterThanOrEqual(140);
    expect(EUTONIA.seo_description.length).toBeLessThanOrEqual(160);
  });

  it("explains the name and the origin in two sections", () => {
    expect(EUTONIA.sections.map((section) => section.title)).toEqual([
      "¿Qué significa eutonía?",
      "Cómo nació",
    ]);
  });

  it("gives every section an image, a caption and paragraphs", () => {
    for (const section of EUTONIA.sections) {
      expect(section.image).toMatch(/^\/?photos\//);
      expect(section.image_alt.length).toBeGreaterThan(10);
      expect(typeof section.image_caption).toBe("string");
      expect(section.paragraphs.length).toBeGreaterThan(0);
    }
  });

  it("presents the practice in three principles", () => {
    expect(EUTONIA.principles.items).toHaveLength(3);
    expect(EUTONIA.principles.items.map((item) => item.title)).toEqual([
      "Auto-observación",
      "Neutralidad",
      "Presencia",
    ]);
  });

  it("invites the visitor to book or write", () => {
    expect(EUTONIA.cta.title).toBe("¿Querés conocer la práctica?");
    expect(EUTONIA.cta.text.length).toBeGreaterThan(20);
  });
});

describe("ABOUT", () => {
  it("uses the facilitator portrait", () => {
    expect(ABOUT.image).toBe("/photos/sobre-mi.webp");
    expect(ABOUT.image_alt.length).toBeGreaterThan(10);
  });

  it("has its own search metadata", () => {
    expect(ABOUT.seo_title).toBe("Sobre mí: Andrea Bello, kinesióloga");
    expect(ABOUT.seo_description.length).toBeGreaterThanOrEqual(140);
    expect(ABOUT.seo_description.length).toBeLessThanOrEqual(160);
  });

  it("tells who the facilitator is and how she found eutonía", () => {
    expect(ABOUT.intro.toLowerCase()).toContain("eutonía");
    expect(ABOUT.journey.eyebrow).toBe("Mi recorrido");
    expect(ABOUT.journey.paragraphs.length).toBeGreaterThanOrEqual(3);
  });

  it("describes the practice space with an image", () => {
    expect(ABOUT.approach.image).toMatch(/^\/?photos\//);
    expect(ABOUT.approach.paragraphs.length).toBeGreaterThan(0);
  });

  it("presents the values in three cards", () => {
    expect(ABOUT.values.items).toHaveLength(3);
    expect(ABOUT.values.items.map((item) => item.title)).toEqual([
      "Escucha atenta",
      "Presencia",
      "Cuidado",
    ]);
  });

  it("invites the visitor to start", () => {
    expect(ABOUT.cta.title).toBe("¿Querés empezar?");
    expect(ABOUT.statement.length).toBeGreaterThan(20);
  });
});

describe("CONTACT", () => {
  it("shows the facilitator mobile number", () => {
    expect(CONTACT.phone).toBe("+54 9 11 4060-9024");
  });

  it("builds a WhatsApp chat link for the number", () => {
    expect(CONTACT.whatsapp_url).toBe("https://wa.me/5491140609024");
  });

  it("links to the Instagram profile", () => {
    expect(CONTACT.instagram_url).toBe(
      "https://www.instagram.com/eutoniaymeditacion/",
    );
  });
});

describe("build_whatsapp_url", () => {
  it("strips formatting from the phone number", () => {
    expect(build_whatsapp_url("+54 9 11 4060-9024")).toBe(
      "https://wa.me/5491140609024",
    );
  });

  it("throws when the number is too short", () => {
    expect(() => build_whatsapp_url("123")).toThrow(
      "Invalid phone number: 123",
    );
  });
});

describe("build_title", () => {
  it("returns the home title when the page title is empty", () => {
    expect(build_title("")).toBe(SITE.home_title);
  });

  it("returns the home title when the page title is only whitespace", () => {
    expect(build_title("   ")).toBe(SITE.home_title);
  });

  it("appends the site name to a page title", () => {
    expect(build_title("Sesiones")).toBe(`Sesiones | ${SITE.name}`);
  });

  it("trims surrounding whitespace from the page title", () => {
    expect(build_title("  Contacto  ")).toBe(`Contacto | ${SITE.name}`);
  });
});
