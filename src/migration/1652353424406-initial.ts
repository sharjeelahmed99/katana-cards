import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1652353424406 implements MigrationInterface {
    name = 'initial1652353424406'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "deck_master" ("createdDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedDate" TIMESTAMP WITH TIME ZONE, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "remainingCards" integer NOT NULL, "shuffled" boolean NOT NULL DEFAULT false, "type" character varying NOT NULL DEFAULT 'FULL', CONSTRAINT "PK_a324be59d824b7f8a8a35d7ea30" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "deck_details" ("id" SERIAL NOT NULL, "cardId" integer NOT NULL, "deckMasterId" uuid NOT NULL, "rank" integer NOT NULL, "isOpen" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_155cccc50fb6983bf780e882cd2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."cards_suit_enum" AS ENUM('SPADES', 'CLUB', 'HEART', 'DIAMOND')`);
        await queryRunner.query(`CREATE TABLE "cards" ("id" SERIAL NOT NULL, "suit" "public"."cards_suit_enum" NOT NULL, "code" character varying NOT NULL, "value" character varying NOT NULL, "rank" integer NOT NULL, CONSTRAINT "PK_5f3269634705fdff4a9935860fc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "deck_details" ADD CONSTRAINT "FK_54a899d9e3e5da742a10e7a98f1" FOREIGN KEY ("cardId") REFERENCES "cards"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "deck_details" ADD CONSTRAINT "FK_f26e5a617db72462b6ed899e35c" FOREIGN KEY ("deckMasterId") REFERENCES "deck_master"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deck_details" DROP CONSTRAINT "FK_f26e5a617db72462b6ed899e35c"`);
        await queryRunner.query(`ALTER TABLE "deck_details" DROP CONSTRAINT "FK_54a899d9e3e5da742a10e7a98f1"`);
        await queryRunner.query(`DROP TABLE "cards"`);
        await queryRunner.query(`DROP TYPE "public"."cards_suit_enum"`);
        await queryRunner.query(`DROP TABLE "deck_details"`);
        await queryRunner.query(`DROP TABLE "deck_master"`);
    }

}
