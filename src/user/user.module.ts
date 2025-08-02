import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from 'src/lib/database/database.module';
import { UserTableDefinition } from 'src/models/user.model';

@Module({
  imports: [
    DatabaseModule.forFeature(UserTableDefinition),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {
  
}
