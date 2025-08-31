import { Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Auth } from './schemas/auth.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(@InjectModel(Auth.name) private readonly authModel: Model<Auth>) {}

  async create(createAuthDto: CreateAuthDto) {
    return 'This method is not implemented yet';
  }

  async findAll() {
    return 'This method is not implemented yet';
  }
}
