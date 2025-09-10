# Spinning Wheel Application

## Overview

This is a full-stack spinning wheel application built with React and Express. The app allows users to upload Excel files containing participant data and spin a wheel to randomly select winners. It features a modern UI with shadcn/ui components, real-time wheel animations, and session management to track winners and remaining participants.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Components**: shadcn/ui component library with Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with custom CSS variables for theming (dark theme optimized)
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Canvas Rendering**: HTML5 Canvas for the spinning wheel animation and visualization

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **API Pattern**: RESTful API with JSON responses
- **Session Management**: In-memory storage with session-based winner tracking
- **File Processing**: Multer for file uploads and xlsx library for Excel parsing
- **Development Tools**: tsx for TypeScript execution and hot reloading

### Data Storage
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema**: Two main entities - participants (name, occurrence count) and sessions (original data, current data, selected winners)
- **Fallback Storage**: In-memory storage implementation for development/testing

### File Upload System
- **File Types**: Excel files (.xlsx, .xls) containing participant names and occurrence counts
- **Processing**: Server-side parsing with automatic participant data extraction
- **Validation**: File type validation and data structure verification

### Wheel Mechanics
- **Weighted Selection**: Participants can have occurrence counts that affect their selection probability
- **Visual Representation**: Dynamic canvas-based wheel with color-coded segments
- **Animation**: Smooth spinning animation with physics-based deceleration
- **Winner Selection**: Cryptographically random selection with visual feedback

### Session Management
- **State Persistence**: Sessions store original participant data, current remaining participants, and winner history
- **Winner Tracking**: Selected winners are removed from subsequent spins
- **Data Integrity**: Maintains separate original and current participant lists for session replay capability

## External Dependencies

### Core Framework Dependencies
- **@neondatabase/serverless**: Neon Database connection for PostgreSQL
- **drizzle-orm** & **drizzle-kit**: Type-safe ORM and migration tools
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight routing for React

### UI and Styling
- **@radix-ui/react-\***: Comprehensive set of accessible UI primitives (dialogs, dropdowns, forms, etc.)
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe variant styling
- **lucide-react**: Icon library

### File Processing
- **multer**: Multipart form data handling for file uploads
- **xlsx**: Excel file parsing and data extraction

### Development Tools
- **vite**: Fast build tool and development server
- **tsx**: TypeScript execution engine
- **@replit/vite-plugin-runtime-error-modal**: Development error handling
- **@replit/vite-plugin-cartographer**: Replit integration

### Form and Validation
- **react-hook-form**: Form state management
- **@hookform/resolvers**: Form validation resolvers
- **zod**: Runtime type validation and schema definition
- **drizzle-zod**: Integration between Drizzle ORM and Zod validation

### Utility Libraries
- **date-fns**: Date manipulation and formatting
- **clsx**: Conditional CSS class composition
- **nanoid**: Unique ID generation