import { DeckType } from 'src/model/deckMaster.entity';

export class CreateCardResponseDto {
  deckId: string;
  type: DeckType;
  shuffled: boolean;
  remaining: number;
}
