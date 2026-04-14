import { Column, Entity, OneToMany } from "typeorm";
import { AbstractEntity } from "./abstract.entity";
import { ChatParticipant } from "./chat-participant.entity";
import { Message } from "./message.entity";
import { FriendRequest } from "./friend-request.entity";

@Entity()
export class User extends AbstractEntity {
    @Column()
    name!: string;

    @Column({ unique: true })
    email!: string;

    @Column({ nullable: true })
    bio!: string;

    @Column({ nullable: true })
    displayPicture!: string;

    @OneToMany(() => ChatParticipant, (cp:ChatParticipant) => cp.user)
    chatParticipants!: ChatParticipant[];

    @OneToMany(() => Message, (message:Message) => message.sender)
    messages!: Message[];

    @OneToMany(() => FriendRequest, (fr:FriendRequest) => fr.sentBy)
    sentFriendRequests!: FriendRequest[];

    @OneToMany(() => FriendRequest, (fr:FriendRequest) => fr.sentTo)
    receivedFriendRequests!: FriendRequest[];
}
