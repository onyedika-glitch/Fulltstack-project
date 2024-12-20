import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DepartmentsModule } from './departments/departments.module';
import { SubDepartmentsModule } from './sub-departments/sub-departments.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'PostgresOmogo',
      password: 'Godis@10',
      database: 'Postegres',
      autoLoadEntities: true,
      synchronize: true, // Set to false in production
    }),
    AuthModule,
    DepartmentsModule,
    SubDepartmentsModule,
  ],
})

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
  ],
})

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'your_username',
      password: 'your_password',
      database: 'your_database',
      autoLoadEntities: true,
      synchronize: true, // Set to false in production
    }),
    UsersModule,
  ],
})
export class AppModule {}

