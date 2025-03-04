# Paytm Clone

A full-stack payment application built with TypeScript, Node.js, and React.

## 🚀 Features

- User Authentication
- Account Management
- Money Transfer
- Transaction History
- Real-time Balance Updates

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- TypeScript
- Prisma (PostgreSQL)
- Zod (Schema Validation)

### Frontend
- React
- TypeScript
- Tailwind CSS
- Vite

## 📋 Prerequisites

- Node.js (v18 or higher)
- PostgreSQL
- pnpm (recommended) or npm

## 🔧 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd paytm-clone
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
# Create .env file in apps/http_server
DATABASE_URL="postgresql://username:password@localhost:5432/paytm_db"
PORT=8000
```

4. Set up the database:
```bash
cd packages/db
pnpm prisma generate
pnpm prisma db push
```

## 🚀 Running the Application

### Backend
```bash
cd apps/http_server
pnpm dev
```

### Frontend
```bash
cd apps/web
pnpm dev
```

The application will be available at:
- Backend: http://localhost:8000
- Frontend: http://localhost:5173

## 📁 Project Structure
