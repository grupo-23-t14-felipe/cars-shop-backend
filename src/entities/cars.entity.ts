import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Comment } from "./comments.entity";
import { Gallery } from "./galleries.entity";

export enum fuelType{
    ETANOL = 1,
    HYBRID = 2,
    ELECTRIC = 3,
    
}

@Entity('cars')
export class Car{
    @PrimaryGeneratedColumn('uuid')
    uuid: string

    @Column({type: 'varchar', length: 20})
    brand: string

    @Column({type: 'varchar', length: 40})
    model: string
    
    @Column({type: 'integer'})
    year: number
    
    @Column({type: 'enum', enum: fuelType})
    fuel_type: fuelType
    
    @Column({type: 'integer'})
    mileage: number

    @Column({type: 'varchar', length: 30})
    color: string
    
    @Column({type: 'boolean'})
    is_good_deal: boolean
    
    @Column({type: 'boolean'})
    is_active: boolean

    @Column({type: 'varchar'})
    default_img: string;
    
    @Column({type: 'decimal', precision: 10, scale: 2})
    value: number

    @Column({type: 'text'})
    description: string

    @ManyToOne(() => User, (user) => user.cars)
    user: User

    @OneToMany(() => Comment, (comment) => comment.car)
    comments: Comment[]

    @OneToMany(() => Gallery, (gallery) => gallery.car)
    galleries: Gallery[]

}