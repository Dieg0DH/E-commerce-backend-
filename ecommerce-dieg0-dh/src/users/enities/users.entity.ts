import { Orders } from 'src/orders/entities/order.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'USERS',
})
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
    unique: true,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  password: string;

  @Column({
    type: 'bigint',
  })
  phone: number;

  @Column({
    type: 'varchar',
    length: 50,
  })
  country: string;

  @Column({
    type: 'text',
  })
  address: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  city: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  isAdmin: boolean;

  @OneToMany(() => Orders, (Order) => Order.user)
  orders: Orders[];
}
