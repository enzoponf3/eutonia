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
  SITE,
  build_title,
  build_whatsapp_url,
} from "../src/lib/site";

describe("SITE", () => {
  it("uses the brand title", () => {
    expect(SITE.name).toBe("Eutonia y meditación");
  });

  it("targets people from Buenos Aires", () => {
    expect(SITE.location).toBe("Buenos Aires");
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
    expect(HERO.image).toBe("/photos/start.jpg");
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
      "Es preciso aprender cada día un poco más que somos ese cuerpo " +
        "en el cual podemos apoyarnos.",
    );
  });

  it("attributes the quote to Gerda Alexander", () => {
    expect(GERDA.author).toBe("Gerda Alexander");
  });
});

describe("LOCATION", () => {
  it("uses the section title", () => {
    expect(LOCATION.title).toBe("¿Dónde nos encontramos?");
  });

  it("names the place and its full address", () => {
    expect(LOCATION.place).toBe("Gymdance");
    expect(LOCATION.address).toBe(
      "Gral. Lavalle 2993, Victoria, Provincia de Buenos Aires",
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

  it("explains the name and the origin in two sections", () => {
    expect(EUTONIA.sections.map((section) => section.title)).toEqual([
      "¿Qué significa eutonía?",
      "Cómo nació",
    ]);
  });

  it("gives every section an image, a caption and paragraphs", () => {
    for (const section of EUTONIA.sections) {
      expect(section.image.startsWith("/")).toBe(true);
      expect(section.image_alt.length).toBeGreaterThan(10);
      expect(section.image_caption.length).toBeGreaterThan(10);
      expect(section.paragraphs.length).toBeGreaterThan(0);
    }
  });

  it("presents the practice in three principles", () => {
    expect(EUTONIA.principles.items).toHaveLength(3);
    expect(EUTONIA.principles.items.map((item) => item.title)).toEqual([
      "Escuchar",
      "Regular el tono",
      "Volver al presente",
    ]);
  });

  it("invites the visitor to book or write", () => {
    expect(EUTONIA.cta.title).toBe("¿Querés conocer la práctica?");
    expect(EUTONIA.cta.text.length).toBeGreaterThan(20);
  });
});

describe("ABOUT", () => {
  it("uses the facilitator portrait", () => {
    expect(ABOUT.image).toBe("/photos/facilitator.svg");
    expect(ABOUT.image_alt.length).toBeGreaterThan(10);
  });

  it("tells who the facilitator is and how she found eutonía", () => {
    expect(ABOUT.intro).toContain("eutonía");
    expect(ABOUT.journey.eyebrow).toBe("Mi recorrido");
    expect(ABOUT.journey.paragraphs.length).toBeGreaterThanOrEqual(3);
  });

  it("describes the practice space with an image", () => {
    expect(ABOUT.approach.image).toBe(HERO.image);
    expect(ABOUT.approach.paragraphs.length).toBeGreaterThan(0);
  });

  it("presents the values in three cards", () => {
    expect(ABOUT.values.items).toHaveLength(3);
    expect(ABOUT.values.items.map((item) => item.title)).toEqual([
      "Escucha",
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
  it("returns the site name when the page title is empty", () => {
    expect(build_title("")).toBe(SITE.name);
  });

  it("returns the site name when the page title is only whitespace", () => {
    expect(build_title("   ")).toBe(SITE.name);
  });

  it("appends the site name to a page title", () => {
    expect(build_title("Sesiones")).toBe(`Sesiones | ${SITE.name}`);
  });

  it("trims surrounding whitespace from the page title", () => {
    expect(build_title("  Contacto  ")).toBe(`Contacto | ${SITE.name}`);
  });
});
