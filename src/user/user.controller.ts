import { Body, Controller, Logger, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('createUser')
  createMember(@Body() createUserDto: any) {
    Logger.debug(`createUser() membersDTO:[${JSON.stringify(Object.keys(createUserDto))} values ${JSON.stringify(Object.values(createUserDto).length)}]`);
    return this.userService.create(createUserDto);
  }

}
