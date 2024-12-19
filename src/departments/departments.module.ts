import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentsService } from './departments.service';
import { DepartmentsResolver } from './departments.resolver';
import { Department } from './departments.entity';
import { SubDepartment } from './sub-departments.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Department, SubDepartment])],
  providers: [DepartmentsService, DepartmentsResolver],
})
export class DepartmentsModule {}
