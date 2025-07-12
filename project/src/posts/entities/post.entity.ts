import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()  // An Entity defines the structure of your database table.
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 50})
    title: string

    @Column({type: 'text'})
    content: string

    @Column()
    authorName: string

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate : Date
}