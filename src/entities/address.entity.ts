import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { string } from "zod";

@Entity('adresses')
export class Address{
    @PrimaryGeneratedColumn('uuid')
    uuid: string

    @Column({type: 'varchar', length: 8})
    cep: string

    @Column({type: 'varchar', length: 15})
    state: string

    @Column({type: 'varchar', length: 50})
    city: string

    @Column({type: 'varchar', length: 8})
    number: string

    @Column({type: 'varchar', length: 20, nullable: true})
    complement: string | null | undefined

}