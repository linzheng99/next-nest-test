import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'argon2';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    const { password, ...user } = createUserDto
    const hashedPassword = await hash(password)

    return await this.prismaService.user.create({
      data: {
        password: hashedPassword,
        ...user
      }
    })

  }

  async findByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: {
        email
      }
    })
  }
}
