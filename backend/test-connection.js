import 'dotenv/config';
import mongoose from 'mongoose';

// Get connection string from environment or use default
const DEFAULT_URI = 'mongodb+srv://sasivarthankg_db_user:<db_password>@psna.g7iqowl.mongodb.net/vibe_cart?retryWrites=true&w=majority';
let connectionString = process.env.MONGODB_URI || DEFAULT_URI;

// Replace password placeholder if DB_PASSWORD is set
if (connectionString.includes('<db_password>')) {
  const password = process.env.DB_PASSWORD || '';
  if (!password) {
    console.error('❌ Error: MongoDB password not set!');
    console.log('\nPlease set your password using one of these methods:');
    console.log('\n1. Set environment variable:');
    console.log('   $env:DB_PASSWORD="your_password_here"');
    console.log('\n2. Create a .env file in the backend folder with:');
    console.log('   MONGODB_URI=mongodb+srv://sasivarthankg_db_user:YOUR_PASSWORD@psna.g7iqowl.mongodb.net/vibe_cart?retryWrites=true&w=majority');
    process.exit(1);
  }
  connectionString = connectionString.replace('<db_password>', password);
}

console.log('🔌 Attempting to connect to MongoDB...');
console.log('📍 Connection string:', connectionString.replace(/:[^:@]+@/, ':****@')); // Hide password

mongoose.connect(connectionString)
  .then(() => {
    console.log('✅ Successfully connected to MongoDB!');
    console.log('📊 Database:', mongoose.connection.db.databaseName);
    mongoose.connection.close();
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ MongoDB connection failed:');
    console.error('   Error:', error.message);
    console.log('\n💡 Troubleshooting:');
    console.log('   1. Check your password is correct');
    console.log('   2. Ensure your IP is whitelisted in MongoDB Atlas');
    console.log('   3. Verify the connection string is correct');
    process.exit(1);
  });

