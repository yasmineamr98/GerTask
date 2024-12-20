import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes'; // Import appRoutes instead of routes
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';



export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),        // Use appRoutes instead of routes
    provideClientHydration(),     // Support for server-side rendering or hydration
    provideHttpClient(withFetch()),
  ],
};
