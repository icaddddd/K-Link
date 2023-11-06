import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
// import { User } from "./User";

@Entity({ name: "products" })
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    product_name: string;

    @Column()
    product_price: string;

    // @Column({ nullable: true })
    // post_image: string;

    // @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    // post_date: Date;

    // @ManyToOne(() => User, (user) => user.posts, {
    //     onDelete: "CASCADE",
    //     onUpdate: "CASCADE"
    // })
    // user:User
}
