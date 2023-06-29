import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1688062572153 implements MigrationInterface {
    name = 'InitialMigration1688062572153'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_ae79ebeccf5f873cf2153938ebf"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_e6b8c982ff3a2c0844e6e7b42f4"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_8330768f6823a913e0293952c83"`);
        await queryRunner.query(`ALTER TABLE "galleries" DROP CONSTRAINT "FK_6a518b58c4d3407548e3ee64405"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "reset_password" character varying`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_e6b8c982ff3a2c0844e6e7b42f4" FOREIGN KEY ("carUuid") REFERENCES "cars"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_ae79ebeccf5f873cf2153938ebf" FOREIGN KEY ("userUuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_8330768f6823a913e0293952c83" FOREIGN KEY ("addressUuid") REFERENCES "adresses"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "galleries" ADD CONSTRAINT "FK_6a518b58c4d3407548e3ee64405" FOREIGN KEY ("carUuid") REFERENCES "cars"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "galleries" DROP CONSTRAINT "FK_6a518b58c4d3407548e3ee64405"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_8330768f6823a913e0293952c83"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_ae79ebeccf5f873cf2153938ebf"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_e6b8c982ff3a2c0844e6e7b42f4"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "reset_password"`);
        await queryRunner.query(`ALTER TABLE "galleries" ADD CONSTRAINT "FK_6a518b58c4d3407548e3ee64405" FOREIGN KEY ("carUuid") REFERENCES "cars"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_8330768f6823a913e0293952c83" FOREIGN KEY ("addressUuid") REFERENCES "adresses"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_e6b8c982ff3a2c0844e6e7b42f4" FOREIGN KEY ("carUuid") REFERENCES "cars"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_ae79ebeccf5f873cf2153938ebf" FOREIGN KEY ("userUuid") REFERENCES "users"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
