import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Message } from "./message.entity";
import { ChatParticipant } from "./chat-participant.entity";

export enum DeliveryStatus {
    SENT = "sent",
    DELIVERED = "delivered",
    READ = "read",
}

@Entity()
export class MessageStatus {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "enum", enum: DeliveryStatus, default: DeliveryStatus.SENT })
    status!: DeliveryStatus;

    @Column({ nullable: true })
    deliveredAt!: Date;

    @Column({ nullable: true })
    readAt!: Date;

    @ManyToOne(() => Message, (message) => message.statuses)
    message!: Message;

    @ManyToOne(() => ChatParticipant, (participant) => participant.messageStatuses)
    participant!: ChatParticipant;
}
