// src/department/department.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './department.entity';
import { SubDepartment } from './sub-department.entity';
import { CreateDepartmentInput } from './dto/create-department.input';
import { UpdateDepartmentInput } from './dto/update-department.input';

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

  async update(input: UpdateDepartmentInput): Promise<Department> {
    const { id, name } = input;
    const department = await this.departmentRepository.findOne(id);

    if (!department) {
      throw new NotFoundException('Department not found');
    }

    department.name = name;
    return this.departmentRepository.save(department);
  }
}
