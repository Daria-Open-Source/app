import dotenv from 'dotenv';
import path from 'path';

// This forces the .env file to load before any test imports run
dotenv.config({ path: path.resolve(process.cwd(), '../.env') });

console.log('✅ Jest Setup: Environment variables loaded.');