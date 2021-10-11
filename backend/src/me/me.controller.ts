import { Body, Controller, Delete, Get, Patch, Req, UsePipes, ValidationPipe } from '@nestjs/common'
import { User } from '@prisma/client'

import { UpdateUserDto } from '../user/dto/update-user.dto'
import { UserService } from '../user/user.service'

@Controller('me')
export class MeController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findMe(@Req() { user }: { user: User }) {
    return this.userService.findOne(user.id)
  }

  @Patch()
  @UsePipes(ValidationPipe)
  update(@Req() { user }: { user: User }, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(user.id, updateUserDto)
  }

  @Delete()
  delete(@Req() { user }: { user: User }) {
    return this.userService.remove(user.id)
  }
}
