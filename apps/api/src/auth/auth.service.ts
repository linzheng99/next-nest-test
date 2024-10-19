import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) { }

  registerUser(createUserDto: CreateUserDto) {
    const user = this.userService.findByEmail(createUserDto.email)
    if (user)
      throw new ConflictException('用户已存在')
    return this.userService.create(createUserDto)
  }
}
