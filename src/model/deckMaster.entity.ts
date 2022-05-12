import { AuditedEntity } from 'src/shared/audited.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { DeckDetails } from './deckDetails.entity';

export enum Suits {
  SPADES = 'spade',
  CLUBS = 'club',
  HEART = 'heart',
  DIAMOND = 'diamond',
}

export enum DeckType {
  FULL = 'FULL',
  SHORT = 'SHORT',
}

@Entity()
export class DeckMaster extends AuditedEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  remainingCards: number;

  @Column({ default: false })
  shuffled: boolean;

  @Column({ type: 'enum', enum: DeckType, default: DeckType.FULL })
  type: DeckType;

  @OneToMany(() => DeckDetails, (deck) => deck.deckMaster, {
    cascade: ['insert', 'update'],
  })
  decks: DeckDetails[];
}
