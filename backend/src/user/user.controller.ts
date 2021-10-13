import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { Role, User } from '@prisma/client'

import { Public } from '../common/decorators/public-route.decorator'
import { Roles } from '../common/decorators/roles.decorator'
import { ParametersPipe } from '../common/pipes/parameters.pipe'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  @UsePipes(ValidationPipe)
  create(@Req() { user }: { user?: User }, @Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto, user?.role)
  }

  @Get()
  findAll(@Query('page') page: number) {
    return this.userService.findAll(page)
  }

  @Get(':id')
  findOne(@Param('id', ParametersPipe) id: string) {
    return this.userService.findOne(id)
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @UsePipes(ValidationPipe)
  update(@Param('id', ParametersPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto)
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id', ParametersPipe) id: string) {
    return this.userService.remove(id)
  }
}
