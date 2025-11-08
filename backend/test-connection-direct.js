import mongoose from 'mongoose';

// Direct connection test with password
// Update this with your actual password for the 'sasivarthankg_db_user' user
const password = process.env.DB_PASSWORD || 'YOUR_PASSWORD_HERE';
const username = 'sasivarthankg_db_user';

// Try different connection string formats
const connectionStrings = [
  `mongodb+srv://${username}:${password}@psna.g7iqowl.mongodb.net/vibe_cart?retryWrites=true&w=majority`,
  `mongodb+srv://${username}:${encodeURIComponent(password)}@psna.g7iqowl.mongodb.net/vibe_cart?retryWrites=true&w=majority`,
];

console.log('🔌 Testing MongoDB connection...');
console.log('👤 Username:', username);
console.log('🔑 Password:', password === 'YOUR_PASSWORD_HERE' ? 'NOT SET' : '*'.repeat(password.length));
console.log('📍 Cluster: psna.g7iqowl.mongodb.net\n');

if (password === 'YOUR_PASSWORD_HERE') {
  console.log('❌ Password not set!');
  console.log('Set it with: $env:DB_PASSWORD="your_password"');
  process.exit(1);
}

async function testConnection(uri, index) {
  try {
    console.log(`Attempt ${index + 1}: Connecting...`);
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    
    console.log('✅ Connection successful!');
    console.log('📊 Database:', mongoose.connection.db.databaseName);
    
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📁 Collections:', collections.map(c => c.name).join(', ') || 'None');
    
    await mongoose.connection.close();
    return true;
  } catch (error) {
    console.log(`❌ Attempt ${index + 1} failed:`, error.message);
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
    }
    return false;
  }
}

// Try both connection strings
for (let i = 0; i < connectionStrings.length; i++) {
  const success = await testConnection(connectionStrings[i], i);
  if (success) {
    console.log('\n✅ Connection established successfully!');
    process.exit(0);
  }
  if (i < connectionStrings.length - 1) {
    console.log('\n');
  }
}

console.log('\n❌ All connection attempts failed.');
console.log('\n💡 Common issues:');
console.log('   1. IP Address not whitelisted in MongoDB Atlas');
console.log('      → Go to MongoDB Atlas → Network Access → Add IP Address');
console.log('      → For testing, you can use 0.0.0.0/0 (allows all IPs)');
console.log('   2. Password might be incorrect');
console.log('   3. Username might be incorrect');
console.log('   4. Database user might not have proper permissions');
process.exit(1);

