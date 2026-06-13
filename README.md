# Chola FC ⚽

Welcome to the official web application for **Chola FC**—India's premier sports development and football academy based in Chennai, India. Inspired by the excellence and legacy of the Chola dynasty, this application provides potential trainees, parents, and partners with an interactive, responsive platform to explore programs, learn about the club, contact officials, and apply to join.

---

## 🚀 Key Features

*   **Responsive Landing Page**: Highlights club statistics, testimonials, programs, and core vision.
*   **Structured Programs**: Visual breakdown of training paths (Junior Development, Youth Elite, Professional Track), pricing packages, and weekly schedules.
*   **Athlete Application**: Interactive online registration portal for new students.
*   **About the Club**: Mission, vision, core values, achievements, and background of the coaching staff.
*   **Contact & FAQs**: FAQ accordions, business contact details, and location maps.

---

## 🛠️ Technology Stack

This project is built using a modern frontend architecture:

*   **Framework**: [React](https://react.dev/) (v18) + [TypeScript](https://www.typescriptlang.org/)
*   **Build Tool**: [Vite](https://vite.dev/) (v6)
*   **Routing**: [React Router](https://reactrouter.com/) (v7)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (using native CSS variables for theme setup)
*   **Component Architecture**: Customized [shadcn/ui](https://ui.shadcn.com/) components built on top of [Radix UI](https://www.radix-ui.com/)
*   **Icons**: [Lucide React](https://lucide.dev/)

---

## 📂 Project Structure

```text
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── figma/        # Utility components (e.g., ImageWithFallback)
│   │   │   ├── ui/           # Custom reusable primitives (buttons, inputs, etc.)
│   │   │   ├── Footer.tsx    # Site footer component
│   │   │   └── Navbar.tsx    # Responsive navigation header
│   │   ├── pages/
│   │   │   ├── Home.tsx      # Main landing/home page
│   │   │   ├── About.tsx     # Mission, values, and coaches section
│   │   │   ├── Programs.tsx  # Curriculum, plans, and schedules
│   │   │   ├── Join.tsx      # Registration form
│   │   │   └── Contact.tsx   # FAQs and contact details
│   │   ├── App.tsx           # Application root wrapper
│   │   └── routes.tsx        # Client-side routing layout setup
│   └── styles/
│       ├── theme.css         # Design tokens (colors, font, dark mode)
│       └── tailwind.css      # Tailwind core directives
├── package.json              # Project dependencies and npm scripts
└── vite.config.ts            # Vite bundler configuration
```

---

## 💻 Getting Started

### Prerequisites

Ensure you have **Node.js** (v18 or higher) and a package manager like **npm** or **pnpm** installed on your system.

### Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   cd cholafc
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

### Running Locally

To launch the local development server with hot module replacement (HMR):
```bash
npm run dev
```

The application will be accessible at `http://localhost:5173`.

### Production Build

To build the project for production, run:
```bash
npm run build
```
The compiled, production-ready static assets will be outputted to the `dist` directory.

---

## 📄 License

This project includes components and dependencies from [shadcn/ui](https://ui.shadcn.com/) used under the [MIT license](https://github.com/shadcn-ui/ui/blob/main/LICENSE.md). All photography assets are sourced from [Unsplash](https://unsplash.com) under their standard license.
