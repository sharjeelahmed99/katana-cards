import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardsModule } from 'src/cards/cards.module';
import { Cards } from 'src/model/cards.entity';
import { DeckDetails } from 'src/model/deckDetails.entity';
import { DeckMaster } from 'src/model/deckMaster.entity';

export async function createTestModule(): Promise<TestingModule> {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [
      CardsModule,
      TypeOrmModule.forRoot({
        type: 'postgres',
        url: process.env.DATABASE_URL || process.env.TYPEORM_URL_TEST,
        synchronize: false,
        dropSchema: true,
        entities: [Cards, DeckDetails, DeckMaster],
        logging: false,
        migrations: [process.env.TYPEORM_MIGRATIONS],
        migrationsRun: true,
        extra: process.env.TYPEORM_DRIVER_EXTRA ? JSON.parse(process.env.TYPEORM_DRIVER_EXTRA) : undefined,
        autoLoadEntities: true,
        keepConnectionAlive: true,
      }),
    ],
  }).compile();
  return moduleFixture;
}

export const createApp = async () => {
  const moduleFixture: TestingModule = await createTestModule();
  const app = moduleFixture.createNestApplication();
  return await app.init();
};
