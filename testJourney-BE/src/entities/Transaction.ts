import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
// import { User } from "./User";

@Entity({ name: "transactions" })
export class Transaction {
    @PrimaryGeneratedColumn()
    invoice_id: number;

    @Column()
    qty: number;

    @Column()
    invoice_total_amount: number;

    @Column()
    invoice_product_detail: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    invoice_date: Date;

    @Column()
    invoice_total_count: number;

    // @ManyToOne(() => User, (user) => user.posts, {
    //     onDelete: "CASCADE",
    //     onUpdate: "CASCADE"
    // })
    // user:User
}
