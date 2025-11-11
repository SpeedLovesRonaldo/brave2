# areyoureally.brave

## Overview

This is an interactive single-page web application built for the .brave Site-Building Challenge. The application presents users with a 4-question "bravery quiz" that evaluates their courage level and awards them a visual badge based on their score. The site features Brave browser branding with a modern, bold aesthetic and includes Web3 integrations for wallet connectivity and IPFS badge storage.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React with TypeScript for type-safe component development
- Vite as the build tool and development server
- Wouter for lightweight client-side routing
- Single-page application (SPA) architecture with minimal routing (home page and 404)

**UI Component Library**
- shadcn/ui components built on Radix UI primitives
- Tailwind CSS for styling with custom design tokens
- Component-driven architecture with reusable UI elements
- "New York" style variant from shadcn/ui

**State Management & Data Fetching**
- TanStack Query (React Query) for server state management
- Local component state using React hooks
- Toast notifications for user feedback
- No global state management solution (Redux, Zustand, etc.) - state is localized to components

**Design System**
- Custom color palette inspired by Brave browser branding
- Primary accent color: Brave Orange (#FB542B)
- Dark mode design with navy/midnight blue backgrounds
- CSS custom properties defined in index.css for theming
- Consistent spacing, border radius, and shadow definitions
- Inter font family as primary typeface

### Backend Architecture

**Server Framework**
- Express.js running on Node.js
- TypeScript for type safety across the stack
- Modular route registration pattern
- HTTP server with custom logging middleware

**API Structure**
- RESTful API endpoints prefixed with `/api`
- Routes registered in `server/routes.ts`
- Currently minimal backend logic - primarily serves the frontend

**Storage Layer**
- In-memory storage implementation (`MemStorage`) for development
- Interface-based storage abstraction (`IStorage`) allowing easy swap to persistent storage
- User model defined but minimal backend functionality currently implemented
- Prepared for database integration via Drizzle ORM

### External Dependencies

**Database & ORM**
- Drizzle ORM configured for PostgreSQL
- Neon Database serverless driver (@neondatabase/serverless)
- Schema defined in `shared/schema.ts` with users table
- Drizzle-Zod for schema validation
- Database migrations configured to output to `/migrations` directory

**Web3 Integrations**
- Brave Wallet / MetaMask support via `window.ethereum`
- IPFS integration for decentralized badge storage (simulated in current implementation)
- .brave domain resolution (referenced in design but not implemented in code)
- Polygon naming system support (mentioned in specs)

**Third-Party UI Libraries**
- Radix UI primitives for accessible components (accordion, dialog, dropdown, etc.)
- Embla Carousel for carousel functionality
- Lucide React for icons
- cmdk for command palette pattern
- react-day-picker for calendar components
- Vaul for drawer components

**Development Tools**
- Replit-specific plugins for development environment
- Runtime error overlay for better debugging
- Development banner and cartographer plugins (Replit integrations)
- PostCSS with Tailwind CSS and Autoprefixer

**Form Management**
- React Hook Form for form state management
- @hookform/resolvers for validation integration
- Zod for schema validation

**Session Management**
- connect-pg-simple for PostgreSQL session storage
- Configured but not actively used in current implementation

**Design Specifications**
- Detailed design guidelines in `design_guidelines.md`
- Brave-themed color palette with specific hex values
- Typography specifications using Inter font
- Layout system with defined spacing and shadow patterns
- Accessibility requirements for contrast and keyboard navigation

### Architecture Decisions

**Monorepo Structure**
- Client and server code in separate directories
- Shared schema and types in `/shared` directory
- Attached assets in `/attached_assets` for static resources
- TypeScript path aliases for clean imports (@/, @shared/, @assets/)

**Type Safety**
- Full TypeScript implementation across frontend and backend
- Shared types between client and server via `/shared` directory
- Zod schemas for runtime validation
- Drizzle-Zod integration for database schema validation

**Code Splitting**
- Vite handles code splitting automatically
- Component-based architecture allows for efficient bundling
- Examples directory for component documentation/testing

**Accessibility**
- ARIA attributes on interactive elements
- Keyboard navigation support
- Focus management with visible focus rings
- Semantic HTML structure