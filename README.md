# PennyWise Frontend

React + TypeScript frontend for PennyWise personal finance workflows.

## Features

### Core

- Google sign-in with protected routes
- Dashboard with summary and AI Insights
- Receipt scanning flow for expense capture
- AI Feed for personalized finance updates and tips
- AI Planner for budgeting and financial planning and suggestions
- My Data page for profile and financial details

### AI

- AI insights with expandable suggestions
- AI Feed for finance-related updates
- AI Planner for budgeting and planning workflows

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS + shadcn/ui + Radix UI
- React Router

## Quick Start

```bash
npm install
npm run dev
```

## Environment Variables

Create a `.env` file:

```env
VITE_API_BASE_URL=your_api_base_url
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
```

## Project Structure

```text
pennywise-frontend/
├── components.json
├── eslint.config.js
├── index.html
├── package.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── public/
└── src/
	├── App.tsx
	├── index.css
	├── main.tsx
	├── assets/
	├── components/
	│   ├── layout.tsx
	│   ├── protected-route.tsx
	│   ├── theme-provider.tsx
	│   └── ui/
	│       ├── button.tsx
	│       ├── card.tsx
	│       ├── dialog.tsx
	│       ├── dropdown-menu.tsx
	│       ├── input.tsx
	│       ├── table.tsx
	│       ├── textarea.tsx
	│       └── tooltip.tsx
	├── hooks/
	│   ├── regularApiRequest.ts
	│   └── useApiRequest.ts
	├── lib/
	│   ├── mock-data.ts
	│   └── utils.ts
	└── pages/
		├── aiFeed.tsx
		├── aiPlanner.tsx
		├── dashboard.tsx
		├── dataPage.tsx
		├── login.tsx
		└── scanReceipt.tsx
```
