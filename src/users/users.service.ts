import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        // Create a new user instance
        const user = this.usersRepository.create(createUserDto);

        // Save the user to the database
        return this.usersRepository.save(user);
    }
    async findOneByUsername(username: string): Promise<User | undefined> {
        return this.usersRepository.findOneOptionsWhere({
            where: { username },
            relations: ['profile'], // Load related profile entity
    });
      }

    async findAll(): Promise<User[]> {
        return this.usersRepository.find();
        order: { username: 'ASC' } // Order by username ascending
      take: 10 // Limit to 10 results
    }
}