http://localhost:5173/

http://localhost:5173/admin - admin / luxe123

## Public Product Images

Admin uploads now go to public cloud image storage instead of staying in the browser.

Set these environment variables before running or deploying:

- `VITE_CLOUDINARY_CLOUD_NAME`
- `VITE_CLOUDINARY_UPLOAD_PRESET`

The upload preset must allow unsigned uploads for this front-end-only setup.
