import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { NotFoundException } from '@nestjs/common';
import { Roles } from './enums/role.enum';

@Injectable() // decorator - adds metadata that this class can be managed by nest
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Alice Smith',
      email: 'alice.smith@example.com',
      role: 'INTERN',
    },
    {
      id: 2,
      name: 'Bob Johnson',
      email: 'bob.johnson@example.com',
      role: 'INTERN',
    },
    {
      id: 3,
      name: 'Charlie Brown',
      email: 'charlie.brown@example.com',
      role: 'ENGINEER',
    },
    {
      id: 4,
      name: 'Diana Prince',
      email: 'diana.prince@example.com',
      role: 'ENGINEER',
    },
    {
      id: 5,
      name: 'Ethan Hunt',
      email: 'ethan.hunt@example.com',
      role: 'ADMIN',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const usersWithRoles = this.users.filter((user) => user.role === role);
      if (usersWithRoles.length === 0)
        throw new NotFoundException({
          Message: 'User Role Not Found',
          AvailableRoles: Object.values(Roles),
        });
      return usersWithRoles;
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException('User not found'); // instead of returning an empty response if user not exists
    }
    return user;
  }

  create(createUserDto: CreateUserDto) {
    // or user
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id); // Create an array of users sorted by ID
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...createUserDto,
    };

    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUserDto };
      }
      return user;
    });

    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);

    this.users = this.users.filter((user) => user.id !== id);

    return removedUser;
  }
}
