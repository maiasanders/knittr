

import { isRouteErrorResponse, Outlet, ScrollRestoration } from 'react-router'
import './App.css'
import NavBar from './components/navBar'
import { Scripts } from 'react-router'
import type { Route } from "./+types/root"
import { redirect } from 'react-router-dom'

import baseStyleHref from "./base.css?url"
import LoadingSpinner from './components/loadingSpinner'


export default function App() {

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Knittr</title>
        <script src="https://kit.fontawesome.com/3fcafefc47.js" crossOrigin="anonymous"></script>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossOrigin="anonymous" />
        <link rel="stylesheet" href={baseStyleHref} />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {/* <NavBar /> */}
      </body>
    </html>
  );
}

// TODO error boundary
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "oops"
  let details = "An error occured"
  let stack: string | undefined
  if (isRouteErrorResponse(error)) {
    if (error.status === 401) {
      return redirect("/login")
    }
    if (error.status === 404) {
      return redirect("/404")
    }
    message = error.statusText
    details = error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main id='error-page'>
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre>
          <code>{stack}</code>
        </pre>
      )}
    </main>
  )
}

// TODO fallback
export function HydrateFallback() {
  return (
    <LoadingSpinner />
  )
}
