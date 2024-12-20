// src/department/department.resolver.ts

import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { DepartmentService } from './department.service';
import { CreateDepartmentInput } from './dto/create-department.input';
import { UpdateDepartmentInput } from './dto/update-department.input';
import { CreateSubDepartmentInput } from './dto/create-sub-department.input';
import { UpdateSubDepartmentInput } from './dto/update-sub-department.input';
import { Department } from './department.model';
import { SubDepartment } from './sub-department.model';

@Resolver(of => Department)
export class DepartmentResolver {
  constructor(private readonly departmentService: DepartmentService) {}

  @Mutation(returns => Department)
  async createDepartment(@Args('input') input: CreateDepartmentInput): Promise<Department> {
    return this.departmentService.create(input);
  }

  @Mutation(returns => Department)
  async updateDepartment(@Args('input') input: UpdateDepartmentInput): Promise<Department> {
    return this.departmentService.update(input);
  }

  @Mutation(returns => Boolean)
  async deleteDepartment(@Args('id') id: number): Promise<boolean> {
    return this.departmentService.delete(id);
  }

  @Mutation(returns => SubDepartment)
  async createSubDepartment(@Args('input') input: CreateSubDepartmentInput): Promise<SubDepartment> {
    return this.departmentService.createSubDepartment(input);
  }

  @Mutation(returns => SubDepartment)
  async updateSubDepartment(@Args('input') input: UpdateSubDepartmentInput): Promise<SubDepartment> {
    return this.departmentService.updateSubDepartment(input);
  }

  @Mutation(returns => Boolean)
  async deleteSubDepartment(@Args('id') id: number): Promise<boolean> {
    return this.departmentService.deleteSubDepartment(id);
  }

  @Query(returns => SubDepartment, { nullable: true })
  async subDepartment(@Args('id') id: number): Promise<SubDepartment> {
    return this.departmentService.findSubDepartmentById(id);
  }

  @Query(returns => [SubDepartment])
  async subDepartments(): Promise<SubDepartment[]> {
    return this.departmentService.findAllSubDepartments();
  }
}
