import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cards } from 'src/model/cards.entity';
import { DeckDetails } from 'src/model/deckDetails.entity';
import { DeckMaster, DeckType } from 'src/model/deckMaster.entity';
import { Repository } from 'typeorm';
import { CreateCardResponseDto } from './dto/create-card-response.dto';
import { CreateCardDto } from './dto/create-card.dto';
import { DrawCardResponseDto } from './dto/draw-card-response.dto';
import { OpenCardResponseDto } from './dto/open-card-response.dto';

@Injectable()
export class CardsService {
  EXCLUDE_SHORT_CARDS = ['2', '3', '4', '5', '6'];
  constructor(
    @InjectRepository(Cards)
    private readonly cardRepository: Repository<Cards>,
    @InjectRepository(DeckMaster)
    private readonly deckMasterRepository: Repository<DeckMaster>,
    @InjectRepository(DeckDetails)
    private readonly deckDetailsRepository: Repository<DeckDetails>,
  ) {}

  create(createCardDto: CreateCardDto) {
    return this.createDeck(createCardDto.shuffled, createCardDto.type);
  }

  open(id: string) {
    return this.openDeck(id);
  }

  draw(id: string, count: number) {
    return this.drawDeck(id, count);
  }

  async openDeck(deckId: string): Promise<OpenCardResponseDto> {
    const master: DeckMaster = await this.deckMasterRepository.findOne(deckId, {
      relations: ['decks', 'decks.card'],
    });
    if (!master) {
      throw new HttpException('Deck not found', HttpStatus.NOT_FOUND);
    }
    const data: OpenCardResponseDto = {
      deckId: master.id,
      remaining: master.remainingCards,
      shuffled: master.shuffled,
      type: master.type,
      cards: this.getSortedOpenCards(master.decks).map((d) => {
        return {
          suit: d.card.suit,
          code: d.card.code,
          value: d.card.value,
        };
      }),
    };

    return data;
  }
  async createDeck(shuffle: boolean, type: DeckType): Promise<CreateCardResponseDto> {
    let cards: Cards[] = await this.cardRepository.find();
    switch (type) {
      case DeckType.SHORT:
        cards = cards.filter((card) => !this.EXCLUDE_SHORT_CARDS.includes(card.value));
        break;

      default:
        break;
    }
    if (shuffle) {
      cards = cards.sort((a, b) => 0.5 - Math.random());
    }
    const master = new DeckMaster();
    const details = cards.map((card, index) => {
      const detail = new DeckDetails();
      detail.rank = index + 1;
      detail.card = card;
      detail.deckMaster = master;
      return detail;
    });
    master.remainingCards = cards.length;
    master.decks = details;
    master.shuffled = shuffle;
    master.type = type;
    const data = await this.deckMasterRepository.save(master);
    return {
      deckId: data.id,
      type: data.type,
      shuffled: data.shuffled,
      remaining: data.remainingCards,
    };
  }

  async drawDeck(deckId: string, count: number): Promise<DrawCardResponseDto> {
    const master: DeckMaster = await this.deckMasterRepository.findOne(deckId, {
      relations: ['decks', 'decks.card'],
    });
    if (!master) {
      throw new HttpException('Deck not found', HttpStatus.NOT_FOUND);
    }

    const openCards = this.getSortedOpenCards(master.decks);
    if (!openCards || openCards.length === 0) {
      throw new HttpException('All cards have been drawn', HttpStatus.NOT_ACCEPTABLE);
    }
    const maxCardsToDraw = count > openCards.length ? openCards.length : count;
    const cardsToUpdate: DeckDetails[] = Array.apply(null, { length: maxCardsToDraw })
      .map(Number.call, Number)
      .map((index) => {
        openCards[index].isOpen = true;
        return openCards[index];
      });
    master.remainingCards = master.remainingCards - cardsToUpdate.length;
    await this.deckDetailsRepository.save(cardsToUpdate);
    await this.deckMasterRepository.save(master);

    return {
      cards: cardsToUpdate.map((deck) => {
        return {
          suit: deck.card.suit,
          code: deck.card.code,
          value: deck.card.value,
        };
      }),
    };
  }

  getSortedOpenCards(decks: DeckDetails[]): DeckDetails[] {
    return decks
      .filter((deck) => !deck.isOpen)
      .sort((a, b) => {
        return a.rank - b.rank;
      });
  }
}
