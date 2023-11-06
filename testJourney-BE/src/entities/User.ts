import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
// import { Post } from "./Post";

@Entity({ name: "admin" })
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  fullname: string;

  @Column()
  password: string;

  // @OneToMany(() => Post, (post) => post.user, {
  //   onDelete: "CASCADE",
  //   onUpdate: "CASCADE",
  // })
  // posts: Post[];
}
