import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
  ValidationPipe
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';

@Controller('users') // DECORATOR  // here we use '/users/' as the base route
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get() // GET /users  or /users?role=value
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    // can give it any name

    return this.usersService.findAll(role);
  }

  @Get(':id') // GET /users/:id             + param
  findOne(@Param('id', ParseIntPipe) id: number) {
    // adding param decorator
    return this.usersService.findOne(id);
  }

  @Post() // POST /users
  create(
    @Body(ValidationPipe)
    createUserDto: CreateUserDto,           // or user: CreateUserDto,
  ) {
    return this.usersService.create(createUserDto);       // or this.usersService.create(user);
  }

  @Patch(':id') //  PATCH /users/:id
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe)
    userUpdate: UpdateUserDto,      // or user updateUserDto instead of userUpdate
  ) {
    return this.usersService.update(id, userUpdate)       // or user updateUserDto instead of userUpdate
  }

  @Delete(':id') // DELETE /users/:id
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}
