# 🚐 Parcel Delivery Management System

A parcel delivery management backend project built with **Node.js**, **Express**, **TypeScript**, and **MongoDB**. Supports user authentication, role-based access control (Sender, Receiver, Admin), parcel tracking, status logs, cancel parcel, block or unblock parcel or user and many more.

---

## 🚀 Features

-   User registration and login with JWT
-   Role-based access control: `ADMIN`, `SENDER`, `RECEIVER`
-   Parcel creation, tracking, and delivery status updates
-   Admin controls:
    -   View and manage all parcels and users
    -   Block/unblock users and parcels
-   Parcel status logs pending, dispatched, in-transit, out for delivery, delivered
-   Delivery history and incoming parcel view for receiver
-   Secure request validation with zod

---

## 🛠 Tech Stack

-   **Backend**: Node.js, Express.js, TypeScript
-   **Database**: MongoDB + Mongoose
-   **Authentication**: JWT
-   **Validation**: Zod
-   **Linting**: ESLintr

## ⚙️ Getting Started

### 1. Clone the Repo

```
git clone https://github.com/jubayer718/parcel-delivery-system-backend.git
cd parcel-delivery-system-backend
```

2. Install Dependencies

```
npm install
```

3. Environment Variables
Create a .env file in the root:

```
PORT=5000
DB_URL=mongodb+srv://your_database_url

#! BCRYPT
BCRYPT_SALT_ROUND=give_any_digit

#! JWT
JWT_ACCESS_SECRET=jwt_secret
JWT_ACCESS_EXPIRES=1d
JWT_REFRESH_SECRET
JWT_REFRESH_EXPIRES

```

4. Run in Development Mode

```
npm run start:dev
```

☑ API Endpoints

🎭 Auth

**POST** /api/v1/auth/login

👤 User

- **GET** /api/v1/user/register (Public)
    
    - Register user

- **PATCH** /api/v1/user/block/:userId (Admin)
    
    - Block user by admin

- **PATCH** /api/v1/user/unblock/:userId (Admin)
    
    - Unblock user

## 📦 Parcel

### Sender

- **POST** /api/v1/parcels (Sender)
  
    - Create a new parcel
      
- **GET** /api/parcels/me (Sender)

    - Retrieve parcels created by the sender

- **PATCH** /api/parcels/cancel/:id (Sender/Admin)
    
    - Cancel a parcel before it is dispatched

### Receiver

- **GET** /api/parcels/incoming (Receiver)

     - List incoming parcels not yet delivered

- **PATCH** /api/parcels/confirm-delivery/:id (Receiver)

    - Confirm parcel delivery

- **PATCH** /api/parcels/history (Receiver)

    - View delivery history (delivered parcels)

- **PATCH** /api/parcels/:id/status-log (Admin/Sender/Receiver)
  
    - View status log
      
### Admin

- **PATCH** /api/parcels/dispatch/:id (Admin)

    - Mark parcel as dispatched

- **PATCH** /api/parcels/out-for-delivery/:id (Admin)
    
    - Mark parcel as out for delivery

- **PATCH** /api/parcels/block/:parcelId (Admin)
    
    - Block a parcel

- **PATCH** /api/parcels/unblock/:parcelId (Admin)
  
    - Unblock a parcel

- **PATCH** /api/parcels/track/:trackingId (Admin/Sender/Receiver)
    
    - Track parcel using tracking ID



## 📦 Parcel Status Flow

```
CREATED → DISPATCHED → IN_TRANSIT → OUT_FOR_DELIVERY → DELIVERED
```