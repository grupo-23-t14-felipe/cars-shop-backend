import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Address } from "./address.entity";
import { Car } from "./cars.entity";
import { Comment } from "./comments.entity";
import { hashSync, getRounds } from "bcryptjs";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column({ type: "varchar", length: 80 })
  name: string;

  @Column({ type: "varchar", length: 255 })
  email: string;

  @Column({ type: "varchar", length: 120 })
  password: string;

  @Column({ type: "varchar", length: 11 })
  cpf: string;

  @Column({ type: "varchar", length: 11 })
  celphone: string;

  @Column({ type: "date", nullable: true })
  birthday: string | null | undefined;

  @Column({ type: "text", nullable: true })
  description: string | null | undefined;

  @Column({ type: "text", nullable: true })
  imageUrl: string | null | undefined;

  @Column({ type: "boolean", nullable: true })
  is_seller: boolean | null | undefined;

  @Column({ type: "varchar", nullable: true })
  reset_password: string | null | undefined;

  @OneToOne(() => Address, { cascade: true, onDelete: "CASCADE" })
  @JoinColumn()
  address: Address;

  @OneToMany(() => Car, (car) => car.user, { cascade: true, onDelete: "CASCADE" })
  cars: Car[];

  @OneToMany(() => Comment, (comment) => comment.user, { cascade: true, onDelete: "CASCADE" })
  comments: Comment[];

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    const isEncrypted = getRounds(this.password);
    if (!isEncrypted) {
      this.password = hashSync(this.password, 10);
    }
  }
}
