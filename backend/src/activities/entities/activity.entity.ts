import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('activity')
export class Activity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 100 })
  name: string

  @Column({ type: 'text', nullable: true })
  description: string

  @Column({ type: 'int' })
  calories_burned_per_hour: number

  @Column({ type: 'varchar', length: 50, nullable: true })
  difficulty_level: string

  @Column({ type: 'varchar', length: 100, nullable: true })
  muscles_targeted: string

  @Column({ type: 'varchar', length: 100, nullable: true })
  equipment_needed: string
}
