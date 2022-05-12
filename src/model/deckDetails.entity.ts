import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Cards } from './cards.entity';
import { DeckMaster } from './deckMaster.entity';

export enum Suits {
  SPADES = 'spade',
  CLUBS = 'club',
  HEART = 'heart',
  DIAMOND = 'diamond',
}
@Entity()
export class DeckDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cards, (card) => card.decks)
  @JoinColumn({ name: 'cardId' })
  card: Cards;

  @Column({ type: 'number' })
  cardId: number;

  @ManyToOne(() => DeckMaster, (deckMaster) => deckMaster.decks)
  @JoinColumn({ name: 'deckMasterId' })
  deckMaster: DeckMaster;

  @Column({ type: 'uuid' })
  deckMasterId: string;

  @Column()
  rank: number;

  @Column({ default: false })
  isOpen: boolean;
}
