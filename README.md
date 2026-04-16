## Contact Intake Dashboard (Next.js + Prisma + Postgres)

A simple one-screen dashboard where a user can enter a **name** and **phone number**, submit the form, and see confirmation that the data was saved to a database. The screen also shows a **recent submissions** table that refreshes immediately after a successful save.

### Tech

- **Next.js App Router** (server components + server actions)
- **Prisma** for DB access
- **Postgres** via `pg` + `@prisma/adapter-pg`
- **Tailwind CSS** for styling

### Local setup

**Prereq:** Node.js **20.19+** (required by Prisma).

1) Install dependencies

```bash
npm install
```

2) Configure environment variables (create `.env` in project root)

```env
DATABASE_URL="postgresql://..."
```

Notes:
- `DATABASE_URL` is used for runtime connections and Prisma CLI.
 

3) Apply schema / migrations

```bash
npm run prisma:migrate:deploy
# or, for local dev:
npm run prisma:migrate:dev
```

4) Run the dev server

```bash
npm run dev
```

Open `http://localhost:3000`.

### Deploy to Vercel

1) Push the repo to GitHub/GitLab/Bitbucket.

2) Create a Vercel project from the repo.

3) Provision a Postgres database (recommended: **Vercel Postgres**) and set env vars in Vercel:

- `DATABASE_URL`

4) Run migrations against the production DB (one-time, or whenever you add migrations):

```bash
vercel env pull .env.production.local
npm run prisma:migrate:deploy
```

5) Deploy. After it’s live, submit the form and confirm the new row appears in “Recent submissions”.

### Assumptions

- **Phone validation** is a basic plausibility check (digits/space/()/-/+; length range) — not full E.164 enforcement.
- Secrets live in `.env` and are not committed.

### Cursor / AI usage (optional)

- Used Cursor to refactor UI into small reusable components and to validate the end-to-end flow (form → server action → database → refreshed list).
