import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideFileRouter, requestContextInterceptor } from '@analogjs/router';
import { providePrimeNG } from "primeng/config";
import {MyPreset} from "./app-preset";
import {provideFileRouter, requestContextInterceptor, withDebugRoutes, withExtraRoutes} from '@analogjs/router';
import {Routes} from "@angular/router";

const customRoutes: Routes = [
  {
    path: 'contact',
    loadComponent: () =>
      import('./custom_pages/contact/contact.component').then((m) => m.ContactComponent),
  },
]

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideFileRouter(withExtraRoutes(customRoutes), withDebugRoutes()),
    provideHttpClient(
      withFetch(),
      withInterceptors([requestContextInterceptor])
    ),
    provideClientHydration(),
    providePrimeNG({
      theme: {
        preset: MyPreset,
        options: {
          prefix: 'p',
          darkModeSelector: '.dark',
          // darkModeSelector: 'system',
          cssLayer: false,

        },
      },
      ripple: true,
      csp: {
        nonce: '...'
      },
      translation: {
        accept: 'Accept',
        reject: 'Reject',
        //translations
      }
    }),
  ],
};
