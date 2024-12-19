import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: Partial<UsersService>;
  let jwtService: Partial<JwtService>;

  beforeEach(async () => {
    usersService = {
      findOneByUsername: jest.fn(),
      create: jest.fn(),
    };

    jwtService = {
      sign: jest.fn().mockReturnValue('mockJwtToken'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should return a JWT token if credentials are valid', async () => {
      const user = { id: 1, username: 'test', password: await bcrypt.hash('test', 10) };
      (usersService.findOneByUsername as jest.Mock).mockResolvedValue(user);

      const result = await authService.validateUser('test', 'test');
      expect(result).toEqual({ id: 1, username: 'test' });

      const loginResult = await authService.login(result);
      expect(loginResult).toEqual({ access_token: 'mockJwtToken' });
    });

    it('should return null if credentials are invalid', async () => {
      (usersService.findOneByUsername as jest.Mock).mockResolvedValue(null);

      const result = await authService.validateUser('test', 'wrongpassword');
      expect(result).toBeNull();
    });
  });

  describe('register', () => {
    it('should create a new user and return it', async () => {
      const createUserDto = { username: 'newuser', password: 'newpassword' };
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const user = { id: 2, ...createUserDto, password: hashedPassword };

      (usersService.create as jest.Mock).mockResolvedValue(user);

      const result = await authService.register(createUserDto);
      expect(result).toEqual(user);
    });
  });
});