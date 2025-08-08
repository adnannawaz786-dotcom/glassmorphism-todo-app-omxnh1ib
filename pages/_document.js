import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* SEO Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="description" content="A beautiful glassmorphism todo app with add, delete, and rename functionality. Stay organized with our modern, responsive task management application." />
        <meta name="keywords" content="todo app, task management, glassmorphism, productivity, organize tasks, todo list" />
        <meta name="author" content="Glassmorphism Todo App" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Glassmorphism Todo App - Beautiful Task Management" />
        <meta property="og:description" content="A beautiful glassmorphism todo app with add, delete, and rename functionality. Stay organized with our modern, responsive task management application." />
        <meta property="og:site_name" content="Glassmorphism Todo App" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="Glassmorphism Todo App - Beautiful Task Management" />
        <meta property="twitter:description" content="A beautiful glassmorphism todo app with add, delete, and rename functionality. Stay organized with our modern, responsive task management application." />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Theme Color */}
        <meta name="theme-color" content="#1e293b" />
        <meta name="msapplication-TileColor" content="#1e293b" />
        
        {/* Viewport for mobile optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        
        {/* Performance and Security */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* PWA Support */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Todo App" />
        
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Glassmorphism Todo App",
              "description": "A beautiful glassmorphism todo app with add, delete, and rename functionality",
              "url": typeof window !== 'undefined' ? window.location.origin : '',
              "applicationCategory": "ProductivityApplication",
              "operatingSystem": "Any",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "featureList": [
                "Add tasks",
                "Delete tasks", 
                "Rename tasks",
                "Glassmorphism design",
                "Responsive layout",
                "Mobile optimized"
              ]
            })
          }}
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}