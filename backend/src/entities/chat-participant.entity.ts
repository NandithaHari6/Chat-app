import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Chat } from "./chat.entity";
import { User } from "./user.entity";
import { MessageStatus } from "./message-status.entity.ts";

export enum ParticipantRole {
    ADMIN = "admin",
    MEMBER = "member",
}

@Entity()
@Unique(["chat", "user"])
export class ChatParticipant {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Chat, (chat) => chat.participants)
    chat!: Chat;

    @ManyToOne(() => User, (user) => user.chatParticipants)
    user!: User;

    @Column({ type: "enum", enum: ParticipantRole, default: ParticipantRole.MEMBER })
    role!: ParticipantRole;

    @CreateDateColumn()
    joinedAt!: Date;

    @Column({ nullable: true })
    leftAt!: Date;

    @OneToMany(() => MessageStatus, (ms) => ms.participant)
    messageStatuses!: MessageStatus[];
}
