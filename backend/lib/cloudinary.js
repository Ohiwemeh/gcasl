
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// ✅ Ensure Cloudinary env vars are set
if (
  !process.env.CLOUDINARY_CLOUD_NAME || 
  !process.env.CLOUDINARY_API_KEY || 
  !process.env.CLOUDINARY_API_SECRET
) {
  throw new Error('Cloudinary environment variables not configured!');
}

// ✅ Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// ✅ Optional: test connection
cloudinary.api.ping()
  .then(() => console.log('✅ Cloudinary connected'))
  .catch((err) => console.error('❌ Cloudinary connection failed:', err));

// ✅ Export cloudinary instance only (not storage)
export { cloudinary };
