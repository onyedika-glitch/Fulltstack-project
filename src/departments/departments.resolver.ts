// src/department/department.resolver.ts

import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { DepartmentService } from './department.service';
import { CreateDepartmentInput } from './dto/create-department.input';
import { UpdateDepartmentInput } from './dto/update-department.input';
import { Department } from './department.model';

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
}
