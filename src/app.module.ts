import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { RedisModule } from './redis/redis.module';
import { AuthModule } from './auth/auth.module';
import { SearchModule } from './search/search.module';
import { BranchModule } from './branch/branch.module';

@Module({
  imports: [PrismaModule, RedisModule, AuthModule, SearchModule, BranchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
