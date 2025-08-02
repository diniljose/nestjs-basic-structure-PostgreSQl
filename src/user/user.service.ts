import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { catchError, map } from 'rxjs';
import { createDatabaseProviderToken } from 'src/lib/database/database.provider';
import { DatabaseService } from 'src/lib/database/database.service';
import { UserTableDefinition } from 'src/models/user.model';

@Injectable()
export class UserService {
  constructor(
    @Inject(createDatabaseProviderToken(UserTableDefinition.tableName))
    private readonly db: DatabaseService<any>,
  ) {}

  async create(dto: any) {
    await this.db.ensureTableExists();   // ensure table exists
    return (await this.db.save(dto)).pipe(
      catchError((err) => { throw new BadRequestException(err.message); }),
      map((res) => res),
    );
  }
      
}
