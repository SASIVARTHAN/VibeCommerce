# MongoDB Setup Instructions

## Quick Setup

1. **Replace the password in the connection string:**

   The connection string in `src/storage/db.js` has a placeholder `<db_password>`. You have two options:

   **Option A: Set environment variable**
   ```bash
   # Windows PowerShell
   $env:DB_PASSWORD="your_actual_password"
   
   # Windows CMD
   set DB_PASSWORD=your_actual_password
   
   # Linux/Mac
   export DB_PASSWORD=your_actual_password
   ```

   **Option B: Create a .env file**
   Create `backend/.env`:
   ```env
   MONGODB_URI=mongodb+srv://sasivarthankg_db_user:YOUR_PASSWORD@cluster0.tmq8nmr.mongodb.net/vibe_cart?retryWrites=true&w=majority
   ```

2. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Start the server:**
   ```bash
   npm start
   ```

## Connection String Format

Your MongoDB connection string:
```
mongodb+srv://sasivarthankg_db_user:<db_password>@cluster0.tmq8nmr.mongodb.net/
```

Replace `<db_password>` with your actual MongoDB Atlas password.

## Database Name

The app will use the database name `vibe_cart`. If it doesn't exist, MongoDB will create it automatically.

## Collections

The app creates two collections:
- `products` - Stores product information
- `cartitems` - Stores cart items

Products are automatically seeded on first run if the collection is empty.

