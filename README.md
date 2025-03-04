# Paytm Clone

A full-stack payment application built with TypeScript, Node.js, and Nextjs.

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
- NextJs
- TypeScript
- Tailwind CSS

## 📋 Prerequisites

- Node.js (v18 or higher)
- PostgreSQL
- pnpm (recommended) or npm

## 🔧 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd paytm
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
pnpm prisma migrate dev
pnpm prisma generate
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
- Frontend: http://localhost:3000

## 📁 Project Structure

```

## 🔧 Turborepo Configuration

The project uses Turborepo for managing the monorepo workspace. Key configurations:

- **Workspace Management**: Using pnpm workspaces
- **Build Pipeline**: Configured in `turbo.json`
- **Shared Dependencies**: Managed through the root `package.json`
- **Development Scripts**: Unified commands for all packages

## 🔒 Environment Variables

### Backend (.env)
```env
DATABASE_URL="postgresql://username:password@localhost:5432/paytm_db"
PORT=8000
```

## �� API Endpoints

### Authentication
- POST /api/v1/auth/register
- POST /api/v1/auth/login

### Transactions
- POST /api/v1/transaction/send-money
- GET /api/v1/transaction/history

### Account
- GET /api/v1/account/balance
- GET /api/v1/account/details

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 👥 Authors

- Krishan Kumar Safi 

## 🙏 Acknowledgments

- Hat tip to anyone whose code was used
- Inspiration
- etc.