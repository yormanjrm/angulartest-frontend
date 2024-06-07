import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { setAuthorizationHeadersInterceptor } from './core/interceptors/set-authorization-headers.interceptor';
import { apiResponseInterceptor } from './core/interceptors/api-response.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([setAuthorizationHeadersInterceptor, apiResponseInterceptor])
    ),
    provideAnimationsAsync()
  ]
};