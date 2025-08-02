import { Logger, Provider } from '@nestjs/common';
// import { createProviderToken } from '@ogma/nestjs-module';
import { Pool } from 'pg';
import { POSTGRES_DB_URI } from 'src/constants';
import { DATABASE_FEATURE, DATABASE_MODULE_OPTIONS, DATABASE_POOL } from './database.constants';
import { DatabaseService } from './database.service';
import { DatabaseModuleOptions } from './interfaces/database-options.interface';
import { DatabaseFeatureOptions } from './interfaces/database.interface';

export function createDatabasePoolConnection(): Provider {
  return {
    provide: DATABASE_POOL,
    useFactory: async () => {
      const pool = new Pool({
        connectionString: POSTGRES_DB_URI,
      });

      try {
        await pool.query('SELECT 1'); // test connection
        Logger.log('✅ PostgreSQL connected successfully', 'Postgres');
      } catch (error) {
        Logger.error(`❌ Unable to connect: ${error.message}`, 'Postgres');
        throw error;
      }

      return pool; // ✅ return the pool (not pool.connect())
    },
    inject: [DATABASE_MODULE_OPTIONS],
  };
}


export function createDatabaseProviderToken(tableName: string): string {
  return `${DATABASE_FEATURE}:${tableName}`;
}

export function createDatabaseProviders(
  feature: DatabaseFeatureOptions,
): Provider[] {
  const token = createDatabaseProviderToken(feature.tableName);
  return [
    {
      inject: [DATABASE_POOL],
      provide: token,
      useFactory: (pool: Pool) => {
        return new DatabaseService(pool, feature);
      },
    },
  ];
}
