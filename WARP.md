# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Revri is a product planning platform that transforms product visions into developer-ready backlogs. It consists of a Vue.js frontend client and a .NET backend service using clean architecture principles.

## Architecture

### High-Level Structure
- **revri-client/**: Vue 3 + TypeScript frontend with Vite build system
- **revri-service/**: .NET solution with Clean Architecture pattern:
  - `revri.api`: Web API layer
  - `revri.core`: Domain entities and business logic
  - `revri.service`: Application services
  - `revri.infrastructure`: Data access and external integrations

### Frontend Stack
- **Framework**: Vue 3 with Composition API and `<script setup>`
- **State Management**: Pinia for reactive state management
- **Routing**: Vue Router with lazy loading
- **Build Tool**: Vite with TypeScript support
- **Testing**: Vitest for unit tests
- **Package Manager**: Bun (preferred over npm/yarn)

### Backend Stack
- **.NET Solution**: Multi-project clean architecture
- **API Layer**: ASP.NET Core Web API
- **Architecture Pattern**: Clean Architecture with separate concerns

## Development Commands

### Frontend Development (revri-client/)

```bash
# Install dependencies
cd revri-client && bun install

# Start development server with hot reload
cd revri-client && bun dev

# Build for production
cd revri-client && bun run build

# Run unit tests
cd revri-client && bun test:unit

# Run unit tests in watch mode
cd revri-client && bun test:unit --watch

# Lint code and auto-fix issues
cd revri-client && bun lint

# Format code with Prettier
cd revri-client && bun format

# Type check without building
cd revri-client && bun run type-check

# Preview production build locally
cd revri-client && bun preview
```

### Backend Development (revri-service/)

```bash
# Build the entire solution
cd revri-service && dotnet build

# Run the API project
cd revri-service && dotnet run --project revri.api

# Build in Release mode
cd revri-service && dotnet build --configuration Release

# Run tests (when implemented)
cd revri-service && dotnet test

# Restore NuGet packages
cd revri-service && dotnet restore

# Clean build artifacts
cd revri-service && dotnet clean
```

### Full Stack Development

```bash
# Start both client and service (run in separate terminals)
cd revri-client && bun dev
cd revri-service && dotnet run --project revri.api
```

## Development Guidelines

### Frontend Development
- Use Vue 3 Composition API with `<script setup>` syntax
- Implement TypeScript strictly - no `any` types
- Follow Vue Router patterns for lazy loading routes
- Use Pinia stores for shared state management
- Write unit tests for components using Vitest and Vue Test Utils
- Follow ESLint configuration and run `bun lint` before commits

### Backend Development
- Follow Clean Architecture principles with clear separation of concerns
- Place domain logic in `revri.core`
- Implement application services in `revri.service`
- Keep API controllers thin - delegate to application services
- Use dependency injection patterns
- Maintain project references: api → service → core ← infrastructure

### Testing Strategy
- Frontend: Unit tests with Vitest for components and composables
- Backend: Unit tests for core domain logic (when implemented)
- Integration tests for API endpoints (when implemented)

## Project Status

This is an early-stage project with foundational architecture in place. The current structure suggests:
- Frontend is based on Vue 3 template with basic routing
- Backend has Clean Architecture scaffolding but minimal implementation
- Core product features for the planning platform are yet to be implemented

## Key Files and Directories

### Frontend Structure
- `src/main.ts`: Application entry point
- `src/App.vue`: Root component with routing
- `src/router/`: Vue Router configuration
- `src/stores/`: Pinia state management
- `src/components/`: Reusable Vue components
- `src/views/`: Page-level components

### Backend Structure
- `revri.api/Program.cs`: API application entry point
- `*.csproj`: Project configuration files
- `revri-service.sln`: Solution file for Visual Studio/Rider

### Configuration Files
- `package.json`: Frontend dependencies and scripts
- `vite.config.ts`: Vite build configuration
- `tsconfig.*.json`: TypeScript compiler configuration
- `vitest.config.ts`: Test runner configuration
