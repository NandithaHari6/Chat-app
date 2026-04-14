import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { AbstractEntity } from "./abstract.entity";
import { User } from "./user.entity";
import { ChatParticipant } from "./chat-participant.entity";
import { Message } from "./message.entity";

@Entity()
export class Chat extends AbstractEntity {
    @Column({ default: false })
    isGroupChat!: boolean;

    @Column({ nullable: true })
    groupName!: string;

    @Column({ nullable: true })
    groupIcon!: string;

    @ManyToOne(() => User)
    createdBy!: User;

    @OneToMany(() => ChatParticipant, (cp) => cp.chat)
    participants!: ChatParticipant[];

    @OneToMany(() => Message, (message) => message.chat)
    messages!: Message[];
}
