import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthSchema } from './schemas/auth.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Auth',
        schema: AuthSchema, // Assuming AuthSchema is imported from the appropriate file
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
