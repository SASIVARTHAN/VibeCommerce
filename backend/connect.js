import 'dotenv/config';
import mongoose from 'mongoose';

// Get password from command line argument or environment
const password = process.argv[2] || process.env.DB_PASSWORD || '';

if (!password) {
  console.log('❌ MongoDB password required!');
  console.log('\nUsage:');
  console.log('  node connect.js YOUR_PASSWORD');
  console.log('  OR');
  console.log('  $env:DB_PASSWORD="YOUR_PASSWORD"; node connect.js');
  console.log('\nExample:');
  console.log('  node connect.js mypassword123');
  process.exit(1);
}

const connectionString = `mongodb+srv://sasivarthankg_db_user:${password}@psna.g7iqowl.mongodb.net/vibe_cart?retryWrites=true&w=majority`;

console.log('🔌 Connecting to MongoDB...');
console.log('📍 Cluster: psna.g7iqowl.mongodb.net');
console.log('👤 Username: sasivarthankg_db_user');
console.log('📊 Database: vibe_cart\n');

mongoose.connect(connectionString)
  .then(async () => {
    console.log('✅ Successfully connected to MongoDB!');
    console.log('📊 Database:', mongoose.connection.db.databaseName);
    
    // Test collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📁 Collections:', collections.map(c => c.name).join(', ') || 'None');
    
    mongoose.connection.close();
    console.log('\n✅ Connection test successful!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ MongoDB connection failed!');
    console.error('Error:', error.message);
    console.log('\n💡 Troubleshooting:');
    console.log('   1. Verify your password is correct');
    console.log('   2. Check your IP is whitelisted in MongoDB Atlas');
    console.log('   3. Ensure the cluster is running');
    console.log('   4. Verify username: sasivarthankg_db_user');
    process.exit(1);
  });

