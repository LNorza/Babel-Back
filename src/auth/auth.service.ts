import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './schemas/auth.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(@InjectModel(Auth.name) private readonly authModel: Model<Auth>) {}

  async create(createAuthDto: CreateAuthDto) {
    try {
      const newUser = new this.authModel(createAuthDto);
      await newUser.save();
      return { message: 'User created successfully', user: newUser };
    } catch (error) {
      throw new InternalServerErrorException('El usuario ya se encuentran registrados');
    }
  }

  // findAll() {
  //   return `This action returns all auth`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
