import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Car } from "./cars.entity";

@Entity("galleries")
export class Gallery {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column({ type: "text", nullable: true })
  imageUrl: string | null | undefined;

  @ManyToOne(() => Car, (car) => car.gallery, { onDelete: "CASCADE" })
  car: Car;
}
