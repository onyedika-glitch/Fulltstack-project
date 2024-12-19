import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Resolver(of => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(returns => [User])
  async users() {
    return this.usersService.findAll();
  }

  @Mutation(returns => User)
  async createUser(@Args('name') name: string, @Args('email') email: string) {
    return this.usersService.create({ name, email });
  }
}