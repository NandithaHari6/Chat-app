import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Message } from "./message.entity";

@Entity()
export class MessageAttachment {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    url!: string;

    @Column()
    fileType!: string;

    @Column()
    fileSize!: number;

    @ManyToOne(() => Message, (message) => message.attachments)
    message!: Message;

    @CreateDateColumn()
    createdAt!: Date;
}
