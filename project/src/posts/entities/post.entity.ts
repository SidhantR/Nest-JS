import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()  // An Entity defines the structure of your database table.
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 50})
    title: string

    @Column({type: 'text'})
    content: string

    @ManyToOne(() => User , (user) => user.posts)
    author: User

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate : Date
}