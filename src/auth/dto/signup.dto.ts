import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

/**
 * Shape enviado al endpoint POST /api/auth/sign-up/email (manejado por Better Auth).
 * El campo `name` es opcional aquí porque el servidor lo deriva del `username`
 * automáticamente si no se envía.
 */
export class SignupDto {
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'username solo puede contener letras, números y guiones bajos',
  })
  username!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  password!: string;
}
