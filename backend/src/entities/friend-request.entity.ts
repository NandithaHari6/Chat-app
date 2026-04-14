import { Column, Entity, ManyToOne } from "typeorm";
import { AbstractEntity } from "./abstract.entity";
import { User } from "./user.entity";

export enum FriendRequestStatus {
    PENDING = "pending",
    ACCEPTED = "accepted",
    REJECTED = "rejected",
}

@Entity()
export class FriendRequest extends AbstractEntity {
    @Column({ type: "enum", enum: FriendRequestStatus, default: FriendRequestStatus.PENDING })
    status!: FriendRequestStatus;

    @ManyToOne(() => User, (user) => user.sentFriendRequests)
    sentBy!: User;

    @ManyToOne(() => User, (user) => user.receivedFriendRequests)
    sentTo!: User;
}
