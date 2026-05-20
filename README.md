http://localhost:5173/

http://localhost:5173/admin - admin / luxe123

## Public Product Images

This app now uses the simple flow below:

- Images: direct unsigned upload to Cloudinary from the browser
- Product details: localStorage in the browser

Set these optional Vite variables in `.env.local` for your Cloudinary account:

- `VITE_CLOUDINARY_CLOUD_NAME`
- `VITE_CLOUDINARY_UPLOAD_PRESET`

If you do not set them, the app uses Cloudinary demo defaults.
