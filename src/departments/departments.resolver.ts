import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { DepartmentsService } from './departments.service';
import { Department } from './departments.entity';
import { CreateDepartmentDto } from './create-departments.dto';

@Resolver(of => Department)
export class DepartmentsResolver {
  constructor(private departmentsService: DepartmentsService) {}

  @Mutation(returns => Department)
  async createDepartment(@Args('createDepartmentData') createDepartmentData: CreateDepartmentDto) {
    return this.departmentsService.create(createDepartmentData);
  }
}