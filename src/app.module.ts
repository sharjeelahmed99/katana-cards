import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InitializationService } from './init';
import { CardsModule } from './cards/cards.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL || process.env.TYPEORM_URL,
      synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
      entities: [process.env.TYPEORM_ENTITIES],
      logging: process.env.TYPEORM_LOGGING === 'true',
      extra: process.env.TYPEORM_DRIVER_EXTRA ? JSON.parse(process.env.TYPEORM_DRIVER_EXTRA) : undefined,
      autoLoadEntities: true,
      migrations: [process.env.TYPEORM_MIGRATIONS],
      migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN === 'true',
    }),
    CardsModule,
  ],
  controllers: [AppController],
  providers: [AppService, InitializationService],
})
export class AppModule {}
