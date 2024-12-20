// import { appRouter } from './app/app.routes'; // Import the routes
// import { bootstrapApplication } from '@angular/platform-browser';
// import { AppComponent } from './app/app.component';
// import { appRoutes } from './app/app.routes';
// import { provideRouter } from '@angular/router';
// import { provideHttpClient } from '@angular/common/http';
// import { NavbarComponent } from './app/navbar/navbar.component';
// import { SidebarComponent } from './app/sidebar/sidebar.component';


// bootstrapApplication(AppComponent, {
//   providers: [
//     appRouter,       // Provide the routes
//     provideHttpClient(), // Required for HTTP calls
//   ],
// }).catch((err) => console.error(err));


import { AppComponent } from './app/app.component';
import { appRouter } from './app/app.routes'; // Import the routes
import { bootstrapApplication } from '@angular/platform-browser';
import { appRoutes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { NavbarComponent } from './app/navbar/navbar.component';
import { SidebarComponent } from './app/sidebar/sidebar.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader } from '@ngx-translate/core';



export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../src/assets/language');
}

bootstrapApplication(AppComponent, {
  providers: [
    appRouter,           // Provide routes
    provideHttpClient(),

    {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient],
    },
    // Provide HttpClient
  ],
}).catch((err) => console.error(err));
