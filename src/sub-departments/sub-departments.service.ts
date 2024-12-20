// src/department/department.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './department.entity';
import { SubDepartment } from './sub-department.entity';
import { CreateDepartmentInput } from './dto/create-department.input';
import { CreateSubDepartmentInput } from './dto/create-sub-department.input';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
    @InjectRepository(SubDepartment)
    private subDepartmentRepository: Repository<SubDepartment>,
  ) {}

  async create(input: CreateDepartmentInput): Promise<Department> {
    const { name, subDepartments } = input;

    const department = this.departmentRepository.create({
      name,
      subDepartments: subDepartments ? subDepartments.map(subDept => this.subDepartmentRepository.create(subDept)) : [],
    });

    return this.departmentRepository.save(department);
  }

  async createSubDepartment(input: CreateSubDepartmentInput): Promise<SubDepartment> {
    const { name, departmentId } = input;
    const department = await this.departmentRepository.findOne(departmentId);

    if (!department) {
      throw new Error('Department not found');
    }

    const subDepartment = this.subDepartmentRepository.create({
      name,
      department,
    });

    return this.subDepartmentRepository.save(subDepartment);
  }
}
