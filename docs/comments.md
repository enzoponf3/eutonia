# Comments and alumni testimonials on a static Astro site

> Proposal for **eutonia**. Last updated: 2026-11-12.
>
> Scope: how to add a comments / testimonials section without turning the site
> into a server-rendered application. This document is a plan; it does not add
> code to `src/` yet.

## 0. Recommendation in one paragraph

Use a **build-time "Voces de la práctica" section** fed by a private form and a
`src/data/testimonials.json` file. It is the only option that keeps the site
100% static, guarantees that only approved alumni comments are published, avoids
third-party tracking, and gives the facilitator editorial control. Add live
comments later only if there is a real need: **Giscus** for an open thread, or
**Supabase** if comments must stay alumni-only.

## 1. Current constraints

- Astro is configured in static mode. `astro.config.mjs` has no adapter, so
  `npm run build` writes prerendered HTML to `dist/`.
- The site has no auth, database, API routes or server runtime.
- The audience is non-technical and Spanish-speaking, with mobile first.
- The business is health-adjacent. Privacy, consent and moderation matter more
  than "real-time" features.
- Existing design tokens: primary `#5c5f3f`, secondary `#3f5c5f`, accent
  `#5f3f5c`; Cormorant Garamond (`font-formal`) and Caveat (`font-organic`).
- Only people who already took a course should appear in the section.

## 2. What "static" means for comments

A comments section needs three things:

| Need      | Static-site answer                                         |
|-----------|------------------------------------------------------------|
| Storage   | A file in the repo (build time) or an external service     |
| Identity  | Manual verification (curated) or an external auth provider |
| Moderation| A human approval step, before or after publication         |

There are three viable patterns:

1. **Build-time content.** A form stores responses outside the site; the
   facilitator approves them and commits them to the repo. Astro renders them
   during `npm run build`. The deployed site is pure HTML/CSS.
2. **Third-party embed.** A script loads a hosted comment thread in an iframe
   (Giscus, Utterances, Disqus). The site stays static, but adds a third-party
   script and depends on that service.
3. **Static frontend + BaaS.** The HTML shell is static; the browser talks
   directly to a Backend-as-a-Service (Supabase, Firebase) for auth and data.
   The site is static only in hosting terms: comments are fetched at runtime.

```
Curated:  private form -> facilitator -> JSON -> git push -> build -> HTML
Giscus:   browser -> giscus.app -> GitHub Discussions
Supabase: browser -> Supabase Auth + Postgres (RLS) -> rendered list
```

## 3. Options compared

| Option                     | Alumni-only      | Live     | Build output              | Runtime JS       | Effort | Cost         | Fit |
|----------------------------|------------------|----------|---------------------------|------------------|--------|--------------|-----|
| Curated build-time         | Yes (manual)     | No       | 100% static               | None             | Low    | Free         | **Recommended** |
| Giscus                     | No               | Yes      | Static + iframe           | Giscus script    | Low    | Free         | Open comments |
| Supabase                   | Yes (RLS)        | Yes      | Static shell, dynamic     | Supabase SDK     | Medium | Free tier    | Strict alumni |
| Disqus                     | No               | Yes      | Static + embed            | Heavy            | Low    | Free with ads| Not recommended |

Notes:

- **Giscus** uses GitHub accounts, so it cannot guarantee that only alumni
  comment. It is excellent for developer blogs, not for wellness clients.
- **Supabase** can enforce alumni-only access with Row Level Security, but it
  adds an external service and auth emails.
- **Disqus** adds ads, tracking and a heavy script. It is not a good fit for a
  calm, privacy-conscious brand.

## 4. Recommended: curated alumni testimonials

### 4.1 Flow

1. After a course, the facilitator sends a **private form link** to the alumni
   via WhatsApp or email.
2. The alumni fill in their name, course, a short quote and a consent checkbox.
3. The facilitator checks the response against the booking records, edits the
   text if needed and copies the approved entry into
   `src/data/testimonials.json`.
4. The change is committed. The next build prerenders the section.
5. Visitors see only approved testimonials. No visitor data is fetched at
   runtime.

This keeps the "alumni-only" requirement at the human level, where it is easy to
verify, and keeps the website fully static.

### 4.2 Collecting with a private form

Use **Tally** or **Google Forms**. Both are free and need no server.

