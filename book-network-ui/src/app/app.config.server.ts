import { mergeApplicationConfig, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { ApiModule } from './services/api.module';
import { environment } from '../environments/environment';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    importProvidersFrom(ApiModule.forRoot({rootUrl:environment.apiUrl}))
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
