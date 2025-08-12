import { Entity,Column, PrimaryGeneratedColumn, Generated } from "typeorm";

@Entity()
export class ContactEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'uuid', unique: true })
    @Generated('uuid') 
    uuid: string;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    phoneNumber: string;

    @Column()
    address: string;
}