Suggested fields:

| Field                    | Type                  | Notes |
|--------------------------|-----------------------|-------|
| Nombre o iniciales       | short text, required  | Ask how they want to appear in public |
| Curso o plan             | short text, required  | Mensual, Online, 1 clase, etc. |
| Fecha aproximada         | month, optional       | Useful for ordering |
| Comentario               | long text, required   | 280–600 characters is a good range |
| Autorización de publicación | checkbox, required | "Autorizo a publicar mi nombre y comentario en el sitio" |
| Sitio web                | hidden honeypot       | Spam protection; leave empty |

Rules:

- Do **not** publish the form link on the website. Share it privately with
  alumni. If you need a public entry point, use a "Pedí el formulario por
  WhatsApp" button instead.
- Ask for the **public display name** explicitly. Do not assume the full name
  can be published.
- Do not collect email, phone, health history or any other personal data that
  is not needed to publish the testimonial.
- Mention in the form: "No publicaremos tu email ni tu teléfono. Podés pedir la
  eliminación de tu comentario en cualquier momento."

### 4.3 Data file

Create `src/data/testimonials.json`. Keep `published: false` until the quote is
real, approved and has consent.

```json
{
  "items": [
    {
      "id": "{{id}}",
      "name": "{{name}}",
      "course": "{{course}}",
      "date": "{{YYYY-MM}}",
      "quote": "{{testimonial}}",
      "consent": true,
      "published": false
    }
  ]
}
```

The placeholders are intentional. Do not invent testimonials, names or quotes.
The landing-page design rules for this repository also require real facts or
clearly marked placeholders.

### 4.4 Loader and validation

Create `src/lib/testimonials.ts`:

```ts
import raw from "../data/testimonials.json";

export interface Testimonial {
  id: string;
  name: string;
  course: string;
  date: string;
  quote: string;
  consent: boolean;
  published: boolean;
}

const ITEMS = raw.items as Testimonial[];

export function validate_testimonial(item: Testimonial): void {
  if (!item.id.trim()) {
    throw new Error("Testimonial id is required");
  }
  if (!item.name.trim()) {
    throw new Error(`Testimonial ${item.id} has no name`);
  }
  if (!item.quote.trim()) {
    throw new Error(`Testimonial ${item.id} has no quote`);
  }
  if (item.quote.length > 600) {
    throw new Error(`Testimonial ${item.id} is longer than 600 characters`);
  }
}

export function published_testimonials(
  items: readonly Testimonial[] = ITEMS,
): Testimonial[] {
  return items
    .filter((item) => item.published && item.consent)
    .filter((item) => {
      validate_testimonial(item);
      return true;
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}
```

The loader is intentionally strict: a malformed published testimonial stops the
build instead of shipping broken or unconsented content.

### 4.5 Component

Create `src/components/Testimonials.astro`:

```astro
---
import { CONTACT } from "../lib/site";
import { published_testimonials } from "../lib/testimonials";

const items = published_testimonials();
const feedback_url =
  `${CONTACT.whatsapp_url}?text=` +
  encodeURIComponent("Hola, hice un curso y quiero compartir mi experiencia.");
---

{
  items.length > 0 && (
    <section
      id="voces"
      aria-labelledby="voces-title"
      class="scroll-mt-28 bg-stone-100 py-16 sm:py-24"
    >
      <div class="mx-auto max-w-5xl px-6">
        <div class="mx-auto max-w-2xl text-center">
          <p class="font-organic text-3xl text-accent">Voces</p>
          <h2
            id="voces-title"
            class="mt-2 text-3xl font-semibold text-balance text-stone-900 sm:text-4xl"
          >
            Lo que se llevan de la práctica
          </h2>
          <p class="mt-4 text-lg leading-relaxed text-pretty text-stone-600">
            Experiencias de personas que ya participaron de los encuentros.
          </p>
        </div>

        <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <figure class="flex h-full flex-col rounded-2xl border border-primary/10 bg-white p-6 shadow-sm">
              <span
                class="font-organic text-5xl leading-none text-accent/30"
                aria-hidden="true"
              >
                “
              </span>
              <blockquote class="mt-2 flex-1 text-lg leading-relaxed text-pretty text-stone-700">
                <p>{item.quote}</p>
              </blockquote>
              <figcaption class="mt-5 text-sm font-medium text-primary">
                {item.name}
                <span class="block font-normal text-stone-600">
                  {item.course}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <p class="mt-10 text-center">
          <a
            class="inline-flex rounded-full border border-secondary px-5 py-3 text-sm font-medium text-secondary transition hover:bg-secondary hover:text-white"
            href={feedback_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            ¿Hiciste un curso? Contanos tu experiencia
            <span class="sr-only"> (abre WhatsApp en una pestaña nueva)</span>
          </a>
        </p>
      </div>
    </section>
  )
}
```

