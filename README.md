http://localhost:5173/

http://localhost:5173/admin - admin / luxe123

## Public Product Images

Admin uploads now go through the hosted API at `/api/upload-product-image`, which forwards files to Cloudinary and returns a public URL.

Set these environment variables on your deployment or local serverless runtime:

- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

The client no longer needs a Cloudinary upload preset.
