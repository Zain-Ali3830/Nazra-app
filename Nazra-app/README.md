# Nazra App

Nazra App is a bilingual Islamic learning app built with React, TypeScript, Vite, and Tailwind CSS. It helps users learn the basics of Wudu, Salah, important duas, and Nazra lessons in both English and Urdu.

## What this app does

The app provides a simple, mobile-friendly experience for:

- Learning the steps of Wudu and Salah
- Reading and understanding common Islamic duas
- Exploring Nazra lessons with bilingual content
- Marking lessons/steps as learned and tracking progress locally
- Switching between light and dark themes

## Main features

- Bilingual content in English and Urdu
- Step-by-step learning for Wudu and Salah
- Essential dua pages with Arabic, transliteration, and translations
- Nazra lesson cards with practice letters and lesson content
- Progress tracking using browser local storage
- Responsive UI designed for phones and desktops

## Tech stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Lucide React

## Project structure

- src/App.tsx - main app view and navigation
- src/pages/ - app screens such as Home, Nazra, StepListPage, and TextPage
- src/components/ - reusable UI components
- src/data/ - lesson and content data in JSON format
- src/hooks/ - local state hooks for progress and theme

## Getting started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open the local Vite URL shown in the terminal.

## Available scripts

- npm run dev - start the development server
- npm run build - build the app for production
- npm run preview - preview the production build locally
- npm run lint - run ESLint
- npm run typecheck - run TypeScript type checking

## Notes

- Progress is stored in the browser using local storage, so it remains on the device where the app is used.
- The content is currently static and is managed through the JSON data files in the src/data folder.
