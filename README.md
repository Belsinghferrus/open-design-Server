# Open Design - Backend

## 📌 Overview

This is the **backend API** for the Open Design Admin Panel, built using **Node.js** and **Express.js**, with **PostgreSQL** as the database. It provides **authentication, project management, and API endpoints** to support the frontend.

## 🚀 Features

- **🔐 Admin Authentication**: Secure login using **JWT** & **bcrypt**.
- **🗄️ Database**: Uses **PostgreSQL** instead of Knex.
- **📂 CRUD Operations**: Add, update, delete, and fetch projects.
- **🔗 RESTful API**: Structured and scalable endpoints.
- **📜 Input Validation**: Ensures proper data handling.
- **⚡ Optimized Queries**: Using **pg** package for PostgreSQL interaction.

---

## 🛠️ Installation & Setup

### 1️⃣ **Clone the Repository**
```sh
git clone https://github.com/Belsinghferrus/open-design-Server
cd server
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Set Up Environment Variables
Create a .env file in the root directory and add the following:
```env
DB_HOST=localhost
DB_USER=your_postgres_user
DB_PASS=your_postgres_password
DB_NAME=your_database_name
DB_PORT=5432
JWT_SECRET=your_secret_key
PORT=5000
```

### 4️⃣ Start the Server
```sh
nodemon index.js
```