import { DeckType } from 'src/model/deckMaster.entity';
import { CardResponse } from './cards-response.dto';

export class OpenCardResponseDto {
  deckId: string;
  type: DeckType;
  shuffled: boolean;
  remaining: number;
  cards: CardResponse[];
}
