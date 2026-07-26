# EnginTherm — AI Problem-Solving Assistant for Mechanical Engineering Students

**Live App:** [https://engintherm.vercel.app/](https://engintherm.vercel.app/)

---

## a. What It Does & The Problem It Solves

Mechanical engineering students take 5–6 dense subjects at once — Thermodynamics, Fluid Mechanics, Heat Transfer, Machine Design, Manufacturing Processes, and Engineering Math — and constantly get stuck on numerical problems with no TA or professor available at the moment they need help (e.g. late-night assignment work, exam prep).

Generic AI chatbots answer engineering problems inconsistently — sometimes skipping assumptions, sometimes not checking units, sometimes just dumping a final number with no method shown. That's not how engineering problems are supposed to be solved, and it's not how they're graded.

**EnginTherm** is a focused study tool for mechanical engineering students that takes any problem statement and returns a solution in the exact structure a professor expects: **Given → Assumptions → Governing Equation → Solution Steps → Units Check → Final Answer.** It's built for self-study and assignment cross-checking, not as a general-purpose chatbot.

**Built for:** mechanical (and general) engineering undergraduates studying core courses, especially during exam prep or assignment crunch.

---

## b. Live Deployed URL

🔗 **[https://engintherm.vercel.app/](https://engintherm.vercel.app/)**

Open it in a private/incognito tab to confirm it works without any login.

---

## c. Features

*(Edit this list to match exactly what your app can do — remove anything below that isn't actually built, add anything that is.)*

- **Subject picker** — choose from Thermodynamics, Fluid Mechanics, Heat Transfer, Machine Design, Manufacturing Processes, or Engineering Math
- **AI Structured Solver** — paste any problem and get a step-by-step, professor-style solution (see Section d)
- **Solution history** — solved problems are saved locally with subject tag and timestamp, and can be reopened
- **Quick reference sidebar** — key formulas and unit conversions per subject, available instantly with no AI call needed
- **Copy/export solution** — copy the AI's formatted answer to paste directly into assignment notes
- **Loading and error states** — clear feedback while the AI is generating a solution, and a graceful message if the request fails

---

## d. The AI Feature

**What it does:** Takes the student's problem statement plus the selected subject, and returns a solution that always follows a fixed, rigorous structure — so the output is directly usable for learning or for checking your own work, not just a wall of unstructured text.

**Model used:** Google **Gemini API**, called from a server-side Express route (`server.ts` / `/api`) so the key is never exposed to the browser. *(Confirm and paste your exact model string here, e.g. `gemini-2.5-flash` — check the actual value in your `server.ts` or `/api` code before submitting.)*

**Exact system prompt used:**

```
You are EnginTherm, an expert mechanical engineering tutor. A student will give you
a problem statement and the subject it belongs to (Thermodynamics, Fluid Mechanics,
Heat Transfer, Machine Design, Manufacturing Processes, or Engineering Math).

Always answer using EXACTLY this structure, with these headings, in this order:

**Given / Known Data**
- List every value provided in the problem with units.

**Assumptions**
- State any standard engineering assumptions needed to solve it (e.g., ideal gas,
  steady state, negligible friction) — only if relevant. If none are needed, say
  "No additional assumptions required."

**Governing Equation(s)**
- Name and write the relevant equation(s) in standard engineering notation.

**Solution Steps**
- Solve step by step, showing substitution of values and intermediate results.
  Keep units attached at every step.

**Units Check**
- Briefly confirm the final answer's units are dimensionally correct.

**Final Answer**
- State the final numeric result clearly, bolded, with correct units and
  appropriate significant figures.

Formatting rules for equations and calculations:
- NEVER use LaTeX syntax. Do not use $, $$, \frac{}{}, \text{}, \sqrt{}, \times, \approx,
  or any backslash commands.
- Write all equations and calculations in plain, readable text using standard
  keyboard characters only. For example:
  - Fractions: write "A1 = (π/4) × D1^2" instead of \frac notation
  - Square roots: write "sqrt(2gH)" instead of \sqrt{}
  - Multiplication: use "×" or "*", not \times
  - Units: write "m^2" or "m/s" directly next to the number, not wrapped in \text{}
- Example of the correct style for a calculation line:
  "A1 = (π/4) × (0.15 m)^2 ≈ 0.017671 m^2"
- Every formula and substitution must be fully readable as plain text with no
  markup symbols other than standard math operators (+, -, ×, /, ^, √, π).

Rules:
- If the problem is ambiguous or missing data, ask ONE clarifying question instead
  of guessing, under a "Clarification Needed" heading.
- If it's a conceptual (non-numeric) question, skip Units Check and answer with
  Given/Context, Explanation, and Key Takeaway instead.
- Be concise but complete — no filler, no repeating the question back verbatim.
- Never fabricate formulas; if unsure, say so explicitly rather than guessing.

**Request format sent to the model:**
```
Subject: {selected subject}
Problem: {student's typed problem}
```

---

## e. Tools, Services, and AI Models Used

| Category | Tool/Service |
|---|---|
| App builder | Google AI Studio (Build mode) |
| Frontend framework | React + TypeScript + Vite |
| Backend | Node.js + Express (`server.ts`) |
| Hosting/deployment | Vercel |
| AI model | Google Gemini API |
| Version control | GitHub |
| Planning | Claude (Anthropic) — used to write the product spec/PRD and this README |

---

## f. Screenshots

> Add at least 3 screenshots below before submitting.

1. **Home screen** — subject picker + empty problem input + reference sidebar visible
   `![Home screen](./screenshots/home.png)`

2. **Solved problem** — a submitted problem showing the full structured AI output (Given → Assumptions → Equation → Steps → Units Check → Final Answer)
   `![Solved example](./screenshots/solved-example.png)`

3. **History panel** — showing at least one saved past solution
   `![History panel](./screenshots/history.png)`

*(Create a `/screenshots` folder in your repo, drop your PNGs in, and the paths above will render automatically on GitHub.)*

---

## g. How to Run This Project Locally

```bash
# 1. Clone the repository
git clone https://github.com/mujeebrana620-art/Engintherm-.git
cd Engintherm-

# 2. Install dependencies
npm install

# 3. Set up environment variables
# Create a .env.local file in the root with:
GEMINI_API_KEY=your_gemini_api_key_here

# 4. Run the development server
npm run dev

# 5. Open the app in your browser
# (check your terminal output for the exact local port, e.g. http://localhost:3000)

# For a production build:
npm run build
npm start
```

**Note:** The Gemini API key is read server-side only (inside `server.ts` / the `/api` route) and is never exposed in frontend code or committed to this repository. On Vercel, it's stored as an encrypted Environment Variable under Project Settings.

---

## License / Academic Note

This project was built individually as a final project submission. The idea, system prompt design, and problem-solving structure are original work.
