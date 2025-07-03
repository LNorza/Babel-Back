import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  // @Get()
  // @ApiOperation({ summary: 'Get all users' })
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Get(':id')
  // @ApiOperation({ summary: 'Get a user by ID' })
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // @ApiOperation({ summary: 'Update a user by ID' })
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // @ApiOperation({ summary: 'Delete a user by ID' })
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
