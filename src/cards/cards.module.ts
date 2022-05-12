import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cards } from 'src/model/cards.entity';
import { DeckDetails } from 'src/model/deckDetails.entity';
import { DeckMaster } from 'src/model/deckMaster.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cards, DeckDetails, DeckMaster])],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}
