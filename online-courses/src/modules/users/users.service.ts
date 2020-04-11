import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DeleteResult } from "typeorm";
import { User } from "./users.entity";
import { CreateUserDto } from "./users.dto";
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  public async findAll(): Promise<Array<User>> {
    return await this.userRepository.find();
  }

  public async findByEmail(userEmail: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ email: userEmail });
  }

  public async findById(id: string): Promise<User> {
    return await this.userRepository.findOneOrFail(id);
  }

  public async create(user: CreateUserDto): Promise<CreateUserDto & User> {
    return await this.userRepository.save(user);
  }

  public async update(
    id: string,
    newValue: CreateUserDto
  ): Promise<User | undefined> {
    const user = await this.userRepository.findOneOrFail(id);
    if (!user.id) {
      // tslint:disable-next-line:no-console
      console.error("user doesn't exist");
    }
    await this.userRepository.update(id, newValue);
    return await this.userRepository.findOne(id);
  }

  public async delete(id: string): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }

  public async register(userDto: CreateUserDto): Promise<User> {
    const { email } = userDto;
    let user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      throw new HttpException("User already exists", HttpStatus.BAD_REQUEST);
    }
    user = await this.userRepository.create(userDto);
    return await this.userRepository.save(user);
  }
}
