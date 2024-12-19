// src/department/department.model.ts

import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class SubDepartment {
  @Field(type => ID)
  id: number;

  @Field()
  name: string;
}

@ObjectType()
export class Department {
  @Field(type => ID)
  id: number;

  @Field()
  name: string;

  @Field(type => [SubDepartment], { nullable: true })
  subDepartments?: SubDepartment[];
}
