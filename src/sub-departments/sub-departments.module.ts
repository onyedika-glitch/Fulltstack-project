import { Module } from '@nestjs/common';
import { SubDepartmentsService } from './sub-departments.service';

@Module({
  providers: [SubDepartmentsService]
})
export class SubDepartmentsModule {}
