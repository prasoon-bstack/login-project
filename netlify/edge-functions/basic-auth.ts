import type { Config, Context } from '@netlify/edge-functions'

// HTTP Basic Authentication for protected pages, mirroring the check in server.js.
// Credentials default to admin/password and can be overridden with the
// BASIC_AUTH_USERNAME and BASIC_AUTH_PASSWORD environment variables.
export default async (req: Request, context: Context) => {
  const expectedUser = Netlify.env.get('BASIC_AUTH_USERNAME') || 'admin'
  const expectedPass = Netlify.env.get('BASIC_AUTH_PASSWORD') || 'password'

  const unauthorized = (message: string) =>
    new Response(message, {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Login Required"',
        'Cache-Control': 'no-store',
      },
    })

  const authHeader = req.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return unauthorized('Authentication required')
  }

  let credentials: string
  try {
    credentials = atob(authHeader.slice('Basic '.length).trim())
  } catch {
    return unauthorized('Authentication required')
  }

  const separator = credentials.indexOf(':')
  const username = credentials.slice(0, separator)
  const password = credentials.slice(separator + 1)

  if (separator === -1 || username !== expectedUser || password !== expectedPass) {
    return unauthorized('Invalid credentials')
  }

  const response = await context.next()
  response.headers.set('Cache-Control', 'no-store')
  return response
}

export const config: Config = {
  path: ['/dashboard', '/dashboard.html'],
}
