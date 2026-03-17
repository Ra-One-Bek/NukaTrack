import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ListingsModule } from './listings/listings.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RequestsModule } from './requests/requests.module';
import { FavoritesModule } from './favorites/favorites.module';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [PrismaModule, ListingsModule, AuthModule, UsersModule, RequestsModule, FavoritesModule, AiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
