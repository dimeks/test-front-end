import {
    PrimaryGeneratedColumn,
    Entity,
    Column,
    Index,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    avatar: string;

    @Column()
    displayName: string;

    @Column()
    @Index({ unique: true })
    email: string;

    @Column({ select: false })
    password: string;

    constructor(user?: Partial<User>) {
        if (user) {
            this.id = user.id;
            this.avatar = user.avatar;
            this.displayName = user.displayName;
            this.email = user.email;
            this.password = user.password;
        }
    }

}
