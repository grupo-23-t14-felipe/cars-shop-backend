import { MigrationInterface, QueryRunner } from "typeorm";

<<<<<<<< HEAD:src/migrations/1687112876126-createTables.ts
export class CreateTables1687112876126 implements MigrationInterface {
    name = 'CreateTables1687112876126'
========
export class InitialMigration1686952468256 implements MigrationInterface {
    name = 'InitialMigration1686952468256'
>>>>>>>> 6260cd7e20b25cd0d7122f77fe0178bb4a67b528:src/migrations/1686952468256-initialMigration.ts

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "adresses" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "cep" character varying(8) NOT NULL, "state" character varying(15) NOT NULL, "street" text NOT NULL, "city" character varying(50) NOT NULL, "number" character varying(8) NOT NULL, "complement" character varying(20), CONSTRAINT "PK_a2abb7b8a30ae3625f785fe3a48" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "users" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(80) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(120) NOT NULL, "cpf" character varying(11) NOT NULL, "celphone" character varying(11) NOT NULL, "birthday" date, "description" text, "imageUrl" text, "is_seller" boolean, "addressUuid" uuid, CONSTRAINT "REL_8330768f6823a913e0293952c8" UNIQUE ("addressUuid"), CONSTRAINT "PK_951b8f1dfc94ac1d0301a14b7e1" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "galleries" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "imageUrl" text, "carUuid" uuid, CONSTRAINT "PK_6405383f26dd88953d5d83b3fd7" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TYPE "public"."cars_fuel_type_enum" AS ENUM('1', '2', '3')`);
<<<<<<<< HEAD:src/migrations/1687112876126-createTables.ts
        await queryRunner.query(`CREATE TABLE "cars" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "brand" character varying(20) NOT NULL, "model" character varying(40) NOT NULL, "year" integer NOT NULL, "fuel_type" "public"."cars_fuel_type_enum" NOT NULL DEFAULT '1', "mileage" integer NOT NULL, "color" character varying(30) NOT NULL, "is_good_deal" boolean NOT NULL, "is_active" boolean NOT NULL, "img_default" character varying NOT NULL, "value" numeric(10,2) NOT NULL, "description" text NOT NULL, "userUuid" uuid, CONSTRAINT "PK_2931cc94b782957a81bf1018b54" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_e6b8c982ff3a2c0844e6e7b42f4" FOREIGN KEY ("carUuid") REFERENCES "cars"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_ae79ebeccf5f873cf2153938ebf" FOREIGN KEY ("userUuid") REFERENCES "users"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
========
        await queryRunner.query(`CREATE TABLE "cars" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "brand" character varying(20) NOT NULL, "model" character varying(40) NOT NULL, "year" integer NOT NULL, "fuel_type" "public"."cars_fuel_type_enum" NOT NULL DEFAULT '1', "mileage" integer NOT NULL, "color" character varying(30) NOT NULL, "is_good_deal" boolean NOT NULL, "is_active" boolean NOT NULL, "value" numeric(10,2) NOT NULL, "description" text NOT NULL, "img_default" text NOT NULL, "userUuid" uuid, CONSTRAINT "PK_2931cc94b782957a81bf1018b54" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "addedIn" date NOT NULL DEFAULT now(), "description" text NOT NULL, "carUuid" uuid, "userUuid" uuid, CONSTRAINT "PK_160936d39977f78f7789e0fb787" PRIMARY KEY ("uuid"))`);
>>>>>>>> 6260cd7e20b25cd0d7122f77fe0178bb4a67b528:src/migrations/1686952468256-initialMigration.ts
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_8330768f6823a913e0293952c83" FOREIGN KEY ("addressUuid") REFERENCES "adresses"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "galleries" ADD CONSTRAINT "FK_6a518b58c4d3407548e3ee64405" FOREIGN KEY ("carUuid") REFERENCES "cars"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_e581e2f0aa460409285d3d98e63" FOREIGN KEY ("userUuid") REFERENCES "users"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_e6b8c982ff3a2c0844e6e7b42f4" FOREIGN KEY ("carUuid") REFERENCES "cars"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_ae79ebeccf5f873cf2153938ebf" FOREIGN KEY ("userUuid") REFERENCES "users"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_ae79ebeccf5f873cf2153938ebf"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_e6b8c982ff3a2c0844e6e7b42f4"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_e581e2f0aa460409285d3d98e63"`);
        await queryRunner.query(`ALTER TABLE "galleries" DROP CONSTRAINT "FK_6a518b58c4d3407548e3ee64405"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_8330768f6823a913e0293952c83"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "cars"`);
        await queryRunner.query(`DROP TYPE "public"."cars_fuel_type_enum"`);
        await queryRunner.query(`DROP TABLE "galleries"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "adresses"`);
    }

}