If there are no approved testimonials, the whole section disappears. This avoids
an empty social-proof block.

### 4.6 Add it to the home page

Edit `src/pages/index.astro` and place the section after Gerda and before Plans:

```astro
---
import Layout from "../layouts/Layout.astro";
import Hero from "../components/Hero.astro";
import Description from "../components/Description.astro";
import Gerda from "../components/Gerda.astro";
import Testimonials from "../components/Testimonials.astro";
import Plans from "../components/Plans.astro";
import Location from "../components/Location.astro";
import Contact from "../components/Contact.astro";
---

<Layout title="">
  <Hero />
  <Description />
  <Gerda />
  <Testimonials />
  <Plans />
  <Location />
  <Contact />
</Layout>
```

Placement rationale: social proof appears after the philosophy and before the
pricing, so it supports the decision to book. The `bg-stone-100` background
separates it from the white Gerda section and the `bg-stone-50` Plans section.

### 4.7 Tests

Create `tests/testimonials.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import {
  published_testimonials,
  validate_testimonial,
  type Testimonial,
} from "../src/lib/testimonials";

const base: Testimonial = {
  id: "persona-de-prueba-2026-01",
  name: "Persona de prueba",
  course: "Curso de prueba",
  date: "2026-01",
  quote: "Comentario de prueba",
  consent: true,
  published: true,
};

describe("published_testimonials", () => {
  it("keeps only published items with consent", () => {
    const items = [
      base,
      { ...base, id: "sin-consentimiento", consent: false },
      { ...base, id: "sin-publicar", published: false },
    ];

    expect(published_testimonials(items).map((item) => item.id)).toEqual([
      base.id,
    ]);
  });

  it("sorts newest first", () => {
    const items = [
      { ...base, id: "old", date: "2025-01" },
      { ...base, id: "new", date: "2026-03" },
    ];

    expect(published_testimonials(items).map((item) => item.id)).toEqual([
      "new",
      "old",
    ]);
  });

  it("returns an empty list when nothing is approved", () => {
    expect(
      published_testimonials([{ ...base, published: false }]),
    ).toEqual([]);
  });
});

describe("validate_testimonial", () => {
  it("throws when the quote is empty", () => {
    expect(() => validate_testimonial({ ...base, quote: "   " })).toThrow(
      /has no quote/,
    );
  });

  it("throws when the quote is too long", () => {
    expect(() =>
      validate_testimonial({ ...base, quote: "a".repeat(601) }),
    ).toThrow(/longer than 600/);
  });
});
```

Add a layout assertion if the repo style requires it, for example checking that
`src/pages/index.astro` renders `<Testimonials />` after `<Gerda />` and before
`<Plans />`.

### 4.8 Moderation and removal

- Set `published: true` only after checking consent and that the person took a
  course.
- To remove a testimonial, set `published: false`, redeploy, and delete the raw
  form response if the person requested it.
- Keep the consent record while the testimonial is published.
- Reject medical claims, third-party names without consent, phone numbers,
  emails, addresses and anything that could identify a third person.
- Prefer first name plus initial if the person wants some privacy.

### 4.9 Pros and cons

Pros:

- 100% static output, no third-party scripts, no cookies.
- Alumni-only by design, verified by the facilitator.
- No spam; every quote is reviewed.
- Fast, SEO-friendly HTML.
- Fits the current Astro setup and test conventions.

Cons:

- Not a live thread; a rebuild is needed to show new comments.
- Manual work for the facilitator.
- No replies or notifications unless another tool is added.

## 5. Alternative: Giscus (live, GitHub Discussions)

Choose Giscus only if you want a live thread and accept that the audience needs
GitHub accounts. It does **not** guarantee "only alumni can comment".

### 5.1 Setup

