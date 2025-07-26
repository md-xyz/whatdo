# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev`: Start development server with Turbopack
- `npm run build`: Build the application for production
- `npm run start`: Start the production server
- `npm run lint`: Run ESLint
- `npm run postinstall`: Generate Prisma client (automatically runs after install)

## Architecture Overview

WhatDo is a Next.js 15 application that enables users to create apps and websites by chatting with AI. The codebase follows a modular architecture with clear separation of concerns:

### Core Technologies
- **Framework**: Next.js 15 with App Router
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Clerk for user management
- **API Layer**: tRPC for type-safe APIs
- **UI**: Tailwind CSS with Shadcn/UI components
- **Background Jobs**: Inngest for async processing
- **Code Execution**: E2B sandboxes for running user-generated code

### Key Architectural Patterns

**Module-Based Organization**: The `src/modules/` directory contains feature-specific modules (projects, messages, usage), each with their own server procedures and UI components.

**tRPC Setup**: 
- Router configuration in `src/trpc/routers/_app.ts`
- Base procedures and middleware in `src/trpc/init.ts`
- Protected procedures require authentication via Clerk

**Database Schema**:
- Projects contain Messages with MessageFragments
- Usage tracking with credit-based system
- All models include proper cascading deletes

**Authentication Flow**:
- Clerk middleware protects non-public routes
- Public routes: `/`, `/sign-in`, `/sign-up`, `/api`, `/pricing`
- Protected routes require authentication

**AI Integration**:
- Background processing via Inngest for code generation
- Prompts defined in `src/prompt.ts` for different AI agents
- E2B sandboxes for safe code execution

### Important Implementation Details

**Prisma Configuration**: 
- Client generated to `src/generated/prisma/` (custom output path)
- Always run `npx prisma generate` after schema changes

**Styling Constraints**:
- Only use Tailwind CSS classes for styling
- Shadcn/UI components available in `src/components/ui/`
- No custom CSS files allowed

**File Organization**:
- Page components in `src/app/`
- Reusable components in `src/components/`
- Business logic in module-specific server procedures
- Database utilities in `src/lib/`

**Authentication Context**:
- Use `protectedProcedure` for authenticated API calls
- Access user ID via `ctx.auth.userId` in tRPC procedures