import {
  Injectable,
  Logger,
  Inject,
  InternalServerErrorException,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = new this.userModel(createUserDto);
      await newUser.save();
      return { message: 'User created successfully', items: newUser };
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'El usuario ya se encuentra registrado',
        cause: error.message,
      });
    }
  }

  async findAll() {
    try {
      const users = await this.userModel.find();
      return { length: users.length, data: users };
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Error al obtener los usuarios',
        cause: error.message,
      });
    }
  }

  async findOne(id: string) {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException('ID de usuario inválido');
      }
      const user = await this.userModel.findById(id);
      if (!user) throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      return { message: 'Usuario encontrado', data: user };
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Error al obtener el usuario',
        cause: error.message,
      });
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userModel.findByIdAndUpdate(id, updateUserDto);
      if (!user) throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);

      return {
        message: 'Usuario actualizado correctamente',
        data: user,
      };
    } catch (error) {
      this.logger.error(`Error updating user with ID ${id}: ${error.message}`);
      throw new InternalServerErrorException({
        message: 'Error al actualizar el usuario',
        cause: error.message,
      });
    }
  }

  async remove(id: string) {
    try {
      const user = await this.userModel.findByIdAndDelete(id);
      if (!user) throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      return { message: 'Usuario eliminado correctamente', data: user };
    } catch (error) {
      throw new InternalServerErrorException({
        message: 'Error al eliminar el usuario',
        cause: error.message,
      });
    }
  }
}
