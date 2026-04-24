# Opofinance IB Manager Dashboard

A full-stack web application for managing IB (International Business) partners at Opofinance forex brokerage. Built with Node.js, Express, PostgreSQL, and vanilla JavaScript.

## 🎯 Features

- **User Authentication**: Secure login/signup with password hashing
- **Partner Management**: Full CRUD operations for IB partners
- **Real-time Data**: All data persisted in PostgreSQL
- **Responsive Design**: Modern dark theme dashboard interface
- **Error Handling**: Proper error messages and validation

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript (vanilla - no frameworks)
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: Bcrypt for password hashing

## 📋 Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## 🚀 Installation

### 1. Clone & Install Backend

```bash
cd backend
npm install
```

### 2. Set Up Database

Create `.env` file in the backend folder with your PostgreSQL credentials:

```env
DATABASE_URL="postgresql://dashboard_user:password@localhost:5432/dashboard_db"
PORT=3000
NODE_ENV=development
```

Generate Prisma client:

```bash
npx prisma generate
```

Create tables in PostgreSQL:

```bash
psql -U opofinance1 -d dashboard_db
CREATE TABLE "User" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  "passwordHash" VARCHAR(255) NOT NULL,
  role VARCHAR(255) DEFAULT 'ib_manager',
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "Partner" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  country VARCHAR(255) NOT NULL,
  status VARCHAR(255) DEFAULT 'pending',
  "commissionRate" FLOAT DEFAULT 0.0,
  volume FLOAT DEFAULT 0.0,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "userId" INTEGER NOT NULL REFERENCES "User"(id)
);
\q
```

### 3. Start Backend Server

```bash
npm start
```

Server will run on `http://localhost:3000`

### 4. Open Frontend

Open `frontend/index.html` in your browser or use a live server extension.

## 📡 API Endpoints

### Authentication

- `POST /api/auth/register` - Create new account
  - Body: `{ name, email, password, role }`
  - Returns: User info with ID

- `POST /api/auth/login` - Login user
  - Body: `{ email, password }`
  - Returns: User info with ID

### Partners (IB Manager)

- `GET /api/ib-partners` - Get all partners
  - Returns: Array of partner objects

- `POST /api/ib-partners` - Create new partner
  - Body: `{ name, company, email, country, userId, commissionRate }`
  - Returns: Created partner object

- `PUT /api/ib-partners/:id` - Update partner
  - Body: Any fields to update (name, status, volume, etc.)
  - Returns: Updated partner object

- `DELETE /api/ib-partners/:id` - Delete partner
  - Returns: Success message

## 📁 Project Structure

```
my-dashboard/
├── frontend/
│   └── index.html          # Dashboard UI
├── backend/
│   ├── index.js            # Express server entry point
│   ├── package.json        # Dependencies
│   ├── .env                # Environment variables (NOT in git)
│   ├── .env.example        # Template (IN git)
│   ├── prisma/
│   │   └── schema.prisma   # Database schema
│   ├── routes/
│   │   ├── auth.js         # Auth endpoints
│   │   └── ibPartner.js    # Partner endpoints
│   ├── controllers/
│   │   ├── authController.js
│   │   └── ibPartnerController.js
│   └── lib/
│       └── prisma.js       # Prisma client instance
├── .gitignore
└── README.md
```

## 🔐 Security Features

- Passwords hashed with bcrypt (10 salt rounds)
- Environment variables for secrets (not hardcoded)
- Input validation on all endpoints
- Error messages don't expose database details
- CORS enabled for frontend-backend communication

## 🧪 Testing the App

1. **Sign Up**: Create new account with email/password
2. **Login**: Use created credentials
3. **Add Partner**: Fill partner form and click "Add Partner"
4. **View Partners**: Partners appear in the table
5. **Edit/Delete**: Use action buttons on each row
6. **Logout**: Clear session and return to login

## 🐛 Troubleshooting

**"Cannot connect to database"**
- Check DATABASE_URL in .env
- Verify PostgreSQL is running
- Confirm database and user exist

**"CORS error from frontend"**
- Backend must have CORS enabled (already configured)
- Frontend must call `http://localhost:3000`

**"Partner creation fails"**
- Check userId matches a real user ID
- Ensure all required fields are provided
- Check server logs for error details

## 📈 Next Steps

- Add JWT tokens for stateless authentication
- Implement commission tracking and payouts
- Add partner approval workflow
- Create reporting dashboard
- Deploy to production (Heroku, AWS, etc.)

## 📝 License

Internal Opofinance project

## 👥 Author

Created as part of Week 2 AI Training Program
