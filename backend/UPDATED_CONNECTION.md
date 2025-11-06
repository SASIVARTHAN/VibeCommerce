# Updated MongoDB Connection

## New Connection Details
- **Username**: `zazi`
- **Cluster**: `zazi.rqtzc0x.mongodb.net`
- **Connection String**: `mongodb+srv://zazi:<db_password>@zazi.rqtzc0x.mongodb.net/`
- **Database**: `vibe_cart`

## To Connect

### Option 1: Set Password Environment Variable
```powershell
$env:DB_PASSWORD="your_zazi_user_password"
cd backend
npm start
```

### Option 2: Pass Password as Argument
```powershell
cd backend
node connect.js your_zazi_user_password
```

### Option 3: Create .env File
Create `backend/.env`:
```env
DB_PASSWORD=your_zazi_user_password
```

Or full connection string:
```env
MONGODB_URI=mongodb+srv://zazi:your_zazi_user_password@zazi.rqtzc0x.mongodb.net/vibe_cart?retryWrites=true&w=majority
```

## Test Connection
```powershell
cd backend
$env:DB_PASSWORD="your_password"
node connect.js
```

## Important Notes
1. **Password**: You need the password for the `zazi` user (different from the previous user)
2. **IP Whitelisting**: Make sure your IP is whitelisted in MongoDB Atlas
3. **Database**: The app will use/create the `vibe_cart` database

