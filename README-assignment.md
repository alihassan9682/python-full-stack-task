# Assignment: Modern Client Portal & Dashboard

A professional, responsive dashboard that collects a user's name and phone number and persists the data using Vercel Postgres/Supabase via Prisma. It features a modern sidebar UI, custom form components with inline Lucide icons, and interactive data visualization tabs using Recharts.

## Local Run Instructions

1. **Install Dependencies**
   ```bash
   pnpm install
   # or npm install / yarn
   ```

2. **Environment Variables**
   Create a `.env` file at the root of the project with your database connection strings:
   ```env
   DATABASE_URL="postgresql://user:password@host:port/mydb?pgbouncer=true"
   DIRECT_URL="postgresql://user:password@host:port/mydb"
   ```

3. **Database Setup**
   Apply the database schema to your configured database:
   ```bash
   npx prisma db push
   # or npx prisma migrate dev
   ```

4. **Run Development Server**
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000/](http://localhost:3000/) in your browser. *Note: Upon first launch, the app automatically generates 15 records of realistic dummy data to populate the Analytics graphs.*

## Core Features & Assumptions

- **Professional UI/UX**: Constructed a clean sidebar navigation interface using Tailwind CSS and Lucide React icons. Inputs have focus animations and custom layouts for improved usability.
- **Analytics & Visualizations**: Included `recharts` to render a Line Graph (Signups Over Time) and a Bar Graph (Daily Volume) alongside a traditional Data Table. They share a custom Tab switcher.
- **Data Initialization**: The root page detects if the database is empty and automatically pushes realistic names (e.g., "Michael Chen") and formatted numbers across the past 14 days so the visualizations look great out-of-the-box.
- **API + DB**: Uses a Next.js Server Action (`submitContactForm` in `actions.ts`) to securely insert data without a standalone API route endpoint.
- **Graceful Error Handling**: Displays success checks and error messages directly on the UI upon any submission issues, strictly preventing silent failures.

## How I Guided Development (Cursor / AI Assitant)

- **Scaffolding Code**: Initially described the exact requirements for a single-screen form and generated the Next.js Client Form (`form.tsx`) tied to a Prisma Server Action. 
- **Iterative UI Polishing**: Shifted from a functional prototype to a modern "Client Portal", prompting the AI to restructure the main page (`page.tsx`) into a dashboard and refine input fields with Lucide icons.
- **Visualization Integration**: Requested the addition of Recharts and instructed the AI to organize the graphs and tables into a clean, interactive tab-based component (`contact-stats.tsx`).
- **Data Seeding**: Instructed the AI to generate random real-world names and timestamps inside the Server Component to naturally populate the dashboard arrays upon initialization.
