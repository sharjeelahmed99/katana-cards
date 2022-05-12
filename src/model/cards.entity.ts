import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { DeckDetails } from './deckDetails.entity';

export enum Suits {
  SPADES = 'SPADES',
  CLUBS = 'CLUB',
  HEART = 'HEART',
  DIAMOND = 'DIAMOND',
}
@Entity()
export class Cards {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: Suits,
  })
  suit: Suits;

  @Column()
  code: string;

  @Column()
  value: string;

  @Column()
  rank: number;

  @OneToMany(() => DeckDetails, (deck) => deck.card, {
    cascade: ['insert', 'update'],
  })
  decks: DeckDetails[];
}
