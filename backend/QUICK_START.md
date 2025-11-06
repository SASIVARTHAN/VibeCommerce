# Quick Start - Connect MongoDB

## Your Connection String
```
mongodb+srv://sasivarthankg_db_user:<db_password>@cluster0.tmq8nmr.mongodb.net/
```

## Step 1: Set Your Password

**In PowerShell, run:**
```powershell
$env:DB_PASSWORD="your_mongodb_password"
```

Replace `your_mongodb_password` with your actual MongoDB Atlas password.

## Step 2: Test Connection

```powershell
cd backend
npm run test-connection
```

## Step 3: Start Server

```powershell
npm start
```

---

## Alternative: Create .env File

Create `backend/.env`:
```env
DB_PASSWORD=your_mongodb_password
```

Or full connection string:
```env
MONGODB_URI=mongodb+srv://sasivarthankg_db_user:your_mongodb_password@cluster0.tmq8nmr.mongodb.net/vibe_cart?retryWrites=true&w=majority
```

