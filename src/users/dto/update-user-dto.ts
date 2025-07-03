import { CreateUserDto } from "./create-user-dto";
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserDto extends PartialType(CreateUserDto) {}  // the same as CRETE USER but all fields are not obligatory
