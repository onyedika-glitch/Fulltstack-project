import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { SubDepartment } from './sub-departments.entity';

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => SubDepartment, subDepartment => subDepartment.department, { cascade: true })
  subDepartments: SubDepartment[];
}