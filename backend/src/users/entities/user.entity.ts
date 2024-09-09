import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { Role } from '../../common/enums/rol.enum'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ unique: true, nullable: false })
  email: string

  @Column({ nullable: false, select: false })
  password: string

  @Column({ type: 'enum', default: Role.USER, enum: Role })
  role: Role

  @Column({ type: 'float', nullable: true })
  height: number

  @Column({ type: 'float', nullable: true })
  weight: number

  @Column({ type: 'int', nullable: true })
  age: number

  @Column({ nullable: true })
  activityLevel: string

  @Column({ nullable: true })
  goal: string

  @DeleteDateColumn()
  deletedAt: Date
}
