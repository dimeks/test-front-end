import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
// import { LoginDto } from './dto/login.dto';
import { ConfigService } from '../../config/config.service';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,

    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(email: string, password: string): Promise<{ id: number }> {
    const user = await this.findByEmail(email);

    if (!user) {
      throw 'E-mail não cadastrado';
    }

    const isMatch = await bcrypt.compare(password, user?.password);
    if (user && !isMatch) {
      throw 'Dados incorretos';
    }

    return {
      id: user.id
    }
  }

  async login(user: { id: number }) {

    const payload = {
      id: user.id
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getMe(id: number): Promise<User> {
    return this.findByIdOrNotFound(id)
  }

  async findByIdOrNotFound(id: number): Promise<User> {
    const user = await this.repository.findOneBy({ id })
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Usuário [${id}] não encontrado`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    return this.repository
      .createQueryBuilder('users')
      .addSelect('users.password')
      .where('users.email = :email', { email })
      .getOne();
  }

}
