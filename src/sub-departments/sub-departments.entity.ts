import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Department } from './departments.entity';

@Entity()
export class SubDepartment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Department, department => department.subDepartments)
  department: Department;
}