1. Create a **public** repository, for example `OWNER/eutonia-comments`. Using a
   separate repository keeps site commits and comment moderation separate.
2. In the repository settings, enable **Discussions**.
3. Install the **giscus** GitHub App on that repository.
4. Create a discussion category named `Comentarios`. The `Announcements` format
   is useful because only maintainers can create new discussions, while anyone
   can reply.
5. Open <https://giscus.app>, select the repository and category, and copy the
   generated `data-repo-id` and `data-category-id`.
6. Add a component to the page.

### 5.2 Component

```astro
<section
  id="comentarios"
  aria-labelledby="comentarios-title"
  class="scroll-mt-28 bg-stone-100 py-16 sm:py-24"
>
  <div class="mx-auto max-w-3xl px-6">
    <h2
      id="comentarios-title"
      class="text-3xl font-semibold text-balance text-stone-900 sm:text-4xl"
    >
      Comentarios
    </h2>
    <p class="mt-4 text-base leading-relaxed text-stone-600">
      Este espacio es para personas que ya participaron de un curso. Para
      comentar, iniciá sesión con GitHub.
    </p>

    <div class="giscus mt-10"></div>

    <script
      is:inline
      src="https://giscus.app/client.js"
      data-repo="OWNER/eutonia-comments"
      data-repo-id="REPO_ID"
      data-category="Comentarios"
      data-category-id="CATEGORY_ID"
      data-mapping="pathname"
      data-strict="1"
      data-reactions-enabled="1"
      data-emit-metadata="0"
      data-input-position="top"
      data-theme="light"
      data-lang="es"
      data-loading="lazy"
      crossorigin="anonymous"
      async
    ></script>
  </div>
</section>
```

Replace `OWNER`, `REPO_ID`, `CATEGORY_ID` with the values from giscus.app. Do not
commit secrets: these IDs are public configuration, not credentials.

### 5.3 What to know

- Visitors need a GitHub account to comment. For a wellness audience this is a
  strong filter and may reduce participation to almost zero.
- Anyone with a GitHub account can comment; alumni-only is not enforceable.
- Comments are public in GitHub Discussions and linked to the commenter's
  GitHub profile. Tell visitors this before the widget loads.
- Giscus itself is open source and does not run ads or tracking, but GitHub
  processes the data. Review GitHub's privacy policy.
- `data-mapping="pathname"` creates one thread per URL. If a URL changes, the
  old thread does not follow.
- `data-loading="lazy"` defers the iframe until it is near the viewport, which
  protects Core Web Vitals.
- If a strict Content Security Policy is added later, allowlist `giscus.app`
  for `script-src`, `frame-src`, `connect-src` and `style-src`, plus the GitHub
  avatar hosts.
- Test the widget on the deployed URL. Some environments block it on
  `localhost`.

## 6. Alternative: Supabase (alumni-only live comments)

Choose Supabase if live comments are required and "alumni-only" is
non-negotiable.

### 6.1 Architecture

- The Astro build stays static; the browser fetches comments at runtime.
- Supabase Auth sends magic links. Public sign-ups are disabled, so only
  accounts created by the facilitator can sign in.
- An `alumni` table maps `user_id` to a public display name and course.
- A `comments` table stores comments with a `pending` / `approved` / `rejected`
  status.
- Row Level Security (RLS) lets anyone read approved comments, lets alumni
  insert pending comments, and prevents non-alumni from posting.
- Moderation happens in the Supabase Table Editor with the service role. The
  service role key never reaches the browser.

```
Browser (static Astro)
  -> Supabase Auth (magic link)
  -> Supabase Postgres comments (RLS)
  -> approved comments rendered client-side
```

### 6.2 Schema and policies

```sql
create table public.alumni (
  user_id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null,
  course text not null,
  created_at timestamptz not null default now()
);

alter table public.alumni enable row level security;

create policy "alumni read their own profile"
on public.alumni
for select
to authenticated
using (user_id = (select auth.uid()));

create table public.comments (
  id uuid primary key default gen_random_uuid(),
  page text not null default 'home',
  author_id uuid not null references auth.users (id) on delete cascade,
  author_name text not null,
  course text not null default '',
  body text not null check (char_length(body) between 1 and 2000),
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

alter table public.comments enable row level security;

create policy "public reads approved comments"
on public.comments
for select
to anon, authenticated
using (status = 'approved');

create policy "alumni insert their own pending comments"
on public.comments
for insert
to authenticated
with check (
  author_id = (select auth.uid())
  and exists (
    select 1 from public.alumni
    where user_id = (select auth.uid())
  )
  and status = 'pending'
);

create policy "authors read their own comments"
on public.comments
for select
to authenticated
using (author_id = (select auth.uid()));
```

