# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev        # Development server (webpack)
yarn build      # Production build + RSS postbuild script
yarn serve      # Start production server
yarn lint       # ESLint with auto-fix
yarn analyze    # Bundle size analysis
```

## Architecture

**Stack:** Next.js 16 (App Router, SSG) + Contentlayer2 + Tailwind CSS v4 + Pliny

### Content Pipeline

1. MDX files in `data/blog/` are processed by Contentlayer2 (`contentlayer.config.ts`)
2. Contentlayer computes fields: `slug`, `readingTime`, `toc`, `structuredData` (JSON-LD)
3. On build success (`onSuccess` hook): tag counts → `app/tag-data.json`, search index → `public/search.json`
4. Postbuild (`scripts/postbuild.mjs`) generates RSS feed

**Remark plugins:** GFM, math, code titles, img→JSX, GitHub blockquote alerts  
**Rehype plugins:** slug + autolink headings, KaTeX, citation, Prism syntax highlighting, minify

### Routing

| Route                     | Source                                         |
| ------------------------- | ---------------------------------------------- |
| `/blog`                   | `app/blog/page.tsx` — all posts, page 1        |
| `/blog/page/[page]`       | `app/blog/page/[page]/page.tsx` — paginated    |
| `/blog/[...slug]`         | `app/blog/[...slug]/page.tsx` — single post    |
| `/tags/[tag]`             | `app/tags/[tag]/page.tsx` — tag-filtered posts |
| `/tags/[tag]/page/[page]` | paginated tag view                             |

### Post Layout Selection

`app/blog/[...slug]/page.tsx` maps frontmatter `layout` field to a component in `layouts/`:

- `PostLayout` (default) — macOS window frame with traffic lights
- `PostSimple` — minimal
- `PostBanner` — with banner image

### Tag Count

`app/tag-data.json` is **auto-generated at build time** — never edit it manually. It is written by `createTagCount()` in `contentlayer.config.ts`.

### Sidebar Post Count (`전체 글`)

`layouts/ListLayoutWithTags.tsx` receives a `totalPosts` prop (actual post count) from each page component. All page components (`app/blog/page.tsx`, `app/blog/page/[page]/page.tsx`, `app/tags/[tag]/page.tsx`, `app/tags/[tag]/page/[page]/page.tsx`) must pass this prop — it should always be `allCoreContent(sortPosts(allBlogs)).length`, not a tag sum.

## Blog Post Frontmatter

```yaml
title: string # required
date: date # required
summary: string
tags: string[] # auto-counted into tag-data.json
draft: boolean # excluded from production build
lastmod: date
authors: string[] # references slugs in data/authors/
layout: PostLayout | PostSimple | PostBanner
images: string | string[]
bibliography: string # BibTeX file path
canonicalUrl: string
```

## Design System

Tailwind CSS v4 configured via `css/tailwind.css` (not `tailwind.config.js`). Uses OKLch color space for the Apple-inspired design. Primary blue: `oklch(0.45 0.2 250)`. Dark mode via `.dark` class on `<html>`. Glass morphism effects use `backdrop-blur` + `backdrop-saturate` utilities defined in the CSS file.

## SVGs

SVG files are imported as React components via `@svgr/webpack` (configured in `next.config.mjs`).
