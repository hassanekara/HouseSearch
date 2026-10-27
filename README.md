# HouseSearch — Rental Listing Web App

Web development team project (2024), from my front-end period: a web app where tenants search and filter houses for rent and landlords manage their listings.

## Features

- House listings with carousel, cards and detail page
- Search filters
- Sign-up / sign-in
- Landlord dashboard to publish and manage houses
- GraphQL data layer (Apollo Client)

## Run locally

```sh
git clone https://github.com/hassanekara/HouseSearch.git
cd HouseSearch
cp .env.example .env   # fill in your own values — never commit .env
npm install
npm run dev
```

## Security note

An early version of this repo committed a `.env` file. It has been removed and `.env` is now ignored by git. Anything that was in it is treated as compromised and changed. Lesson applied in all my projects since: secrets stay out of version control.

## Stack

React · Vite · Tailwind CSS · Apollo Client (GraphQL)

---
Author: **Nouradine Hassane Kara** (with team)