To prevent a client from choosing its own display name or approving its own
comment, use a `before insert` trigger:

```sql
create or replace function public.fill_comment_author()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  select display_name, course
    into new.author_name, new.course
  from public.alumni
  where user_id = auth.uid();

  if new.author_name is null then
    raise exception 'Only alumni can comment';
  end if;

  new.author_id := auth.uid();
  new.status := 'pending';
  return new;
end;
$$;

create trigger fill_comment_author
before insert on public.comments
for each row execute function public.fill_comment_author();
```

The trigger runs before RLS is checked and enforces the real display name and the
pending status. Only the facilitator (service role) can update `status`.

### 6.3 Auth flow

1. In Supabase Auth settings, disable "Allow new users to sign up".
2. Create each alumni user by email in the Supabase dashboard.
3. Insert a row in `public.alumni` with that user's `user_id`, the public
   `display_name` and the `course`.
4. The alumni opens the site, enters their email and receives a magic link.
5. Only allowlisted users can insert comments; everyone can read approved ones.
6. The facilitator changes `status` to `approved` in the Table Editor.

For production, configure custom SMTP (for example Resend or Postmark) so magic
links arrive reliably. The built-in email service has strict limits.

### 6.4 Client sketch

Install the SDK:

```bash
npm install @supabase/supabase-js
```

Create `src/lib/supabase.ts`:

```ts
import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.PUBLIC_SUPABASE_URL;
const key = import.meta.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!url || !key) {
  throw new Error("Supabase environment variables are missing");
}

export const supabase = createClient(url, key);
```

`PUBLIC_SUPABASE_PUBLISHABLE_KEY` is the newer name; older projects may call it
`PUBLIC_SUPABASE_ANON_KEY`. Never use the `service_role` key in client code.

A simplified component script:

```astro
<form id="signin-form">
  <label for="email">Tu email</label>
  <input id="email" name="email" type="email" autocomplete="email" required />
  <button type="submit">Recibir enlace para entrar</button>
</form>

<form id="comment-form" hidden>
  <label for="comment-body">Tu comentario</label>
  <textarea
    id="comment-body"
    name="body"
    required
    maxlength="2000"
  ></textarea>
  <button type="submit">Enviar para revisión</button>
</form>

<p id="comments-status" role="status"></p>
<div id="comments-list" aria-live="polite"></div>

<script>
  import { supabase } from "../lib/supabase";

  const signin = document.querySelector("#signin-form");
  const form = document.querySelector("#comment-form");
  const status = document.querySelector("#comments-status");
  const list = document.querySelector("#comments-list");

  async function load_comments() {
    const { data, error } = await supabase
      .from("comments")
      .select("id, author_name, course, body, created_at")
      .eq("page", "home")
      .eq("status", "approved")
      .order("created_at", { ascending: false });

    if (error) {
      status.textContent = "No pudimos cargar los comentarios.";
      return;
    }

    list.replaceChildren(
      ...data.map((comment) => {
        const figure = document.createElement("figure");
        const quote = document.createElement("blockquote");
        const body = document.createElement("p");
        const caption = document.createElement("figcaption");

        body.textContent = comment.body;
        quote.append(body);
        caption.textContent = comment.course
          ? `${comment.author_name} · ${comment.course}`
          : comment.author_name;
        figure.append(quote, caption);
        return figure;
      }),
    );
  }

  async function sync_session() {
    const { data } = await supabase.auth.getUser();
    form.hidden = !data.user;
    status.textContent = data.user
      ? "Ya podés dejar tu comentario. Se publicará después de la revisión."
      : "Iniciá sesión para dejar tu comentario.";
  }

  signin.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = new FormData(signin).get("email")?.toString().trim() ?? "";
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/#comentarios` },
    });
    status.textContent = error
      ? "No pudimos enviar el enlace."
      : "Revisá tu email para entrar.";
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const body = new FormData(form).get("body")?.toString().trim() ?? "";
    if (!body) return;

    const { error } = await supabase
      .from("comments")
      .insert({ page: "home", body });

    if (error) {
      status.textContent = "No pudimos enviar tu comentario.";
      return;
    }

    form.reset();
    status.textContent =
      "Gracias. Tu comentario quedará visible cuando lo revisemos.";
  });

  supabase.auth.onAuthStateChange(() => {
    sync_session();
  });

  load_comments();
  sync_session();
