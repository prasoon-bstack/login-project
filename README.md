# Login Project

A simple website demonstrating HTTP Basic Authentication using Chrome's native login popup.

## Features

- 🔐 HTTP Basic Authentication
- 🌐 Chrome native popup login
- 🎨 Modern, responsive design
- 📱 Mobile-friendly interface
- ✅ Protected dashboard route

## Default Credentials

- **Username:** `admin`
- **Password:** `password`

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

3. Open your browser and navigate to:
```
http://localhost:3000
```

## How It Works

1. Visit the home page at `http://localhost:3000`
2. Click "Login to Dashboard"
3. Chrome will display a native authentication popup
4. Enter the credentials (admin/password)
5. You'll be redirected to the protected dashboard page

## Project Structure

```
login-project/
├── server.js           # Express server with authentication middleware
├── package.json        # Node.js dependencies
├── README.md          # This file
└── public/
    ├── index.html     # Landing page
    ├── dashboard.html # Protected dashboard page
    └── styles.css     # CSS styles
```

## Technical Details

- **Server:** Node.js with Express
- **Authentication:** HTTP Basic Auth (RFC 7617)
- **Port:** 3000 (configurable in server.js)

## Notes

- HTTP Basic Auth credentials are cached by the browser
- To logout, you need to close the browser or clear credentials
- For production use, consider using HTTPS and more secure authentication methods

## Deploying to Netlify

Netlify serves the `public` folder as static files and does not run `server.js`. On Netlify, the login is handled by the edge function in `netlify/edge-functions/basic-auth.ts`. It protects `/dashboard` and `/dashboard.html` with the same HTTP Basic Auth popup.

The credentials default to `admin` / `password`. To change them, set the `BASIC_AUTH_USERNAME` and `BASIC_AUTH_PASSWORD` environment variables in the Netlify UI.
