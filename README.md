# CRM Pipeline System

A modern CRM pipeline management system built with Node.js, Express, TypeScript, and PostgreSQL.

## Features

- Pipeline Management
- Contact Management
- Custom Fields
- Real-time Updates
- Multiple View Types (Kanban/Table)
- Status Management

## Prerequisites

- Docker
- Docker Compose
- Node.js 18+ (for local development)
- npm or yarn

## Quick Start

1. Clone the repository
2. Copy the environment file:
   ```bash
   cp .env.example .env
   ```
3. Start the application:
   ```bash
   docker-compose up
   ```
4. Access the application at http://localhost:3000

## Development

To run the application in development mode:

```bash
npm install

npm run dev
```

## Project Structure

```
.
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Request handlers
│   ├── models/        # Database models
│   ├── routes/        # API routes
│   ├── services/      # Business logic
│   ├── types/         # TypeScript types
│   └── utils/         # Utility functions
├── prisma/            # Database schema and migrations
├── docker/           # Docker configuration files
└── tests/            # Test files
```

## Environment Variables

Required environment variables:

```
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://user:password@postgres:5432/crm_pipeline
REDIS_URL=redis://redis:6379
JWT_SECRET=your-secret-key
```

## API Documentation

API documentation is available at `/api-docs` when running the application.

## Testing

```bash
npm test

npm run test:coverage
```

## License

MIT
