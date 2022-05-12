import { MigrationInterface, QueryRunner } from 'typeorm';

export class seedData1652353443483 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO public.cards (suit, code, value, "rank") VALUES('SPADES', 'AS', 'ACE', '1');
        INSERT INTO public.cards (suit, code, value, "rank") VALUES('SPADES', '2S', '2', '2');
        INSERT INTO public.cards (suit, code, value, "rank") VALUES('SPADES', '3S', '3', '3');
        INSERT INTO public.cards (suit, code, value, "rank") VALUES('SPADES', '4S', '4', '4');
        INSERT INTO public.cards (suit, code, value, "rank") VALUES('SPADES', '5S', '5', '5');
        INSERT INTO public.cards (suit, code, value, "rank") VALUES('SPADES', '6S', '6', '6');
        INSERT INTO public.cards (suit, code, value, "rank") VALUES('SPADES', '7S', '7', '7');
        INSERT INTO public.cards (suit, code, value, "rank") VALUES('SPADES', '8S', '8', '8');
        INSERT INTO public.cards (suit, code, value, "rank") VALUES('SPADES', '9S', '9', '9');
        INSERT INTO public.cards (suit, code, value, "rank") VALUES('SPADES', '10S', '10', '10');
        INSERT INTO public.cards (suit, code, value, "rank") VALUES('SPADES', 'JS', 'JACK', '11');
        INSERT INTO public.cards (suit, code, value, "rank") VALUES('SPADES', 'QS', 'QUEEN', '12');
        INSERT INTO public.cards (suit, code, value, "rank") VALUES('SPADES', 'KS', 'KING', '13');
        
        
        INSERT INTO public.cards (suit, code, value, "rank") VALUES('CLUB', 'AC', 'ACE', '1');
        INSERT INTO public.cards (suit, code, value, "rank") VALUES('CLUB', '2C', '2', '2');
        INSERT INTO public.cards (suit, code, value, "rank") VALUES('CLUB', '3C', '3', '3');
        INSERT INTO public.cards (suit, code, value, "rank") VALUES('CLUB', '4C', '4', '4');
        INSERT INTO public.cards (suit, code, value, "rank") VALUES('CLUB', '5C', '5', '5');
        INSERT INTO public.cards (suit, code, value, "rank") VALUES('CLUB', '6C', '6', '6');
        INSERT INTO public.cards (suit, code, value, "rank") VALUES('CLUB', '7C', '7', '7');
        INSERT INTO public.cards (suit, code, value, "rank") VALUES('CLUB', '8C', '8', '8');
        INSERT INTO public.cards (suit, code, value, "rank") VALUES('CLUB', '9C', '9', '9');
        INSERT INTO public.cards (suit, code, value, "rank") VALUES('CLUB', '10C', '10', '10');
        INSERT INTO public.cards (suit, code, value, "rank") VALUES('CLUB', 'JC', 'JACK', '11');
        INSERT INTO public.cards (suit, code, value, "rank") VALUES('CLUB', 'QC', 'QUEEN', '12');
        INSERT INTO public.cards (suit, code, value, "rank") VALUES('CLUB', 'KC', 'KING', '13');
        
        
        INSERT INTO public.cards (suit, code, value, "rank") VALUES('HEART', 'AH', 'ACE', '1');
        INSERT INTO public.cards (suit, code, value, "rank") VALUES('HEART', '2H', '2', '2');
        INSERT INTO public.cards (suit, code, value, "rank") VALUES('HEART', '3H', '3', '3');
        INSERT INTO public.cards (suit, code, value, "rank") VALUES('HEART', '4H', '4', '4');
        INSERT INTO public.cards (suit, code, value, "rank") VALUES('HEART', '5H', '5', '5');
        INSERT INTO public.cards (suit, code, value, "rank") VALUES('HEART', '6H', '6', '6');
        INSERT INTO public.cards (suit, code, value, "rank") VALUES('HEART', '7H', '7', '7');
        INSERT INTO public.cards (suit, code, value, "rank") VALUES('HEART', '8H', '8', '8');
        INSERT INTO public.cards (suit, code, value, "rank") VALUES('HEART', '9H', '9', '9');
        INSERT INTO public.cards (suit, code, value, "rank") VALUES('HEART', '10H', '10', '10');
        INSERT INTO public.cards (suit, code, value, "rank") VALUES('HEART', 'JH', 'JACK', '11');
        INSERT INTO public.cards (suit, code, value, "rank") VALUES('HEART', 'QH', 'QUEEN', '12');
        INSERT INTO public.cards (suit, code, value, "rank") VALUES('HEART', 'KH', 'KING', '13');
        
        
        INSERT INTO public.cards (suit, code, value, "rank") VALUES('DIAMOND', 'AD', 'ACE', '1');
        INSERT INTO public.cards (suit, code, value, "rank") VALUES('DIAMOND', '2D', '2', '2');
        INSERT INTO public.cards (suit, code, value, "rank") VALUES('DIAMOND', '3D', '3', '3');
        INSERT INTO public.cards (suit, code, value, "rank") VALUES('DIAMOND', '4D', '4', '4');
        INSERT INTO public.cards (suit, code, value, "rank") VALUES('DIAMOND', '5D', '5', '5');
        INSERT INTO public.cards (suit, code, value, "rank") VALUES('DIAMOND', '6D', '6', '6');
        INSERT INTO public.cards (suit, code, value, "rank") VALUES('DIAMOND', '7D', '7', '7');
        INSERT INTO public.cards (suit, code, value, "rank") VALUES('DIAMOND', '8D', '8', '8');
        INSERT INTO public.cards (suit, code, value, "rank") VALUES('DIAMOND', '9D', '9', '9');
        INSERT INTO public.cards (suit, code, value, "rank") VALUES('DIAMOND', '10D', '10', '10');
        INSERT INTO public.cards (suit, code, value, "rank") VALUES('DIAMOND', 'JD', 'JACK', '11');
        INSERT INTO public.cards (suit, code, value, "rank") VALUES('DIAMOND', 'QD', 'QUEEN', '12');
        INSERT INTO public.cards (suit, code, value, "rank") VALUES('DIAMOND', 'KD', 'KING', '13');
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