</script>
```

This is a sketch, not production code. Add proper error states, loading states,
focus management and tests before shipping it.

### 6.5 What to know

- The site is no longer fully static in behavior: comments are fetched at
  runtime and are not in the build output. If comments must be in the HTML for
  SEO or social proof, use the curated option.
- Supabase becomes a dependency for auth, data, email delivery and uptime.
- The free tier is enough for a small practice, but check current limits and
  pricing before committing.
- RLS is the security boundary. Never expose the service role key.
- Use `textContent` for user data, not `innerHTML`.
- Add a length limit and moderation. Alumni-only reduces spam, but does not
  eliminate abuse.
- If abuse appears, add rate limiting with an Edge Function or a database
  trigger, not only client-side validation.

## 7. Design and copy for eutonia

### 7.1 Placement

Add the section to the home page between **Gerda** and **Plans**. Optionally add
a shorter version to `/sobre-mi` before its closing CTA.

### 7.2 Visual rules

- Section background: `bg-stone-100`, to separate it from the white Gerda
  section and the `bg-stone-50` Plans section.
- Eyebrow: `font-organic text-3xl text-accent` ("Voces").
- Heading: `<h2>` with `text-3xl font-semibold text-balance text-stone-900
  sm:text-4xl`.
- Cards: white, `rounded-2xl`, `border border-primary/10`, `p-6`,
  `shadow-sm`.
- Quote mark: `font-organic text-5xl text-accent/30`, decorative and hidden from
  assistive technology.
- Quote text: `text-lg leading-relaxed text-pretty text-stone-700`.
- Name: `text-sm font-medium text-primary`; course: `text-stone-600`.
- CTA: outlined secondary pill (`border-secondary`), not a second primary
  button. The primary action on the page remains `Reservar`.
- Show 3 to 6 testimonials on mobile. If there are many, link to a dedicated
  page instead of building an auto-rotating carousel.

### 7.3 Copy suggestions

- Eyebrow: "Voces"
- Title: "Lo que se llevan de la práctica"
- Description: "Experiencias de personas que ya participaron de los encuentros."
- CTA: "¿Hiciste un curso? Contanos tu experiencia"
- Empty state: render nothing; do not show an empty section.
- Do not invent quotes, names, ratings or statistics. Use real, consented
  testimonials only.

### 7.4 Optional enhancements

- A small "Participó del curso mensual" badge, only if it is true.
- A `<details>` block with more testimonials, for a no-JS "Ver más".
- A dedicated `/voces` page if the list grows beyond 9 items.
- A "Verificado" check icon with visible text, not color alone.

## 8. Privacy, security and legal

- Get explicit consent to publish the name (or initials) and the comment.
  Keep the consent record while the comment is published.
- Collect the minimum data: display name, course, date, quote and consent. Do
  not collect health information.
- Publish only what was consented to. Strip emails, phone numbers, addresses
  and third-party names.
- Provide a simple removal path: "Escribime por WhatsApp para editar o borrar
  tu comentario."
- If a third-party form, Giscus or Supabase is used, add a short notice before
  the widget and link to that provider's privacy policy.
- In Argentina, personal data handling falls under Ley 25.326 (Protección de
  Datos Personales). This document is not legal advice; review the final flow
  with the facilitator and, if needed, a lawyer.
- Avoid tracking pixels, ads and third-party analytics inside the comments
  section.
- If a Content Security Policy is added later, allowlist only the exact origins
  used by the chosen comment system. Do not use broad `https:` allowlists.
- Render user content as text. Astro escapes server-rendered expressions; in
  client-side code use `textContent`, never `innerHTML`.

## 9. Accessibility and performance

### 9.1 Accessibility

- Use `<figure>`, `<blockquote>` and `<figcaption>` for each testimonial.
- Keep one `<h2>` per section. Do not use names as headings unless you use
  `<h3>` consistently.
- Do not rely on color alone for ratings or verification badges. Add text.
- Keep the CTA keyboard reachable and show a visible focus ring.
- External links open in a new tab: add a visually hidden note such as
  "abre en una pestaña nueva".
- Do not build an auto-rotating carousel. If a slider is unavoidable, provide
  pause/next/previous controls and keyboard support.
- For a third-party iframe, provide a fallback link: "Ver comentarios en
  GitHub".
- Test with keyboard only and with a screen reader at 375px, 768px and 1440px.

### 9.2 Performance

- Curated build-time testimonials: zero JavaScript, zero third-party requests,
  no layout shift.
- If images or avatars are added, use WebP/AVIF, `width` and `height`, and
  `loading="lazy"` below the fold.
- Giscus: use `data-loading="lazy"` and reserve space with a `min-height` to
  avoid layout shift.
- Supabase: defer loading the SDK and comments until the section is near the
  viewport, or load them after a "Ver comentarios" click. Show a skeleton with
  a fixed height and an error state.
- Do not load any comment system above the fold or before the hero image.

## 10. Verification checklist

Before marking the implementation as done:

- [ ] `./init.sh` exits with code 0 (use Git Bash on Windows).
- [ ] `npm test` passes with the new testimonial tests.
- [ ] `npm run check` reports 0 errors.
- [ ] `npm run build` succeeds.
- [ ] `dist/index.html` contains `id="voces"` and only approved testimonials.
- [ ] An unpublished or unconsented item never appears in `dist/`.
- [ ] The section is hidden when there are no approved items.
- [ ] Mobile layout at 375px, tablet at 768px and desktop at 1440px look right.
- [ ] Keyboard focus reaches the CTA with a visible ring.
- [ ] Screen reader announces the section heading and each quote/caption.
- [ ] No third-party scripts are loaded in the curated option.
- [ ] If Giscus: posting, replying and moderation work on the deployed URL.
- [ ] If Supabase: a non-alumni account cannot insert; pending comments are
      hidden; approved comments appear; RLS blocks the service role key from
      the client.
- [ ] `progress/current.md` is updated and `feature_list.json` reflects the
      feature status.

## 11. Rollout plan

### Phase 1 — curated testimonials (recommended)

1. Choose Tally or Google Forms and create the private form.
2. Collect 5 to 8 real testimonials with consent.
3. Add `src/data/testimonials.json`, `src/lib/testimonials.ts`,
   `src/components/Testimonials.astro` and `tests/testimonials.test.ts`.
4. Add `<Testimonials />` between Gerda and Plans.
5. Run `./init.sh`, `npm run check` and `npm run build`.
6. Deploy and check the section on mobile.
7. Add the WhatsApp CTA so alumni can ask for the form.
8. Review the section after each course.

### Phase 2 — live comments (only if needed)

- Use **Giscus** for an open thread with GitHub accounts.
- Use **Supabase** if the comments must remain alumni-only.
- Do not run both systems at the same time; choose one source of truth.
- Keep moderation manual until there is evidence that it needs automation.

## 12. Open questions for the facilitator

- How many testimonials are expected in the first year?
- Do the alumni use GitHub? If not, Giscus is not a good fit.
- Is a live thread required, or is a curated wall enough for social proof?
- Who moderates comments, and how often?
- Is there a booking list or email list to verify who took a course?
- Are alumni comfortable with their name being public, or should the site use
  initials?
- Is there budget for a paid service if Supabase outgrows the free tier?

## 13. References

- Astro static site generation: <https://docs.astro.build/en/guides/static-site-generation/>
- Giscus: <https://giscus.app/>
- Supabase Row Level Security: <https://supabase.com/docs/guides/database/postgres/row-level-security>
- Supabase with Astro: <https://supabase.com/docs/guides/getting-started/quickstarts/astrojs>
- MDN `<blockquote>`: <https://developer.mozilla.org/en-US/docs/Web/HTML/Element/blockquote>
- MDN `<figure>`: <https://developer.mozilla.org/en-US/docs/Web/HTML/Element/figure>
- WCAG 2.2 Quick Reference: <https://www.w3.org/WAI/WCAG22/quickref/>
- Argentina, Ley 25.326 (Protección de Datos Personales)
