# Overview

Nudge is an AI-powered e-commerce chatbot designed specifically for DTC (Direct-to-Consumer) brands. The application reduces support load and increases revenue through automated product Q&A, order support, and cart recovery functionality. Built as a full-stack web application, it provides a comprehensive dashboard for managing AI chat interactions, cart recovery campaigns, knowledge base content, and analytics with provable before/after results.

The system targets Shopify stores initially, with plans for WooCommerce and custom e-commerce platforms. It offers automated customer support deflection, cart abandonment recovery via SMS and email, and detailed performance tracking to demonstrate ROI.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The frontend is built with **React 18** using **TypeScript** and **Vite** as the build tool. The application uses a component-based architecture with:

- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Framework**: Custom component library built on Radix UI primitives with Tailwind CSS for styling
- **Form Handling**: React Hook Form with Zod validation
- **Component Structure**: Modular design with separate components for dashboard, chat widget, cart recovery, knowledge base, analytics, and settings

The UI follows a dashboard-style layout with a sidebar navigation and uses the shadcn/ui design system for consistent styling.

## Backend Architecture
The backend is implemented as a **Node.js Express** server with TypeScript:

- **API Layer**: RESTful API endpoints for chat interactions, store management, and analytics
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Session Management**: Express sessions with PostgreSQL storage
- **File Structure**: Separation of concerns with dedicated modules for routes, services, and database operations

## Data Storage Solutions
The application uses **PostgreSQL** as the primary database with Drizzle ORM:

- **Connection**: Neon serverless PostgreSQL for scalability
- **Schema Design**: Normalized tables for stores, products, conversations, knowledge base items, cart recovery events, and analytics
- **Migrations**: Drizzle Kit for schema migrations and database management
- **Data Types**: JSONB for flexible data structures like product variants and conversation messages

## Authentication and Authorization
Currently implements basic store-based authentication:

- **Shopify Integration**: OAuth flow for store authorization
- **API Keys**: Support for managing external service API keys (OpenAI, Twilio, SendGrid)
- **Session-Based**: Express sessions for maintaining user state

## External Service Integrations

### AI Services
- **OpenAI GPT-5**: Core AI processing for customer conversations
- **Response Processing**: Automated message handling with tool calling capabilities
- **Performance Tracking**: Response time monitoring and deflection rate calculation

### E-commerce Platform Integration
- **Shopify API**: Product catalog sync, order management, and store data
- **Product Management**: Automated inventory and product information updates
- **Order Support**: Real-time order status and customer data access

### Communication Services
- **Twilio**: SMS messaging for cart recovery campaigns
- **SendGrid**: Email marketing and transactional email delivery
- **Multi-Channel**: Coordinated SMS and email cart recovery sequences

### Development and Deployment
- **Build System**: Vite for frontend bundling, esbuild for server compilation
- **Development**: Hot reload with Vite dev server
- **Environment**: Replit-optimized with development banner integration
- **Package Management**: npm with lockfile for dependency management

The architecture emphasizes modularity, type safety, and scalability while maintaining simple deployment and development workflows.