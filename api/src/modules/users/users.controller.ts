import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';

import { LocalAuthGuard } from './guard/local-auth.guard';
import { Public } from './decorator/auth.decorator';
import { UsersService } from './users.service';
import { LoginDto } from './dto/login.dto';
import { UserLoggedDto } from './dto/user-logged.dto';
import { UserDto } from './dto/user.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { ApiExceptionDto } from '../../dto/ApiException.dto';

@ApiTags('users')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ type: ApiExceptionDto })
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ApiBody({ type: LoginDto })
  @ApiCreatedResponse({ type: LoginResponseDto })
  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  async login(@Request() req: { user: UserLoggedDto }): Promise<LoginResponseDto> {
    return this.usersService.login(req.user);
  }

  @Get('/me')
  @ApiOkResponse({ type: UserDto })
  @ApiBearerAuth()
  getMe(@Request() req: { user: UserLoggedDto }) {
    return this.usersService.getMe(req.user.id);
  }

}
