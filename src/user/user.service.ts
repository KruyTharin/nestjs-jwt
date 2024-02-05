import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/createUserDto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async findOne(id: number) {
    return await this.userRepo.findOne({ where: { id: id } });
  }

  async findAll() {
    return await this.userRepo.find();
  }
  async delete(id: number) {
    const { affected } = await this.userRepo.delete(id);
    return Boolean(affected);
  }

  async findOneWithUserName(username: string) {
    return await this.userRepo.findOne({ where: { email: username } });
  }

  async createUser(createUser: CreateUserDto) {
    const user = this.userRepo.create(createUser);
    return await this.userRepo.save(user);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepo.update(id, updateUserDto);
  }
}
