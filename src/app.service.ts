import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Nexandría es un proyecto para gestión de bibliotecas de la ET21';
  }
}
