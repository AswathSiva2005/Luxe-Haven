http://localhost:5173/

http://localhost:5173/admin - admin / luxe123

## Public Product Images

Admin uploads now go through the hosted API at `/api/upload-product-image`, which stores the image document in MongoDB Atlas and returns a public URL that streams the stored image.

Products are now stored in the MongoDB Atlas `products` collection, so Compass becomes the source of truth for add, edit, and delete.

Set these environment variables on your deployment or local serverless runtime:

- `MONGODB_URI`
- `MONGODB_DB_NAME=luxe haven`

MongoDB collections used by the app:

- `products` for product CRUD
- `product_images` for uploaded product images
- `admins` for admin logins with unique `username` and `email` fields

Passwords are stored as plain text in the `admins` collection so they can be edited directly in Compass, as requested.

The server seeds a default admin record the first time the collection is empty:

- username: `admin`
- email: `admin@luxehaven.com`
- password: `luxe123`
