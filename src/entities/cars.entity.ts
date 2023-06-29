import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Comment } from "./comments.entity";
import { Gallery } from "./galleries.entity";

export enum fuelType {
  flex = "1",
  hybrid = "2",
  eletric = "3"
}

@Entity("cars")
export class Car {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column({ type: "varchar", length: 20 })
  brand: string;

  @Column({ type: "varchar", length: 40 })
  model: string;

  @Column({ type: "integer" })
  year: number;

  @Column({ type: "enum", enum: fuelType, default: fuelType.flex })
  fuel_type: fuelType;

  @Column({ type: "integer" })
  mileage: number;

  @Column({ type: "varchar", length: 30 })
  color: string;

  @Column({ type: "boolean" })
  is_good_deal: boolean;

  @Column({ type: "boolean" })
  is_active: boolean;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  value: number;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "text" })
  img_default: string;

  @ManyToOne(() => User, (user) => user.cars)
  user: User;

  @OneToMany(() => Comment, (comment) => comment.car, { cascade: true, onDelete: "CASCADE" })
  comments: Comment[];

  @OneToMany(() => Gallery, (gallery) => gallery.car, { cascade: true, onDelete: "CASCADE" })
  gallery: Gallery[];
}
