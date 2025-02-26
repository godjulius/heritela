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

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideFileRouter(),
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
