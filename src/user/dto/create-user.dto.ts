import { User } from '../entities/user.entity';
import {
  IsEmail,
  IsIn,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto extends User {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Weak password',
  })
  password: string;

  @IsString()
  @MinLength(3)
  @MaxLength(20)
  name: string;

  @IsString()
  @IsIn(['buyer', 'seller'], {
    message: 'Invalid role! Must be either "buyer" or "seller"',
  })
  role: string;
}
