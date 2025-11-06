# Connect to MongoDB - Quick Guide

## Step 1: Set Your MongoDB Password

You have **3 options** to provide your MongoDB password:

### Option A: Environment Variable (Quick Test)
```powershell
# In PowerShell
$env:DB_PASSWORD="your_actual_password_here"
```

### Option B: Create .env File (Recommended)
Create a file named `.env` in the `backend` folder with:
```env
MONGODB_URI=mongodb+srv://sasivarthankg_db_user:YOUR_ACTUAL_PASSWORD@cluster0.tmq8nmr.mongodb.net/vibe_cart?retryWrites=true&w=majority
```
Replace `YOUR_ACTUAL_PASSWORD` with your MongoDB Atlas password.

### Option C: Edit Connection String Directly
Edit `backend/src/storage/db.js` and replace `<db_password>` with your actual password.

## Step 2: Test the Connection

```bash
cd backend
npm run test-connection
```

This will test if your MongoDB connection works.

## Step 3: Start the Server

```bash
npm start
```

The server will:
- Connect to MongoDB
- Create the `vibe_cart` database
- Seed 6 products automatically

## Troubleshooting

**Connection Error?**
1. ✅ Check your password is correct
2. ✅ Ensure your IP is whitelisted in MongoDB Atlas (Network Access)
3. ✅ Verify the username `sasivarthankg_db_user` is correct
4. ✅ Check MongoDB Atlas cluster is running

**Need to whitelist IP?**
- Go to MongoDB Atlas → Network Access
- Click "Add IP Address"
- For development, you can use `0.0.0.0/0` (allows all IPs - not recommended for production)

