import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialTableCreation1776157343598 implements MigrationInterface {
    name = 'InitialTableCreation1776157343598'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "message_attachment" ("id" SERIAL NOT NULL, "url" character varying NOT NULL, "file_type" character varying NOT NULL, "file_size" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "message_id" integer, CONSTRAINT "PK_d5bc54379802d99c07cd7ec00e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."message_status_status_enum" AS ENUM('sent', 'delivered', 'read')`);
        await queryRunner.query(`CREATE TABLE "message_status" ("id" SERIAL NOT NULL, "status" "public"."message_status_status_enum" NOT NULL DEFAULT 'sent', "delivered_at" TIMESTAMP, "read_at" TIMESTAMP, "message_id" integer, "participant_id" integer, CONSTRAINT "PK_fd8b82470959145fdf427784046" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."message_message_type_enum" AS ENUM('text', 'image', 'file')`);
        await queryRunner.query(`CREATE TABLE "message" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "content" character varying, "message_type" "public"."message_message_type_enum" NOT NULL DEFAULT 'text', "chat_id" integer, "sender_id" integer, CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "chat" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "is_group_chat" boolean NOT NULL DEFAULT false, "group_name" character varying, "group_icon" character varying, "created_by_id" integer, CONSTRAINT "PK_9d0b2ba74336710fd31154738a5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."chat_participant_role_enum" AS ENUM('admin', 'member')`);
        await queryRunner.query(`CREATE TABLE "chat_participant" ("id" SERIAL NOT NULL, "role" "public"."chat_participant_role_enum" NOT NULL DEFAULT 'member', "joined_at" TIMESTAMP NOT NULL DEFAULT now(), "left_at" TIMESTAMP, "chat_id" integer, "user_id" integer, CONSTRAINT "UQ_b53fba3fa78b00330813735af5e" UNIQUE ("chat_id", "user_id"), CONSTRAINT "PK_b126b533dd62e4be694073b20e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."friend_request_status_enum" AS ENUM('pending', 'accepted', 'rejected')`);
        await queryRunner.query(`CREATE TABLE "friend_request" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "status" "public"."friend_request_status_enum" NOT NULL DEFAULT 'pending', "sent_by_id" integer, "sent_to_id" integer, CONSTRAINT "PK_4c9d23ff394888750cf66cac17c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "email" character varying NOT NULL, "bio" character varying, "display_picture" character varying, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "message_attachment" ADD CONSTRAINT "FK_9db9a64915214dde2ca1e8db9a7" FOREIGN KEY ("message_id") REFERENCES "message"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message_status" ADD CONSTRAINT "FK_ff8dd09dba401134707f7fdafd1" FOREIGN KEY ("message_id") REFERENCES "message"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message_status" ADD CONSTRAINT "FK_19a1d4e9afa075c24734f668a3c" FOREIGN KEY ("participant_id") REFERENCES "chat_participant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_859ffc7f95098efb4d84d50c632" FOREIGN KEY ("chat_id") REFERENCES "chat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_c0ab99d9dfc61172871277b52f6" FOREIGN KEY ("sender_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat" ADD CONSTRAINT "FK_bb0b9f6f9232bfaa3e6c9e64620" FOREIGN KEY ("created_by_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat_participant" ADD CONSTRAINT "FK_a7d2e79a6837a8b97246034a954" FOREIGN KEY ("chat_id") REFERENCES "chat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat_participant" ADD CONSTRAINT "FK_d81d31d6cf105fb83b76e8fa5a8" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friend_request" ADD CONSTRAINT "FK_f048671f23e0f1bc681db68eae3" FOREIGN KEY ("sent_by_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friend_request" ADD CONSTRAINT "FK_4412731ed25b761e4479c6ff867" FOREIGN KEY ("sent_to_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "friend_request" DROP CONSTRAINT "FK_4412731ed25b761e4479c6ff867"`);
        await queryRunner.query(`ALTER TABLE "friend_request" DROP CONSTRAINT "FK_f048671f23e0f1bc681db68eae3"`);
        await queryRunner.query(`ALTER TABLE "chat_participant" DROP CONSTRAINT "FK_d81d31d6cf105fb83b76e8fa5a8"`);
        await queryRunner.query(`ALTER TABLE "chat_participant" DROP CONSTRAINT "FK_a7d2e79a6837a8b97246034a954"`);
        await queryRunner.query(`ALTER TABLE "chat" DROP CONSTRAINT "FK_bb0b9f6f9232bfaa3e6c9e64620"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_c0ab99d9dfc61172871277b52f6"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_859ffc7f95098efb4d84d50c632"`);
        await queryRunner.query(`ALTER TABLE "message_status" DROP CONSTRAINT "FK_19a1d4e9afa075c24734f668a3c"`);
        await queryRunner.query(`ALTER TABLE "message_status" DROP CONSTRAINT "FK_ff8dd09dba401134707f7fdafd1"`);
        await queryRunner.query(`ALTER TABLE "message_attachment" DROP CONSTRAINT "FK_9db9a64915214dde2ca1e8db9a7"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "friend_request"`);
        await queryRunner.query(`DROP TYPE "public"."friend_request_status_enum"`);
        await queryRunner.query(`DROP TABLE "chat_participant"`);
        await queryRunner.query(`DROP TYPE "public"."chat_participant_role_enum"`);
        await queryRunner.query(`DROP TABLE "chat"`);
        await queryRunner.query(`DROP TABLE "message"`);
        await queryRunner.query(`DROP TYPE "public"."message_message_type_enum"`);
        await queryRunner.query(`DROP TABLE "message_status"`);
        await queryRunner.query(`DROP TYPE "public"."message_status_status_enum"`);
        await queryRunner.query(`DROP TABLE "message_attachment"`);
    }

}
