import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { auth } from './auth';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    // Construir headers para better-auth.
    // El bearer plugin lee automáticamente el header Authorization: Bearer <token>
    // El cookie plugin lee automáticamente las cookies.
    // Ambos mecanismos coexisten: web usa cookies, mobile usa Bearer.
    const headers = new Headers(request.headers as unknown as HeadersInit);

    const session = await auth.api.getSession({ headers });
    if (!session) {
      throw new UnauthorizedException('Sesión inválida o expirada');
    }

    (request as any).user = session.user;
    (request as any).session = session.session;

    return true;
  }
}
