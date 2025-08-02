import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TranslationService } from './services/translation/translation.service';
import { ResponseService } from './services/response/response.service';
import { APP_PIPE } from '@nestjs/core';
import { CustomValidationPipe } from './common/pipes/custom-validation.pipe';
import { getEnvFilePath } from './helpers/env.config';
import { DatabaseModule } from './lib/database/database.module';
import { ConfigModuleConfig, DatabaseModuleConfig } from './lib/options';
import { ConfigModule } from './lib/config/config.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRootAsync(ConfigModule, {
      useClass: ConfigModuleConfig,
    }),
    DatabaseModule.forRootAsync({
      imports: [ConfigModule.Deferred],
      useClass: DatabaseModuleConfig,
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, TranslationService, ResponseService, {
    provide: APP_PIPE,
    useFactory: (responseService: ResponseService) => {
      return new CustomValidationPipe(responseService);
    },
    inject: [ResponseService],
  },],
})
export class AppModule { }
