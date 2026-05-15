# DevConnect Frontend

DevConnect is a full-stack developer community platform. The frontend gives developers a polished space to create a profile, publish projects, write technical blogs, and discover other developers. It connects to a Node/Express/MongoDB backend through REST APIs.

## What This Project Does

DevConnect helps developers present their work in one place:

- Create an account and log in securely.
- Maintain a public developer profile with name, role, location, bio, skills, avatar, and cover image.
- Browse developer profiles from the community.
- Publish project showcases with title, description, tech stack, links, tags, features, and thumbnail images.
- Publish technical blogs with markdown content, tags, and cover images.
- Explore public projects and blogs through searchable, responsive pages.
- Use a protected dashboard for profile editing and content creation.

The application is designed as a portfolio plus community experience: profiles, projects, and blogs are public, while profile editing and content creation require authentication.

## Tech Stack

- React 19
- Vite
- React Router
- Redux Toolkit
- Axios
- React Hook Form
- Tailwind CSS
- Radix UI primitives
- Lucide React icons
- GSAP and Lenis for page animation and smooth scrolling
- `@uiw/react-md-editor` for markdown writing and preview

## Backend Integration

The frontend communicates with the backend using the API service layer in `src/services`.

Default API base URL:

```env
VITE_API_BASE_URL=https://hacksprint-r6t3.onrender.com/api
```

Main backend resources used by the frontend:

- `POST /api/user/register`
- `POST /api/user/login`
- `GET /api/user/me`
- `GET /api/user/logout`
- `PATCH /api/user/me`
- `GET /api/user/profile/:username`
- `GET /api/search/users`
- `GET /api/project`
- `POST /api/project`
- `GET /api/blog`
- `POST /api/blog`

Authentication uses cookies plus an access token stored on the client. The Axios client sends credentials and also attaches the access token as a Bearer token for protected requests.

## Main Pages

Public routes:

- `/` - landing/home page
- `/developers` - developer discovery
- `/projects` - project gallery
- `/projects/:id` - project detail page
- `/blogs` - blog feed
- `/blogs/:id` - blog detail page
- `/profile/:username` - public developer profile
- `/login` - login page
- `/signup` - signup page

Protected routes:

- `/dashboard` - dashboard overview
- `/profile/edit` - edit current user profile
- `/projects/create` - create a project
- `/blogs/write` - write and publish a blog
- `/dashboard/projects` - dashboard project view
- `/dashboard/blogs` - dashboard blog view
- `/dashboard/community` - dashboard community view

## Folder Structure

```txt
src/
  app/              App shell, router, providers
  assets/           Static frontend assets
  components/       Shared UI, cards, navbar, sidebar, loaders, animations
  features/         Feature pages for auth, blogs, projects, profile, dashboard, community
  hooks/            Custom React hooks
  layouts/          Main, auth, and dashboard layouts
  lib/              Utilities and fallback content
  redux/            Redux store and feature slices
  routes/           Protected/public route wrappers
  services/         Axios client, API services, response mappers
  styles/           Global styles
```

## Environment Variables

Create a `.env` file in `/client` when you need to override the backend URL:

```env
VITE_API_BASE_URL=https://hacksprint-r6t3.onrender.com/api
```

For local backend development, use:

```env
VITE_API_BASE_URL=http://localhost:4000/api
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

Run lint:

```bash
npm run lint
```

On Windows PowerShell, if `npm` scripts are blocked by execution policy, use `npm.cmd`:

```bash
npm.cmd run dev
```

## Key Frontend Behavior

- App bootstraps auth, theme, projects, and blogs in `src/app/providers.jsx`.
- Auth state is stored in Redux and mirrored to local storage for session bootstrap.
- API responses are normalized in `src/services/mappers.js` so backend documents match the UI shape.
- Public pages handle empty backend data gracefully with fallback or empty states.
- Protected pages are guarded by `ProtectedRoute`.
- Login/signup pages are guarded by `PublicRoute`.

## Deployment Notes

When deploying the frontend, set:

```env
VITE_API_BASE_URL=https://hacksprint-r6t3.onrender.com/api
```

The deployed backend must allow the frontend domain in its CORS configuration. If CRUD requests fail after deployment, check:

- The backend `MONGODB_URI` points to a hosted database such as MongoDB Atlas.
- The backend CORS origins include the deployed frontend URL.
- `NODE_ENV=production` is configured on the backend.
- Login requests successfully return and store an access token.

## Project Purpose

DevConnect is built to help developers move beyond a static resume. It combines a public portfolio, technical writing, project storytelling, and community discovery into one modern web experience.
