import { Injectable, BadRequestException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { CompleteProfileDto } from './dto/complete-profile.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
// import * as nodemailer from 'nodemailer';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(data: RegisterDto) {
    // Check if email or username exists
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: data.email }, { username: data.username }],
      },
    });

    if (existingUser) {
      if (existingUser.email === data.email) throw new BadRequestException('El correo ya está registrado');
      if (existingUser.username === data.username) throw new BadRequestException('El nombre de usuario ya está registrado');
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        username: data.username,
        password: passwordHash,
      },
    });

    const token = crypto.randomBytes(32).toString('hex');
    await this.prisma.emailVerificationToken.create({
      data: {
        token,
        userId: user.id,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 hours
      },
    });

    // TODO: Enviar correo al usuario con `token`
    // await this.sendVerificationEmail(user.email, token);

    return {
      message: 'Usuario registrado correctamente. Por favor verifica tu correo.',
      userId: user.id,
      // Se devuelve en desarrollo, en prod se envía por mail
      devToken: token,
    };
  }

  async verifyEmail(data: VerifyEmailDto) {
    const verification = await this.prisma.emailVerificationToken.findUnique({
      where: { token: data.token },
      include: { user: true },
    });

    if (!verification) {
      throw new BadRequestException('Token inválido');
    }

    if (verification.expiresAt < new Date()) {
      throw new BadRequestException('El token ha expirado. Por favor solicita uno nuevo.');
    }

    await this.prisma.user.update({
      where: { id: verification.userId },
      data: { isEmailVerified: true },
    });

    await this.prisma.emailVerificationToken.delete({
      where: { id: verification.id },
    });
c
    return { message: 'Correo verificado existosamente' };
  }

  async login(data: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: data.email },
          { username: data.username },
        ],
      },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isValid = await bcrypt.compare(data.password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    if (!user.isEmailVerified) {
      throw new UnauthorizedException('Debe verificar su correo para poder iniciar sesión');
    }

    const payload = { sub: user.id, username: user.username, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async completeProfile(userId: number, data: CompleteProfileDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        fullName: data.fullName,
        dni: data.dni,
        address: data.address,
        birth: data.birth,
        gender: data.gender,
      },
    });

    return updatedUser;
  }
}
