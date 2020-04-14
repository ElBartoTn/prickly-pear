import {
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  Controller,
  UsePipes,
} from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import { UserDetailsRO, LoginResultRO } from './user.interface';
import { CreateUserDto, UpdateUserDto, LoginUserDto } from './dto';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { User } from './user.decorator';
import { ValidationPipe } from '../shared/pipes/validation.pipe';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('user')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('user')
  async findMe(@User('email') email: string): Promise<UserDetailsRO> {
    return await this.userService.findByEmail(email);
  }

  @Get('users/getAll')
  async findAll(): Promise<UserDetailsRO[]> {
    return await this.userService.findAll();
  }

  @Put('user')
  async update(
    @User('id') userId: string,
    @Body('user') userData: UpdateUserDto,
  ) {
    return await this.userService.update(userId, userData);
  }

  @Post('users')
  async create(@Body(new ValidationPipe()) userData: CreateUserDto) {
    return this.userService.create(userData);
  }

  @Delete('users/:slug')
  async delete(@Param() params: any) {
    return await this.userService.delete(params.slug);
  }

  @Post('users/login')
  async login(
    @Body(new ValidationPipe()) loginUserDto: LoginUserDto,
  ): Promise<LoginResultRO> {
    const _user = await this.userService.findOne(loginUserDto);

    const errors = { User: ' not found' };
    if (!_user) throw new HttpException({ errors }, 401);

    const token = await this.userService.generateJWT(_user);
    const { id, email, firstName, lastName } = _user;
    const loginResult: LoginResultRO = {
      id,
      email,
      token,
      firstName,
      lastName,
    };
    return loginResult;
  }
}
