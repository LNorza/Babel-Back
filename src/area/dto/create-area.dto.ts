import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAreaDto {
  @ApiProperty()
  @IsString()
  name: string;
}
