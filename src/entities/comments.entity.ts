import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Car } from "./cars.entity";
import { User } from "./user.entity";

@Entity('comments')
export class Comment{
    @PrimaryGeneratedColumn('uuid')
    uuid: string

    @CreateDateColumn({type: 'date'})
    addedIn: string

    @Column({type: 'text'})
    description: string

    @ManyToOne(() => Car, (car) => car.comments)
    car: Car

    @ManyToOne(() => User, (user) => user.comments)
    user: User


}