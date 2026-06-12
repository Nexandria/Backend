import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { auth, type Session, type AuthUser } from './auth';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Obtiene la sesión activa a partir de los headers de la request.
   * Usado internamente por el AuthGuard.
   */
  async getSession(headers: Headers): Promise<Session | null> {
    return auth.api.getSession({ headers });
  }

  async getUserByEmail(email: string): Promise<AuthUser | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async getUserById(id: string): Promise<AuthUser | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
}
