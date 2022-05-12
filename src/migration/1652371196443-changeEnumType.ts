import {MigrationInterface, QueryRunner} from "typeorm";

export class changeEnumType1652371196443 implements MigrationInterface {
    name = 'changeEnumType1652371196443'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deck_master" DROP COLUMN "type"`);
        await queryRunner.query(`CREATE TYPE "public"."deck_master_type_enum" AS ENUM('FULL', 'SHORT')`);
        await queryRunner.query(`ALTER TABLE "deck_master" ADD "type" "public"."deck_master_type_enum" NOT NULL DEFAULT 'FULL'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deck_master" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."deck_master_type_enum"`);
        await queryRunner.query(`ALTER TABLE "deck_master" ADD "type" character varying NOT NULL DEFAULT 'FULL'`);
    }

}
