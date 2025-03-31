

import { isRouteErrorResponse, Outlet, ScrollRestoration, useNavigate } from 'react-router'
import './App.css'
import NavBar from './components/navBar/navBar'
import { Scripts } from 'react-router'
import type { Route } from "./+types/root"

import baseStyleHref from "./base.css?url"
import LoadingSpinner from './components/loadingSpinner/loadingSpinner'
import React, { useEffect } from 'react'
import ClickableIcon from './components/clickableIcon/clickableIcon'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'


export default function App() {
  return (
    <>
      <NavBar />
      <React.Suspense fallback={<LoadingSpinner />}>
        <Outlet />
      </React.Suspense>
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

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "oops"
  let details = "An error occured"
  let stack: string | undefined

  const navigate = useNavigate()

  useEffect(() => {

    if (error.status === 401) {
      navigate("/login")
    }
    if (error.status === 404) {
      navigate("/404")
    }

    if (isRouteErrorResponse(error)) {
      message = error.statusText
      details = error.statusText || details

    } else if (import.meta.env.DEV && error && error instanceof Error) {
      details = error.message;
      stack = error.stack;
    }
  }, [])

  return (
    <main id='error-page'>
      <h1>{message}</h1>
      <ClickableIcon icon={faArrowLeft} handleClick={() => navigate('/projects')} />
      <p>{details}</p>
      {stack && (
        <pre>
          <code>{stack}</code>
        </pre>
      )}
    </main>
  )
}

export function HydrateFallback() {
  return (
    <LoadingSpinner />
  )
}
