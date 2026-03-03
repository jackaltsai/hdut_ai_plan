# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Nuxt 3 application using Vue 3 and Vue Router. It's a minimal starter setup with Nuxt 4.3.0.

## Development Commands

```bash
# Install dependencies (required after cloning)
npm install

# Start development server at http://localhost:3000
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Generate static site
npm run generate
```

## Architecture

### Framework
- **Nuxt 4.3.0** with Vue 3.5.27
- **File-based routing**: Pages should be created in `app/pages/` or `pages/` directory (auto-routing)
- **Auto-imports**: Components, composables, and utilities are auto-imported by Nuxt

### Project Structure
- `app/app.vue`: Root application component
- `app/pages/`: File-based routing (if using pages)
- `public/`: Static assets served at root
- `nuxt.config.ts`: Nuxt configuration
- `.nuxt/`: Generated TypeScript types and build artifacts (git-ignored)

### TypeScript Configuration
TypeScript is configured using Nuxt's generated tsconfig references in `.nuxt/`. The root `tsconfig.json` references these generated configs for app, server, shared, and node environments.

### Development Notes
- Nuxt DevTools are enabled by default in development mode
- The project uses ES modules (`"type": "module"` in package.json)
- After installing dependencies, `nuxt prepare` runs automatically to generate types
