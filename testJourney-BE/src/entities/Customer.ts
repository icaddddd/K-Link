import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
// import { Post } from "./Post";

@Entity({ name: "customers" })
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname: string;

  @Column()
  division: string;

  // @OneToMany(() => Post, (post) => post.user, {
  //   onDelete: "CASCADE",
  //   onUpdate: "CASCADE",
  // })
  // posts: Post[];
}
