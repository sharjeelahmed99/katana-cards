import { IsNotEmpty, IsDefined, IsEnum, IsBoolean } from 'class-validator';
import { DeckType } from 'src/model/deckMaster.entity';
export class CreateCardDto {
  @IsNotEmpty()
  @IsDefined()
  @IsBoolean()
  shuffled: boolean;

  @IsNotEmpty()
  @IsDefined()
  @IsEnum(DeckType)
  type: DeckType;
}
