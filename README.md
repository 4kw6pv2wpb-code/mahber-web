# Mahber Web

[![CI](https://github.com/4kw6pv2wpb-code/habeshahub-web/actions/workflows/ci.yml/badge.svg)](https://github.com/4kw6pv2wpb-code/habeshahub-web/actions/workflows/ci.yml)
[![Deploy](https://img.shields.io/badge/deploy-Railway-blueviolet)](https://habeshahub-web-production.up.railway.app)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com)

> The Diaspora Super App - connecting Ethiopian, Eritrean & Somali communities worldwide.

**Live:** [habeshahub-web-production.up.railway.app](https://habeshahub-web-production.up.railway.app)

## Features

| Feature | Description |
|---------|-------------|
| Home Feed | Community posts, stories, social interactions |
| Jobs Board | Opportunities in the Habesha community |
| Housing | Listings, rooms, sublets from members |
| Events | Cultural events, meetups, celebrations |
| Community | Discussion forums and Q&A |
| Marketplace | Buy and sell within the community |
| Dating | HabeshaMatch - find your other half |
| Immigration | AI-powered immigration guidance |
| Translation | English, Amharic, Tigrinya, Oromo, Somali, Arabic |
| Remittance | Send money home |
| Messaging | Real-time chat |
| Videos | Community video content |

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS 3.4
- **UI:** React 18, Headless UI, React Icons
- **Backend:** Mahber API (Node.js/Express/Prisma)
- **Database:** PostgreSQL + Redis
- **Deployment:** Railway
- **CI/CD:** GitHub Actions

## Getting Started

```bash
# Clone the repo
git clone https://github.com/4kw6pv2wpb-code/habeshahub-web.git
cd habeshahub-web

# Setup environment
cp .env.example .env.local

# Install & run
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/app/
  community/    # Forums & Q&A
  dating/       # HabeshaMatch
  events/       # Event listings
  home/         # Main feed
  housing/      # Housing listings
  immigration/  # Immigration resources
  jobs/         # Job board
  login/        # Authentication
  marketplace/  # Buy & sell
  messages/     # Chat
  profile/      # User profiles
  register/     # Sign up
  remittance/   # Money transfer
  settings/     # User settings
  translation/  # Language tools
  videos/       # Video feed
public/
  manifest.json # PWA manifest
  robots.txt    # SEO
  sitemap.xml   # Sitemap
```

## Design

Ethiopian/Eritrean cultural color palette:
- Primary Gold: `#D4A017`
- Flag Green: `#078930`
- Flag Yellow: `#FCDD09`
- Flag Red: `#DA121A`
- Eritrean Blue: `#4189DD`

## Environment Variables

See `.env.example` for all required variables.

## Deploy on Railway

```bash
npm run build
npm start
```

## Related Repos

- [mahber-backend](https://github.com/4kw6pv2wpb-code/habeshahub-backend) - API server
- [mahber-mobile](https://github.com/4kw6pv2wpb-code/habeshahub-mobile) - React Native app

## License

MIT
