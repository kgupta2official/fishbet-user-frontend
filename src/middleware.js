// import { NextResponse } from 'next/server';
// import i18nConfig from '../i18nConfig';
// import { i18nRouter } from 'next-i18n-router';

// const SUPPORTED_LANGUAGES = ['en', 'fr'];

// export function middleware(request) {
//   const pathname = request.nextUrl.pathname;

//   const currentLanguage = pathname.split('/')[1];

//   if (SUPPORTED_LANGUAGES.includes(currentLanguage)) {
//     return NextResponse.next();
//   }
//   const defaultLanguage = 'en';

//   const url = request.nextUrl.clone();
//   url.pathname = `/${defaultLanguage}${pathname}`;
//   // return NextResponse.redirect(url);

//   return i18nRouter(request, i18nConfig);
// }
// // applies this middleware only to files in the app directory
// export const config = {
//   matcher: ['/layout1/:path*', '/((?!api|static|.*\\..*|_next).*)'],
// };


// import { NextResponse } from 'next/server';
// import i18nConfig from '../i18nConfig';
// import { i18nRouter } from 'next-i18n-router';

// const SUPPORTED_LANGUAGES = ['en', 'fr'];
// const BLOCKED_COUNTRIES = ['CN', 'RU', 'KP'];

// export async function middleware(request) {
//   // Get visitor IP
//   const ip = request.ip || request.headers.get('x-forwarded-for') || '1.1.1.1';

//   // Get country using IP
//   const res = await fetch(`https://ipapi.co/${ip}/json/`);
//   const geo = await res.json();

//   const country = geo?.country;
//   if (BLOCKED_COUNTRIES.includes(country)) {
//     const blockedUrl = request.nextUrl.clone();
//     blockedUrl.pathname = '/blocked';
//     return NextResponse.redirect(blockedUrl);
//   }

//   // Language routing
//   const pathname = request.nextUrl.pathname;
//   const currentLanguage = pathname.split('/')[1];

//   if (SUPPORTED_LANGUAGES.includes(currentLanguage)) {
//     return NextResponse.next();
//   }

//   const defaultLanguage = 'en';
//   const url = request.nextUrl.clone();
//   url.pathname = `/${defaultLanguage}${pathname}`;

//   return i18nRouter(request, i18nConfig);
// }

// export const config = {
//   matcher: ['/layout1/:path*', '/((?!api|static|.*\\..*|_next).*)'],
// };


// import { NextResponse } from 'next/server';
// import i18nConfig from '../i18nConfig';
// import { i18nRouter } from 'next-i18n-router';

// const SUPPORTED_LANGUAGES = ['en', 'fr'];
// const BLOCKED_COUNTRIES = ['CN', 'RU', 'KP'];

// export async function middleware(request) {
//   const devFallbackIP = '103.21.244.0'; // Change to simulate any country
//   const ip =
//     request.ip ||
//     request.headers.get('x-forwarded-for') ||
//     (process.env.NODE_ENV === 'development' ? devFallbackIP : '1.1.1.1');

//   try {
//     const res = await fetch(`https://ipapi.co/${ip}/json/`);
//     const geo = await res.json();

// const country = geo?.country;

//     if (country && BLOCKED_COUNTRIES.includes(country)) {
//       const blockedUrl = request.nextUrl.clone();
//       blockedUrl.pathname = '/blocked';
//       return NextResponse.redirect(blockedUrl);
//     }
//   } catch (error) {
//     console.error('Geolocation fetch failed:', error);
//   }

//   // Language routing
//   const pathname = request.nextUrl.pathname;
//   const currentLanguage = pathname.split('/')[1];

//   if (SUPPORTED_LANGUAGES.includes(currentLanguage)) {
//     return NextResponse.next();
//   }

//   const defaultLanguage = 'en';
//   const url = request.nextUrl.clone();
//   url.pathname = `/${defaultLanguage}${pathname}`;

//   return i18nRouter(request, i18nConfig);
// }

// export const config = {
//   matcher: ['/layout1/:path*', '/((?!api|static|.*\\..*|_next).*)'],
// };


