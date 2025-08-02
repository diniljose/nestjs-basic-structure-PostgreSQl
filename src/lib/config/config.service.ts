import { Inject, Injectable } from '@nestjs/common';
import {  POSTGRES_DB_URI } from 'src/constants';
import { DatabaseModuleOptions } from '../database/interfaces/database-options.interface';
import { CONFIG_MODULE_OPTIONS } from './config.constants';
import { ConfigModuleOptions } from './interfaces/config-options.interface';
import { EnvConfig } from './model/env.model';

@Injectable()
export class ConfigService {
  private envConfig: EnvConfig;

  constructor(
    @Inject(CONFIG_MODULE_OPTIONS)
    options: ConfigModuleOptions,
  ) {
    if (!options.useProcess && !options.fileName) {
      throw new Error(
        'Missing configuration options.' +
        ' If using process.env variables, please mark useProcess as "true".' +
        ' Otherwise, please provide and env file.',
      );
    }
  }

  get databaseUrl(): string {
    return POSTGRES_DB_URI;
  }

  get isProd(): boolean {
    const env = this.nodeEnv.toLowerCase();
    return env === 'production' || env === 'prod';
  }

  get databaseConfig(): DatabaseModuleOptions {
    return {
      connectionUrl: this.databaseUrl,
      ssl: this.isProd,
    };
  }

  get nodeEnv(): string {
    return "test";
  }

  get globalPrefix(): string {
    return this.envConfig.GLOBAL_PREFIX;
  }

  get port(): number {
    return this.envConfig.PORT;
  }

  get applicationName(): string {
    return "HSA";
  }


}
