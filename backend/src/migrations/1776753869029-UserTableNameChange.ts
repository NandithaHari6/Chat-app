import { MigrationInterface, QueryRunner } from "typeorm";

export class UserTableNameChange1776753869029 implements MigrationInterface {
    name = 'UserTableNameChange1776753869029'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_c0ab99d9dfc61172871277b52f6"`);
        await queryRunner.query(`ALTER TABLE "chat" DROP CONSTRAINT "FK_bb0b9f6f9232bfaa3e6c9e64620"`);
        await queryRunner.query(`ALTER TABLE "chat_participant" DROP CONSTRAINT "FK_d81d31d6cf105fb83b76e8fa5a8"`);
        await queryRunner.query(`ALTER TABLE "friend_request" DROP CONSTRAINT "FK_f048671f23e0f1bc681db68eae3"`);
        await queryRunner.query(`ALTER TABLE "friend_request" DROP CONSTRAINT "FK_4412731ed25b761e4479c6ff867"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "email" character varying NOT NULL, "bio" character varying, "display_picture" character varying, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_c0ab99d9dfc61172871277b52f6" FOREIGN KEY ("sender_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat" ADD CONSTRAINT "FK_bb0b9f6f9232bfaa3e6c9e64620" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat_participant" ADD CONSTRAINT "FK_d81d31d6cf105fb83b76e8fa5a8" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friend_request" ADD CONSTRAINT "FK_f048671f23e0f1bc681db68eae3" FOREIGN KEY ("sent_by_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friend_request" ADD CONSTRAINT "FK_4412731ed25b761e4479c6ff867" FOREIGN KEY ("sent_to_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "friend_request" DROP CONSTRAINT "FK_4412731ed25b761e4479c6ff867"`);
        await queryRunner.query(`ALTER TABLE "friend_request" DROP CONSTRAINT "FK_f048671f23e0f1bc681db68eae3"`);
        await queryRunner.query(`ALTER TABLE "chat_participant" DROP CONSTRAINT "FK_d81d31d6cf105fb83b76e8fa5a8"`);
        await queryRunner.query(`ALTER TABLE "chat" DROP CONSTRAINT "FK_bb0b9f6f9232bfaa3e6c9e64620"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_c0ab99d9dfc61172871277b52f6"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "friend_request" ADD CONSTRAINT "FK_4412731ed25b761e4479c6ff867" FOREIGN KEY ("sent_to_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friend_request" ADD CONSTRAINT "FK_f048671f23e0f1bc681db68eae3" FOREIGN KEY ("sent_by_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat_participant" ADD CONSTRAINT "FK_d81d31d6cf105fb83b76e8fa5a8" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "chat" ADD CONSTRAINT "FK_bb0b9f6f9232bfaa3e6c9e64620" FOREIGN KEY ("created_by_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_c0ab99d9dfc61172871277b52f6" FOREIGN KEY ("sender_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
