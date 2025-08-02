import { t } from '@deepkit/type';

export class EnvConfig {
  @t
  NODE_ENV: 'production' | 'prod' | 'development' | 'dev' | 'test' =
    'development';



  @t
  DATABASE_URL: string;



 
  @t
  PORT: number = 35000;



  @t
  APPLICATION: string = 'HSA';

  @t
  GLOBAL_PREFIX: string = 'api';

 
}