// import { NextResponse } from 'next/server';
// import i18nConfig from '../i18nConfig';
// import { i18nRouter } from 'next-i18n-router';

// const SUPPORTED_LANGUAGES = ['en', 'fr'];
// const BLOCKED_COUNTRIES = ['CA', 'CN', 'RU', 'KP'];

// export async function middleware(request) {
//   let ip = request.headers.get('x-forwarded-for') || request.ip;

//   if (process.env.NODE_ENV === 'development') {
//     ip = '103.21.244.0'; // Test IP for CA
//   }

//   try {
//     const geoRes = await fetch(`https://ipapi.co/${ip}/json/`);
//     const geo = await geoRes.json();
//     const country = geo?.country;
//     if (country && BLOCKED_COUNTRIES.includes(country)) {
//       const pathname = request.nextUrl.pathname;

//       // If already on /blocked, allow
//       if (pathname === '/blocked' || pathname.startsWith('/en/blocked') || pathname.startsWith('/fr/blocked')) {
//         return NextResponse.next();
//       }

//       const blockedUrl = request.nextUrl.clone();
//       blockedUrl.pathname = '/blocked';
//       return NextResponse.redirect(blockedUrl);
//     }
//   } catch (err) {
//     console.error('Geo lookup failed:', err);
//   }

//   // Language routing logic
//   const pathname = request.nextUrl.pathname;
//   const currentLanguage = pathname.split('/')[1];

//   if (SUPPORTED_LANGUAGES.includes(currentLanguage)) {
//     return NextResponse.next();
//   }

//   const defaultLanguage = 'en';
//   const url = request.nextUrl.clone();
//   url.pathname = `/${defaultLanguage}${pathname}`;

//   return i18nRouter(request, i18nConfig);
// }

// export const config = {
//   matcher: [
//     '/((?!api|_next|static|.*\\..*).*)', // Apply to all routes except static/api
//   ],
// };

import { NextResponse } from 'next/server';
import i18nConfig from '../i18nConfig';
import { i18nRouter } from 'next-i18n-router';

const SUPPORTED_LANGUAGES = ['en', 'fr'];
const BLOCKED_COUNTRIES = ['Europe1'];

export async function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // ✅ Prevent infinite redirect loop
  //  if (pathname === '/blocked') {
  //   return NextResponse.next();
  // }

  let ip = request.headers.get('x-forwarded-for') || request.ip;

  if (process.env.NODE_ENV === 'development') {
    //ip = '103.21.244.0'; // Replace with any public IP for testing
  }

  try {
    const geoRes = await fetch(`https://ipwhois.app/json/${ip}`);
    const geo = await geoRes.json();
    const continent = geo?.continent;

    // if (continent && BLOCKED_COUNTRIES.includes(continent)) {
    //   const blockedUrl = request.nextUrl.clone();
    //   blockedUrl.pathname = '/blocked';
    //   return NextResponse.redirect(blockedUrl);
    // } else {
    //   if (pathname === '/blocked') {
    //     const allowedUrl = request.nextUrl.clone();
    //     allowedUrl.pathname = '/';
    //     return NextResponse.redirect(allowedUrl);
    //   }
    // }

if (continent && BLOCKED_COUNTRIES.includes(continent)) {
    if (pathname !== '/blocked') {
      const blockedUrl = request.nextUrl.clone();
      blockedUrl.pathname = '/blocked';
      return NextResponse.redirect(blockedUrl);
    } else {
      return NextResponse.next();
    }
  } else {
    if (pathname === '/blocked') {
      const allowedUrl = request.nextUrl.clone();
      allowedUrl.pathname = '/';
      return NextResponse.redirect(allowedUrl);
    }
  }
  } catch (err) {
    console.error('Geo lookup failed:', err);
  }

  // --- Language routing ---
  const currentLanguage = pathname.split('/')[1];

  if (SUPPORTED_LANGUAGES.includes(currentLanguage)) {
    return NextResponse.next();
  }

  const defaultLanguage = 'en';
  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLanguage}${pathname}`;

  return i18nRouter(request, i18nConfig);
}


export const config = {
  matcher: ['/layout1/:path*', '/((?!api|static|.*\\..*|_next).*)'],
};