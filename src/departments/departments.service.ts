// src/department/department.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './department.entity';
import { SubDepartment } from './sub-department.entity';
import { CreateDepartmentInput } from './dto/create-department.input';
import { UpdateDepartmentInput } from './dto/update-department.input';
import { CreateSubDepartmentInput } from './dto/create-sub-department.input';
import { UpdateSubDepartmentInput } from './dto/update-sub-department.input';

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

  async delete(id: number): Promise<boolean> {
    const department = await this.departmentRepository.findOne(id, { relations: ['subDepartments'] });

    if (!department) {
      throw new NotFoundException('Department not found');
    }

    await this.subDepartmentRepository.remove(department.subDepartments);
    await this.departmentRepository.remove(department);
    return true;
  }

  async createSubDepartment(input: CreateSubDepartmentInput): Promise<SubDepartment> {
    const { name, departmentId } = input;
    const department = await this.departmentRepository.findOne(departmentId);

    if (!department) {
      throw new NotFoundException('Department not found');
    }

    const subDepartment = this.subDepartmentRepository.create({
      name,
      department,
    });

    return this.subDepartmentRepository.save(subDepartment);
  }

  async updateSubDepartment(input: UpdateSubDepartmentInput): Promise<SubDepartment> {
    const { id, name } = input;
    const subDepartment = await this.subDepartmentRepository.findOne(id);

    if (!subDepartment) {
      throw new NotFoundException('SubDepartment not found');
    }

    subDepartment.name = name;
    return this.subDepartmentRepository.save(subDepartment);
  }

  async deleteSubDepartment(id: number): Promise<boolean> {
    const subDepartment = await this.subDepartmentRepository.findOne(id);

    if (!subDepartment) {
      throw new NotFoundException('SubDepartment not found');
    }

    await this.subDepartmentRepository.remove(subDepartment);
    return true;
  }

  async findSubDepartmentById(id: number): Promise<SubDepartment> {
    return this.subDepartmentRepository.findOne(id, { relations: ['department'] });
  }

  async findAllSubDepartments(): Promise<SubDepartment[]> {
    return this.subDepartmentRepository.find({ relations: ['department'] });
  }
}
