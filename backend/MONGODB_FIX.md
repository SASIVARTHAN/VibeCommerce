# MongoDB Connection Issue - Fix Guide

## Current Status
❌ Authentication failed - "bad auth : authentication failed"

## Most Common Issue: IP Whitelisting

Your IP address needs to be whitelisted in MongoDB Atlas.

### Steps to Fix:

1. **Go to MongoDB Atlas Dashboard**
   - Login at https://cloud.mongodb.com
   - Select your cluster: `cluster0`

2. **Network Access (IP Whitelist)**
   - Click "Network Access" in the left sidebar
   - Click "Add IP Address" button
   - Choose one:
     - **Option A (Recommended for Development)**: Click "Allow Access from Anywhere"
       - This adds `0.0.0.0/0` (allows all IPs)
       - ⚠️ Only use for development/testing
     - **Option B (More Secure)**: Add your current IP address
       - Click "Add Current IP Address"
       - Or manually enter your IP

3. **Wait 1-2 minutes** for changes to take effect

4. **Verify Database User**
   - Go to "Database Access" in left sidebar
   - Verify user `sasivarthankg_db_user` exists
   - Ensure password is: `WVBVtKiZPwPcL8zV`
   - User should have "Read and write to any database" permissions

5. **Test Connection Again**
   ```powershell
   cd backend
   $env:DB_PASSWORD="WVBVtKiZPwPcL8zV"
   node connect.js
   ```

## Alternative: Check Password

If IP whitelisting doesn't work:
1. Verify the password in MongoDB Atlas → Database Access
2. Reset the password if needed
3. Update the password in your connection

## Your Connection Details (Saved)
- **Username**: sasivarthankg_db_user
- **Password**: WVBVtKiZPwPcL8zV (saved in environment)
- **Cluster**: cluster0.tmq8nmr.mongodb.net
- **Database**: vibe_cart

