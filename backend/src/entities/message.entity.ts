import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { AbstractEntity } from "./abstract.entity";
import { Chat } from "./chat.entity";
import { User } from "./user.entity";
import { MessageAttachment } from "./message-attachment.entity";
import { MessageStatus } from "./message-status.entity";

export enum MessageType {
    TEXT = "text",
    IMAGE = "image",
    FILE = "file",
}

@Entity()
export class Message extends AbstractEntity {
    @Column({ nullable: true })
    content!: string;

    @Column({ type: "enum", enum: MessageType, default: MessageType.TEXT })
    messageType!: MessageType;

    @ManyToOne(() => Chat, (chat) => chat.messages)
    chat!: Chat;

    @ManyToOne(() => User, (user) => user.messages)
    sender!: User;

    @OneToMany(() => MessageAttachment, (attachment:MessageAttachment) => attachment.message)
    attachments!: MessageAttachment[];

    @OneToMany(() => MessageStatus, (status:MessageStatus) => status.message)
    statuses!: MessageStatus[];
}
