import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideServerRouting } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { AuthGateway } from './domain/auth/auth.gateway';
import { AuthService } from './infrastructure/auth/auth.service';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideServerRouting(serverRoutes)  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
